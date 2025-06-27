-- Drop all existing policies for contact_submissions
DROP POLICY IF EXISTS "Anyone can insert contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Super admins can read contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Super admins can delete contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Super admins can do everything on contact_submissions" ON contact_submissions;

-- Create a policy that allows anyone (including anonymous users) to insert
CREATE POLICY "Allow anonymous insert on contact_submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

-- Create a policy that allows super-admins to read
CREATE POLICY "Super admins can read contact_submissions" ON contact_submissions
    FOR SELECT USING (
        auth.jwt() ->> 'role' = 'super-admin' OR 
        auth.jwt() -> 'app_metadata' ->> 'role' = 'super-admin' OR
        auth.jwt() -> 'raw_app_meta_data' ->> 'role' = 'super-admin'
    );

-- Create a policy that allows super-admins to delete
CREATE POLICY "Super admins can delete contact_submissions" ON contact_submissions
    FOR DELETE USING (
        auth.jwt() ->> 'role' = 'super-admin' OR 
        auth.jwt() -> 'app_metadata' ->> 'role' = 'super-admin' OR
        auth.jwt() -> 'raw_app_meta_data' ->> 'role' = 'super-admin'
    );

-- Let's also check and fix other table policies to be more robust
DROP POLICY IF EXISTS "Super admins can do everything on news_events" ON news_events;
DROP POLICY IF EXISTS "Super admins can do everything on programs" ON programs;
DROP POLICY IF EXISTS "Super admins can do everything on testimonials" ON testimonials;
DROP POLICY IF EXISTS "Super admins can do everything on admin_logs" ON admin_logs;

-- News Events policies
CREATE POLICY "Super admins can manage news_events" ON news_events
    FOR ALL USING (
        auth.jwt() ->> 'role' = 'super-admin' OR 
        auth.jwt() -> 'app_metadata' ->> 'role' = 'super-admin' OR
        auth.jwt() -> 'raw_app_meta_data' ->> 'role' = 'super-admin'
    );

-- Programs policies  
CREATE POLICY "Super admins can manage programs" ON programs
    FOR ALL USING (
        auth.jwt() ->> 'role' = 'super-admin' OR 
        auth.jwt() -> 'app_metadata' ->> 'role' = 'super-admin' OR
        auth.jwt() -> 'raw_app_meta_data' ->> 'role' = 'super-admin'
    );

-- Testimonials policies
CREATE POLICY "Super admins can manage testimonials" ON testimonials
    FOR ALL USING (
        auth.jwt() ->> 'role' = 'super-admin' OR 
        auth.jwt() -> 'app_metadata' ->> 'role' = 'super-admin' OR
        auth.jwt() -> 'raw_app_meta_data' ->> 'role' = 'super-admin'
    );

-- Admin logs policies
CREATE POLICY "Super admins can manage admin_logs" ON admin_logs
    FOR ALL USING (
        auth.jwt() ->> 'role' = 'super-admin' OR 
        auth.jwt() -> 'app_metadata' ->> 'role' = 'super-admin' OR
        auth.jwt() -> 'raw_app_meta_data' ->> 'role' = 'super-admin'
    );
