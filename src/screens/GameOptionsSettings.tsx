// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Options (settings)
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { useEffect, useState } from "react";
import { Circle, Save, Settings } from "lucide-react";
import type { Difficulty, GameOptions } from "../types/domain";


export type GameOptionsSettingsActionId = "button-1-1" | "button-2-2" | "execute-purge-3" | "abort-4" | "commit-changes-5";

export interface GameOptionsSettingsProps {
  actions?: Partial<Record<GameOptionsSettingsActionId, () => void>>;
  options?: GameOptions;
  difficulty?: Difficulty;
  updateOptions?: (options: Partial<GameOptions>) => void;
  setDifficulty?: (difficulty: Difficulty) => void;
}

const defaultOptions: GameOptions = {
  sound: true,
  reducedMotion: false,
  highContrast: false,
  pulseSpeed: 2,
};

function getAppBridge() {
  return globalThis.app;
}

function getInitialOptions(options?: GameOptions): GameOptions {
  return options ?? getAppBridge()?.state.options ?? defaultOptions;
}

function getInitialDifficulty(difficulty?: Difficulty): Difficulty {
  return difficulty ?? getAppBridge()?.state.difficulty ?? "medium";
}

export function GameOptionsSettings({ actions, options, difficulty, updateOptions, setDifficulty }: GameOptionsSettingsProps) {
  const [controlledOptions, setControlledOptions] = useState<GameOptions>(() => getInitialOptions(options));
  const [controlledDifficulty, setControlledDifficulty] = useState<Difficulty>(() => getInitialDifficulty(difficulty));
  const [commitStatus, setCommitStatus] = useState("Pending configuration changes");
  const appBridge = getAppBridge();
  const applyOptions = updateOptions ?? appBridge?.actions.updateOptions;
  const applyDifficulty = setDifficulty ?? appBridge?.actions.setDifficulty;

  useEffect(() => {
    if (options) {
      setControlledOptions(options);
    }
  }, [options]);

  useEffect(() => {
    if (difficulty) {
      setControlledDifficulty(difficulty);
    }
  }, [difficulty]);

  const handleOptionChange = (nextOptions: Partial<GameOptions>) => {
    setControlledOptions((current) => ({ ...current, ...nextOptions }));
    applyOptions?.(nextOptions);
    setCommitStatus("Unsaved configuration changes");
  };

  const handleDifficultyChange = (nextDifficulty: Difficulty) => {
    setControlledDifficulty(nextDifficulty);
    applyDifficulty?.(nextDifficulty);
    setCommitStatus("Unsaved configuration changes");
  };

  const handleCommitChanges = () => {
    if (!Number.isFinite(controlledOptions.pulseSpeed) || controlledOptions.pulseSpeed < 1 || controlledOptions.pulseSpeed > 5) {
      setCommitStatus("Pulse speed must stay between 1 and 5");
      return;
    }

    applyOptions?.(controlledOptions);
    applyDifficulty?.(controlledDifficulty);
    setCommitStatus("Changes saved");
    actions?.["commit-changes-5"]?.();
  };

  return (
    <>
      {/* Subdued grid background element */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{backgroundImage: "linear-gradient(to right, #3d4a3d 1px, transparent 1px), linear-gradient(to bottom, #3d4a3d 1px, transparent 1px)", backgroundSize: "32px 32px"}}></div>
      {/* TopAppBar (Shared Component) */}
      <header className="bg-surface dark:bg-surface border-b border-outline-variant flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-touch-target-min fixed top-0 z-50">
      <div className="text-headline-lg font-headline-lg font-bold tracking-tighter text-primary dark:text-primary uppercase">PULSE_GRID</div>
      <div className="flex items-center gap-2">
      <button aria-label="Settings" className="w-touch-target-min h-touch-target-min flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary-fixed transition-colors rounded-DEFAULT" type="button" data-action-id="button-1-1" onClick={actions?.["button-1-1"]}>
      <Settings aria-hidden={true} focusable="false" />
      </button>
      <button aria-label="Help" className="w-touch-target-min h-touch-target-min flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary-fixed transition-colors rounded-DEFAULT" type="button" data-action-id="button-2-2" onClick={actions?.["button-2-2"]}>
      <Circle aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* Main Canvas */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop pt-[calc(44px+32px)] pb-32 relative z-10">
      <div className="mb-8 flex items-center justify-between">
      <div>
      <h1 className="text-data-lg font-data-lg text-on-surface uppercase tracking-wider mb-1">System_Options</h1>
      <p className="text-data-md font-data-md text-primary-fixed-dim uppercase opacity-80">Configure Terminal Parameters</p>
      </div>
      {/* Decorative bandwidth chip */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-primary/30 rounded-full bg-surface-container-low">
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
      <span className="text-label-sm font-label-sm text-primary">SECURE_CONNECTION</span>
      </div>
      </div>
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
      {/* AUDIO SECTION */}
      <div className="col-span-1 bg-surface-container-low border border-outline-variant rounded-DEFAULT p-6 relative overflow-hidden group hover:border-outline transition-colors duration-300">
      <div className="absolute top-0 right-0 p-4 opacity-10">
      <Circle className="text-6xl text-primary" aria-hidden={true} focusable="false" />
      </div>
      <h2 className="text-headline-md font-headline-md text-on-surface mb-6 flex items-center gap-3 border-b border-outline-variant pb-4">
      <Circle className="text-primary" aria-hidden={true} focusable="false" /> 
                          Audio_Routing
                      </h2>
      <div className="space-y-2">
      {/* Toggle 1: Master */}
      <label className="flex justify-between items-center py-3 cursor-pointer group/toggle">
      <span className="text-data-md font-data-md text-on-surface-variant group-hover/toggle:text-primary-fixed transition-colors">Sound</span>
      <div className="relative inline-flex items-center cursor-pointer">
      <input aria-label="Sound" checked={controlledOptions.sound} className="sr-only peer" type="checkbox" onChange={(event) => handleOptionChange({ sound: event.target.checked })} />
      <div className="w-12 h-6 bg-surface border border-outline-variant peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:after:translate-x-[24px] peer-checked:after:bg-primary after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-outline-variant after:h-[16px] after:w-[20px] after:transition-colors after:border-r after:border-surface"></div>
      </div>
      </label>
      {/* Toggle 2: SFX */}
      <label className="flex justify-between items-center py-3 cursor-pointer group/toggle">
      <span className="text-data-md font-data-md text-on-surface-variant group-hover/toggle:text-primary-fixed transition-colors">Reduced Motion</span>
      <div className="relative inline-flex items-center cursor-pointer">
      <input aria-label="Reduced motion" checked={controlledOptions.reducedMotion} className="sr-only peer" type="checkbox" onChange={(event) => handleOptionChange({ reducedMotion: event.target.checked })} />
      <div className="w-12 h-6 bg-surface border border-outline-variant peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:after:translate-x-[24px] peer-checked:after:bg-primary after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-outline-variant after:h-[16px] after:w-[20px] after:transition-colors after:border-r after:border-surface"></div>
      </div>
      </label>
      {/* Toggle 3: Music */}
      <label className="flex justify-between items-center py-3 cursor-pointer group/toggle">
      <span className="text-data-md font-data-md text-on-surface-variant group-hover/toggle:text-primary-fixed transition-colors">High Contrast</span>
      <div className="relative inline-flex items-center cursor-pointer">
      <input aria-label="High contrast" checked={controlledOptions.highContrast} className="sr-only peer" type="checkbox" onChange={(event) => handleOptionChange({ highContrast: event.target.checked })} />
      <div className="w-12 h-6 bg-surface border border-outline-variant peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:after:translate-x-[24px] peer-checked:after:bg-primary after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-outline-variant after:h-[16px] after:w-[20px] after:transition-colors after:border-r after:border-surface"></div>
      </div>
      </label>
      </div>
      </div>
      {/* GAMEPLAY SECTION */}
      <div className="col-span-1 bg-surface-container-low border border-outline-variant rounded-DEFAULT p-6 relative overflow-hidden group hover:border-outline transition-colors duration-300">
      <div className="absolute top-0 right-0 p-4 opacity-10">
      <Circle className="text-6xl text-primary" aria-hidden={true} focusable="false" />
      </div>
      <h2 className="text-headline-md font-headline-md text-on-surface mb-6 flex items-center gap-3 border-b border-outline-variant pb-4">
      <Circle className="text-primary" aria-hidden={true} focusable="false" /> 
                          Simulation_Params
                      </h2>
      <div className="space-y-8">
      {/* Slider: Signal Speed */}
      <div>
      <div className="flex justify-between items-end mb-4">
      <label className="text-data-md font-data-md text-on-surface-variant flex flex-col">
                                      Signal Propagation Speed
                                      <span className="text-label-sm font-label-sm opacity-60 mt-1">Adjusts node connection animation rate</span>
      </label>
      <span className="text-data-md font-data-md text-primary bg-surface-container border border-primary/30 px-2 py-1">{controlledOptions.pulseSpeed.toFixed(1)}x</span>
      </div>
      <div className="relative pt-2">
      <input aria-label="Signal propagation speed" className="w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-container-low rounded-DEFAULT" max="5" min="1" step="1" type="range" value={controlledOptions.pulseSpeed} onChange={(event) => handleOptionChange({ pulseSpeed: Number(event.target.value) })} />
      <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant mt-2 opacity-50">
      <span>1.0x</span>
      <span>5.0x</span>
      </div>
      </div>
      </div>
      {/* Dropdown: Difficulty */}
      <div>
      <label className="block text-data-md font-data-md text-on-surface-variant mb-3">Security Clearance (Difficulty)</label>
      <div className="relative">
      <select aria-label="Security clearance difficulty" className="block w-full bg-surface-container border border-outline-variant text-primary-fixed text-data-md font-data-md p-4 appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-DEFAULT cursor-pointer hover:bg-surface-container-high transition-colors" value={controlledDifficulty} onChange={(event) => handleDifficultyChange(event.target.value as Difficulty)}>
      <option value="easy">Level 1 (Novice)</option>
      <option value="medium">Level 2 (Standard Agent)</option>
      <option value="hard">Level 3 (Expert Hacker)</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-primary">
      <Circle aria-hidden={true} focusable="false" />
      </div>
      </div>
      </div>
      </div>
      </div>
      {/* DATA / SYSTEM SECTION */}
      <div className="col-span-1 lg:col-span-2 bg-surface-container-low border border-outline-variant rounded-DEFAULT p-6 mt-4">
      <h2 className="text-headline-md font-headline-md text-on-surface mb-4 flex items-center gap-3">
      <Circle className="text-error" aria-hidden={true} focusable="false" /> 
                          Local_Memory_Management
                      </h2>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 bg-error-container/20 border border-error/40 rounded-DEFAULT relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
      <div className="pl-4 pr-6 mb-4 md:mb-0">
      <h3 className="text-data-md font-data-md text-error mb-2 tracking-wide uppercase">Purge Local Cache</h3>
      <p className="text-body-md font-body-md text-on-surface-variant max-w-xl leading-relaxed">
                                  Warning: This action will permanently obliterate all local high scores, saved grid states, and progress metrics. This operation cannot be reversed once initiated.
                              </p>
      </div>
      {/* Retryable Feedback Style Button */}
      <button className="shrink-0 bg-surface border border-error text-error font-data-md py-3 px-6 hover:bg-error hover:text-on-error transition-colors duration-200 flex items-center gap-2 group rounded-DEFAULT shadow-[0_0_10px_rgba(255,180,171,0.05)] hover:shadow-[0_0_15px_rgba(255,180,171,0.3)]" type="button" data-action-id="execute-purge-3" onClick={actions?.["execute-purge-3"]}>
      <Circle className="group-hover:animate-pulse" aria-hidden={true} focusable="false" /> 
                              EXECUTE_PURGE
                          </button>
      </div>
      </div>
      </div>
      </main>
      {/* Bottom Action Bar (Sticky, replaces BottomNavBar for this task flow) */}
      <div className="fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-md border-t border-outline-variant p-4 z-40">
      <div className="max-w-5xl mx-auto flex flex-col-reverse sm:flex-row justify-end gap-4 sm:gap-6 px-margin-mobile md:px-margin-desktop">
      <div role="status" aria-live="polite" className="w-full sm:w-auto text-label-sm font-label-sm text-primary-fixed-dim uppercase tracking-wider flex items-center justify-center h-touch-target-min">
                      {commitStatus}
                  </div>
      <button className="w-full sm:w-auto bg-transparent border border-outline-variant text-on-surface-variant font-data-md py-4 px-8 hover:bg-surface-variant hover:text-on-surface transition-colors rounded-DEFAULT uppercase tracking-wider text-center flex justify-center items-center h-touch-target-min" type="button" data-action-id="abort-4" onClick={actions?.["abort-4"]}>
                      Abort
                  </button>
      <button className="w-full sm:w-auto bg-surface-container-high border border-primary text-primary font-data-md py-4 px-10 hover:bg-primary hover:text-on-primary-fixed transition-colors duration-200 rounded-DEFAULT uppercase tracking-wider font-bold shadow-[0_0_10px_rgba(75,226,119,0.1)] hover:shadow-[0_0_20px_rgba(75,226,119,0.4)] text-center flex justify-center items-center h-touch-target-min group" type="button" data-action-id="commit-changes-5" onClick={handleCommitChanges}>
      <Save className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity -ml-6" aria-hidden={true} focusable="false" />
                      Commit_Changes
                  </button>
      </div>
      </div>
    </>
  );
}
