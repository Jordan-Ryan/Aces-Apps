# Supabase Setup Guide for Aces Apps

## 🚀 Quick Setup Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `aces-apps`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (2-3 minutes)

### 2. Get Your Credentials
1. Go to **Settings** → **API**
2. Copy your **Project URL** and **anon public** key
3. Update `supabase-config.js`:

```javascript
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-anon-key-here';
```

### 3. Set Up Database Schema
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the entire contents of `supabase-schema.sql`
3. Paste it into the SQL Editor
4. Click **Run** to execute the schema

### 4. Set Up File Storage
1. Go to **Storage** in your Supabase dashboard
2. The `project-files` bucket should be created automatically by the schema
3. If not, create it manually:
   - Click "New bucket"
   - Name: `project-files`
   - Make it **Public**

### 5. Test Your Setup
1. Open your app at [https://aces-apps.vercel.app/](https://aces-apps.vercel.app/)
2. Try creating a new project
3. Check your Supabase dashboard to see the data appear

## 🔧 Environment Variables (for Vercel)

Add these to your Vercel project settings:

1. Go to your Vercel dashboard
2. Select your `aces-apps` project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - `SUPABASE_URL`: Your project URL
   - `SUPABASE_ANON_KEY`: Your anon key

## 📊 Database Tables Created

### `projects` table
- Stores all project data including overview, prompt kit, and sales information
- Uses JSONB for complex nested data
- Includes timestamps and status tracking

### `project_files` table
- Stores file metadata for each project
- Links to Supabase Storage for actual file content
- Includes file type, size, and URL information

## 🔒 Security Notes

- Row Level Security (RLS) is enabled
- Currently allows all operations (you may want to restrict this)
- Files are stored in a public bucket (consider private for sensitive data)
- All API calls use the anon key (consider implementing user authentication)

## 🚨 Troubleshooting

### Common Issues:

1. **"Failed to fetch projects"**
   - Check your Supabase URL and key
   - Ensure the database schema was created successfully
   - Check browser console for specific error messages

2. **"Failed to upload file"**
   - Verify the `project-files` bucket exists
   - Check that the bucket is public
   - Ensure file size is under 5MB

3. **"Failed to create project"**
   - Check that the `projects` table exists
   - Verify RLS policies are set correctly
   - Check browser console for validation errors

### Debug Steps:
1. Open browser Developer Tools (F12)
2. Check the Console tab for error messages
3. Check the Network tab for failed API calls
4. Verify your Supabase credentials are correct

## 📈 Next Steps

1. **Add User Authentication** (optional)
   - Implement Supabase Auth
   - Add user-specific project access
   - Update RLS policies

2. **Add Real-time Updates**
   - Enable real-time subscriptions
   - Update UI when data changes

3. **Add Data Validation**
   - Implement client-side validation
   - Add server-side validation with Supabase functions

4. **Optimize Performance**
   - Add database indexes
   - Implement pagination
   - Add caching

## 🎉 You're Ready!

Your Aces Apps is now connected to Supabase! All project data will be stored in the cloud and persist across sessions.
