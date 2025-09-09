// Supabase Configuration
// Use global Supabase client loaded via CDN
const supabaseUrl = 'https://umhhhwpoikxthkjhorpd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtaGhod3BvaWt4dGhramhvcnBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzUxNzQsImV4cCI6MjA3MzAxMTE3NH0.xPShBwrZ6RUbKCe-blPnHmqQGW3tzPRjTjJQFOflNH4';

// Validate URL format
if (!supabaseUrl || !supabaseUrl.startsWith('https://')) {
    throw new Error('Invalid Supabase URL. Must be a valid HTTPS URL.');
}

if (!supabaseKey || supabaseKey.length < 20) {
    throw new Error('Invalid Supabase key. Please check your configuration.');
}

// Check if Supabase is available globally
if (typeof window === 'undefined' || !window.supabase) {
    throw new Error('Supabase client not loaded. Please check your internet connection.');
}

// Create Supabase client using global
export const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Database table names
export const TABLES = {
    PROJECTS: 'projects',
    FILES: 'project_files'
};

// Helper function to handle Supabase errors
export function handleSupabaseError(error, operation) {
    console.error(`Supabase ${operation} error:`, error);
    throw new Error(`Failed to ${operation}: ${error.message}`);
}
