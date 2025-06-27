-- Test inserting a contact submission as an anonymous user
-- This should work after running the policy fixes

INSERT INTO contact_submissions (name, email, phone, message) 
VALUES ('Test User', 'test@example.com', '123-456-7890', 'This is a test message to verify RLS policies are working correctly.');

-- Check if the insert worked
SELECT COUNT(*) as total_contacts FROM contact_submissions;

-- Show the latest contact
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 1;
