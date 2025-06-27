-- Drop existing policies for contact_submissions
DROP POLICY IF EXISTS "Anyone can insert contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Super admins can do everything on contact_submissions" ON contact_submissions;

-- Recreate policies with proper permissions
CREATE POLICY "Anyone can insert contact_submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Super admins can read contact_submissions" ON contact_submissions
    FOR SELECT USING (auth.jwt() ->> 'role' = 'super-admin');

CREATE POLICY "Super admins can delete contact_submissions" ON contact_submissions
    FOR DELETE USING (auth.jwt() ->> 'role' = 'super-admin');

-- Also ensure the admin can read all other tables
CREATE POLICY "Super admins can read news_events" ON news_events
    FOR SELECT USING (auth.jwt() ->> 'role' = 'super-admin');

CREATE POLICY "Super admins can read programs" ON programs
    FOR SELECT USING (auth.jwt() ->> 'role' = 'super-admin');

CREATE POLICY "Super admins can read testimonials" ON testimonials
    FOR SELECT USING (auth.jwt() ->> 'role' = 'super-admin');
