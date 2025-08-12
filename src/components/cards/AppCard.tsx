import type { AppModel } from '../../types/models';
import { Link } from 'react-router-dom';

type Props = {
  app: AppModel;
};

export function AppCard({ app }: Props) {
  const suitColor = getSuitColor(app.suit);
  const progress = Math.round(
    app.features.length
      ? app.features.reduce((a, f) => a + (f.progress ?? 0), 0) / app.features.length
      : app.status === 'complete'
        ? 100
        : 0,
  );

  return (
    <Link
      to={`/apps/${app.id}`}
      className="card card-hover aspect-[2/3] p-3 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `conic-gradient(${suitColor} ${progress}%, transparent ${progress}%)`,
        }}
      />

      <div className="relative h-full flex flex-col">
        <div className="flex items-center justify-between text-xs opacity-80">
          <span>{app.cardValue}</span>
          <span style={{ color: suitColor }}>{symbolForSuit(app.suit)}</span>
        </div>

        <div className="flex-1 flex items-center justify-center text-center">
          <div>
            <div className="text-4xl mb-1">{app.emoji}</div>
            <div className="font-display text-xl">{app.name}</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs opacity-80">
          <span style={{ color: suitColor }}>{symbolForSuit(app.suit)}</span>
          <span>{app.cardValue}</span>
        </div>
      </div>
    </Link>
  );
}

function getSuitColor(suit: AppModel['suit']) {
  switch (suit) {
    case 'spades':
      return '#e5e7eb';
    case 'hearts':
      return '#fb7185';
    case 'diamonds':
      return '#38bdf8';
    case 'clubs':
      return '#34d399';
  }
}

function symbolForSuit(suit: AppModel['suit']) {
  switch (suit) {
    case 'spades':
      return '♠️';
    case 'hearts':
      return '♥️';
    case 'diamonds':
      return '♦️';
    case 'clubs':
      return '♣️';
  }
}

