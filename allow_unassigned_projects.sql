-- Allow projects to be created without a client (Draft Mode)
-- 1. Make client_id nullable
alter table public.projects alter column client_id drop not null;

-- 2. Make client_email nullable (if it exists, based on initial schema)
do $$
begin
  if exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'client_email') then
    alter table public.projects alter column client_email drop not null;
  end if;
end $$;

-- 3. Update RLS to ensure Admins can still view unassigned projects
-- (Assuming existing policy might rely on client_id, but usually admins have full access)
-- Check if we need to add a policy for unassigned projects if not covered.
-- Usually admins have a role-based policy. If not, we might need:
-- create policy "Admins view all projects" on public.projects for select using (auth.role() = 'service_role' or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
