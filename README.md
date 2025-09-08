# AcesApps - Project Management Tool

A modern web application for managing app development projects with a Notion-like interface. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### 🎨 Multi-Theme Support
- **Light/Dark/System themes** with instant switching
- **Persistent theme preferences** stored in localStorage
- **Smooth transitions** between theme changes
- **Accessible theme switcher** with ARIA labels

### 📊 Project Dashboard
- **Responsive grid layout** (3-4 cols desktop, 1-2 mobile)
- **Project cards** with status badges, progress bars, and tech stack
- **Advanced search and filtering** by name, status, technology
- **Sorting options** by name, progress, last updated, completion date
- **Hover animations** and smooth transitions

### 📝 Project Detail View
- **Tabbed interface** with Overview, Features, Technical, Timeline, and Resources
- **Edit mode** for project owners with auto-save to localStorage
- **Rich content editing** for all project details
- **MoSCoW prioritized feature lists** with interactive checkboxes
- **Timeline management** with phases and deliverables
- **Team member management** and resource organization

### 🎯 Key Features
- **Read-only mode** for all users, edit mode for owners
- **localStorage persistence** (no backend required)
- **Mobile-first responsive design**
- **Accessibility compliant** with keyboard navigation
- **Framer Motion animations** for smooth interactions
- **TypeScript** for type safety and better development experience

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme tokens
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Storage**: localStorage (client-side only)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aces-apps
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles and theme tokens
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Dashboard homepage
│   └── project/[id]/      # Dynamic project detail pages
├── components/            # Reusable UI components
│   ├── dashboard/         # Dashboard-specific components
│   ├── layout/           # Layout components (Header, etc.)
│   ├── project/          # Project detail components
│   └── themes/           # Theme-related components
├── contexts/             # React Context providers
│   ├── ProjectContext.tsx # Project state management
│   └── ThemeContext.tsx  # Theme state management
├── data/                 # Sample data and constants
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Usage

### Dashboard
- **View all projects** in a responsive grid layout
- **Search projects** by name or description
- **Filter by status** (Planning, In Progress, Review, etc.)
- **Filter by technology** (React, Flutter, etc.)
- **Sort projects** by various criteria
- **Click any project card** to view details

### Project Details
- **Navigate through tabs** to see different aspects of the project
- **Edit mode** (owner only) allows real-time editing of all content
- **Auto-save** to localStorage preserves changes
- **MoSCoW feature prioritization** with interactive lists
- **Timeline management** with phases and deliverables
- **Team member management** and resource organization

### Theme Switching
- **Click the theme switcher** in the header
- **Choose between Light, Dark, or System** themes
- **System theme** automatically follows your OS preference
- **Theme preference** is saved and restored on reload

## Sample Data

The application comes with sample projects including:
- **FamilySync Calendar** - Cross-platform family organization app
- **TaskFlow Mobile** - AI-powered task management
- **HealthTrack Pro** - Health monitoring platform

## Customization

### Adding New Themes
1. Update `tailwind.config.js` with new color schemes
2. Add theme options to `ThemeContext.tsx`
3. Update CSS variables in `globals.css`

### Extending Project Data
1. Update the `Project` interface in `types/Project.ts`
2. Modify the context providers as needed
3. Update the UI components to display new fields

### Adding New Features
1. Create new components in the appropriate directories
2. Update the context providers for state management
3. Add new routes in the `app/` directory

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
- **Netlify**: Static site deployment
- **AWS S3 + CloudFront**: Static hosting
- **GitHub Pages**: Free static hosting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**Ready to manage your projects like a pro?** 🚀

Start by exploring the dashboard and creating your first project!