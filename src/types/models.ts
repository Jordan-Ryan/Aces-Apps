export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';

export interface Feature {
  id: string;
  name: string;
  status: 'planned' | 'in-progress' | 'complete';
  context: string;
  progress: number; // 0-100
  priority: 'low' | 'medium' | 'high';
}

export interface MVPPhase {
  id: string;
  name: string;
  done: boolean;
}

export interface AppModel {
  id: string;
  name: string;
  emoji: string;
  suit: Suit;
  cardValue: number; // 1-13 for prioritization
  description: string;
  status: 'idea' | 'mvp' | 'development' | 'complete';
  context: string; // Rich text
  features: Feature[];
  sharedComponents: string[]; // Component IDs
  perplexitySpace: {
    spaceId: string;
    spaceName: string;
    lastSyncAt: Date;
    syncStatus: 'synced' | 'pending' | 'error';
  };
  braindumpContent: {
    localContent: string;
    lastModified: Date;
    wordCount: number;
    ideaCount: number;
  };
  createdAt: Date;
  updatedAt: Date;
  mvpPhases: MVPPhase[];
}

export interface GlobalComponent {
  id: string;
  name: string;
  code: string;
  preview: string;
  usedInApps: string[];
  version: string;
  lastUpdated: Date;
}
