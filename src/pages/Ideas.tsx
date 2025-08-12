import { useDeckStore } from '../stores/useDeckStore';

export default function IdeasPage() {
  const addApp = useDeckStore((s) => s.addApp);
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="font-display text-2xl mb-4">Draw New Cards</h1>
      <div className="card p-4 space-y-3">
        <button
          className="px-3 py-2 rounded bg-emerald-500 text-black font-medium"
          onClick={() => addApp({ name: 'New Idea', suit: 'spades', emoji: '📝', status: 'idea', cardValue: 1 })}
        >
          Quick Add (Spade)
        </button>
        <div className="text-white/70">Idea Roulette and Inspiration Board coming soon.</div>
      </div>
    </div>
  );
}

