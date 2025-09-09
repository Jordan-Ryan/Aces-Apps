// PromptFlow - Prompt Engineering Portfolio Platform
// Main application logic

class PromptFlowApp {
    constructor() {
        this.projects = [];
        this.currentProject = null;
        this.currentView = 'dashboard';
        this.editingMode = false;
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.initTheme();
        this.renderDashboard();
        this.preventScrollbarShift();
    }

    preventScrollbarShift() {
        // Force scrollbar to always be visible to prevent layout shift
        document.documentElement.style.overflowY = 'scroll';
        
        // Alternative method for browsers that don't support scrollbar-gutter
        if (!CSS.supports('scrollbar-gutter', 'stable')) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
        }
    }

    // Sample data
    loadSampleData() {
        this.projects = [
            {
                id: '1',
                name: 'AI Fitness Tracker',
                status: 'current',
                description: 'AI-powered fitness tracking with personalized recommendations',
                techStack: ['React', 'Python', 'TensorFlow', 'AWS'],
                completionPercentage: 65,
                createdDate: '2025-08-15',
                lastModified: '2025-09-08',
                priority: 'high',
                overview: {
                    vision: 'Create an AI-powered fitness tracking application that provides personalized workout recommendations and nutrition guidance based on user goals and preferences.',
                    problemStatement: 'Current fitness apps lack personalization and don\'t adapt to individual user needs, leading to low engagement and poor results.',
                    targetAudience: 'Fitness enthusiasts aged 25-45 who want personalized guidance and tracking.',
                    successMetrics: ['User retention > 80%', 'Average session time > 15 minutes', 'User satisfaction score > 4.5/5'],
                    requirements: ['Real-time workout tracking', 'AI recommendation engine', 'Nutrition database integration', 'Social features'],
                    architecture: 'Microservices architecture with React frontend, Python backend, TensorFlow ML models, and AWS infrastructure.',
                    timeline: [
                        { phase: 'Phase 1: MVP', duration: '3 months', status: 'in-progress' },
                        { phase: 'Phase 2: AI Features', duration: '2 months', status: 'pending' },
                        { phase: 'Phase 3: Launch', duration: '1 month', status: 'pending' }
                    ],
                    resources: 'Team of 5 developers, 1 ML engineer, 1 designer, and $50k budget.'
                },
                promptKit: {
                    specifications: 'Build a React-based fitness tracking app with AI recommendations using Python backend and TensorFlow.',
                    acceptanceCriteria: ['App loads in < 3 seconds', 'AI recommendations are 90% accurate', 'Works on mobile and desktop'],
                    sampleData: '{"user": {"id": 1, "goals": ["weight_loss"], "fitness_level": "intermediate"}, "workout": {"type": "cardio", "duration": 30, "calories": 300}}',
                    codingStandards: ['Use TypeScript for frontend', 'Follow PEP 8 for Python', 'Write unit tests for all functions'],
                    apiSpecs: ['POST /api/workouts', 'GET /api/recommendations', 'PUT /api/user/profile'],
                    testingStrategy: 'Unit tests for all components, integration tests for API endpoints, E2E tests for user flows.',
                    security: 'JWT authentication, HTTPS only, input validation, rate limiting.'
                },
                salesPackPre: {
                    executiveSummary: 'AI Fitness Tracker is a revolutionary fitness app that uses machine learning to provide personalized workout and nutrition recommendations.',
                    marketAnalysis: 'Fitness app market is $4.4B and growing 13.7% annually. Opportunity in personalized AI recommendations.',
                    valueProposition: 'Increase workout effectiveness by 40% through AI-powered personalization.',
                    features: ['AI workout recommendations', 'Nutrition tracking', 'Progress analytics', 'Social challenges'],
                    pricing: { freemium: 'Free', premium: '$9.99/month' },
                    timeline: '6 months to market launch',
                    riskAssessment: 'Competition from established players, user adoption challenges, AI accuracy concerns.'
                },
                salesPackPost: {
                    demos: 'Live demo available at demo.aifitnesstracker.com',
                    caseStudies: [
                        { client: 'Fitness First Gym', result: '40% increase in member engagement' },
                        { client: 'Personal Trainer Pro', result: '60% more client retention' }
                    ],
                    metrics: [
                        { label: 'User Retention', value: '85%', benchmark: '23% industry' },
                        { label: 'App Store Rating', value: '4.7/5', benchmark: '3.8/5 average' }
                    ],
                    testimonials: [
                        { quote: 'This app changed my fitness journey completely!', author: 'Sarah Johnson' },
                        { quote: 'The AI recommendations are spot on.', author: 'Mike Chen' }
                    ],
                    roiCalculator: 'ROI of 300% within 12 months for gym partners.',
                    differentiation: ['Advanced AI algorithms', 'Real-time adaptation', 'Comprehensive nutrition tracking'],
                    nextSteps: 'Expand to corporate wellness programs and healthcare partnerships.'
                },
                files: [
                    { name: 'Technical Specs.pdf', type: 'pdf', size: '2.1 MB', date: '2025-09-01', url: '/files/tech-specs.pdf' },
                    { name: 'UI Mockups.fig', type: 'figma', size: '5.3 MB', date: '2025-08-28', url: '/files/mockups.fig' }
                ]
            },
            {
                id: '2',
                name: 'E-commerce Dashboard',
                status: 'completed',
                description: 'Analytics dashboard for e-commerce businesses',
                techStack: ['Vue.js', 'Node.js', 'MongoDB', 'Chart.js'],
                completionPercentage: 100,
                createdDate: '2025-06-01',
                lastModified: '2025-08-30',
                priority: 'medium',
                overview: {
                    vision: 'Comprehensive analytics dashboard for e-commerce businesses to track sales, inventory, and customer behavior.',
                    problemStatement: 'E-commerce businesses lack integrated analytics tools to make data-driven decisions.',
                    targetAudience: 'E-commerce business owners and managers who need actionable insights.',
                    successMetrics: ['Dashboard load time < 2 seconds', 'User adoption > 70%', 'Customer satisfaction > 4.0/5'],
                    requirements: ['Real-time sales tracking', 'Inventory management', 'Customer analytics', 'Custom reports'],
                    architecture: 'Vue.js SPA with Node.js API, MongoDB database, and Chart.js for visualizations.',
                    timeline: [
                        { phase: 'Phase 1: Core Features', duration: '2 months', status: 'completed' },
                        { phase: 'Phase 2: Advanced Analytics', duration: '1 month', status: 'completed' },
                        { phase: 'Phase 3: Launch', duration: '2 weeks', status: 'completed' }
                    ],
                    resources: 'Team of 3 developers and $25k budget.'
                },
                promptKit: {
                    specifications: 'Build a Vue.js dashboard with Node.js backend for e-commerce analytics.',
                    acceptanceCriteria: ['Dashboard loads in < 2 seconds', 'Real-time data updates', 'Mobile responsive'],
                    sampleData: '{"sales": {"today": 1250, "yesterday": 1100}, "inventory": {"low_stock": 5, "out_of_stock": 2}}',
                    codingStandards: ['Use Vue 3 Composition API', 'Follow REST API conventions', 'Write comprehensive tests'],
                    apiSpecs: ['GET /api/sales', 'GET /api/inventory', 'POST /api/reports'],
                    testingStrategy: 'Unit tests for components, integration tests for API, visual regression tests.',
                    security: 'OAuth 2.0 authentication, data encryption, audit logging.'
                },
                salesPackPre: {
                    executiveSummary: 'E-commerce Dashboard provides comprehensive analytics for online businesses to optimize sales and operations.',
                    marketAnalysis: 'E-commerce analytics market is $2.1B and growing 15% annually.',
                    valueProposition: 'Increase sales by 25% through data-driven insights and optimization.',
                    features: ['Real-time sales tracking', 'Inventory management', 'Customer analytics', 'Custom reports'],
                    pricing: { freemium: 'Free for < 1000 orders/month', premium: '$29.99/month' },
                    timeline: '3.5 months to market launch',
                    riskAssessment: 'Competition from established analytics platforms, integration complexity.'
                },
                salesPackPost: {
                    demos: 'Live demo at demo.ecommercedashboard.com',
                    caseStudies: [
                        { client: 'Fashion Store Inc', result: '30% increase in sales' },
                        { client: 'Electronics Hub', result: '50% reduction in stockouts' }
                    ],
                    metrics: [
                        { label: 'Customer Satisfaction', value: '4.2/5', benchmark: '3.5/5 average' },
                        { label: 'Uptime', value: '99.9%', benchmark: '99.5% industry' }
                    ],
                    testimonials: [
                        { quote: 'Game changer for our business!', author: 'Lisa Wang' },
                        { quote: 'Finally, analytics that make sense.', author: 'David Rodriguez' }
                    ],
                    roiCalculator: 'Average ROI of 250% within 6 months.',
                    differentiation: ['Real-time updates', 'Custom report builder', 'Mobile-first design'],
                    nextSteps: 'Add AI-powered insights and predictive analytics.'
                },
                files: [
                    { name: 'User Manual.pdf', type: 'pdf', size: '1.8 MB', date: '2025-08-15', url: '/files/user-manual.pdf' },
                    { name: 'API Documentation.pdf', type: 'pdf', size: '3.2 MB', date: '2025-08-10', url: '/files/api-docs.pdf' }
                ]
            },
            {
                id: '3',
                name: 'Smart Home Hub',
                status: 'idea',
                description: 'Centralized control system for smart home devices',
                techStack: ['React Native', 'Python', 'MQTT', 'Raspberry Pi'],
                completionPercentage: 5,
                createdDate: '2025-09-01',
                lastModified: '2025-09-01',
                priority: 'low',
                overview: {
                    vision: 'Create a unified smart home control system that integrates all IoT devices through a single interface.',
                    problemStatement: 'Smart home devices are fragmented across different platforms and apps, making management difficult.',
                    targetAudience: 'Tech-savvy homeowners who want centralized smart home control.',
                    successMetrics: ['Device compatibility > 95%', 'Response time < 500ms', 'User satisfaction > 4.5/5'],
                    requirements: ['Device discovery and pairing', 'Unified control interface', 'Automation rules', 'Voice control'],
                    architecture: 'React Native app with Python backend, MQTT for device communication, and Raspberry Pi hub.',
                    timeline: [
                        { phase: 'Phase 1: Research', duration: '1 month', status: 'in-progress' },
                        { phase: 'Phase 2: MVP', duration: '3 months', status: 'pending' },
                        { phase: 'Phase 3: Advanced Features', duration: '2 months', status: 'pending' }
                    ],
                    resources: 'Solo project with $10k budget for hardware and development.'
                },
                promptKit: {
                    specifications: 'Build a React Native app with Python backend for smart home device control.',
                    acceptanceCriteria: ['Supports 50+ device types', 'Response time < 500ms', 'Works offline'],
                    sampleData: '{"devices": [{"id": 1, "type": "light", "name": "Living Room Light", "status": "on"}]}',
                    codingStandards: ['Use TypeScript', 'Follow MQTT best practices', 'Implement proper error handling'],
                    apiSpecs: ['GET /api/devices', 'POST /api/devices/{id}/control', 'GET /api/automations'],
                    testingStrategy: 'Unit tests for all components, integration tests with real devices, performance testing.',
                    security: 'Device authentication, encrypted communication, secure pairing process.'
                },
                salesPackPre: {
                    executiveSummary: 'Smart Home Hub unifies all smart devices under one intuitive control system.',
                    marketAnalysis: 'Smart home market is $84B and growing 11% annually. Opportunity in device integration.',
                    valueProposition: 'Simplify smart home management and reduce app clutter by 90%.',
                    features: ['Universal device control', 'Automation rules', 'Voice control', 'Energy monitoring'],
                    pricing: { freemium: 'Free for 5 devices', premium: '$4.99/month' },
                    timeline: '6 months to market launch',
                    riskAssessment: 'Device compatibility challenges, hardware costs, user adoption in competitive market.'
                },
                salesPackPost: {
                    demos: 'Prototype demo available upon request',
                    caseStudies: [],
                    metrics: [],
                    testimonials: [],
                    roiCalculator: 'Projected ROI of 200% within 18 months.',
                    differentiation: ['Universal compatibility', 'Offline functionality', 'Open source platform'],
                    nextSteps: 'Complete market research and build MVP prototype.'
                },
                files: [
                    { name: 'Market Research.pdf', type: 'pdf', size: '1.2 MB', date: '2025-09-01', url: '/files/market-research.pdf' }
                ]
            }
        ];
    }

    // Event listeners
    setupEventListeners() {
        // Logo click to go to dashboard
        document.querySelector('.logo').addEventListener('click', () => {
            this.renderDashboard();
        });

        // New project button
        document.getElementById('newProjectBtn').addEventListener('click', () => {
            this.createNewProject();
        });

        // Import CSV button
        document.getElementById('importCsvBtn').addEventListener('click', () => {
            this.showCsvImportModal();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterProjects(e.target.value);
        });

        // Export button
        document.querySelector('button[title="Export"]').addEventListener('click', () => {
            this.exportProjects();
        });

        // Settings button
        document.querySelector('button[title="Settings"]').addEventListener('click', () => {
            this.showSettings();
        });

        // User avatar button
        document.querySelector('.user-avatar').addEventListener('click', () => {
            this.showUserMenu();
        });

        // Theme toggle button
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Status filter buttons
        document.querySelectorAll('.status-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                document.querySelectorAll('.status-filter-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                // Filter projects
                this.filterProjectsByStatus(e.target.dataset.status);
            });
        });


        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // CSV import modal
        document.getElementById('closeCsvModal').addEventListener('click', () => {
            this.hideCsvImportModal();
        });

        document.getElementById('selectCsvBtn').addEventListener('click', () => {
            document.getElementById('csvFileInput').click();
        });

        document.getElementById('csvFileInput').addEventListener('change', (e) => {
            this.handleCsvFile(e.target.files[0]);
        });

        // File upload
        document.getElementById('filesUploadArea').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
        });

        // Edit project button
        document.getElementById('editProjectBtn').addEventListener('click', () => {
            this.editingMode = !this.editingMode;
            this.toggleEditMode();
        });

        // Delete project button
        document.getElementById('deleteProjectBtn').addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete "${this.currentProject.name}"? This action cannot be undone.`)) {
                this.deleteProject(this.currentProject.id);
            }
        });
    }

    // Dashboard rendering
    renderDashboard() {
        this.currentView = 'dashboard';
        this.currentProject = null;
        document.getElementById('dashboardView').style.display = 'block';
        document.getElementById('projectDetailView').style.display = 'none';
        
        this.updateBreadcrumb('Dashboard');
        this.renderProjectsTable();
        this.updateStats();
    }

    renderProjectsTable() {
        const tbody = document.getElementById('projectsTableBody');
        tbody.innerHTML = '';

        this.projects.forEach(project => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="name-col">
                    <div class="project-name">
                        <div class="project-avatar">${project.name.charAt(0)}</div>
                        <div class="project-info">
                            <h3>${project.name}</h3>
                            <p>${project.description}</p>
                        </div>
                    </div>
                </td>
                <td class="status-col">
                    <span class="status-badge ${project.status}">${project.status}</span>
                </td>
                <td class="progress-col">
                    <div class="progress-container">
                        <div class="progress-bar-inline">
                            <div class="progress-fill-inline" style="width: ${project.completionPercentage}%"></div>
                        </div>
                        <span class="progress-text">${project.completionPercentage}%</span>
                    </div>
                </td>
                <td class="tech-col">
                    <div class="tech-pills">
                        ${project.techStack.slice(0, 2).map(tech => `<span class="tech-pill">${tech}</span>`).join('')}
                        ${project.techStack.length > 2 ? `<span class="tech-pill">+${project.techStack.length - 2}</span>` : ''}
                    </div>
                </td>
                <td class="modified-col">
                    <span class="text-muted">${this.formatDate(project.lastModified)}</span>
                </td>
                <td class="actions-col">
                    <div class="actions-cell">
                        <button class="action-btn view-btn" data-id="${project.id}" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit-btn" data-id="${project.id}" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn clone-btn" data-id="${project.id}" title="Clone">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button class="action-btn danger delete-btn" data-id="${project.id}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Add event listeners for action buttons
        tbody.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.viewProject(btn.dataset.id);
            });
        });

        tbody.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editProject(btn.dataset.id);
            });
        });

        tbody.querySelectorAll('.clone-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.cloneProject(btn.dataset.id);
            });
        });

        tbody.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteProject(btn.dataset.id);
            });
        });

        // Add click handler for project name to view project
        tbody.querySelectorAll('.project-name').forEach(nameEl => {
            nameEl.style.cursor = 'pointer';
            nameEl.addEventListener('click', (e) => {
                const row = e.currentTarget.closest('tr');
                const projectId = row.querySelector('.view-btn').dataset.id;
                this.viewProject(projectId);
            });
        });
    }

    // Project detail view
    viewProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        this.currentProject = project;
        this.currentView = 'project';
        
        document.getElementById('dashboardView').style.display = 'none';
        document.getElementById('projectDetailView').style.display = 'block';
        
        this.updateBreadcrumb(`Dashboard > ${project.name}`);
        this.renderProjectDetail();
    }

    renderProjectDetail() {
        if (!this.currentProject) return;

        // Update header
        document.getElementById('projectDetailTitle').textContent = this.currentProject.name;
        document.getElementById('projectDetailStatus').textContent = this.currentProject.status;
        document.getElementById('projectDetailStatus').className = `status-badge ${this.currentProject.status}`;
        document.getElementById('projectDetailProgress').textContent = `${this.currentProject.completionPercentage}% Complete`;

        // Render overview tab
        this.renderOverviewTab();
        this.renderPromptKitTab();
        this.renderSalesPreTab();
        this.renderSalesPostTab();
        this.renderFilesTab();
    }

    renderOverviewTab() {
        const project = this.currentProject;
        document.getElementById('overview-vision').textContent = project.overview.vision;
        document.getElementById('overview-problem').textContent = project.overview.problemStatement;
        document.getElementById('overview-audience').textContent = project.overview.targetAudience;
        
        document.getElementById('overview-metrics').innerHTML = 
            project.overview.successMetrics.map(metric => `<li>${metric}</li>`).join('');
        
        document.getElementById('overview-requirements').innerHTML = 
            project.overview.requirements.map(req => `<li>${req}</li>`).join('');
        
        document.getElementById('overview-architecture').textContent = project.overview.architecture;
        
        document.getElementById('overview-timeline').innerHTML = 
            project.overview.timeline.map(item => `
                <div class="timeline-item">
                    <div class="timeline-phase">${item.phase}</div>
                    <div class="timeline-duration">${item.duration}</div>
                    <div class="timeline-status ${item.status.replace('-', '-')}">${item.status}</div>
                </div>
            `).join('');
        
        document.getElementById('overview-resources').textContent = project.overview.resources;
    }

    renderPromptKitTab() {
        const project = this.currentProject;
        document.getElementById('prompt-specifications').textContent = project.promptKit.specifications;
        
        document.getElementById('prompt-criteria').innerHTML = 
            project.promptKit.acceptanceCriteria.map(criteria => `<li>${criteria}</li>`).join('');
        
        // Format JSON sample data
        const sampleData = project.promptKit.sampleData;
        const sampleDataElement = document.getElementById('prompt-sample-data');
        
        if (sampleData) {
            try {
                // Try to parse and pretty-print JSON
                const parsedJson = JSON.parse(sampleData);
                const formattedJson = JSON.stringify(parsedJson, null, 2);
                sampleDataElement.textContent = formattedJson;
                sampleDataElement.classList.add('json-formatted');
                
                // Add copy button
                const copyButton = document.createElement('button');
                copyButton.className = 'copy-json-btn';
                copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                copyButton.title = 'Copy JSON';
                copyButton.onclick = () => {
                    navigator.clipboard.writeText(formattedJson).then(() => {
                        copyButton.innerHTML = '<i class="fas fa-check"></i>';
                        copyButton.title = 'Copied!';
                        setTimeout(() => {
                            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                            copyButton.title = 'Copy JSON';
                        }, 2000);
                    });
                };
                
                // Wrap the code block and button
                const wrapper = document.createElement('div');
                wrapper.className = 'json-wrapper';
                wrapper.style.position = 'relative';
                
                sampleDataElement.parentNode.insertBefore(wrapper, sampleDataElement);
                wrapper.appendChild(sampleDataElement);
                wrapper.appendChild(copyButton);
                
            } catch (e) {
                // If not valid JSON, display as-is
                sampleDataElement.textContent = sampleData;
            }
        } else {
            sampleDataElement.textContent = 'No sample data provided';
        }
        
        
        document.getElementById('prompt-standards').innerHTML = 
            project.promptKit.codingStandards.map(standard => `<li>${standard}</li>`).join('');
        
        document.getElementById('prompt-api').innerHTML = 
            project.promptKit.apiSpecs.map(spec => `<li>${spec}</li>`).join('');
        
        document.getElementById('prompt-testing').textContent = project.promptKit.testingStrategy;
        document.getElementById('prompt-security').textContent = project.promptKit.security;
    }

    renderSalesPreTab() {
        const project = this.currentProject;
        document.getElementById('sales-pre-summary').textContent = project.salesPackPre.executiveSummary;
        document.getElementById('sales-pre-market').textContent = project.salesPackPre.marketAnalysis;
        document.getElementById('sales-pre-value').textContent = project.salesPackPre.valueProposition;
        
        document.getElementById('sales-pre-features').innerHTML = 
            project.salesPackPre.features.map(feature => `<li>${feature}</li>`).join('');
        
        const pricing = project.salesPackPre.pricing;
        let pricingHtml = '';
        
        // Get all pricing tiers dynamically
        const pricingTiers = Object.keys(pricing);
        
        if (pricingTiers.length === 0) {
            pricingHtml = '<p class="text-muted">No pricing information available</p>';
        } else {
            pricingTiers.forEach(tierKey => {
                const tierDescription = pricing[tierKey];
                const tierDisplayName = tierKey.charAt(0).toUpperCase() + tierKey.slice(1).replace(/_/g, ' ');
                
                pricingHtml += `
                    <div class="pricing-item">
                        <div class="pricing-tier">${tierDisplayName}</div>
                        <div class="pricing-price">${tierDescription}</div>
                        <div class="pricing-period">${this.getPricingPeriodDescription(tierKey)}</div>
                    </div>
                `;
            });
        }
        
        document.getElementById('sales-pre-pricing').innerHTML = pricingHtml;
        
        document.getElementById('sales-pre-timeline').textContent = project.salesPackPre.timeline;
        document.getElementById('sales-pre-risks').textContent = project.salesPackPre.riskAssessment;
    }

    renderSalesPostTab() {
        const project = this.currentProject;
        document.getElementById('sales-post-demos').textContent = project.salesPackPost.demos;
        
        document.getElementById('sales-post-cases').innerHTML = 
            project.salesPackPost.caseStudies.map(caseStudy => `
                <div class="case-study">
                    <div class="case-study-client">${caseStudy.client}</div>
                    <div class="case-study-result">${caseStudy.result}</div>
                </div>
            `).join('');
        
        document.getElementById('sales-post-metrics').innerHTML = 
            project.salesPackPost.metrics.map(metric => `
                <div class="metric-item">
                    <div class="metric-label">${metric.label}</div>
                    <div class="metric-value">${metric.value}</div>
                    <div class="metric-benchmark">vs ${metric.benchmark} industry</div>
                </div>
            `).join('');
        
        document.getElementById('sales-post-testimonials').innerHTML = 
            project.salesPackPost.testimonials.map(testimonial => `
                <div class="testimonial">
                    <div class="testimonial-quote">${testimonial.quote}</div>
                    <div class="testimonial-author">- ${testimonial.author}</div>
                </div>
            `).join('');
        
        document.getElementById('sales-post-roi').textContent = project.salesPackPost.roiCalculator;
        
        document.getElementById('sales-post-diff').innerHTML = 
            project.salesPackPost.differentiation.map(point => `<li>${point}</li>`).join('');
        
        document.getElementById('sales-post-next').textContent = project.salesPackPost.nextSteps;
    }

    renderFilesTab() {
        const project = this.currentProject;
        const filesGrid = document.getElementById('filesGrid');
        
        filesGrid.innerHTML = `
            <div class="file-upload-area" id="fileUploadArea">
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Drag and drop files here or click to browse</p>
                <input type="file" id="fileInput" multiple style="display: none;">
            </div>
            <div class="files-list" id="filesList">
                ${project.files.length === 0 ? 
                    '<p class="text-center text-muted">No files uploaded yet.</p>' :
                    project.files.map(file => `
                        <div class="file-item">
                            <div class="file-icon">
                                <i class="fas fa-${this.getFileIcon(file.type)}"></i>
                            </div>
                            <div class="file-info">
                                <div class="file-name">${file.name}</div>
                                <div class="file-meta">${file.size} • ${this.formatDate(file.date)}</div>
                            </div>
                            <div class="file-actions">
                                <button class="btn btn-sm btn-secondary" onclick="window.open('${file.url}', '_blank')">
                                    <i class="fas fa-download"></i>
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="app.removeFile('${file.name}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
        `;

        // Set up drag and drop
        this.setupFileUpload();
    }

    setupFileUpload() {
        const uploadArea = document.getElementById('fileUploadArea');
        const fileInput = document.getElementById('fileInput');

        if (!uploadArea || !fileInput) return;

        // Click to upload
        uploadArea.addEventListener('click', () => fileInput.click());

        // Drag and drop events
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const files = Array.from(e.dataTransfer.files);
            this.handleFileUpload(files);
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            this.handleFileUpload(files);
        });
    }

    handleFileUpload(files) {
        files.forEach(file => {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain', 'application/json'];
            if (!allowedTypes.includes(file.type)) {
                alert(`File type ${file.type} is not allowed. Please upload images, PDFs, or text files.`);
                return;
            }

            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert(`File ${file.name} is too large. Please upload files smaller than 5MB.`);
                return;
            }

            // Create file object
            const fileObj = {
                name: file.name,
                type: this.getFileType(file.type),
                size: this.formatFileSize(file.size),
                date: new Date().toISOString().split('T')[0],
                url: URL.createObjectURL(file),
                file: file // Store the actual file object
            };

            // Add to project
            this.currentProject.files.push(fileObj);
        });

        // Re-render files tab
        this.renderFilesTab();
        console.log('Files uploaded:', files.length);
    }

    getFileType(mimeType) {
        if (mimeType.startsWith('image/')) return 'image';
        if (mimeType === 'application/pdf') return 'pdf';
        if (mimeType === 'text/plain') return 'text';
        if (mimeType === 'application/json') return 'code';
        return 'file';
    }

    removeFile(fileName) {
        this.currentProject.files = this.currentProject.files.filter(file => file.name !== fileName);
        this.renderFilesTab();
    }

    getFileIcon(type) {
        const icons = {
            'pdf': 'file-pdf',
            'figma': 'figma',
            'doc': 'file-word',
            'docx': 'file-word',
            'xls': 'file-excel',
            'xlsx': 'file-excel',
            'ppt': 'file-powerpoint',
            'pptx': 'file-powerpoint',
            'jpg': 'file-image',
            'jpeg': 'file-image',
            'png': 'file-image',
            'gif': 'file-image',
            'mp4': 'file-video',
            'avi': 'file-video',
            'mov': 'file-video',
            'zip': 'file-archive',
            'rar': 'file-archive',
            'default': 'file'
        };
        return icons[type] || icons.default;
    }

    // Tab switching
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update tab content
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    // Utility functions
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    }

    updateBreadcrumb(path) {
        const breadcrumbItems = path.split(' > ');
        const breadcrumbHTML = breadcrumbItems.map((item, index) => {
            if (index === 0 && item === 'Dashboard') {
                return `<a href="#" class="breadcrumb-link" onclick="app.renderDashboard()">${item}</a>`;
            } else if (index === breadcrumbItems.length - 1) {
                return `<span class="breadcrumb-current">${item}</span>`;
            } else {
                return `<span class="breadcrumb-item">${item}</span>`;
            }
        }).join(' > ');
        
        document.getElementById('breadcrumb').innerHTML = breadcrumbHTML;
    }


    updateStats() {
        const total = this.projects.length;
        const current = this.projects.filter(p => p.status === 'current').length;
        const completed = this.projects.filter(p => p.status === 'completed').length;
        const ideas = this.projects.filter(p => p.status === 'idea').length;
        
        document.getElementById('totalProjects').textContent = total;
        document.getElementById('currentProjectsCount').textContent = current;
        document.getElementById('completedProjectsCount').textContent = completed;
        document.getElementById('ideasProjectsCount').textContent = ideas;
    }

    // Filter functions
    filterProjects(searchTerm) {
        const rows = document.querySelectorAll('#projectsTableBody tr');
        rows.forEach(row => {
            const projectName = row.querySelector('.project-name h3').textContent.toLowerCase();
            const projectDesc = row.querySelector('.project-name p').textContent.toLowerCase();
            const matches = projectName.includes(searchTerm.toLowerCase()) || 
                          projectDesc.includes(searchTerm.toLowerCase());
            row.style.display = matches ? '' : 'none';
        });
    }

    filterProjectsByStatus(status) {
        const rows = document.querySelectorAll('#projectsTableBody tr');
        rows.forEach(row => {
            const statusBadge = row.querySelector('.status-badge');
            const projectStatus = statusBadge.textContent.toLowerCase();
            const matches = !status || projectStatus === status;
            row.style.display = matches ? '' : 'none';
        });
    }


    // CSV Import functionality
    showCsvImportModal() {
        document.getElementById('csvImportModal').classList.add('show');
    }

    hideCsvImportModal() {
        document.getElementById('csvImportModal').classList.remove('show');
        document.getElementById('csvPreview').style.display = 'none';
        document.getElementById('csvFileInput').value = '';
    }

    handleCsvFile(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            this.parseCsvData(csv);
        };
        reader.readAsText(file);
    }

    parseCsvData(csv) {
        const lines = csv.split('\n').filter(line => line.trim());
        if (lines.length < 2) {
            alert('CSV file must contain at least a header row and one data row.');
            return;
        }
        
        // Parse headers and clean them up
        const headers = lines[0].split('|').map(h => h.trim().replace(/"/g, ''));
        const data = lines.slice(1).map(line => {
            const values = line.split('|').map(v => v.trim().replace(/"/g, ''));
            const project = {};
            headers.forEach((header, index) => {
                project[header] = values[index] || '';
            });
            return project;
        });
        
        this.showCsvPreview(data);
    }

    showCsvPreview(data) {
        const preview = document.getElementById('csvPreview');
        const table = document.getElementById('previewTable');
        
        if (data.length === 0) {
            preview.innerHTML = '<p>No data found in CSV file.</p>';
            preview.style.display = 'block';
            return;
        }
        
        const headers = Object.keys(data[0]);
        table.innerHTML = `
            <thead>
                <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
                ${data.slice(0, 5).map(row => 
                    `<tr>${headers.map(h => `<td>${row[h] || ''}</td>`).join('')}</tr>`
                ).join('')}
            </tbody>
        `;
        
        if (data.length > 5) {
            table.innerHTML += `<tfoot><tr><td colspan="${headers.length}" class="text-center">... and ${data.length - 5} more rows</td></tr></tfoot>`;
        }
        
        preview.style.display = 'block';
        
        // Store data for import
        this.csvImportData = data;
        
        // Add confirm import button event listener
        document.getElementById('confirmImportBtn').onclick = () => {
            this.importCsvProjects();
        };
    }

    importCsvProjects() {
        if (!this.csvImportData || this.csvImportData.length === 0) {
            alert('No data to import.');
            return;
        }

        let importedCount = 0;
        let errorCount = 0;
        const errors = [];

        this.csvImportData.forEach((row, index) => {
            try {
                // Validate required fields
                if (!row.Project_Name || !row.Status) {
                    errors.push(`Row ${index + 1}: Missing required fields (Project_Name, Status)`);
                    errorCount++;
                    return;
                }

                // Map CSV data to project structure
                const project = this.mapCsvToProject(row);
                
                // Check for duplicate names
                const existingProject = this.projects.find(p => p.name === project.name);
                if (existingProject) {
                    errors.push(`Row ${index + 1}: Project "${project.name}" already exists`);
                    errorCount++;
                    return;
                }

                this.projects.push(project);
                importedCount++;
            } catch (error) {
                errors.push(`Row ${index + 1}: ${error.message}`);
                errorCount++;
            }
        });

        // Show results
        let message = `Import completed!\n\nImported: ${importedCount} projects`;
        if (errorCount > 0) {
            message += `\nErrors: ${errorCount} rows\n\nErrors:\n${errors.slice(0, 5).join('\n')}`;
            if (errors.length > 5) {
                message += `\n... and ${errors.length - 5} more errors`;
            }
        }
        
        alert(message);

        // Update UI
        this.renderDashboard();
        this.hideCsvImportModal();
    }

    mapCsvToProject(row) {
        // Helper function to parse comma or semicolon-separated values
        const parseList = (value) => {
            if (!value) return [];
            // Try semicolon first, then comma as fallback
            const separator = value.includes(';') ? ';' : ',';
            return value.split(separator).map(item => item.trim()).filter(item => item);
        };

        // Helper function to convert <br> tags to actual line breaks
        const convertBrToNewlines = (value) => {
            if (!value) return '';
            return value.replace(/<br\s*\/?>/gi, '\n');
        };

        // Helper function to parse timeline phases
        const parseTimeline = (value) => {
            if (!value) return [];
            try {
                return JSON.parse(value);
            } catch {
                // Fallback: create a simple timeline entry
                return [{ phase: 'Development', duration: '6 months', status: 'pending' }];
            }
        };

        // Helper function to parse pricing model
        const parsePricing = (value) => {
            if (!value) return {};
            try {
                return JSON.parse(value);
            } catch {
                // Handle the new format with line breaks and bullet points
                const cleanValue = convertBrToNewlines(value);
                const lines = cleanValue.split('\n').filter(line => line.trim());
                
                const pricing = {};
                
                lines.forEach(line => {
                    const trimmed = line.trim();
                    // Remove bullet points and clean up
                    const cleanLine = trimmed.replace(/^[•\-\*]\s*/, '');
                    
                    // Skip section headers
                    if (cleanLine.toLowerCase().includes('pricing structure') || 
                        cleanLine.toLowerCase().includes('pricing model')) {
                        return;
                    }
                    
                    // Extract tier name and description
                    if (cleanLine.includes(':')) {
                        const parts = cleanLine.split(':');
                        const tierName = parts[0].trim().toLowerCase();
                        const tierDescription = parts[1].trim();
                        
                        // Create a key based on the tier name
                        let key = tierName;
                        
                        // Map common variations to consistent keys
                        if (tierName.includes('freemium') || tierName.includes('free')) {
                            key = 'freemium';
                        } else if (tierName.includes('pro') || tierName.includes('premium')) {
                            key = 'premium';
                        } else if (tierName.includes('team')) {
                            key = 'team';
                        } else if (tierName.includes('enterprise')) {
                            key = 'enterprise';
                        } else if (tierName.includes('ultra')) {
                            key = 'ultra';
                        } else if (tierName.includes('rainbow')) {
                            key = 'rainbow';
                        } else {
                            // Use the tier name as-is, but make it a valid key
                            key = tierName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                        }
                        
                        pricing[key] = tierDescription;
                    } else if (cleanLine.includes('$') || cleanLine.toLowerCase().includes('free')) {
                        // If it's a pricing line without colon, try to extract tier info
                        const lowerLine = cleanLine.toLowerCase();
                        let key = 'premium'; // default
                        
                        if (lowerLine.includes('free')) {
                            key = 'freemium';
                        } else if (lowerLine.includes('team')) {
                            key = 'team';
                        } else if (lowerLine.includes('enterprise')) {
                            key = 'enterprise';
                        } else if (lowerLine.includes('ultra')) {
                            key = 'ultra';
                        } else if (lowerLine.includes('rainbow')) {
                            key = 'rainbow';
                        }
                        
                        pricing[key] = cleanLine;
                    }
                });
                
                return pricing;
            }
        };


        // Helper function to parse case studies
        const parseCaseStudies = (value) => {
            if (!value) return [];
            try {
                return JSON.parse(value);
            } catch {
                // Handle the new format with line breaks and colons
                const cleanValue = convertBrToNewlines(value);
                const lines = cleanValue.split('\n').filter(line => line.trim());
                
                const caseStudies = [];
                let currentClient = '';
                let currentResult = '';
                
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i].trim();
                    
                    // Skip section headers
                    if (line.toLowerCase().includes('case studies') || line === 'Case Studies:') {
                        continue;
                    }
                    
                    // Look for pattern: "Name: Description"
                    if (line.includes(':')) {
                        const parts = line.split(':');
                        const client = parts[0].trim();
                        const result = parts.slice(1).join(':').trim();
                        
                        // Skip if it's just a header
                        if (client.toLowerCase().includes('case studies')) {
                            continue;
                        }
                        
                        // If we have a previous client without result, add it
                        if (currentClient && currentResult) {
                            caseStudies.push({ client: currentClient, result: currentResult });
                        }
                        
                        currentClient = client;
                        currentResult = result;
                    } else if (line.includes(' - ')) {
                        const parts = line.split(' - ');
                        const client = parts[0].trim();
                        const result = parts.slice(1).join(' - ').trim();
                        
                        // If we have a previous client without result, add it
                        if (currentClient && currentResult) {
                            caseStudies.push({ client: currentClient, result: currentResult });
                        }
                        
                        currentClient = client;
                        currentResult = result;
                    } else if (line.length > 20 && !line.startsWith('-') && !line.startsWith('•')) {
                        // This might be a result description for the current client
                        if (currentClient) {
                            currentResult = line;
                        }
                    }
                }
                
                // Add the last case study if we have both client and result
                if (currentClient && currentResult) {
                    caseStudies.push({ client: currentClient, result: currentResult });
                }
                
                return caseStudies;
            }
        };

        // Helper function to parse metrics
        const parseMetrics = (value) => {
            if (!value) return [];
            try {
                return JSON.parse(value);
            } catch {
                // Handle the new format with line breaks and colons
                const cleanValue = convertBrToNewlines(value);
                const lines = cleanValue.split('\n').filter(line => line.trim());
                
                return lines.map(line => {
                    const trimmed = line.trim();
                    
                    // Skip section headers
                    if (trimmed.toLowerCase().includes('metrics') || trimmed === 'Current Beta Metrics:') {
                        return null;
                    }
                    
                    // Skip bullet points that are just headers
                    if (trimmed.startsWith('•') && trimmed.length < 20) {
                        return null;
                    }
                    
                    // Look for pattern: "• Value (benchmark)" or "Label: Value (benchmark)"
                    if (trimmed.startsWith('•')) {
                        const content = trimmed.substring(1).trim();
                        
                        // Extract value and benchmark from parentheses
                        if (content.includes('(') && content.includes(')')) {
                            const match = content.match(/^(.+?)\s*\(([^)]+)\)/);
                            if (match) {
                                return { 
                                    label: 'Metric', 
                                    value: match[1].trim(), 
                                    benchmark: match[2].trim() 
                                };
                            }
                        }
                        
                        return { label: 'Metric', value: content, benchmark: 'N/A' };
                    }
                    
                    // Look for pattern: "Label: Value (benchmark)" or "Label: Value: Benchmark"
                    if (trimmed.includes(':')) {
                        const parts = trimmed.split(':');
                        if (parts.length >= 2) {
                            const label = parts[0].trim();
                            const valuePart = parts[1].trim();
                            
                            // Check if there's a benchmark in parentheses
                            let benchmark = 'N/A';
                            if (valuePart.includes('(') && valuePart.includes(')')) {
                                const match = valuePart.match(/\(([^)]+)\)/);
                                if (match) {
                                    benchmark = match[1];
                                    valuePart = valuePart.replace(/\s*\([^)]+\)/, '').trim();
                                }
                            } else if (parts.length >= 3) {
                                benchmark = parts[2].trim();
                            }
                            
                            return { label, value: valuePart, benchmark };
                        }
                    }
                    
                    return { label: 'Metric', value: trimmed, benchmark: 'N/A' };
                }).filter(item => item !== null);
            }
        };

        // Helper function to parse testimonials
        const parseTestimonials = (value) => {
            if (!value) return [];
            try {
                return JSON.parse(value);
            } catch {
                // Handle the new format with line breaks and dashes
                const cleanValue = convertBrToNewlines(value);
                const lines = cleanValue.split('\n').filter(line => line.trim());
                
                const testimonials = [];
                let currentQuote = '';
                let currentAuthor = '';
                
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i].trim();
                    
                    // Skip section headers
                    if (line.toLowerCase().includes('testimonials') || line === 'Customer Testimonials:') {
                        continue;
                    }
                    
                    // If line starts with quote mark, it's a quote
                    if (line.startsWith('"') && line.includes('"')) {
                        const quoteMatch = line.match(/^"([^"]+)"\s*-\s*(.+)$/);
                        if (quoteMatch) {
                            testimonials.push({
                                quote: quoteMatch[1].trim(),
                                author: quoteMatch[2].trim()
                            });
                        } else {
                            // Just a quote without author on same line
                            currentQuote = line.replace(/^["']|["']$/g, '');
                        }
                    } else if (line.startsWith('- ') && currentQuote) {
                        // Author line
                        currentAuthor = line.substring(2).trim();
                        testimonials.push({
                            quote: currentQuote,
                            author: currentAuthor
                        });
                        currentQuote = '';
                        currentAuthor = '';
                    } else if (line.includes(' - ')) {
                        // Quote and author on same line
                        const parts = line.split(' - ');
                        testimonials.push({
                            quote: parts[0].trim().replace(/^["']|["']$/g, ''),
                            author: parts[1].trim()
                        });
                    } else if (line.includes(' | ')) {
                        // Quote and author separated by |
                        const parts = line.split(' | ');
                        testimonials.push({
                            quote: parts[0].trim().replace(/^["']|["']$/g, ''),
                            author: parts[1].trim()
                        });
                    } else if (line.length > 20 && !line.startsWith('-')) {
                        // Might be a standalone quote
                        currentQuote = line.replace(/^["']|["']$/g, '');
                    }
                }
                
                return testimonials;
            }
        };

        // Helper function to parse files
        const parseFiles = (names, types, urls) => {
            if (!names) return [];
            const nameList = parseList(names);
            const typeList = parseList(types);
            const urlList = parseList(urls);
            
            return nameList.map((name, index) => ({
                name: name,
                type: typeList[index] || 'file',
                size: 'Unknown',
                date: new Date().toISOString().split('T')[0],
                url: urlList[index] || '#'
            }));
        };

        const project = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: row.Project_Name || 'Untitled Project',
            status: (row.Status || 'idea').toLowerCase(),
            description: row.Description || '',
            techStack: parseList(row.Tech_Stack),
            completionPercentage: parseInt(row.Completion_Percentage) || 0,
            createdDate: new Date().toISOString().split('T')[0],
            lastModified: new Date().toISOString().split('T')[0],
            priority: (row.Priority || 'medium').toLowerCase(),
            overview: {
                vision: convertBrToNewlines(row.Vision || ''),
                problemStatement: convertBrToNewlines(row.Problem_Statement || ''),
                targetAudience: convertBrToNewlines(row.Target_Audience || ''),
                successMetrics: parseList(row.Success_Metrics),
                requirements: parseList(row.Requirements),
                architecture: convertBrToNewlines(row.Architecture || ''),
                timeline: parseTimeline(row.Timeline_Phases),
                resources: convertBrToNewlines(row.Resources || '')
            },
            promptKit: {
                specifications: convertBrToNewlines(row.Specifications || ''),
                acceptanceCriteria: parseList(row.Acceptance_Criteria),
                sampleData: convertBrToNewlines(row.Sample_Data || ''),
                codingStandards: parseList(row.Coding_Standards),
                apiSpecs: parseList(row.API_Specs),
                testingStrategy: convertBrToNewlines(row.Testing_Strategy || ''),
                security: convertBrToNewlines(row.Security_Requirements || '')
            },
            salesPackPre: {
                executiveSummary: convertBrToNewlines(row.Executive_Summary || ''),
                marketAnalysis: convertBrToNewlines(row.Market_Analysis || ''),
                valueProposition: convertBrToNewlines(row.Value_Proposition || ''),
                features: parseList(row.Features_List),
                pricing: parsePricing(row.Pricing_Model),
                timeline: convertBrToNewlines(row.Development_Timeline || ''),
                riskAssessment: convertBrToNewlines(row.Risk_Assessment || '')
            },
            salesPackPost: {
                demos: convertBrToNewlines(row.Demo_Links || ''),
                caseStudies: parseCaseStudies(row.Case_Studies),
                metrics: parseMetrics(row.Success_Metrics_Achieved),
                testimonials: parseTestimonials(row.Customer_Testimonials),
                roiCalculator: convertBrToNewlines(row.ROI_Calculator || ''),
                differentiation: parseList(row.Competitive_Differentiation),
                nextSteps: convertBrToNewlines(row.Next_Steps || '')
            },
            files: parseFiles(row.File_Names, row.File_Types, row.File_URLs)
        };

        return project;
    }

    // Project management functions
    createNewProject() {
        const name = prompt('Enter project name:');
        if (!name) return;
        
        const newProject = {
            id: Date.now().toString(),
            name: name,
            status: 'idea',
            description: 'New project description',
            techStack: [],
            completionPercentage: 0,
            createdDate: new Date().toISOString().split('T')[0],
            lastModified: new Date().toISOString().split('T')[0],
            priority: 'medium',
            overview: {
                vision: '',
                problemStatement: '',
                targetAudience: '',
                successMetrics: [],
                requirements: [],
                architecture: '',
                timeline: [],
                resources: ''
            },
            promptKit: {
                specifications: '',
                acceptanceCriteria: [],
                sampleData: '',
                codingStandards: [],
                apiSpecs: [],
                testingStrategy: '',
                security: ''
            },
            salesPackPre: {
                executiveSummary: '',
                marketAnalysis: '',
                valueProposition: '',
                features: [],
                pricing: { freemium: 'Free', premium: '$9.99/month' },
                timeline: '',
                riskAssessment: ''
            },
            salesPackPost: {
                demos: '',
                caseStudies: [],
                metrics: [],
                testimonials: [],
                roiCalculator: '',
                differentiation: [],
                nextSteps: ''
            },
            files: []
        };
        
        this.projects.push(newProject);
        this.renderDashboard();
        this.viewProject(newProject.id);
        
        // Automatically enter edit mode for new project
        setTimeout(() => {
            this.editProject(newProject.id);
        }, 100);
    }

    editProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        // Switch to project view first
        this.viewProject(projectId);
        
        // Enable edit mode
        this.editingMode = true;
        this.toggleEditMode();
    }

    toggleEditMode() {
        const editBtn = document.getElementById('editProjectBtn');
        
        if (this.editingMode) {
            editBtn.innerHTML = '<i class="fas fa-save"></i> Save';
            editBtn.classList.remove('btn-secondary');
            editBtn.classList.add('btn-primary');
            
            // Add cancel button
            this.addCancelButton();
            
            // Make all content editable
            this.makeContentEditable();
        } else {
            editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
            editBtn.classList.remove('btn-primary');
            editBtn.classList.add('btn-secondary');
            
            // Remove cancel button
            this.removeCancelButton();
            
            // Make content read-only and save changes
            this.makeContentReadOnly();
            this.saveProjectChanges();
        }
    }

    addCancelButton() {
        // Remove existing cancel button if it exists
        this.removeCancelButton();
        
        const editBtn = document.getElementById('editProjectBtn');
        const cancelBtn = document.createElement('button');
        cancelBtn.id = 'cancelEditBtn';
        cancelBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
        cancelBtn.className = 'btn btn-outline-secondary';
        cancelBtn.style.marginLeft = '10px';
        cancelBtn.addEventListener('click', () => this.cancelEdit());
        
        editBtn.parentNode.insertBefore(cancelBtn, editBtn.nextSibling);
    }

    removeCancelButton() {
        const cancelBtn = document.getElementById('cancelEditBtn');
        if (cancelBtn) {
            cancelBtn.remove();
        }
    }

    cancelEdit() {
        // Exit edit mode without saving
        this.editingMode = false;
        this.toggleEditMode();
        
        // Re-render the project detail view to restore original content
        this.renderProjectDetail(this.currentProject);
    }

    makeContentEditable() {
        // Text content
        const textElements = document.querySelectorAll('.content-text, .code-block');
        textElements.forEach(element => {
            element.contentEditable = true;
            element.style.border = '1px solid var(--border)';
            element.style.padding = '8px';
            element.style.borderRadius = '4px';
            element.style.backgroundColor = 'var(--bg-secondary)';
            
            // Fix JSON formatting in edit mode
            if (element.classList.contains('json-formatted')) {
                element.style.color = 'var(--text-primary)';
                element.style.backgroundColor = 'var(--bg-primary)';
                element.style.fontFamily = 'monospace';
                element.style.whiteSpace = 'pre-wrap';
            }
        });

        // Timeline phases - convert to editable textarea
        const timelineContainer = document.getElementById('overview-timeline');
        if (timelineContainer && timelineContainer.querySelector('.timeline-item')) {
            const timelineItems = Array.from(timelineContainer.querySelectorAll('.timeline-item'));
            const timelineText = timelineItems.map(item => {
                const phase = item.querySelector('.timeline-phase')?.textContent || '';
                const duration = item.querySelector('.timeline-duration')?.textContent || '';
                const status = item.querySelector('.timeline-status')?.textContent || '';
                return `${phase} | ${duration} | ${status}`;
            }).join('\n');
            
            const textarea = document.createElement('textarea');
            textarea.value = timelineText;
            textarea.style.width = '100%';
            textarea.style.minHeight = '120px';
            textarea.style.border = '1px solid var(--border)';
            textarea.style.padding = '8px';
            textarea.style.borderRadius = '4px';
            textarea.style.backgroundColor = 'var(--bg-secondary)';
            textarea.style.fontFamily = 'inherit';
            textarea.style.fontSize = '14px';
            textarea.style.lineHeight = '1.6';
            textarea.setAttribute('data-original-timeline', 'true');
            textarea.placeholder = 'Phase | Duration | Status\nPhase 1 | 2 weeks | In Progress\nPhase 2 | 3 weeks | Pending';
            
            timelineContainer.innerHTML = '';
            timelineContainer.appendChild(textarea);
        }

        // Lists - convert to editable text areas
        const listElements = document.querySelectorAll('.content-list');
        listElements.forEach(list => {
            const items = Array.from(list.querySelectorAll('li'));
            const textContent = items.map(item => item.textContent.replace(/^•\s*/, '')).join('\n');
            
            const textarea = document.createElement('textarea');
            textarea.value = textContent;
            textarea.style.width = '100%';
            textarea.style.minHeight = '100px';
            textarea.style.border = '1px solid var(--border)';
            textarea.style.padding = '8px';
            textarea.style.borderRadius = '4px';
            textarea.style.backgroundColor = 'var(--bg-secondary)';
            textarea.style.fontFamily = 'inherit';
            textarea.style.fontSize = '14px';
            textarea.style.lineHeight = '1.6';
            textarea.setAttribute('data-original-list', 'true');
            
            list.parentNode.replaceChild(textarea, list);
        });


        // Case studies - make editable and add controls
        const caseStudyContainer = document.querySelector('.case-studies');
        if (caseStudyContainer) {
            // Add plus button for case studies
            const addCaseStudyBtn = document.createElement('button');
            addCaseStudyBtn.innerHTML = '<i class="fas fa-plus"></i> Add Case Study';
            addCaseStudyBtn.className = 'btn btn-secondary btn-sm';
            addCaseStudyBtn.style.marginTop = '10px';
            addCaseStudyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addCaseStudy();
            });
            caseStudyContainer.appendChild(addCaseStudyBtn);
        }

        const caseStudyElements = document.querySelectorAll('.case-study');
        caseStudyElements.forEach((caseStudy, index) => {
            const clientEl = caseStudy.querySelector('.case-study-client');
            const resultEl = caseStudy.querySelector('.case-study-result');
            
            if (clientEl) {
                clientEl.contentEditable = true;
                clientEl.style.border = '1px solid var(--border)';
                clientEl.style.padding = '4px';
                clientEl.style.borderRadius = '4px';
                clientEl.style.backgroundColor = 'var(--bg-secondary)';
            }
            
            if (resultEl) {
                resultEl.contentEditable = true;
                resultEl.style.border = '1px solid var(--border)';
                resultEl.style.padding = '4px';
                resultEl.style.borderRadius = '4px';
                resultEl.style.backgroundColor = 'var(--bg-secondary)';
            }

            // Add remove button
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
            removeBtn.className = 'btn btn-danger btn-sm';
            removeBtn.style.position = 'absolute';
            removeBtn.style.top = '5px';
            removeBtn.style.right = '5px';
            caseStudy.style.position = 'relative';
            caseStudy.appendChild(removeBtn);
            removeBtn.addEventListener('click', () => this.removeCaseStudy(index));
        });

        // Metrics - make editable and add controls
        const metricsContainer = document.querySelector('.metrics-grid');
        if (metricsContainer) {
            // Add plus button for metrics
            const addMetricBtn = document.createElement('button');
            addMetricBtn.innerHTML = '<i class="fas fa-plus"></i> Add Metric';
            addMetricBtn.className = 'btn btn-secondary btn-sm';
            addMetricBtn.style.marginTop = '10px';
            addMetricBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addMetric();
            });
            metricsContainer.appendChild(addMetricBtn);
        }

        const metricElements = document.querySelectorAll('.metric-item');
        metricElements.forEach((metric, index) => {
            const labelEl = metric.querySelector('.metric-label');
            const valueEl = metric.querySelector('.metric-value');
            const benchmarkEl = metric.querySelector('.metric-benchmark');
            
            [labelEl, valueEl, benchmarkEl].forEach(el => {
                if (el) {
                    el.contentEditable = true;
                    el.style.border = '1px solid var(--border)';
                    el.style.padding = '4px';
                    el.style.borderRadius = '4px';
                    el.style.backgroundColor = 'var(--bg-secondary)';
                }
            });

            // Add remove button
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
            removeBtn.className = 'btn btn-danger btn-sm';
            removeBtn.style.position = 'absolute';
            removeBtn.style.top = '5px';
            removeBtn.style.right = '5px';
            metric.style.position = 'relative';
            metric.appendChild(removeBtn);
            removeBtn.addEventListener('click', () => this.removeMetric(index));
        });

        // Testimonials - make editable and add controls
        const testimonialsContainer = document.querySelector('.testimonials');
        if (testimonialsContainer) {
            // Add plus button for testimonials
            const addTestimonialBtn = document.createElement('button');
            addTestimonialBtn.innerHTML = '<i class="fas fa-plus"></i> Add Testimonial';
            addTestimonialBtn.className = 'btn btn-secondary btn-sm';
            addTestimonialBtn.style.marginTop = '10px';
            addTestimonialBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addTestimonial();
            });
            testimonialsContainer.appendChild(addTestimonialBtn);
        }

        const testimonialElements = document.querySelectorAll('.testimonial');
        testimonialElements.forEach((testimonial, index) => {
            const quoteEl = testimonial.querySelector('.testimonial-quote');
            const authorEl = testimonial.querySelector('.testimonial-author');
            
            if (quoteEl) {
                quoteEl.contentEditable = true;
                quoteEl.style.border = '1px solid var(--border)';
                quoteEl.style.padding = '4px';
                quoteEl.style.borderRadius = '4px';
                quoteEl.style.backgroundColor = 'var(--bg-secondary)';
            }
            
            if (authorEl) {
                authorEl.contentEditable = true;
                authorEl.style.border = '1px solid var(--border)';
                authorEl.style.padding = '4px';
                authorEl.style.borderRadius = '4px';
                authorEl.style.backgroundColor = 'var(--bg-secondary)';
            }

            // Add remove button
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
            removeBtn.className = 'btn btn-danger btn-sm';
            removeBtn.style.position = 'absolute';
            removeBtn.style.top = '5px';
            removeBtn.style.right = '5px';
            testimonial.style.position = 'relative';
            testimonial.appendChild(removeBtn);
            removeBtn.addEventListener('click', () => this.removeTestimonial(index));
        });

        // Pricing items - make editable and add controls
        const pricingContainer = document.querySelector('.pricing-table');
        if (pricingContainer) {
            // Add plus button for pricing
            const addPricingBtn = document.createElement('button');
            addPricingBtn.innerHTML = '<i class="fas fa-plus"></i> Add Pricing Tier';
            addPricingBtn.className = 'btn btn-secondary btn-sm';
            addPricingBtn.style.marginTop = '10px';
            addPricingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addPricingItem();
            });
            pricingContainer.appendChild(addPricingBtn);
        }

        const pricingElements = document.querySelectorAll('.pricing-item');
        pricingElements.forEach((pricing, index) => {
            const tierEl = pricing.querySelector('.pricing-tier');
            const priceEl = pricing.querySelector('.pricing-price');
            const periodEl = pricing.querySelector('.pricing-period');
            
            [tierEl, priceEl, periodEl].forEach(el => {
                if (el) {
                    el.contentEditable = true;
                    el.style.border = '1px solid var(--border)';
                    el.style.padding = '4px';
                    el.style.borderRadius = '4px';
                    el.style.backgroundColor = 'var(--bg-secondary)';
                }
            });

            // Add remove button
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
            removeBtn.className = 'btn btn-danger btn-sm';
            removeBtn.style.position = 'absolute';
            removeBtn.style.top = '5px';
            removeBtn.style.right = '5px';
            removeBtn.addEventListener('click', () => this.removePricingItem(index));
            pricing.style.position = 'relative';
            pricing.appendChild(removeBtn);
        });
    }

    makeContentReadOnly() {
        // Text content
        const textElements = document.querySelectorAll('.content-text, .code-block');
        textElements.forEach(element => {
            element.contentEditable = false;
            element.style.border = 'none';
            element.style.padding = '0';
            element.style.borderRadius = '0';
            element.style.backgroundColor = 'transparent';
        });

        // Convert textareas back to lists
        const listTextareas = document.querySelectorAll('textarea[data-original-list="true"]');
        listTextareas.forEach(textarea => {
            const list = document.createElement('ul');
            list.className = 'content-list';
            
            const lines = textarea.value.split('\n').filter(line => line.trim());
            lines.forEach(line => {
                const li = document.createElement('li');
                li.textContent = line.trim();
                list.appendChild(li);
            });
            
            textarea.parentNode.replaceChild(list, textarea);
        });

        // Convert timeline textarea back to timeline items
        const timelineTextarea = document.querySelector('textarea[data-original-timeline="true"]');
        if (timelineTextarea) {
            const timelineContainer = timelineTextarea.parentNode;
            const lines = timelineTextarea.value.split('\n').filter(line => line.trim());
            
            timelineContainer.innerHTML = '';
            lines.forEach(line => {
                const parts = line.split('|').map(part => part.trim());
                const phase = parts[0] || '';
                const duration = parts[1] || '';
                const status = parts[2] || 'pending';
                
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                timelineItem.innerHTML = `
                    <div class="timeline-phase">${phase}</div>
                    <div class="timeline-duration">${duration}</div>
                    <div class="timeline-status ${status.replace('-', '-')}">${status}</div>
                `;
                timelineContainer.appendChild(timelineItem);
            });
        }


        // Case studies
        const caseStudyElements = document.querySelectorAll('.case-study');
        caseStudyElements.forEach(caseStudy => {
            const clientEl = caseStudy.querySelector('.case-study-client');
            const resultEl = caseStudy.querySelector('.case-study-result');
            
            [clientEl, resultEl].forEach(el => {
                if (el) {
                    el.contentEditable = false;
                    el.style.border = 'none';
                    el.style.padding = '0';
                    el.style.borderRadius = '0';
                    el.style.backgroundColor = 'transparent';
                }
            });
        });

        // Metrics
        const metricElements = document.querySelectorAll('.metric-item');
        metricElements.forEach(metric => {
            const labelEl = metric.querySelector('.metric-label');
            const valueEl = metric.querySelector('.metric-value');
            const benchmarkEl = metric.querySelector('.metric-benchmark');
            
            [labelEl, valueEl, benchmarkEl].forEach(el => {
                if (el) {
                    el.contentEditable = false;
                    el.style.border = 'none';
                    el.style.padding = '0';
                    el.style.borderRadius = '0';
                    el.style.backgroundColor = 'transparent';
                }
            });
        });

        // Testimonials
        const testimonialElements = document.querySelectorAll('.testimonial');
        testimonialElements.forEach(testimonial => {
            const quoteEl = testimonial.querySelector('.testimonial-quote');
            const authorEl = testimonial.querySelector('.testimonial-author');
            
            [quoteEl, authorEl].forEach(el => {
                if (el) {
                    el.contentEditable = false;
                    el.style.border = 'none';
                    el.style.padding = '0';
                    el.style.borderRadius = '0';
                    el.style.backgroundColor = 'transparent';
                }
            });
        });

        // Pricing
        const pricingElements = document.querySelectorAll('.pricing-item');
        pricingElements.forEach(pricing => {
            const tierEl = pricing.querySelector('.pricing-tier');
            const priceEl = pricing.querySelector('.pricing-price');
            const periodEl = pricing.querySelector('.pricing-period');
            
            [tierEl, priceEl, periodEl].forEach(el => {
                if (el) {
                    el.contentEditable = false;
                    el.style.border = 'none';
                    el.style.padding = '0';
                    el.style.borderRadius = '0';
                    el.style.backgroundColor = 'transparent';
                }
            });
        });

        // Clean up add buttons
        const addButtons = document.querySelectorAll('.pricing-table button, .case-studies button, .metrics-grid button, .testimonials button');
        addButtons.forEach(btn => {
            if (btn.innerHTML.includes('Add')) {
                btn.remove();
            }
        });

        // Clean up remove buttons
        const removeButtons = document.querySelectorAll('.pricing-item button, .case-study button, .metric-item button, .testimonial button');
        removeButtons.forEach(btn => {
            if (btn.innerHTML.includes('trash')) {
                btn.remove();
            }
        });
    }

    saveProjectChanges() {
        if (!this.currentProject) return;

        // Update project data with edited content
        const project = this.currentProject;
        
        // Update overview section
        const overviewVision = document.getElementById('overview-vision');
        const overviewProblem = document.getElementById('overview-problem');
        const overviewAudience = document.getElementById('overview-audience');
        const overviewArchitecture = document.getElementById('overview-architecture');
        const overviewResources = document.getElementById('overview-resources');
        
        if (overviewVision) project.overview.vision = overviewVision.textContent;
        if (overviewProblem) project.overview.problemStatement = overviewProblem.textContent;
        if (overviewAudience) project.overview.targetAudience = overviewAudience.textContent;
        if (overviewArchitecture) project.overview.architecture = overviewArchitecture.textContent;
        if (overviewResources) project.overview.resources = overviewResources.textContent;
        
        // Update lists from textareas
        const listTextareas = document.querySelectorAll('textarea[data-original-list="true"]');
        listTextareas.forEach(textarea => {
            const lines = textarea.value.split('\n').filter(line => line.trim());
            const parentId = textarea.parentNode.id;
            
            if (parentId === 'overview-metrics') {
                project.overview.successMetrics = lines;
            } else if (parentId === 'overview-requirements') {
                project.overview.requirements = lines;
            } else if (parentId === 'prompt-criteria') {
                project.promptKit.acceptanceCriteria = lines;
            } else if (parentId === 'prompt-standards') {
                project.promptKit.codingStandards = lines;
            } else if (parentId === 'prompt-api') {
                project.promptKit.apiSpecs = lines;
            } else if (parentId === 'sales-pre-features') {
                project.salesPackPre.features = lines;
            } else if (parentId === 'sales-post-diff') {
                project.salesPackPost.differentiation = lines;
            }
        });

        // Update timeline from textarea
        const timelineTextarea = document.querySelector('textarea[data-original-timeline="true"]');
        if (timelineTextarea) {
            const lines = timelineTextarea.value.split('\n').filter(line => line.trim());
            const timeline = lines.map(line => {
                const parts = line.split('|').map(part => part.trim());
                return {
                    phase: parts[0] || '',
                    duration: parts[1] || '',
                    status: parts[2] || 'pending'
                };
            });
            project.overview.timeline = timeline;
        }

        
        // Update prompt kit section
        const promptSpecs = document.getElementById('prompt-specifications');
        const promptSample = document.getElementById('prompt-sample-data');
        const promptTesting = document.getElementById('prompt-testing');
        const promptSecurity = document.getElementById('prompt-security');
        
        if (promptSpecs) project.promptKit.specifications = promptSpecs.textContent;
        if (promptSample) project.promptKit.sampleData = promptSample.textContent;
        if (promptTesting) project.promptKit.testingStrategy = promptTesting.textContent;
        if (promptSecurity) project.promptKit.security = promptSecurity.textContent;
        
        // Update sales sections
        const salesPreSummary = document.getElementById('sales-pre-summary');
        const salesPreMarket = document.getElementById('sales-pre-market');
        const salesPreValue = document.getElementById('sales-pre-value');
        const salesPreTimeline = document.getElementById('sales-pre-timeline');
        const salesPreRisks = document.getElementById('sales-pre-risks');
        const salesPostDemos = document.getElementById('sales-post-demos');
        const salesPostRoi = document.getElementById('sales-post-roi');
        const salesPostNext = document.getElementById('sales-post-next');
        
        if (salesPreSummary) project.salesPackPre.executiveSummary = salesPreSummary.textContent;
        if (salesPreMarket) project.salesPackPre.marketAnalysis = salesPreMarket.textContent;
        if (salesPreValue) project.salesPackPre.valueProposition = salesPreValue.textContent;
        if (salesPreTimeline) project.salesPackPre.timeline = salesPreTimeline.textContent;
        if (salesPreRisks) project.salesPackPre.riskAssessment = salesPreRisks.textContent;
        
        if (salesPostDemos) project.salesPackPost.demos = salesPostDemos.textContent;
        if (salesPostRoi) project.salesPackPost.roiCalculator = salesPostRoi.textContent;
        if (salesPostNext) project.salesPackPost.nextSteps = salesPostNext.textContent;
        
        // Update case studies
        const caseStudies = [];
        const caseStudyElements = document.querySelectorAll('.case-study');
        caseStudyElements.forEach(caseStudy => {
            const client = caseStudy.querySelector('.case-study-client')?.textContent || '';
            const result = caseStudy.querySelector('.case-study-result')?.textContent || '';
            if (client && result) {
                caseStudies.push({ client, result });
            }
        });
        project.salesPackPost.caseStudies = caseStudies;
        
        // Update metrics
        const metrics = [];
        const metricElements = document.querySelectorAll('.metric-item');
        metricElements.forEach(metric => {
            const label = metric.querySelector('.metric-label')?.textContent || '';
            const value = metric.querySelector('.metric-value')?.textContent || '';
            const benchmark = metric.querySelector('.metric-benchmark')?.textContent || 'N/A';
            if (label && value) {
                metrics.push({ label, value, benchmark });
            }
        });
        project.salesPackPost.metrics = metrics;
        
        // Update testimonials
        const testimonials = [];
        const testimonialElements = document.querySelectorAll('.testimonial');
        testimonialElements.forEach(testimonial => {
            const quote = testimonial.querySelector('.testimonial-quote')?.textContent || '';
            const author = testimonial.querySelector('.testimonial-author')?.textContent || '';
            if (quote && author) {
                testimonials.push({ quote, author });
            }
        });
        project.salesPackPost.testimonials = testimonials;
        
        // Update pricing
        const pricing = {};
        const pricingElements = document.querySelectorAll('.pricing-item');
        pricingElements.forEach(pricingItem => {
            const tier = pricingItem.querySelector('.pricing-tier')?.textContent || '';
            const price = pricingItem.querySelector('.pricing-price')?.textContent || '';
            if (tier && price) {
                const key = tier.toLowerCase().replace(/\s+/g, '_');
                pricing[key] = price;
            }
        });
        project.salesPackPre.pricing = pricing;
        
        // Update last modified date
        project.lastModified = new Date().toISOString().split('T')[0];
        
        // Update the projects array
        const projectIndex = this.projects.findIndex(p => p.id === project.id);
        if (projectIndex !== -1) {
            this.projects[projectIndex] = project;
            console.log('Project updated in array:', project.name);
        } else {
            console.error('Project not found in array:', project.id);
        }
        
        // Update dashboard to reflect changes
        this.renderDashboard();
        
        console.log('Project changes saved for:', project.name);
    }

    // Export functionality
    exportProjects() {
        const csvContent = this.convertProjectsToCSV();
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `projects-export-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    convertProjectsToCSV() {
        const headers = [
            'Project_Name', 'Status', 'Description', 'Tech_Stack', 'Completion_Percentage', 'Priority',
            'Vision', 'Problem_Statement', 'Target_Audience', 'Success_Metrics', 'Requirements',
            'Architecture', 'Timeline_Phases', 'Resources', 'Specifications', 'Acceptance_Criteria',
            'Sample_Data', 'Coding_Standards', 'API_Specs', 'Testing_Strategy', 'Security_Requirements',
            'Executive_Summary', 'Market_Analysis', 'Value_Proposition', 'Features_List', 'Pricing_Model',
            'Development_Timeline', 'Risk_Assessment', 'Demo_Links', 'Case_Studies', 'Success_Metrics_Achieved',
            'Customer_Testimonials', 'ROI_Calculator', 'Competitive_Differentiation', 'Next_Steps'
        ];

        const rows = this.projects.map(project => [
            project.name,
            project.status,
            project.description,
            project.techStack.join('; '),
            project.completionPercentage,
            project.priority,
            project.overview.vision,
            project.overview.problemStatement,
            project.overview.targetAudience,
            project.overview.successMetrics.join('; '),
            project.overview.requirements.join('; '),
            project.overview.architecture,
            project.overview.timeline.map(t => `${t.phase}: ${t.duration} (${t.status})`).join('; '),
            project.overview.resources,
            project.promptKit.specifications,
            project.promptKit.acceptanceCriteria.join('; '),
            project.promptKit.sampleData,
            project.promptKit.codingStandards.join('; '),
            project.promptKit.apiSpecs.join('; '),
            project.promptKit.testingStrategy,
            project.promptKit.security,
            project.salesPackPre.executiveSummary,
            project.salesPackPre.marketAnalysis,
            project.salesPackPre.valueProposition,
            project.salesPackPre.features.join('; '),
            Object.entries(project.salesPackPre.pricing).map(([k, v]) => `${k}: ${v}`).join('; '),
            project.salesPackPre.timeline,
            project.salesPackPre.riskAssessment,
            project.salesPackPost.demos,
            project.salesPackPost.caseStudies.map(c => `${c.client}: ${c.result}`).join('; '),
            project.salesPackPost.metrics.map(m => `${m.label}: ${m.value}`).join('; '),
            project.salesPackPost.testimonials.map(t => `"${t.quote}" - ${t.author}`).join('; '),
            project.salesPackPost.roiCalculator,
            project.salesPackPost.differentiation.join('; '),
            project.salesPackPost.nextSteps
        ]);

        return [headers, ...rows].map(row => 
            row.map(field => `"${(field || '').toString().replace(/"/g, '""')}"`).join(',')
        ).join('\n');
    }

    // Settings functionality
    showSettings() {
        alert('Settings panel coming soon! This will include theme preferences, data management, and user preferences.');
    }

    // User menu functionality
    showUserMenu() {
        alert('User menu coming soon! This will include profile settings, account management, and logout.');
    }

    // Theme toggle functionality
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        console.log('Theme switched to:', newTheme);
    }

    // Initialize theme from localStorage
    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update icon
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Helper methods for adding/removing dynamic content
    addPricingItem() {
        const pricingContainer = document.querySelector('.pricing-table');
        const pricingItem = document.createElement('div');
        pricingItem.className = 'pricing-item';
        pricingItem.innerHTML = `
            <div class="pricing-tier" contenteditable="true" style="border: 1px solid var(--border); padding: 4px; border-radius: 4px; background-color: var(--bg-secondary);">New Tier</div>
            <div class="pricing-price" contenteditable="true" style="border: 1px solid var(--border); padding: 4px; border-radius: 4px; background-color: var(--bg-secondary);">$0</div>
            <div class="pricing-period" contenteditable="true" style="border: 1px solid var(--border); padding: 4px; border-radius: 4px; background-color: var(--bg-secondary);">per month</div>
        `;
        pricingItem.style.position = 'relative';
        
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
        removeBtn.className = 'btn btn-danger btn-sm';
        removeBtn.style.position = 'absolute';
        removeBtn.style.top = '5px';
        removeBtn.style.right = '5px';
        removeBtn.addEventListener('click', () => pricingItem.remove());
        pricingItem.appendChild(removeBtn);
        
        // Insert before the add button
        const addBtn = pricingContainer.querySelector('button');
        pricingContainer.insertBefore(pricingItem, addBtn);
    }

    removePricingItem(index) {
        const pricingItems = document.querySelectorAll('.pricing-item');
        if (pricingItems[index]) {
            pricingItems[index].remove();
        }
    }

    addCaseStudy() {
        const caseStudyContainer = document.querySelector('.case-studies');
        const caseStudy = document.createElement('div');
        caseStudy.className = 'case-study';
        caseStudy.innerHTML = `
            <div class="case-study-client" contenteditable="true" style="border: 1px solid var(--border); padding: 4px; border-radius: 4px; background-color: var(--bg-secondary);">Client Name</div>
            <div class="case-study-result" contenteditable="true" style="border: 1px solid var(--border); padding: 4px; border-radius: 4px; background-color: var(--bg-secondary);">Result description</div>
        `;
        caseStudy.style.position = 'relative';
        
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
        removeBtn.className = 'btn btn-danger btn-sm';
        removeBtn.style.position = 'absolute';
        removeBtn.style.top = '5px';
        removeBtn.style.right = '5px';
        removeBtn.addEventListener('click', () => caseStudy.remove());
        caseStudy.appendChild(removeBtn);
        
        // Insert before the add button
        const addBtn = caseStudyContainer.querySelector('button');
        caseStudyContainer.insertBefore(caseStudy, addBtn);
    }

    removeCaseStudy(index) {
        const caseStudies = document.querySelectorAll('.case-study');
        if (caseStudies[index]) {
            caseStudies[index].remove();
        }
    }

    addMetric() {
        const metricsContainer = document.querySelector('.metrics-grid');
        const metric = document.createElement('div');
        metric.className = 'metric-item';
        metric.innerHTML = `
            <div class="metric-label" contenteditable="true" style="border: 1px solid var(--border); padding: 4px; border-radius: 4px; background-color: var(--bg-secondary);">Metric Label</div>
            <div class="metric-value" contenteditable="true" style="border: 1px solid var(--border); padding: 4px; border-radius: 4px; background-color: var(--bg-secondary);">Value</div>
            <div class="metric-benchmark" contenteditable="true" style="border: 1px solid var(--border); padding: 4px; border-radius: 4px; background-color: var(--bg-secondary);">Benchmark</div>
        `;
        metric.style.position = 'relative';
        
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
        removeBtn.className = 'btn btn-danger btn-sm';
        removeBtn.style.position = 'absolute';
        removeBtn.style.top = '5px';
        removeBtn.style.right = '5px';
        removeBtn.addEventListener('click', () => metric.remove());
        metric.appendChild(removeBtn);
        
        // Insert before the add button
        const addBtn = metricsContainer.querySelector('button');
        metricsContainer.insertBefore(metric, addBtn);
    }

    removeMetric(index) {
        const metrics = document.querySelectorAll('.metric-item');
        if (metrics[index]) {
            metrics[index].remove();
        }
    }

    addTestimonial() {
        const testimonialsContainer = document.querySelector('.testimonials');
        const testimonial = document.createElement('div');
        testimonial.className = 'testimonial';
        testimonial.innerHTML = `
            <div class="testimonial-quote" contenteditable="true" style="border: 1px solid var(--border); padding: 4px; border-radius: 4px; background-color: var(--bg-secondary);">"Testimonial quote"</div>
            <div class="testimonial-author" contenteditable="true" style="border: 1px solid var(--border); padding: 4px; border-radius: 4px; background-color: var(--bg-secondary);">Author Name</div>
        `;
        testimonial.style.position = 'relative';
        
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
        removeBtn.className = 'btn btn-danger btn-sm';
        removeBtn.style.position = 'absolute';
        removeBtn.style.top = '5px';
        removeBtn.style.right = '5px';
        removeBtn.addEventListener('click', () => testimonial.remove());
        testimonial.appendChild(removeBtn);
        
        // Insert before the add button
        const addBtn = testimonialsContainer.querySelector('button');
        testimonialsContainer.insertBefore(testimonial, addBtn);
    }

    removeTestimonial(index) {
        const testimonials = document.querySelectorAll('.testimonial');
        if (testimonials[index]) {
            testimonials[index].remove();
        }
    }

    cloneProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;
        
        const clonedProject = {
            ...JSON.parse(JSON.stringify(project)),
            id: Date.now().toString(),
            name: `${project.name} (Copy)`,
            status: 'idea',
            completionPercentage: 0,
            createdDate: new Date().toISOString().split('T')[0],
            lastModified: new Date().toISOString().split('T')[0]
        };
        
        this.projects.push(clonedProject);
        this.renderDashboard();
    }

    deleteProject(projectId) {
        if (!confirm('Are you sure you want to delete this project?')) return;
        
        this.projects = this.projects.filter(p => p.id !== projectId);
        this.renderDashboard();
    }

    handleFileUpload(files) {
        // Basic file upload handling
        Array.from(files).forEach(file => {
            const fileData = {
                name: file.name,
                type: file.name.split('.').pop(),
                size: this.formatFileSize(file.size),
                date: new Date().toISOString().split('T')[0],
                url: URL.createObjectURL(file)
            };
            
            if (this.currentProject) {
                this.currentProject.files.push(fileData);
                this.renderFilesTab();
            }
        });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getPricingPeriodDescription(tierKey) {
        const descriptions = {
            'freemium': 'Basic features',
            'premium': 'Advanced features',
            'team': 'Collaboration features',
            'enterprise': 'Custom solutions',
            'ultra': 'Premium features',
            'rainbow': 'Special features'
        };
        
        return descriptions[tierKey] || 'Features included';
    }
}

// Initialize the application
const app = new PromptFlowApp();
