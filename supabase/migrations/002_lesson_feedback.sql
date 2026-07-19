create table if not exists public.lesson_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  lesson_id text not null,
  rating integer check (rating between 1 and 5),
  issue_type text not null check (issue_type in ('incorrect_information','confusing_explanation','broken_source','broken_lab','quiz_problem','accessibility_problem','other')),
  feedback text not null default '' check (char_length(feedback) <= 1500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  review_status text not null default 'new' check (review_status in ('new','reviewing','resolved','declined'))
);

create index if not exists lesson_feedback_user_lesson_idx
  on public.lesson_feedback (user_id, course_id, lesson_id, created_at desc);

alter table public.lesson_feedback enable row level security;

create policy "lesson_feedback_select_own"
  on public.lesson_feedback for select
  using (auth.uid() = user_id);

create policy "lesson_feedback_insert_own"
  on public.lesson_feedback for insert
  with check (auth.uid() = user_id);

create policy "lesson_feedback_update_unresolved_own"
  on public.lesson_feedback for update
  using (auth.uid() = user_id and review_status in ('new','reviewing'))
  with check (auth.uid() = user_id);

create or replace function public.set_lesson_feedback_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_lesson_feedback_updated_at on public.lesson_feedback;
create trigger set_lesson_feedback_updated_at
before update on public.lesson_feedback
for each row execute procedure public.set_lesson_feedback_updated_at();
