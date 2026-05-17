// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Board (play)
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, Menu, Pause, Settings } from "lucide-react";


export type GameBoardPlayActionId = "board-1" | "menu-2" | "options-3" | "button-4-4" | "button-5-5" | "pause-6" | "reset-level-7";

export interface GameBoardPlayProps {
  actions?: Partial<Record<GameBoardPlayActionId, () => void>>;
}

export function GameBoardPlay({ actions }: GameBoardPlayProps) {
  return (
    <>
      {/* TopAppBar */}
      <header className="hidden md:flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-touch-target-min bg-surface border-b border-outline-variant z-50 fixed top-0">
      <div className="text-headline-lg font-headline-lg font-bold tracking-tighter text-primary">PULSE_GRID</div>
      <div className="flex space-x-6 items-center">
      <button className="text-primary font-bold hover:bg-surface-container-high hover:text-primary-fixed px-3 py-1 rounded transition-colors duration-75" type="button" data-action-id="board-1" onClick={actions?.["board-1"]}>Board</button>
      <button className="text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-primary-fixed px-3 py-1 rounded transition-colors duration-75" type="button" data-action-id="menu-2" onClick={actions?.["menu-2"]}>Menu</button>
      <button className="text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-primary-fixed px-3 py-1 rounded transition-colors duration-75" type="button" data-action-id="options-3" onClick={actions?.["options-3"]}>Options</button>
      </div>
      <div className="flex items-center space-x-4 text-primary">
      <button className="hover:bg-surface-container-high hover:text-primary-fixed p-2 rounded-full transition-colors duration-75" type="button" data-action-id="button-4-4" onClick={actions?.["button-4-4"]}>
      <Settings aria-hidden={true} focusable="false" />
      </button>
      <button className="hover:bg-surface-container-high hover:text-primary-fixed p-2 rounded-full transition-colors duration-75" type="button" data-action-id="button-5-5" onClick={actions?.["button-5-5"]}>
      <Circle aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* Main Game Area */}
      <main className="flex-grow flex flex-col md:flex-row mt-[44px] md:mt-touch-target-min mb-16 md:mb-0 p-margin-mobile md:p-margin-desktop gap-gutter">
      {/* HUD Sidebar (Desktop) / Top Section (Mobile) */}
      <aside className="flex flex-col gap-unit w-full md:w-64 flex-shrink-0">
      {/* HUD Panel */}
      <div className="bg-surface-container border border-outline-variant rounded p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
      <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">Score</span>
      <span className="text-data-lg font-data-lg text-primary">1,250</span>
      </div>
      <div className="w-full h-px bg-outline-variant"></div>
      <div className="flex justify-between items-center">
      <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">Time</span>
      <span className="text-data-lg font-data-lg text-tertiary">02:45</span>
      </div>
      <div className="w-full h-px bg-outline-variant"></div>
      <div className="flex justify-between items-center">
      <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">Level</span>
      <span className="text-data-lg font-data-lg text-on-surface">4/10</span>
      </div>
      </div>
      {/* Status Message */}
      <div className="bg-surface-container-highest border border-primary-container/30 rounded p-4 mt-4">
      <p className="text-data-md font-data-md text-primary-fixed animate-pulse">
                          &gt; Signal established.<br />
                          &gt; Routing to node Alpha...
                      </p>
      </div>
      {/* Controls */}
      <div className="flex flex-col gap-2 mt-auto pt-8">
      <button className="flex items-center justify-center gap-2 w-full h-touch-target-min bg-surface border border-outline-variant text-on-surface hover:bg-primary hover:text-on-primary-fixed font-label-sm text-label-sm rounded uppercase tracking-wider transition-colors" type="button" data-action-id="pause-6" onClick={actions?.["pause-6"]}>
      <Pause className="text-[18px]" aria-hidden={true} focusable="false" />
                          Pause
                      </button>
      <button className="flex items-center justify-center gap-2 w-full h-touch-target-min bg-surface border border-error/50 text-error hover:bg-error hover:text-on-error font-label-sm text-label-sm rounded uppercase tracking-wider transition-colors" type="button" data-action-id="reset-level-7" onClick={actions?.["reset-level-7"]}>
      <Circle className="text-[18px]" aria-hidden={true} focusable="false" />
                          Reset Level
                      </button>
      </div>
      </aside>
      {/* Game Board Container */}
      <section className="flex-grow flex items-center justify-center bg-surface-container-lowest border border-outline-variant rounded relative overflow-hidden min-h-[400px]">
      {/* Decorative grid background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: "radial-gradient(#3d4a3d 1px, transparent 1px)", backgroundSize: "32px 32px"}}></div>
      {/* The 8x8 Grid */}
      <div className="grid grid-cols-8 gap-unit p-gutter relative z-10 bg-surface border border-outline-variant rounded">
      {/* Example Row 1 */}
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-primary bg-primary/10 rounded-sm flex items-center justify-center shadow-[0_0_8px_rgba(34,197,94,0.3)]">
      <div className="w-2 h-2 bg-primary rounded-full"></div>
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-primary bg-primary/10 rounded-sm flex items-center justify-center relative">
      {/* Path connecting left to right */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-primary -translate-y-1/2"></div>
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-primary bg-primary/20 rounded-sm flex items-center justify-center relative shadow-[0_0_12px_rgba(34,197,94,0.5)]">
      {/* Active/Selected Node */}
      <div className="w-4 h-4 bg-primary rounded-sm animate-pulse"></div>
      <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-primary -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-1 h-1/2 bg-primary -translate-x-1/2"></div>
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      {/* Example Row 2 */}
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-primary bg-primary/10 rounded-sm flex items-center justify-center relative">
      {/* Path connecting top to bottom */}
      <div className="absolute top-0 left-1/2 w-1 h-full bg-primary -translate-x-1/2"></div>
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      {/* Example Row 3 */}
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm flex items-center justify-center">
      <div className="w-2 h-2 bg-outline-variant rounded-full"></div>
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-outline-variant -translate-y-1/2"></div>
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-outline-variant -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-1 h-1/2 bg-outline-variant -translate-x-1/2"></div>
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-primary bg-primary/10 rounded-sm flex items-center justify-center relative">
      <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-primary -translate-x-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-primary -translate-y-1/2"></div>
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-primary bg-primary/10 rounded-sm flex items-center justify-center relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-primary -translate-y-1/2"></div>
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-primary bg-primary/10 rounded-sm flex items-center justify-center relative">
      <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-primary -translate-y-1/2"></div>
      <div className="w-3 h-3 bg-primary rounded-sm rotate-45"></div> {/* Target Node */}
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      {/* Fill remaining 5 rows with mostly empty/inactive nodes for visual structure */}
      {/* Row 4 */}
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm relative">
      <div className="absolute top-0 left-1/2 w-1 h-full bg-outline-variant -translate-x-1/2"></div>
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      {/* Row 5 */}
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm relative flex items-center justify-center">
      <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-outline-variant -translate-x-1/2"></div>
      <div className="w-2 h-2 bg-outline-variant rounded-full"></div>
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm flex items-center justify-center">
      <div className="w-2 h-2 bg-outline-variant rounded-full"></div>
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      {/* Row 6 */}
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      {/* Row 7 */}
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm flex items-center justify-center">
      <Circle className="text-outline-variant text-[16px]" aria-hidden={true} focusable="false" />
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      {/* Row 8 */}
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      <div className="w-10 h-10 md:w-12 md:h-12 border border-outline-variant bg-surface-container rounded-sm"></div>
      </div>
      </section>
      </main>
      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden flex justify-around items-center w-full h-16 bg-surface-container-lowest border-t border-outline-variant fixed bottom-0 z-50">
      <a className="flex flex-col items-center justify-center text-primary-fixed bg-surface-container-highest rounded-xl px-4 py-1 translate-y-0.5 duration-100" href="#board" aria-current="page" onClick={(event) => { event.preventDefault(); actions?.["board-1"]?.(); }}>
      <Circle  style={{fontVariationSettings: "'FILL' 1"}} aria-hidden={true} focusable="false" />
      <span className="text-label-sm font-label-sm">Board</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:text-primary-fixed-dim transition-colors" href="#menu" onClick={(event) => { event.preventDefault(); actions?.["menu-2"]?.(); }}>
      <Menu aria-hidden={true} focusable="false" />
      <span className="text-label-sm font-label-sm">Menu</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:text-primary-fixed-dim transition-colors" href="#options" onClick={(event) => { event.preventDefault(); actions?.["options-3"]?.(); }}>
      <Circle aria-hidden={true} focusable="false" />
      <span className="text-label-sm font-label-sm">Options</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:text-primary-fixed-dim transition-colors" href="#help">
      <Circle aria-hidden={true} focusable="false" />
      <span className="text-label-sm font-label-sm">Help</span>
      </a>
      </nav>
    </>
  );
}
