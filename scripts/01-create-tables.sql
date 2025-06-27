-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create news_events table
CREATE TABLE news_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    excerpt TEXT NOT NULL,
    image_url TEXT,
    category TEXT NOT NULL CHECK (category IN ('News', 'Events', 'Student Life')),
    content TEXT NOT NULL,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create programs table
CREATE TABLE programs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    degree_type TEXT NOT NULL CHECK (degree_type IN ('Bachelor''s', 'Master''s', 'PhD')),
    department TEXT NOT NULL CHECK (department IN ('Engineering', 'Arts', 'Business')),
    description TEXT NOT NULL
);

-- Create testimonials table
CREATE TABLE testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    quote TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_photo_url TEXT,
    is_visible BOOLEAN DEFAULT true
);

-- Create contact_submissions table
CREATE TABLE contact_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_logs table
CREATE TABLE admin_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE news_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for super-admin access
CREATE POLICY "Super admins can do everything on news_events" ON news_events
    FOR ALL USING (auth.jwt() ->> 'role' = 'super-admin');

CREATE POLICY "Super admins can do everything on programs" ON programs
    FOR ALL USING (auth.jwt() ->> 'role' = 'super-admin');

CREATE POLICY "Super admins can do everything on testimonials" ON testimonials
    FOR ALL USING (auth.jwt() ->> 'role' = 'super-admin');

CREATE POLICY "Super admins can do everything on contact_submissions" ON contact_submissions
    FOR ALL USING (auth.jwt() ->> 'role' = 'super-admin');

CREATE POLICY "Super admins can do everything on admin_logs" ON admin_logs
    FOR ALL USING (auth.jwt() ->> 'role' = 'super-admin');

-- Public read policies for published content
CREATE POLICY "Anyone can read published news_events" ON news_events
    FOR SELECT USING (is_published = true);

CREATE POLICY "Anyone can read programs" ON programs
    FOR SELECT USING (true);

CREATE POLICY "Anyone can read visible testimonials" ON testimonials
    FOR SELECT USING (is_visible = true);

-- Allow anyone to insert contact submissions
CREATE POLICY "Anyone can insert contact_submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);
