import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { validateLearningEvent } from '../lib/analyticsEvents'
import { MAX_FEEDBACK_LENGTH, validateFeedback } from '../lib/lessonFeedback'
import { buildInstructionalAudit } from './instructionalQuality'
import { buildLabManifest } from './labManifest'
import { getProductionCourses } from './productionCourseRegistry'
import { sourceRegistry } from './sourceRegistry'

const courses = getProductionCourses()
const report = buildInstructionalAudit(courses)
const manifest = buildLabManifest(courses)

describe('instructional quality audit', () => {
  it('reviews every production lesson and module', () => {
    expect(report.lessonsReviewed).toBe(76)
    expect(report.modulesReviewed).toBe(19)
    expect(report.lessonAudits).toHaveLength(76)
    expect(report.moduleAudits).toHaveLength(19)
    expect(report.lessonAudits.every((audit) => audit.average >= 1 && audit.average <= 5)).toBe(true)
    expect(report.moduleAudits.every((audit) => audit.average >= 1 && audit.average <= 5)).toBe(true)
  })

  it('audits the original 522 questions and the 57 curated replacements/additions', () => {
    expect(report.questionsReviewed).toBe(579)
    expect(report.questionBanks.map((bank) => bank.totalQuestions)).toEqual([216, 363])
  })

  it('contains no severe assessment integrity violations', () => {
    for (const bank of report.questionBanks) {
      expect(bank.exactDuplicateIds).toEqual([])
      expect(bank.exactDuplicatePrompts).toEqual([])
      expect(bank.unregisteredSourceQuestionIds).toEqual([])
      expect(bank.applicationOrTroubleshootingPercent).toBeGreaterThanOrEqual(30)
    }
  })

  it('keeps near duplicates as review evidence rather than an arbitrary CI failure', () => {
    for (const bank of report.questionBanks) {
      expect(Array.isArray(bank.nearDuplicatePairs)).toBe(true)
      expect(bank.nearDuplicatePairs.every((pair) => pair.similarity >= 0.72)).toBe(true)
    }
  })

  it('has review metadata and registered primary sources for every lesson', () => {
    for (const course of courses) {
      expect(course.review.reviewStatus).toBe('reviewed')
      for (const lesson of course.lessons) {
        expect(lesson.review?.reviewStatus).toBe('reviewed')
        expect(lesson.review?.contentVersion).toBeTruthy()
        expect(lesson.sources.length).toBeGreaterThan(0)
        expect(lesson.sources.every((source) => Boolean(source.sourceId))).toBe(true)
      }
    }
  })

  it('creates one lab manifest entry per production lesson', () => {
    expect(manifest).toHaveLength(76)
    expect(new Set(manifest.map((entry) => `${entry.courseId}:${entry.lessonId}`)).size).toBe(76)
    expect(manifest.every((entry) => entry.expectedEvidence.length > 0 && entry.manualValidationSteps.length > 0)).toBe(true)
  })

  it('maintains a unique primary source registry', () => {
    expect(new Set(sourceRegistry.map((source) => source.id)).size).toBe(sourceRegistry.length)
    expect(new Set(sourceRegistry.map((source) => source.url.replace(/\/$/, ''))).size).toBe(sourceRegistry.length)
    expect(sourceRegistry.every((source) => source.primary && source.url.startsWith('https://'))).toBe(true)
  })

  it('writes machine-readable and human-readable audit artifacts', () => {
    mkdirSync('artifacts', { recursive: true })
    writeFileSync('artifacts/instructional-quality-report.json', JSON.stringify(report, null, 2))
    writeFileSync('artifacts/lab-manifest.json', JSON.stringify(manifest, null, 2))
    const markdown = [
      '# Orivo Academy Instructional Quality Report',
      '',
      `Generated: ${report.generatedAt}`,
      '',
      `- Lessons reviewed: ${report.lessonsReviewed}`,
      `- Modules reviewed: ${report.modulesReviewed}`,
      `- Questions reviewed after curated additions: ${report.questionsReviewed}`,
      '',
      '## Module scores',
      '',
      '| Course | Module | Lessons | Average | Priority finding |',
      '|---|---|---:|---:|---|',
      ...report.moduleAudits.map((audit) => `| ${audit.courseId} | ${audit.title} | ${audit.lessonCount} | ${audit.average} | ${audit.priorityFindings[0] ?? 'No structural blocker'} |`),
      '',
      '## Question bank findings',
      '',
      ...report.questionBanks.flatMap((bank) => [
        `### ${bank.courseId}`,
        `- Questions: ${bank.totalQuestions}`,
        `- Applied or troubleshooting: ${bank.applicationOrTroubleshootingPercent}%`,
        `- Generated-template questions still requiring periodic human review: ${bank.templatedQuestionCount}`,
        `- Near-duplicate pairs queued for review: ${bank.nearDuplicatePairs.length}`,
        '',
      ]),
    ].join('\n')
    writeFileSync('artifacts/instructional-quality-report.md', markdown)
    expect(report.lessonsReviewed).toBeGreaterThan(0)
  })
})

describe('learner feedback controls', () => {
  it('requires meaningful feedback and enforces length', () => {
    expect(validateFeedback({ rating: null, issueType: '', feedback: '' })).toContain('rating')
    expect(validateFeedback({ rating: 5, issueType: '', feedback: '' })).toBeNull()
    expect(validateFeedback({ rating: null, issueType: '', feedback: 'This is confusing.' })).toContain('issue type')
    expect(validateFeedback({ rating: 3, issueType: 'confusing_explanation', feedback: 'x'.repeat(MAX_FEEDBACK_LENGTH + 1) })).toContain(String(MAX_FEEDBACK_LENGTH))
  })

  it('uses a migration with RLS and own-record policies', () => {
    const migration = readFileSync('supabase/migrations/002_lesson_feedback.sql', 'utf8')
    expect(migration).toContain('enable row level security')
    expect(migration).toContain('auth.uid() = user_id')
    expect(migration).toContain('lesson_feedback_select_own')
    expect(migration).toContain('lesson_feedback_insert_own')
  })
})

describe('privacy-conscious analytics contract', () => {
  it('accepts only approved non-sensitive event properties', () => {
    expect(validateLearningEvent({ name: 'lesson_completed', timestamp: new Date().toISOString(), applicationVersion: '1.3.0', courseId: 'sql-product-implementation', lessonId: 'tables-grain' })).toBeNull()
  })
})
