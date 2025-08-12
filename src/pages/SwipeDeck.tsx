import { useEffect, useMemo, useState } from 'react';
import { useDeckStore } from '../stores/useDeckStore';
import { useNavigate } from 'react-router-dom';

type DragState = {
  startX: number;
  startY: number;
  dx: number;
  dy: number;
  active: boolean;
};

export default function SwipeDeck() {
  const apps = useDeckStore((s) => s.apps);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState<DragState>({ startX: 0, startY: 0, dx: 0, dy: 0, active: false });

  useEffect(() => {
    if (index >= apps.length) setIndex(0);
  }, [apps.length, index]);

  const top = apps[index];
  const next = apps[(index + 1) % Math.max(apps.length, 1)];

  const threshold = 100; // px
  const progress = Math.min(1, Math.abs(drag.dx) / threshold);
  const direction = drag.dx > 0 ? 'right' : drag.dx < 0 ? 'left' : 'none';

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setDrag({ startX: e.clientX, startY: e.clientY, dx: 0, dy: 0, active: true });
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.active) return;
    setDrag((d) => ({ ...d, dx: e.clientX - d.startX, dy: e.clientY - d.startY }));
  };
  const handlePointerUp = () => {
    if (!drag.active) return;
    const dx = drag.dx;
    if (dx > threshold) {
      // open
      if (top) navigate(`/apps/${top.id}`);
      setDrag({ startX: 0, startY: 0, dx: 0, dy: 0, active: false });
      return;
    }
    if (dx < -threshold) {
      // skip to next
      setIndex((i) => (i + 1 < apps.length ? i + 1 : 0));
      setDrag({ startX: 0, startY: 0, dx: 0, dy: 0, active: false });
      return;
    }
    setDrag({ startX: 0, startY: 0, dx: 0, dy: 0, active: false });
  };

  const cardStyle = useMemo(() => {
    const rotate = (drag.dx / 20);
    const translate = `translate(${drag.dx}px, ${drag.dy}px) rotate(${rotate}deg)`;
    return {
      transform: drag.active ? translate : 'translate(0px, 0px) rotate(0deg)',
      transition: drag.active ? 'none' : 'transform 200ms ease',
    } as React.CSSProperties;
  }, [drag]);

  return (
    <div className="mx-auto max-w-md px-4 py-6 min-h-[calc(100dvh-100px)] flex flex-col">
      <div className="mb-4 text-center">
        <h1 className="font-display text-2xl">Your Hand</h1>
        <p className="text-white/70 text-sm">Swipe left to skip, right to open</p>
      </div>

      <div className="relative flex-1">
        {/* Next card preview */}
        {next && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="card w-full max-w-sm aspect-[2/3] scale-95 opacity-70" />
          </div>
        )}

        {/* Top card */}
        {top && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="card w-full max-w-sm aspect-[2/3] p-4 cursor-grab active:cursor-grabbing select-none"
              style={cardStyle}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between text-xs opacity-80">
                  <span>{top.cardValue}</span>
                  <span>{symbolForSuit(top.suit)}</span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
                  <div className="text-5xl mb-2">{top.emoji}</div>
                  <div className="font-display text-2xl">{top.name}</div>
                  <div className="text-white/70 text-sm line-clamp-3 mt-1">{top.description}</div>
                </div>

                <div className="flex items-center justify-between text-xs opacity-80">
                  <span>{symbolForSuit(top.suit)}</span>
                  <span>{top.cardValue}</span>
                </div>
              </div>

              {/* Overlays */}
              <div className="pointer-events-none absolute inset-0">
                {direction === 'left' && (
                  <div className="absolute left-3 top-3 text-xs font-bold px-2 py-1 rounded-md border border-rose-400 text-rose-300" style={{ opacity: progress }}>
                    Skip
                  </div>
                )}
                {direction === 'right' && (
                  <div className="absolute right-3 top-3 text-xs font-bold px-2 py-1 rounded-md border border-emerald-400 text-emerald-300" style={{ opacity: progress }}>
                    Open
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          className="w-full rounded-full bg-white/10 border border-white/15 py-3 text-sm"
          onClick={() => setIndex((i) => (i + 1 < apps.length ? i + 1 : 0))}
        >
          Skip
        </button>
        <button
          className="w-full rounded-full bg-emerald-500 text-black font-medium py-3 text-sm"
          onClick={() => top && navigate(`/apps/${top.id}`)}
        >
          Open
        </button>
      </div>
    </div>
  );
}

function symbolForSuit(suit: 'spades' | 'hearts' | 'diamonds' | 'clubs') {
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

