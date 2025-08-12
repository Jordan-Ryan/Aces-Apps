import { Link, NavLink, Outlet } from 'react-router-dom';
import { Club, Diamond, Heart, Spade, PlusCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useDeckStore } from '../../stores/useDeckStore';
import { demoApps } from '../../utils/seed';

export default function AppLayout() {
  const apps = useDeckStore((s) => s.apps);
  const seedApps = useDeckStore((s) => s.seedApps);

  useEffect(() => {
    if (apps.length === 0) {
      seedApps(demoApps());
    }
  }, [apps.length, seedApps]);

  return (
    <div className="min-h-full flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl">🃏</span>
            <div className="leading-tight">
              <div className="font-display text-xl">Aces Apps</div>
              <div className="text-xs text-white/70">Your Deck</div>
            </div>
          </Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/" className={({ isActive }) => navClass(isActive)}>
              Focus
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => navClass(isActive)}>
              Dashboard
            </NavLink>
            <NavLink to="/apps" className={({ isActive }) => navClass(isActive)}>
              Apps
            </NavLink>
            <NavLink to="/components" className={({ isActive }) => navClass(isActive)}>
              Components
            </NavLink>
            <NavLink to="/ideas" className={({ isActive }) => navClass(isActive)}>
              Ideas
            </NavLink>
            <Link
              to="/apps/new"
              className="ml-2 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-medium text-black hover:bg-emerald-400"
            >
              <PlusCircle size={16} /> Draw Card
            </Link>
          </nav>
        </div>
        <div className="border-t border-white/10 bg-black/20">
          <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-4 text-white/80">
            <SuitLegend />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

function navClass(isActive: boolean) {
  return (
    'px-3 py-1.5 rounded-md text-sm font-medium transition hover:bg-white/10 ' +
    (isActive ? 'bg-white/10' : 'bg-transparent')
  );
}

function SuitLegend() {
  const item = 'flex items-center gap-1.5 text-xs';
  return (
    <div className="flex items-center gap-4">
      <span className={item}>
        <Spade className="text-neutral-200" size={14} /> Spades = Ideas
      </span>
      <span className={item}>
        <Heart className="text-rose-400" size={14} /> Hearts = MVP
      </span>
      <span className={item}>
        <Diamond className="text-sky-400" size={14} /> Diamonds = Polish
      </span>
      <span className={item}>
        <Club className="text-emerald-400" size={14} /> Clubs = Complete
      </span>
    </div>
  );
}

