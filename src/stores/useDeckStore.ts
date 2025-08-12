import { create } from 'zustand';
import type { AppModel, GlobalComponent, Suit } from '../types/models';
import { v4 as uuid } from 'uuid';

type Filter = {
  suit?: Suit;
  status?: AppModel['status'];
  query?: string;
};

type DeckState = {
  apps: AppModel[];
  components: GlobalComponent[];
  filter: Filter;
  addApp: (partial: Partial<AppModel>) => AppModel;
  updateApp: (id: string, updates: Partial<AppModel>) => void;
  removeApp: (id: string) => void;
  setFilter: (filter: Filter) => void;
  shuffle: () => void;
  sortBy: (key: 'suit' | 'cardValue' | 'progress') => void;
};

function generateDefaultApp(partial: Partial<AppModel>): AppModel {
  const now = new Date();
  const id = partial.id ?? uuid();
  return {
    id,
    name: partial.name ?? 'New App',
    emoji: partial.emoji ?? '🃏',
    suit: partial.suit ?? 'spades',
    cardValue: partial.cardValue ?? 1,
    description: partial.description ?? '',
    status: partial.status ?? 'idea',
    context: partial.context ?? '',
    features: partial.features ?? [],
    sharedComponents: partial.sharedComponents ?? [],
    perplexitySpace: partial.perplexitySpace ?? {
      spaceId: '',
      spaceName: '',
      lastSyncAt: now,
      syncStatus: 'pending',
    },
    braindumpContent: partial.braindumpContent ?? {
      localContent: '',
      lastModified: now,
      wordCount: 0,
      ideaCount: 0,
    },
    createdAt: partial.createdAt ?? now,
    updatedAt: partial.updatedAt ?? now,
    mvpPhases: partial.mvpPhases ?? [],
  };
}

export const useDeckStore = create<DeckState>((set, get) => ({
  apps: [],
  components: [],
  filter: {},
  addApp: (partial) => {
    const app = generateDefaultApp(partial);
    set((state) => ({ apps: [app, ...state.apps] }));
    return app;
  },
  updateApp: (id, updates) => {
    set((state) => ({
      apps: state.apps.map((a) => (a.id === id ? { ...a, ...updates, updatedAt: new Date() } : a)),
    }));
  },
  removeApp: (id) => set((state) => ({ apps: state.apps.filter((a) => a.id !== id) })),
  setFilter: (filter) => set({ filter }),
  shuffle: () => {
    const shuffled = [...get().apps]
      .map((a) => ({ a, sort: Math.random() }))
      .sort((x, y) => x.sort - y.sort)
      .map(({ a }) => a);
    set({ apps: shuffled });
  },
  sortBy: (key) => {
    const sorted = [...get().apps];
    if (key === 'suit') sorted.sort((a, b) => a.suit.localeCompare(b.suit));
    if (key === 'cardValue') sorted.sort((a, b) => b.cardValue - a.cardValue);
    if (key === 'progress')
      sorted.sort((a, b) =>
        (averageProgress(b.features) ?? 0) - (averageProgress(a.features) ?? 0),
      );
    set({ apps: sorted });
  },
}));

function averageProgress(features: AppModel['features']): number {
  if (!features.length) return 0;
  const total = features.reduce((acc, f) => acc + (f.progress ?? 0), 0);
  return Math.round(total / features.length);
}
