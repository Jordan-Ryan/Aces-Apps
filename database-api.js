// Database API Functions
import { supabase, TABLES, handleSupabaseError } from './supabase-config.js';

export class DatabaseAPI {
    // Projects CRUD operations
    async getProjects() {
        try {
            const { data, error } = await supabase
                .from(TABLES.PROJECTS)
                .select('*')
                .order('updated_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            handleSupabaseError(error, 'fetch projects');
        }
    }

    async getProject(id) {
        try {
            const { data, error } = await supabase
                .from(TABLES.PROJECTS)
                .select('*')
                .eq('id', id)
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            handleSupabaseError(error, 'fetch project');
        }
    }

    async createProject(projectData) {
        try {
            const { data, error } = await supabase
                .from(TABLES.PROJECTS)
                .insert([projectData])
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            handleSupabaseError(error, 'create project');
        }
    }

    async updateProject(id, projectData) {
        try {
            const { data, error } = await supabase
                .from(TABLES.PROJECTS)
                .update(projectData)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            handleSupabaseError(error, 'update project');
        }
    }

    async deleteProject(id) {
        try {
            // First delete associated files
            await this.deleteProjectFiles(id);
            
            // Then delete the project
            const { error } = await supabase
                .from(TABLES.PROJECTS)
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return true;
        } catch (error) {
            handleSupabaseError(error, 'delete project');
        }
    }

    // File operations
    async getProjectFiles(projectId) {
        try {
            const { data, error } = await supabase
                .from(TABLES.FILES)
                .select('*')
                .eq('project_id', projectId)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            handleSupabaseError(error, 'fetch project files');
        }
    }

    async uploadFile(projectId, file, fileData) {
        try {
            // Upload file to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${projectId}/${Date.now()}.${fileExt}`;
            
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('project-files')
                .upload(fileName, file);
            
            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('project-files')
                .getPublicUrl(fileName);

            // Save file metadata to database
            const { data, error } = await supabase
                .from(TABLES.FILES)
                .insert([{
                    project_id: projectId,
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    url: publicUrl,
                    storage_path: fileName,
                    ...fileData
                }])
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            handleSupabaseError(error, 'upload file');
        }
    }

    async deleteFile(fileId) {
        try {
            // Get file info first
            const { data: fileData, error: fetchError } = await supabase
                .from(TABLES.FILES)
                .select('storage_path')
                .eq('id', fileId)
                .single();
            
            if (fetchError) throw fetchError;

            // Delete from storage
            if (fileData.storage_path) {
                const { error: storageError } = await supabase.storage
                    .from('project-files')
                    .remove([fileData.storage_path]);
                
                if (storageError) console.warn('Storage delete error:', storageError);
            }

            // Delete from database
            const { error } = await supabase
                .from(TABLES.FILES)
                .delete()
                .eq('id', fileId);
            
            if (error) throw error;
            return true;
        } catch (error) {
            handleSupabaseError(error, 'delete file');
        }
    }

    async deleteProjectFiles(projectId) {
        try {
            const { error } = await supabase
                .from(TABLES.FILES)
                .delete()
                .eq('project_id', projectId);
            
            if (error) throw error;
            return true;
        } catch (error) {
            handleSupabaseError(error, 'delete project files');
        }
    }

    // Search projects
    async searchProjects(query) {
        try {
            const { data, error } = await supabase
                .from(TABLES.PROJECTS)
                .select('*')
                .or(`name.ilike.%${query}%,description.ilike.%${query}%,tech_stack.ilike.%${query}%`)
                .order('updated_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            handleSupabaseError(error, 'search projects');
        }
    }

    // Filter projects by status
    async filterProjectsByStatus(status) {
        try {
            if (!status) {
                return await this.getProjects();
            }
            
            const { data, error } = await supabase
                .from(TABLES.PROJECTS)
                .select('*')
                .eq('status', status)
                .order('updated_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            handleSupabaseError(error, 'filter projects by status');
        }
    }
}
