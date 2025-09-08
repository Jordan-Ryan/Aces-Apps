import { Project } from '@/types/Project'

export const sampleProjects: Project[] = [
  {
    id: "familysync-calendar",
    name: "FamilySync Calendar",
    description: "Cross-platform family organization app with shared calendars, chores, and smart display support",
    status: "In Progress",
    technology: ["React Native", "Node.js", "PostgreSQL", "Firebase"],
    progress: 25,
    lastUpdated: "2025-01-06",
    team: ["Product Owner", "Full-Stack Developer"],
    estimatedCompletion: "2025-12-06",
    details: {
      problemStatement: "Families struggle with fragmented organization tools—calendars on phones, chore charts on fridges, shopping lists scattered, resulting in missed appointments and chaos.",
      targetUsers: "Busy parents (32-45) with 2-3 kids juggling complex schedules.",
      goals: "Unify family organization, reduce mental load, keep everyone coordinated.",
      features: {
        mustHave: [
          "Shared family calendar with color coding",
          "Basic chore assignment and tracking",
          "Family member profiles",
          "iOS/Android mobile apps",
          "Google/Apple calendar sync"
        ],
        shouldHave: [
          "Smart display support (Echo Show)",
          "Shopping lists",
          "Meal planning",
          "Push notifications"
        ],
        couldHave: [
          "Voice Alexa commands",
          "Photo sharing for tasks",
          "Family productivity analytics"
        ]
      },
      technical: {
        frontend: "React Native with Expo",
        backend: "Node.js & GraphQL API",
        database: "PostgreSQL + Redis",
        integrations: ["Google Calendar API", "Microsoft Graph", "Firebase"],
        risks: [
          "Echo Show sideloading blocked",
          "Calendar API rate limits",
          "Cross-platform performance"
        ]
      },
      timeline: [
        { phase: "MVP", duration: "12w", deliverables: ["Core calendar", "Apps", "Chores"] },
        { phase: "V1.1", duration: "8w", deliverables: ["Smart display", "Lists", "Notifications"] },
        { phase: "V1.2", duration: "12w", deliverables: ["Voice, Analytics, advanced features"] }
      ]
    }
  },
  {
    id: "taskflow-mobile",
    name: "TaskFlow Mobile",
    description: "AI-powered task management app with intelligent prioritization and team collaboration",
    status: "Planning",
    technology: ["Flutter", "Python", "TensorFlow", "MongoDB"],
    progress: 5,
    lastUpdated: "2025-01-05",
    team: ["AI Engineer", "Mobile Developer", "UX Designer"],
    estimatedCompletion: "2025-08-15",
    details: {
      problemStatement: "Teams waste 20% of their time on task prioritization and context switching between tools.",
      targetUsers: "Remote teams of 5-50 people in tech companies.",
      goals: "Reduce task management overhead by 40% through AI automation.",
      features: {
        mustHave: [
          "AI task prioritization",
          "Team collaboration tools",
          "Cross-platform mobile apps",
          "Real-time synchronization"
        ],
        shouldHave: [
          "Voice task creation",
          "Smart notifications",
          "Analytics dashboard",
          "Integration with popular tools"
        ],
        couldHave: [
          "Predictive scheduling",
          "Team performance insights",
          "Custom AI models"
        ]
      },
      technical: {
        frontend: "Flutter for mobile, React for web",
        backend: "Python FastAPI",
        database: "MongoDB with Redis caching",
        integrations: ["Slack", "Jira", "Notion", "Google Workspace"],
        risks: [
          "AI model accuracy",
          "Real-time sync complexity",
          "Cross-platform performance"
        ]
      },
      timeline: [
        { phase: "Research", duration: "4w", deliverables: ["AI model research", "UI/UX design"] },
        { phase: "MVP", duration: "12w", deliverables: ["Core app", "Basic AI features"] },
        { phase: "V1.0", duration: "8w", deliverables: ["Advanced features", "Team tools"] }
      ]
    }
  },
  {
    id: "healthtrack-pro",
    name: "HealthTrack Pro",
    description: "Comprehensive health monitoring platform with wearable integration and AI insights",
    status: "Review",
    technology: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    progress: 85,
    lastUpdated: "2025-01-04",
    team: ["Full-Stack Developer", "Data Scientist", "UI/UX Designer"],
    estimatedCompletion: "2025-02-28",
    details: {
      problemStatement: "Health data is scattered across multiple apps and devices, making it hard to get actionable insights.",
      targetUsers: "Health-conscious individuals aged 25-65 with multiple wearables.",
      goals: "Provide unified health insights and personalized recommendations.",
      features: {
        mustHave: [
          "Wearable device integration",
          "Health data visualization",
          "Goal tracking and reminders",
          "Data export capabilities"
        ],
        shouldHave: [
          "AI health insights",
          "Doctor sharing features",
          "Medication tracking",
          "Social features"
        ],
        couldHave: [
          "Predictive health analytics",
          "Insurance integration",
          "Telemedicine features"
        ]
      },
      technical: {
        frontend: "React with TypeScript",
        backend: "Node.js with Express",
        database: "PostgreSQL with TimescaleDB",
        integrations: ["Apple Health", "Google Fit", "Fitbit", "Garmin"],
        risks: [
          "Data privacy compliance",
          "API rate limits",
          "Real-time data processing"
        ]
      },
      timeline: [
        { phase: "Core Platform", duration: "16w", deliverables: ["Basic app", "Wearable integration"] },
        { phase: "AI Features", duration: "8w", deliverables: ["Insights engine", "Recommendations"] },
        { phase: "Polish", duration: "4w", deliverables: ["UI polish", "Testing", "Launch prep"] }
      ]
    }
  }
]
