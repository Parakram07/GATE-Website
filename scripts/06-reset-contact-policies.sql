-- Completely reset contact_submissions policies
DROP POLICY IF EXISTS "Allow anonymous insert on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Anyone can insert contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Super admins can read contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Super admins can delete contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Super admins can do everything on contact_submissions" ON contact_submissions;

-- Disable RLS temporarily to test
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create the simplest possible policies
CREATE POLICY "allow_insert_contact_submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "allow_admin_select_contact_submissions" ON contact_submissions
    FOR SELECT USING (
        auth.jwt() ->> 'role' = 'super-admin' OR 
        auth.jwt() -> 'app_metadata' ->> 'role' = 'super-admin'
    );

CREATE POLICY "allow_admin_delete_contact_submissions" ON contact_submissions
    FOR DELETE USING (
        auth.jwt() ->> 'role' = 'super-admin' OR 
        auth.jwt() -> 'app_metadata' ->> 'role' = 'super-admin'
    );
