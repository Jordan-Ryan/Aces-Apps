-- Supabase Database Schema for Aces Apps
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'idea' CHECK (status IN ('current', 'completed', 'idea')),
    tech_stack TEXT[],
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    
    -- Overview fields
    vision TEXT,
    problem_statement TEXT,
    target_audience TEXT,
    success_metrics JSONB,
    requirements TEXT,
    architecture TEXT,
    timeline JSONB,
    resources TEXT,
    specifications TEXT,
    acceptance_criteria TEXT,
    
    -- Prompt Kit fields
    sample_data JSONB,
    coding_standards TEXT,
    api_specs TEXT,
    testing_strategy TEXT,
    security_requirements TEXT,
    
    -- Sales Pre-Launch fields
    executive_summary TEXT,
    market_analysis TEXT,
    value_proposition TEXT,
    features_list TEXT[],
    pricing_model JSONB,
    development_timeline TEXT,
    risk_assessment TEXT,
    demo_links TEXT[],
    
    -- Sales Post-Launch fields
    case_studies JSONB,
    success_metrics_achieved JSONB,
    customer_testimonials JSONB,
    roi_calculator JSONB,
    competitive_differentiation TEXT,
    next_steps TEXT,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_files table
CREATE TABLE IF NOT EXISTS project_files (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    size BIGINT,
    url TEXT,
    storage_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_updated_at ON projects(updated_at);
CREATE INDEX IF NOT EXISTS idx_projects_name ON projects(name);
CREATE INDEX IF NOT EXISTS idx_project_files_project_id ON project_files(project_id);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your authentication needs)
-- For now, allowing all operations - you may want to restrict this based on user authentication
CREATE POLICY "Allow all operations on projects" ON projects FOR ALL USING (true);
CREATE POLICY "Allow all operations on project_files" ON project_files FOR ALL USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for project files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-files', 'project-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy
CREATE POLICY "Allow all operations on project-files bucket" ON storage.objects 
FOR ALL USING (bucket_id = 'project-files');
