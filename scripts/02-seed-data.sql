-- Insert sample programs
INSERT INTO programs (name, degree_type, department, description) VALUES
('Computer Science', 'Bachelor''s', 'Engineering', 'Comprehensive program covering software development, algorithms, and system design.'),
('Mechanical Engineering', 'Bachelor''s', 'Engineering', 'Focus on design, manufacturing, and maintenance of mechanical systems.'),
('Business Administration', 'Master''s', 'Business', 'Advanced business management and leadership skills for modern organizations.'),
('Fine Arts', 'Bachelor''s', 'Arts', 'Creative program exploring various artistic mediums and techniques.'),
('Data Science', 'Master''s', 'Engineering', 'Advanced analytics, machine learning, and big data processing.'),
('Marketing', 'Bachelor''s', 'Business', 'Strategic marketing, digital advertising, and consumer behavior analysis.');

-- Insert sample testimonials
INSERT INTO testimonials (quote, author_name, author_photo_url, is_visible) VALUES
('GATE College transformed my career. The professors are world-class and the opportunities are endless.', 'Sarah Johnson', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', true),
('The hands-on learning approach at GATE prepared me perfectly for the industry.', 'Michael Chen', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', true),
('I found my passion and my career path at GATE College. Couldn''t be more grateful.', 'Emily Rodriguez', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', true);

-- Insert sample news and events
INSERT INTO news_events (title, date, excerpt, image_url, category, content, is_published) VALUES
('GATE College Wins National Innovation Award', '2024-01-15', 'Our engineering department has been recognized for groundbreaking research in sustainable technology.', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop', 'News', 'GATE College''s Engineering Department has been awarded the prestigious National Innovation Award for their groundbreaking research in sustainable technology solutions. The award recognizes the department''s commitment to developing environmentally friendly technologies that address real-world challenges.', true),
('Spring Career Fair 2024', '2024-03-20', 'Join us for our annual career fair featuring over 100 top employers from various industries.', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop', 'Events', 'The Spring Career Fair 2024 will be held on March 20th in the main campus auditorium. Over 100 leading companies from technology, healthcare, finance, and other industries will be present to meet with our talented students and recent graduates.', true),
('New Student Orientation Week', '2024-08-25', 'Welcome new students with a week of activities, workshops, and campus tours.', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop', 'Student Life', 'New Student Orientation Week is designed to help incoming students transition smoothly into college life. The week includes campus tours, academic workshops, social activities, and opportunities to meet fellow students and faculty members.', true);
