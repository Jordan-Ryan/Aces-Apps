# Aces Apps - Prompt Engineering Portfolio Platform

A modern SaaS-style Single Page Application for managing prompt engineering projects with Supabase integration.

## Features

- **Dashboard View**: Sortable, filterable project table with status indicators
- **Project Detail View**: Comprehensive project management with tabbed interface
- **Inline Editing**: Edit all project content directly in the interface
- **Dynamic Content**: Add/remove pricing tiers, case studies, metrics, and testimonials
- **File Management**: Drag & drop file upload with Supabase Storage
- **CSV Import/Export**: Import projects from pipe-delimited CSV files
- **Dark Mode**: Black, grey, and white theme with smooth transitions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (ES6 modules)
- **Backend**: Supabase (PostgreSQL + Storage)
- **Styling**: Modern CSS with custom properties and responsive design
- **Deployment**: Vercel

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Run the SQL schema in your Supabase SQL Editor:

```sql
-- Copy and paste the contents of supabase-schema.sql
```

4. Update `supabase-config.js` with your credentials:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
```

### 2. Local Development

1. Clone the repository
2. Install dependencies (optional for local development):
   ```bash
   npm install
   ```
3. Start a local server:
   ```bash
   python -m http.server 8000
   # or
   npm run dev
   ```
4. Open [http://localhost:8000](http://localhost:8000)

### 3. Environment Variables

For production deployment on Vercel, add these environment variables:

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anon key

## Database Schema

The application uses two main tables:

### Projects Table
- `id`: UUID primary key
- `name`: Project name
- `status`: current/completed/idea
- `description`: Project description
- `tech_stack`: Array of technologies
- `completion_percentage`: 0-100
- `overview`: JSONB with project overview data
- `prompt_kit`: JSONB with prompt kit data
- `sales_pre_launch`: JSONB with pre-launch sales data
- `sales_post_launch`: JSONB with post-launch sales data
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Project Files Table
- `id`: UUID primary key
- `project_id`: Foreign key to projects
- `name`: File name
- `type`: MIME type
- `size`: File size in bytes
- `url`: Public URL
- `storage_path`: Storage path in Supabase Storage
- `created_at`: Timestamp

## File Structure

```
aces-apps/
├── index.html              # Main HTML file
├── styles.css              # All CSS styles
├── script.js               # Main application logic
├── database-api.js         # Supabase API functions
├── supabase-config.js      # Supabase configuration
├── supabase-schema.sql     # Database schema
├── package.json            # Node.js dependencies
└── README.md              # This file
```

## Usage

1. **Create Projects**: Click "New Project" to create a new project
2. **Import CSV**: Use "Import CSV" to bulk import projects
3. **Edit Projects**: Click on a project to view details, then click "Edit"
4. **Manage Files**: Upload files using drag & drop in the Files tab
5. **Filter Projects**: Use the status filter buttons to filter by status
6. **Search**: Use the search bar to find projects by name or description

## Deployment

The app is deployed on Vercel and automatically updates when you push to the main branch.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details