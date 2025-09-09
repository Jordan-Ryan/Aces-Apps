# PromptFlow - Prompt Engineering Portfolio Platform

A modern SaaS-style Single Page Application for managing prompt engineering projects, inspired by Jira, Atlassian, and Slack design principles.

## Features

### 🎯 Core Functionality
- **Three-Pane Layout**: Collapsible sidebar, header bar, and main content area
- **Project Management**: Create, view, edit, clone, and delete projects
- **CSV Import**: Import projects from pipe-delimited CSV files
- **Rich Project Details**: Comprehensive project information across multiple tabs
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 📊 Dashboard Features
- **Projects Table**: Sortable, filterable table with project overview
- **Statistics Bar**: Real-time project counts by status
- **Search & Filter**: Find projects by name, description, or status
- **Bulk Actions**: Select multiple projects for batch operations

### 📋 Project Detail Tabs
- **Overview**: Vision, problem statement, target audience, success metrics, requirements, architecture, timeline, resources
- **Prompt Kit**: Specifications, acceptance criteria, sample data, examples, coding standards, API specs, testing strategy, security
- **Sales Pre-Launch**: Executive summary, market analysis, value proposition, features, pricing, timeline, risk assessment
- **Sales Post-Launch**: Demo links, case studies, metrics, testimonials, ROI calculator, differentiation, next steps
- **Files**: File management with drag-and-drop upload

### 📁 CSV Import
Supports pipe-delimited CSV files with the following columns:
- Project_Name, Status, Description, Tech_Stack, Completion_Percentage, Priority
- Vision, Problem_Statement, Target_Audience, Success_Metrics, Requirements, Architecture
- Timeline_Phases, Resources, Specifications, Acceptance_Criteria, Sample_Data, Examples
- Coding_Standards, API_Specs, Testing_Strategy, Security_Requirements
- Executive_Summary, Market_Analysis, Value_Proposition, Features_List, Pricing_Model
- Development_Timeline, Risk_Assessment, Demo_Links, Case_Studies, Success_Metrics_Achieved
- Customer_Testimonials, ROI_Calculator, Competitive_Differentiation, Next_Steps
- File_Names, File_Types, File_URLs

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation
1. Clone or download the repository
2. Open `index.html` in your web browser
3. Start managing your prompt engineering projects!

### Usage

#### Creating a New Project
1. Click the "New Project" button in the sidebar
2. Enter a project name
3. The project will be created with default "Idea" status
4. Click on the project to view and edit details

#### Importing Projects from CSV
1. Click the "Import CSV" button in the sidebar
2. Select a pipe-delimited CSV file
3. Preview the data in the modal
4. Click "Import Projects" to add them to your portfolio

#### Managing Projects
- **View**: Click on any project in the sidebar or table to view details
- **Edit**: Use the edit button in project actions
- **Clone**: Duplicate an existing project
- **Delete**: Remove a project (with confirmation)

#### Project Status
- **Current**: Active projects in development
- **Completed**: Finished projects
- **Ideas**: Project concepts and planning

## File Structure

```
PromptFlow/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and theming
├── script.js           # JavaScript application logic
├── sample-projects.csv # Example CSV file for testing
└── README.md          # This file
```

## Technical Details

### Built With
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: No frameworks, pure ES6+ JavaScript
- **Font Awesome**: Icons and visual elements

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Data Storage
- Projects are stored in browser's local storage
- Data persists between sessions
- No external dependencies or server required

## Sample Data

The application includes 3 sample projects:
1. **AI Fitness Tracker** (Current, 65% complete)
2. **E-commerce Dashboard** (Completed, 100%)
3. **Smart Home Hub** (Idea, 5% complete)

## Customization

### Styling
The application uses CSS custom properties for easy theming. Modify the `:root` variables in `styles.css`:

```css
:root {
    --primary: #0052cc;
    --primary-hover: #0065ff;
    --success: #00875a;
    --warning: #ff8b00;
    --danger: #de350b;
    /* ... more variables */
}
```

### Adding Features
The application is built with a modular class-based architecture. Key methods:
- `renderDashboard()`: Updates the main dashboard view
- `viewProject(id)`: Switches to project detail view
- `importCsvProjects()`: Handles CSV import functionality
- `mapCsvToProject(row)`: Maps CSV data to project structure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions, issues, or feature requests, please open an issue in the repository.

---

Built with ❤️ for the prompt engineering community.
