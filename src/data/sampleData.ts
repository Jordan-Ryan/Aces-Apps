import { Project } from '@/types/Project'

export const sampleProject: Project = {
  id: 'familysync-calendar',
  name: 'FamilySync Calendar',
  description: 'Cross-platform family organization app with shared calendars, chores, and smart display support',
  status: 'Development',
  technology: ['React Native', 'Node.js', 'PostgreSQL', 'Firebase'],
  progress: 25,
  lastUpdated: '2025-01-15',
  estimatedCompletion: '2025-06-15',
  
  // Solo developer fields
  monetization: 'Freemium',
  estimatedCost: 2500,
  currentBlockers: [
    'Need to integrate with Google Calendar API - waiting for approval',
    'Echo Show sideloading restrictions blocking smart display features'
  ],
  nextMilestones: [
    'Complete Google Calendar API integration',
    'Implement basic chore tracking system',
    'Set up Firebase authentication'
  ],
  marketValidation: 'Conducted 20 user interviews with parents aged 30-45. 85% expressed strong interest in unified family organization tool.',
  competitorAnalysis: 'Cozi and Family Wall are main competitors, but lack real-time sync and smart display integration.',
  launchStrategy: 'Soft launch to 100 beta families, then App Store submission with influencer partnerships targeting parenting blogs.',
  
  details: {
    problemStatement: 'Families struggle with fragmented organization tools—calendars on phones, chore charts on fridges, shopping lists scattered, resulting in missed appointments and chaos.',
    targetUsers: 'Busy parents (32-45) with 2-3 kids juggling complex schedules. Goals: Unify family organization, reduce mental load, keep everyone coordinated.',
    goals: 'Create a single app that replaces multiple family organization tools, with real-time sync and smart display support.',
    features: {
      mustHave: [
        'Shared family calendar with color coding',
        'Basic chore assignment and tracking',
        'Family member profiles',
        'iOS/Android mobile apps',
        'Google/Apple calendar sync'
      ],
      shouldHave: [
        'Smart display support (Echo Show)',
        'Shopping lists',
        'Meal planning',
        'Push notifications'
      ],
      couldHave: [
        'Voice Alexa commands',
        'Photo sharing for tasks',
        'Family productivity analytics'
      ]
    },
    technical: {
      frontend: 'React Native with Expo for cross-platform development',
      backend: 'Node.js with Express and GraphQL API',
      database: 'PostgreSQL with Redis for caching',
      integrations: ['Google Calendar API', 'Microsoft Graph', 'Firebase', 'Alexa Skills Kit'],
      risks: [
        'Echo Show sideloading may be blocked by Amazon policies',
        'Google Calendar API rate limits could affect sync performance',
        'Cross-platform performance optimization challenges'
      ]
    },
    business: {
      monetizationStrategy: 'Freemium model with basic features free, premium subscription for advanced features and unlimited family members.',
      revenueModel: 'Monthly subscriptions: $4.99/month for up to 6 family members, $9.99/month for unlimited members and advanced features.',
      targetMarketSize: 'US family market: 35M families with children under 18, targeting 1% market penetration (350K families).',
      competitorAnalysis: 'Cozi (2M+ users, $4.99/month) and Family Wall (500K+ users, $2.99/month) are main competitors. Our differentiation: real-time sync, smart display integration, and better UX.',
      uniqueValueProposition: 'The only family organization app with real-time sync across all devices and smart display integration for kitchen/dining room use.',
      pricingStrategy: 'Free tier: 1 calendar, 2 family members, basic features. Premium: unlimited calendars, unlimited members, advanced features, priority support.',
      marketValidation: '20 user interviews with target demographic. 85% expressed strong interest, 60% said they would pay $4.99/month for the full feature set.',
      businessRisks: [
        'High customer acquisition costs in competitive family app market',
        'Apple/Google app store policy changes affecting monetization',
        'Seasonal usage patterns (higher in school year) affecting revenue consistency'
      ]
    },
    planning: {
      currentBlockers: [
        'Google Calendar API approval taking longer than expected (2 weeks behind)',
        'Echo Show sideloading restrictions need workaround solution',
        'Need to hire freelance designer for UI/UX improvements'
      ],
      nextActions: [
        'Follow up with Google on API approval status',
        'Research alternative smart display solutions',
        'Create detailed wireframes for core features',
        'Set up analytics and crash reporting'
      ],
      weeklyMilestones: [
        {
          title: 'Complete Google Calendar Integration',
          dueDate: '2025-01-22',
          completed: false,
          description: 'Finish API integration and test with real calendar data'
        },
        {
          title: 'Implement Basic Chore Tracking',
          dueDate: '2025-01-29',
          completed: false,
          description: 'Create chore assignment and completion tracking system'
        },
        {
          title: 'Set up Firebase Authentication',
          dueDate: '2025-02-05',
          completed: true,
          description: 'Implement user registration and family member management'
        }
      ],
      learningRequirements: [
        'Advanced React Native performance optimization',
        'Google Calendar API best practices',
        'Firebase security rules and data modeling',
        'App Store optimization and ASO'
      ],
      estimatedCosts: {
        developmentTools: 200,
        servicesApis: 150,
        appStoreFees: 200,
        marketingBudget: 1000,
        total: 1550
      },
      launchChecklist: [
        { title: 'Complete MVP development', completed: false, priority: 'High' },
        { title: 'Beta testing with 20 families', completed: false, priority: 'High' },
        { title: 'App Store submission', completed: false, priority: 'High' },
        { title: 'Create landing page', completed: false, priority: 'Medium' },
        { title: 'Set up analytics tracking', completed: true, priority: 'Medium' },
        { title: 'Write privacy policy', completed: false, priority: 'Low' }
      ],
      postLaunchPlan: 'Focus on user feedback collection, iterate on core features, expand to web platform, add voice commands integration.'
    },
    links: {
      development: {
        github: 'https://github.com/username/familysync-calendar',
        figma: 'https://figma.com/file/abc123/familysync-designs',
        cursor: 'https://cursor.sh/workspace/familysync',
        gptSpace: 'https://chat.openai.com/g/familysync-assistant'
      },
      business: {
        competitorResearch: [
          'https://cozi.com',
          'https://familywall.com',
          'https://ourhome.com'
        ],
        marketResearch: [
          'https://research.com/family-app-market',
          'https://statista.com/parenting-apps'
        ],
        analytics: 'https://analytics.google.com/analytics/web/#/p123456789'
      },
      marketing: {
        landingPage: 'https://familysync.app',
        socialMedia: [
          'https://twitter.com/familysyncapp',
          'https://facebook.com/familysyncapp'
        ],
        pressKit: 'https://familysync.app/press'
      },
      legal: {
        privacyPolicy: 'https://familysync.app/privacy',
        termsOfService: 'https://familysync.app/terms',
        appStoreGuidelines: 'https://developer.apple.com/app-store/review/guidelines'
      }
    },
    timeline: [
      {
        phase: 'MVP Development',
        duration: '12 weeks',
        deliverables: ['Core calendar functionality', 'Basic chore tracking', 'Mobile apps', 'User authentication']
      },
      {
        phase: 'Beta Testing',
        duration: '4 weeks',
        deliverables: ['Beta app release', 'User feedback collection', 'Bug fixes', 'Performance optimization']
      },
      {
        phase: 'Launch Preparation',
        duration: '4 weeks',
        deliverables: ['App Store submission', 'Marketing materials', 'Landing page', 'Press kit']
      }
    ]
  }
}

export const sampleProjects: Project[] = [sampleProject]