import { Link } from 'react-router-dom';
import { useDeckStore } from '../stores/useDeckStore';

export default function Dashboard() {
  const apps = useDeckStore((s) => s.apps);
  const completed = apps.filter((a) => a.status === 'complete').length;
  const active = apps.filter((a) => a.status === 'mvp' || a.status === 'development').length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="font-display text-3xl mb-4">Your Deck</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Total Cards" value={apps.length} />
        <StatsCard label="Cards in Play" value={active} />
        <StatsCard label="Winning Hands" value={completed} />
        <StatsCard label="Current Streak" value={0} />
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl">Deck Overview</h2>
          <Link to="/apps" className="text-emerald-400 text-sm">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <SuitStat suit="♠️ Spades" count={apps.filter((a) => a.suit === 'spades').length} />
          <SuitStat suit="♥️ Hearts" count={apps.filter((a) => a.suit === 'hearts').length} />
          <SuitStat suit="♦️ Diamonds" count={apps.filter((a) => a.suit === 'diamonds').length} />
          <SuitStat suit="♣️ Clubs" count={apps.filter((a) => a.suit === 'clubs').length} />
        </div>
      </div>
    </div>
  );
}

function StatsCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-4 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );
}

function SuitStat({ suit, count }: { suit: string; count: number }) {
  return (
    <div className="flex items-center justify-between bg-black/30 rounded-lg px-3 py-2 border border-white/10">
      <span>{suit}</span>
      <span className="text-white/80">{count}</span>
    </div>
  );
}

