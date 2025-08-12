import { useEffect, useMemo, useState } from 'react';
import { useDeckStore } from '../stores/useDeckStore';
import { AppCard } from '../components/cards/AppCard';

export default function AppsGrid() {
  const { apps, setFilter, shuffle, sortBy } = useDeckStore();
  const [query, setQuery] = useState('');
  const [suit, setSuit] = useState<string>('all');
  const [sort, setSort] = useState<'suit' | 'cardValue' | 'progress'>('cardValue');

  useEffect(() => {
    setFilter({ query, suit: suit === 'all' ? undefined : (suit as any) });
  }, [query, suit, setFilter]);

  const filtered = useMemo(() => {
    return apps.filter((a) => {
      const matchesQuery = !query || a.name.toLowerCase().includes(query.toLowerCase());
      const matchesSuit = suit === 'all' || a.suit === suit;
      return matchesQuery && matchesSuit;
    });
  }, [apps, query, suit]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search deck"
          className="w-full md:w-64 rounded-md bg-black/40 border border-white/10 px-3 py-2"
        />
        <select
          className="rounded-md bg-black/40 border border-white/10 px-3 py-2"
          value={suit}
          onChange={(e) => setSuit(e.target.value)}
        >
          <option value="all">All suits</option>
          <option value="spades">♠️ Spades</option>
          <option value="hearts">♥️ Hearts</option>
          <option value="diamonds">♦️ Diamonds</option>
          <option value="clubs">♣️ Clubs</option>
        </select>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-white/10 rounded" onClick={() => shuffle()}>Shuffle</button>
          <select
            className="rounded-md bg-black/40 border border-white/10 px-3 py-2"
            value={sort}
            onChange={(e) => {
              const v = e.target.value as any;
              setSort(v);
              sortBy(v);
            }}
          >
            <option value="cardValue">Sort: Value</option>
            <option value="suit">Sort: Suit</option>
            <option value="progress">Sort: Progress</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
        {!filtered.length && (
          <div className="text-white/70">No cards yet. Use "Draw Card" to add your first app.</div>
        )}
      </div>
    </div>
  );
}

