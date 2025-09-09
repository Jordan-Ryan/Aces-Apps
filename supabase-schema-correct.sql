-- Correct Supabase Database Schema for Aces Apps
-- Based on the actual CSV structure provided
-- Run this in your Supabase SQL Editor

-- Drop existing tables if they exist (be careful!)
DROP TABLE IF EXISTS project_files CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- Create projects table with all the correct columns
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'idea' CHECK (status IN ('current', 'completed', 'idea')),
    description TEXT,
    tech_stack TEXT[],
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    
    -- Overview fields (from CSV)
    vision TEXT,
    problem_statement TEXT,
    target_audience TEXT,
    success_metrics TEXT[],
    requirements TEXT[],
    architecture TEXT,
    timeline_phases JSONB,
    resources TEXT,
    
    -- Prompt Kit fields (from CSV)
    specifications TEXT,
    acceptance_criteria TEXT[],
    sample_data TEXT,
    coding_standards TEXT[],
    api_specs TEXT[],
    testing_strategy TEXT,
    security_requirements TEXT,
    
    -- Sales Pre-Launch fields (from CSV)
    executive_summary TEXT,
    market_analysis TEXT,
    value_proposition TEXT,
    features_list TEXT[],
    pricing_model JSONB,
    development_timeline TEXT,
    risk_assessment TEXT,
    
    -- Sales Post-Launch fields (from CSV)
    demo_links TEXT[],
    case_studies JSONB,
    success_metrics_achieved JSONB,
    customer_testimonials JSONB,
    roi_calculator TEXT,
    competitive_differentiation TEXT[],
    next_steps TEXT,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_files table
CREATE TABLE project_files (
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
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_updated_at ON projects(updated_at);
CREATE INDEX idx_projects_name ON projects(name);
CREATE INDEX idx_project_files_project_id ON project_files(project_id);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;

-- Create policies (allowing all operations for now)
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
