create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('parent', 'student', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  age integer not null check (age between 4 and 17),
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  "order" integer not null,
  title text not null,
  created_at timestamptz not null default now(),
  unique (course_id, "order")
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules (id) on delete cascade,
  "order" integer not null,
  title text not null,
  video_url text,
  key_phrase text,
  challenge text,
  created_at timestamptz not null default now(),
  unique (module_id, "order")
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique (student_id, lesson_id)
);

create table if not exists public.module_reports (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  module_id uuid not null references public.modules (id) on delete cascade,
  mastered_phrases text not null,
  learned_vocabulary text not null,
  next_goal text not null,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.students enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.module_reports enable row level security;

create policy "users can read own user profile"
  on public.users
  for select
  using (auth.uid() = id);

create policy "admins can read all users"
  on public.users
  for select
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.role = 'admin'
    )
  );

create policy "parents can manage own students"
  on public.students
  for all
  using (auth.uid() = parent_id)
  with check (auth.uid() = parent_id);

create policy "students can read own profile row"
  on public.students
  for select
  using (
    exists (
      select 1
      from public.users u
      where u.id = auth.uid() and u.role = 'student' and u.id = public.students.id
    )
  );

create policy "authenticated users can read active courses"
  on public.courses
  for select
  using (auth.role() = 'authenticated' and active = true);

create policy "authenticated users can read modules"
  on public.modules
  for select
  using (auth.role() = 'authenticated');

create policy "authenticated users can read lessons"
  on public.lessons
  for select
  using (auth.role() = 'authenticated');

create policy "parents can read children progress"
  on public.lesson_progress
  for select
  using (
    exists (
      select 1 from public.students s
      where s.id = lesson_progress.student_id and s.parent_id = auth.uid()
    )
  );

create policy "parents can insert children progress"
  on public.lesson_progress
  for insert
  with check (
    exists (
      select 1 from public.students s
      where s.id = lesson_progress.student_id and s.parent_id = auth.uid()
    )
  );

create policy "parents can read children module reports"
  on public.module_reports
  for select
  using (
    exists (
      select 1 from public.students s
      where s.id = module_reports.student_id and s.parent_id = auth.uid()
    )
  );

create policy "admins can manage catalog"
  on public.courses
  for all
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.role = 'admin'
    )
  );

create policy "admins can manage modules"
  on public.modules
  for all
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.role = 'admin'
    )
  );

create policy "admins can manage lessons"
  on public.lessons
  for all
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.role = 'admin'
    )
  );
