export type AppStatus = 'Idea' | 'MVP' | 'Development' | 'Complete';

export type AppIdea = {
  id: string;
  name: string;
  description: string;
  status: AppStatus;
  progress: number; // 0-100
  previewUrl?: string;
};

export const DUMMY_APPS: AppIdea[] = [
  { id: '1', name: 'TaskMaster', description: 'Organize your daily tasks effortlessly.', status: 'Idea', progress: 20 },
  { id: '2', name: 'FitBuddy', description: 'Track workouts and progress smoothly.', status: 'MVP', progress: 45 },
  { id: '3', name: 'RecipeBox', description: 'Save and share your favorite recipes.', status: 'Development', progress: 70 },
  { id: '4', name: 'BudgetBee', description: 'Simple budgeting with insights.', status: 'Idea', progress: 10 },
  { id: '5', name: 'TravelMate', description: 'Plan trips with collaborative lists.', status: 'Complete', progress: 100 },
  { id: '6', name: 'Re-Readz', description: 'Marketplace for pre-loved books.', status: 'MVP', progress: 60, previewUrl: 'https://re-readz.com/' },
  { id: '7', name: 'BookAll Services', description: 'Local services booking platform.', status: 'Idea', progress: 15, previewUrl: 'https://bookallservices.co.uk/' },
];
