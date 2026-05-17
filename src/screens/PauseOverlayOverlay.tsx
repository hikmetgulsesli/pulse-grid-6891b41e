// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Pause Overlay (overlay)
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, Play, RefreshCw } from "lucide-react";


export type PauseOverlayOverlayActionId = "resume-1" | "restart-level-2" | "return-to-main-menu-3";

export interface PauseOverlayOverlayProps {
  actions?: Partial<Record<PauseOverlayOverlayActionId, () => void>>;
  level?: number;
  score?: number;
  moves?: number;
}

export function PauseOverlayOverlay({ actions, level = 1, score = 0, moves = 0 }: PauseOverlayOverlayProps) {
  return (
    <>
      {/* Faint Background Game Board (Simulated) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{backgroundImage: "radial-gradient(circle at center, #171f33 2px, transparent 2px)", backgroundSize: "32px 32px"}}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border border-outline-variant grid grid-cols-4 grid-rows-4 gap-gutter p-gutter">
      {/* Simulated grid nodes */}
      <div className="border border-outline-variant rounded-DEFAULT"></div>
      <div className="border border-outline-variant rounded-DEFAULT bg-surface-container-high"></div>
      <div className="border border-outline-variant rounded-DEFAULT"></div>
      <div className="border border-outline-variant rounded-DEFAULT bg-surface-container-high"></div>
      <div className="border border-outline-variant rounded-DEFAULT bg-surface-container-high"></div>
      <div className="border border-outline-variant rounded-DEFAULT border-primary"></div>
      <div className="border border-outline-variant rounded-DEFAULT"></div>
      <div className="border border-outline-variant rounded-DEFAULT"></div>
      <div className="border border-outline-variant rounded-DEFAULT"></div>
      <div className="border border-outline-variant rounded-DEFAULT"></div>
      <div className="border border-outline-variant rounded-DEFAULT bg-surface-container-high"></div>
      <div className="border border-outline-variant rounded-DEFAULT border-secondary"></div>
      <div className="border border-outline-variant rounded-DEFAULT bg-surface-container-high"></div>
      <div className="border border-outline-variant rounded-DEFAULT"></div>
      <div className="border border-outline-variant rounded-DEFAULT border-primary"></div>
      <div className="border border-outline-variant rounded-DEFAULT"></div>
      </div>
      </div>
      {/* Pause Overlay */}
      <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop">
      {/* Central Menu Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-8 w-full max-w-sm shadow-[0_0_15px_rgba(75,226,119,0.1)]">
      {/* Title */}
      <div className="text-center mb-8 border-b border-outline-variant pb-4">
      <h2 className="text-headline-lg font-headline-lg text-primary uppercase tracking-widest">PAUSED</h2>
      <div className="mt-2 text-label-sm font-label-sm text-on-surface-variant flex items-center justify-center gap-2">
      <span className="w-2 h-2 bg-secondary rounded-full inline-block animate-pulse"></span>
      <span>LEVEL {level} | SCORE {score} | MOVES {moves}</span>
      </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-col gap-4">
      {/* Resume Button (Primary) */}
      <button className="h-touch-target-min w-full bg-surface-container-lowest border border-primary text-primary font-data-md text-data-md flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-colors duration-150 rounded-DEFAULT shadow-[0_0_8px_rgba(75,226,119,0.2)]" type="button" data-action-id="resume-1" onClick={actions?.["resume-1"]}>
      <Play  style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
                          Resume
                      </button>
      {/* Restart Level Button */}
      <button className="h-touch-target-min w-full bg-surface border border-outline-variant text-on-surface font-data-md text-data-md flex items-center justify-center gap-2 hover:border-outline hover:bg-surface-container transition-colors duration-150 rounded-DEFAULT" type="button" data-action-id="restart-level-2" onClick={actions?.["restart-level-2"]}>
      <RefreshCw aria-hidden={true} focusable="false" />
                          Restart Level
                      </button>
      {/* Return to Main Menu Button */}
      <button className="h-touch-target-min w-full bg-surface border border-outline-variant text-on-surface font-data-md text-data-md flex items-center justify-center gap-2 hover:border-outline hover:bg-surface-container transition-colors duration-150 rounded-DEFAULT" type="button" data-action-id="return-to-main-menu-3" onClick={actions?.["return-to-main-menu-3"]}>
      <Circle aria-hidden={true} focusable="false" />
                          Return to Main Menu
                      </button>
      </div>
      {/* Visual Hint */}
      <div className="mt-8 text-center">
      <p className="text-label-sm font-label-sm text-on-surface-variant opacity-70">
      <span className="inline-block border border-outline-variant rounded-sm px-1 py-0.5 bg-surface-container mr-1 text-on-surface">ESC</span> to Resume
                      </p>
      </div>
      </div>
      </div>
    </>
  );
}
