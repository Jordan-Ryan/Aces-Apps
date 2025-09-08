export interface Project {
  id: string
  name: string
  description: string
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'On Hold'
  technology: string[]
  progress: number
  lastUpdated: string
  team: string[]
  estimatedCompletion: string
  details: ProjectDetails
}

export interface ProjectDetails {
  problemStatement: string
  targetUsers: string
  goals: string
  features: {
    mustHave: string[]
    shouldHave: string[]
    couldHave: string[]
  }
  technical: {
    frontend: string
    backend: string
    database: string
    integrations: string[]
    risks: string[]
  }
  timeline: TimelinePhase[]
}

export interface TimelinePhase {
  phase: string
  duration: string
  deliverables: string[]
}

export interface ProjectFilters {
  search: string
  status: string
  technology: string
  sortBy: 'name' | 'progress' | 'lastUpdated' | 'estimatedCompletion'
  sortOrder: 'asc' | 'desc'
}

export type Theme = 'light' | 'dark' | 'system'
