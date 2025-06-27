-- Test that we can insert a contact submission
INSERT INTO contact_submissions (name, email, phone, message) 
VALUES ('Test Contact', 'test@example.com', '555-0123', 'This is a test message from SQL.');

-- Check the total count
SELECT COUNT(*) as total_contacts FROM contact_submissions;

-- Show the most recent submissions
SELECT id, name, email, created_at 
FROM contact_submissions 
ORDER BY created_at DESC 
LIMIT 5;
