// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Main Menu (menu)
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { Circle, Play, Plus } from "lucide-react";


export type MainMenuMenuActionId = "resume-game-1" | "start-new-game-2" | "easy-3" | "medium-4" | "hard-5" | "quit-system-6";

export interface MainMenuMenuProps {
  actions?: Partial<Record<MainMenuMenuActionId, () => void>>;
}

export function MainMenuMenu({ actions }: MainMenuMenuProps) {
  return (
    <>
      {/* Background Grid (Blurred) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0 filter blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-background/90 to-surface/80 z-0"></div>
      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-margin-mobile md:px-margin-desktop w-full max-w-lg mx-auto h-full">
      {/* Brand Logo Area */}
      <div className="mb-12 text-center w-full">
      <h1 className="text-headline-lg font-headline-lg text-primary text-glow uppercase tracking-widest flex flex-col items-center gap-4">
      <Circle className="text-[64px]" aria-hidden={true} focusable="false" />
                      PULSE_GRID
                  </h1>
      <p className="text-data-md font-data-md text-on-surface-variant mt-2 uppercase tracking-widest">Signal Routing Protocol</p>
      </div>
      {/* Menu Container */}
      <div className="w-full bg-surface-container border border-outline-variant p-6 flex flex-col gap-unit">
      {/* Resume Game (Active state example) */}
      <button className="h-touch-target-min w-full flex items-center justify-between px-4 border border-outline-variant bg-surface hover:bg-primary hover:text-surface hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background group" type="button" data-action-id="resume-game-1" onClick={actions?.["resume-game-1"]}>
      <span className="text-data-md font-data-md uppercase tracking-wider group-hover:text-surface">Resume Game</span>
      <Play className="group-hover:text-surface text-primary" aria-hidden={true} focusable="false" />
      </button>
      {/* Start New Game */}
      <button className="h-touch-target-min w-full flex items-center justify-between px-4 border border-outline-variant bg-surface hover:bg-primary hover:text-surface hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background group" type="button" data-action-id="start-new-game-2" onClick={actions?.["start-new-game-2"]}>
      <span className="text-data-md font-data-md uppercase tracking-wider group-hover:text-surface">Start New Game</span>
      <Plus className="group-hover:text-surface text-on-surface-variant" aria-hidden={true} focusable="false" />
      </button>
      {/* Difficulty Selection (Nested/Tabs) */}
      <div className="w-full border border-outline-variant bg-surface-container-low mt-4 flex flex-col">
      <div className="px-4 py-2 border-b border-outline-variant text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">
                          Select Difficulty
                      </div>
      <div className="flex w-full">
      <button className="flex-1 h-touch-target-min flex items-center justify-center border-r border-outline-variant bg-surface hover:bg-surface-bright text-data-md font-data-md focus:outline-none focus:bg-surface-bright focus:text-primary transition-colors" type="button" data-action-id="easy-3" onClick={actions?.["easy-3"]}>
                              Easy
                          </button>
      <button className="flex-1 h-touch-target-min flex items-center justify-center border-r border-outline-variant bg-surface-container-highest text-primary font-bold signal-glow border border-primary z-10 text-data-md font-data-md focus:outline-none transition-colors" type="button" data-action-id="medium-4" onClick={actions?.["medium-4"]}>
                              Medium
                          </button>
      <button className="flex-1 h-touch-target-min flex items-center justify-center bg-surface hover:bg-surface-bright text-data-md font-data-md focus:outline-none focus:bg-surface-bright focus:text-primary transition-colors" type="button" data-action-id="hard-5" onClick={actions?.["hard-5"]}>
                              Hard
                          </button>
      </div>
      </div>
      {/* Quit */}
      <button className="h-touch-target-min w-full flex items-center justify-between px-4 border border-outline-variant bg-surface hover:bg-error hover:text-on-error hover:border-error transition-colors mt-4 focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-background group" type="button" data-action-id="quit-system-6" onClick={actions?.["quit-system-6"]}>
      <span className="text-data-md font-data-md uppercase tracking-wider group-hover:text-on-error">Quit System</span>
      <Circle className="group-hover:text-on-error text-on-surface-variant" aria-hidden={true} focusable="false" />
      </button>
      </div>
      </main>
      {/* Small Footer */}
      <footer className="w-full p-4 flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant z-10 absolute bottom-0">
      <span className="uppercase">v2.4.1.09</span>
      <a className="hover:text-primary transition-colors uppercase flex items-center gap-1 focus:outline-none focus:text-primary" href="#help">
      <Circle className="text-[16px]" aria-hidden={true} focusable="false" />
                  Help
              </a>
      </footer>
    </>
  );
}
