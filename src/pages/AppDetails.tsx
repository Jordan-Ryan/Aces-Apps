import { useParams } from 'react-router-dom';
import { useDeckStore } from '../stores/useDeckStore';

export default function AppDetails() {
  const { id } = useParams();
  const app = useDeckStore((s) => s.apps.find((a) => a.id === id));

  if (!app) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="card p-6">Card not found.</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">{app.emoji}</div>
          <div>
            <div className="font-display text-2xl">{app.name}</div>
            <div className="text-white/70 text-sm">{app.description || 'No description yet.'}</div>
          </div>
        </div>
        <div className="text-white/80 text-sm">
          <div>Suit: {app.suit}</div>
          <div>Value: {app.cardValue}</div>
          <div>Status: {app.status}</div>
        </div>
      </div>
    </div>
  );
}

