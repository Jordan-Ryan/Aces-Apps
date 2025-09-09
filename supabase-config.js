// Supabase Configuration
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js@2';

// Supabase configuration
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

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
