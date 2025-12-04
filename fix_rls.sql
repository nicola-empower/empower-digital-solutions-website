-- Fix RLS Policies for Admin Access
-- We use lower() to ensure case-insensitive matching and explicitly define WITH CHECK for inserts.

-- 1. Projects
drop policy if exists "Admin manage all projects" on public.projects;
create policy "Admin manage all projects" on public.projects 
for all 
using (lower(auth.email()) = 'nicola@empowerdigitalsolutions.co.uk') 
with check (lower(auth.email()) = 'nicola@empowerdigitalsolutions.co.uk');

-- 2. Tasks
drop policy if exists "Admin manage tasks" on public.tasks;
create policy "Admin manage tasks" on public.tasks 
for all 
using (lower(auth.email()) = 'nicola@empowerdigitalsolutions.co.uk')
with check (lower(auth.email()) = 'nicola@empowerdigitalsolutions.co.uk');

-- 3. Documents
drop policy if exists "Admin manage docs" on public.documents;
create policy "Admin manage docs" on public.documents 
for all 
using (lower(auth.email()) = 'nicola@empowerdigitalsolutions.co.uk')
with check (lower(auth.email()) = 'nicola@empowerdigitalsolutions.co.uk');

-- 4. Activity Logs
drop policy if exists "Admin manage logs" on public.activity_logs;
create policy "Admin manage logs" on public.activity_logs 
for all 
using (lower(auth.email()) = 'nicola@empowerdigitalsolutions.co.uk')
with check (lower(auth.email()) = 'nicola@empowerdigitalsolutions.co.uk');

-- 5. Profiles
drop policy if exists "Admin view all profiles" on public.profiles;
create policy "Admin view all profiles" on public.profiles 
for select 
using (lower(auth.email()) = 'nicola@empowerdigitalsolutions.co.uk');

-- 6. Generated Documents
drop policy if exists "Admin manage generated docs" on public.generated_documents;
create policy "Admin manage generated docs" on public.generated_documents 
for all 
using (lower(auth.email()) = 'nicola@empowerdigitalsolutions.co.uk')
with check (lower(auth.email()) = 'nicola@empowerdigitalsolutions.co.uk');
