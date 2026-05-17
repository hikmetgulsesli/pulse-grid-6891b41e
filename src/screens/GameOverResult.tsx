// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Over (result)
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, Menu } from "lucide-react";


export type GameOverResultActionId = "main-menu-1" | "play-again-2";

export interface GameOverResultProps {
  actions?: Partial<Record<GameOverResultActionId, () => void>>;
  score?: number;
  moves?: number;
  bestScore?: number;
  nodesConnected?: number;
  totalNodes?: number;
  elapsedTicks?: number;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

function formatElapsedTime(ticks: number): string {
  const totalSeconds = Math.max(0, Math.floor(ticks));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function GameOverResult({
  actions,
  score = 0,
  moves = 0,
  bestScore = 0,
  nodesConnected = 0,
  totalNodes = 0,
  elapsedTicks = 0,
}: GameOverResultProps) {
  const isNewHighScore = score > 0 && score >= bestScore;
  const nodesLabel = totalNodes > 0 ? `${nodesConnected}/${totalNodes}` : String(nodesConnected);

  return (
    <>
      {/* Glitchy Background Layer */}
      <div aria-hidden={true} className="absolute inset-0 z-0 opacity-20 pointer-events-none flex flex-wrap gap-gutter p-gutter content-start justify-center">
      {/* Faux grid nodes */}
      <div className="w-16 h-16 border border-primary bg-primary/10"></div>
      <div className="w-16 h-16 border border-outline-variant"></div>
      <div className="w-16 h-16 border border-outline-variant"></div>
      <div className="w-16 h-16 border border-primary bg-primary/5"></div>
      <div className="w-16 h-16 border border-outline-variant"></div>
      <div className="w-16 h-16 border border-outline-variant translate-y-2 translate-x-1"></div>
      <div className="w-16 h-16 border border-primary bg-primary/20"></div>
      <div className="w-16 h-16 border border-outline-variant"></div>
      <div className="w-16 h-16 border border-outline-variant"></div>
      <div className="w-16 h-16 border border-outline-variant"></div>
      <div className="w-16 h-16 border border-primary bg-primary/10 -translate-y-1"></div>
      <div className="w-16 h-16 border border-outline-variant"></div>
      <div className="w-16 h-16 border border-outline-variant"></div>
      <div className="w-16 h-16 border border-outline-variant"></div>
      <div className="w-16 h-16 border border-primary bg-primary/5"></div>
      <div className="w-16 h-16 border border-outline-variant"></div>
      </div>
      {/* Main Result Panel */}
      <main className="relative z-10 w-full max-w-[600px] bg-surface border border-outline-variant shadow-[0_0_30px_rgba(75,226,119,0.05)] p-6 md:p-10 flex flex-col items-center text-center">
      {/* Status Indicator */}
      <div className="w-16 h-16 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(75,226,119,0.2)]">
      <Circle className="text-primary text-[32px]" aria-hidden={true} focusable="false" />
      </div>
      {/* Headline */}
      <h1 className="text-primary text-headline-lg font-headline-lg uppercase tracking-widest mb-2">
                  System Restored
              </h1>
      <p className="text-on-surface-variant text-body-md font-body-md mb-8">
                  Signal integrity stabilized across all sectors.
              </p>
      {/* High Score Chip */}
      {isNewHighScore && (
      <div className="bg-tertiary-container border border-tertiary text-on-tertiary-container font-label-sm text-label-sm px-4 py-1 rounded-full uppercase tracking-widest mb-8 flex items-center gap-2">
      <Circle className="text-[16px]" aria-hidden={true} focusable="false" />
                  New High Score!
              </div>
      )}
      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-unit w-full mb-10">
      {/* Score Block (Full Width) */}
      <div className="md:col-span-2 bg-surface-container border border-outline-variant p-6 flex flex-col items-center justify-center">
      <span className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-widest mb-2">Final Score</span>
      <span className="text-on-surface text-headline-lg font-data-lg text-[40px] leading-none text-primary-fixed">{formatNumber(score)}</span>
      </div>
      {/* Time Block */}
      <div className="bg-surface-container border border-outline-variant p-4 flex flex-col items-center justify-center">
      <span className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-widest mb-1 flex items-center gap-1">
      <Circle className="text-[14px]" aria-hidden={true} focusable="false" /> Time
                      </span>
      <span className="text-on-surface text-data-lg font-data-lg">{formatElapsedTime(elapsedTicks)}</span>
      </div>
      {/* Nodes Block */}
      <div className="bg-surface-container border border-outline-variant p-4 flex flex-col items-center justify-center">
      <span className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-widest mb-1 flex items-center gap-1">
      <Circle className="text-[14px]" aria-hidden={true} focusable="false" /> Nodes Connected
                      </span>
      <span className="text-on-surface text-data-lg font-data-lg">{nodesLabel}</span>
      <span className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-widest mt-1">{moves} Moves</span>
      </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row w-full gap-4">
      <button className="flex-1 h-touch-target-min bg-surface border border-outline-variant text-on-surface font-label-sm text-label-sm uppercase tracking-widest hover:bg-surface-container hover:border-outline transition-colors flex items-center justify-center gap-2" type="button" data-action-id="main-menu-1" onClick={actions?.["main-menu-1"]}>
      <Menu className="text-[18px]" aria-hidden={true} focusable="false" />
                      Main Menu
                  </button>
      <button className="flex-1 h-touch-target-min bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary-fixed transition-colors border border-transparent hover:border-primary-fixed flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(75,226,119,0.3)]" type="button" data-action-id="play-again-2" onClick={actions?.["play-again-2"]}>
      <Circle className="text-[18px]" aria-hidden={true} focusable="false" />
                      Play Again
                  </button>
      </div>
      </main>
    </>
  );
}
