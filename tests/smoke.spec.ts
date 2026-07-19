import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => window.localStorage.clear())
})

test('core learner path works in local fallback mode', async ({ page, request }) => {
  await page.goto('/courses/apis-webhooks-integration')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('APIs')

  await page.goto('/learn/apis-webhooks-integration/integration-patterns')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('integration pattern')
  await page.getByRole('button', { name: 'Mark lesson complete' }).click()
  await expect(page.getByRole('button', { name: 'Completed' })).toBeVisible()

  await page.goto('/learn/apis-webhooks-integration/sync-async')
  await expect(page.getByRole('button', { name: 'Mark lesson complete' })).toBeVisible()

  await page.goto('/courses/sql-product-implementation')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('SQL')
  const downloadResponse = await request.get('/downloads/sql-course/01_schema.sql')
  expect(downloadResponse.status()).toBe(200)
  expect(await downloadResponse.text()).toContain('CREATE TABLE clients')

  await page.goto('/learn/sql-product-implementation/tables-grain')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('grain')

  await page.goto('/quiz/sql-product-implementation/sql-m1-quiz')
  const questions = page.locator('.quiz-question')
  await expect(questions).toHaveCount(12)
  for (let index = 0; index < 12; index += 1) {
    await questions.nth(index).locator('.quiz-options button').first().click()
  }
  await page.getByRole('button', { name: 'Submit assessment' }).click()
  await expect(page.getByText('Attempt result')).toBeVisible()

  await page.goto('/dashboard')
  await expect(page.getByText('ORI-200', { exact: true }).first()).toBeVisible()
  await expect(page.getByText('ORI-110', { exact: true }).first()).toBeVisible()
})

test('invalid deep links render useful states', async ({ page }) => {
  await page.goto('/learn/sql-product-implementation/not-a-lesson')
  await expect(page.getByRole('heading', { name: 'Lesson not found' })).toBeVisible()

  await page.goto('/quiz/sql-product-implementation/not-a-quiz')
  await expect(page.getByRole('heading', { name: 'Quiz not found' })).toBeVisible()

  await page.goto('/courses/not-a-course')
  await expect(page.getByRole('heading', { name: 'Course not found' })).toBeVisible()

  await page.goto('/nothing-here')
  await expect(page.getByText('This page is not in the curriculum.')).toBeVisible()
})

test('keyboard skip link moves focus to main content', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skipLink = page.getByRole('link', { name: 'Skip to main content' })
  await expect(skipLink).toBeFocused()
  await skipLink.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})

test('layout has no viewport-level horizontal overflow', async ({ page }) => {
  for (const route of [
    '/',
    '/courses/sql-product-implementation',
    '/learn/sql-product-implementation/tables-grain',
    '/quiz/sql-product-implementation/sql-m1-quiz',
    '/account',
  ]) {
    await page.goto(route)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow, `${route} overflow`).toBeLessThanOrEqual(1)
  }
})
