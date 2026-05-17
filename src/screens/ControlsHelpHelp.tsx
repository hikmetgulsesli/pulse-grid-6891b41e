// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Controls Help (help)
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { ArrowLeft, Circle, MousePointerClick, TriangleAlert, X } from "lucide-react";


export type ControlsHelpHelpActionId = "button-1-1" | "return-to-grid-2";

export interface ControlsHelpHelpProps {
  actions?: Partial<Record<ControlsHelpHelpActionId, () => void>>;
}

export function ControlsHelpHelp({ actions }: ControlsHelpHelpProps) {
  return (
    <>
      {/* Top Navigation (Shell suppressed based on task focus, but header provided for structure) */}
      <header className="bg-surface border-b border-outline-variant flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-touch-target-min">
      <div className="text-headline-lg font-headline-lg font-bold tracking-tighter text-primary">
                  PULSE_GRID
              </div>
      <div className="flex items-center gap-4">
      <button aria-label="Close" className="text-on-surface-variant hover:bg-surface-container-high hover:text-primary-fixed p-2 rounded-DEFAULT transition-colors" type="button" data-action-id="button-1-1" onClick={actions?.["button-1-1"]}>
      <X aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* Main Content Canvas */}
      <main className="flex-1 overflow-y-auto px-margin-mobile md:px-margin-desktop py-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="mb-12">
      <h1 className="text-headline-lg font-headline-lg text-on-surface mb-2 border-l-4 border-primary pl-4">System Manual</h1>
      <p className="text-body-lg font-body-lg text-on-surface-variant">Controls &amp; Directives</p>
      </div>
      {/* Rules Section (Neo-Brutalist Callout) */}
      <section className="mb-12 bg-surface-container-high border border-outline-variant p-6 rounded-DEFAULT shadow-[0_0_15px_rgba(75,226,119,0.1)] relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:shadow-[0_0_10px_rgba(75,226,119,0.8)] transition-shadow"></div>
      <h2 className="text-headline-md font-headline-md text-primary mb-4 flex items-center gap-2">
      <Circle  style={{fontVariationSettings: "'FILL' 1"}} className="text-primary" aria-hidden={true} focusable="false" />
                      Primary Directive
                  </h2>
      <div className="space-y-4">
      <div className="flex items-start gap-4">
      <Circle className="text-tertiary mt-1" aria-hidden={true} focusable="false" />
      <p className="text-body-lg font-body-lg text-on-surface">Connect the Pulse from <span className="text-primary font-bold">Source</span> to <span className="text-secondary font-bold">Sink</span>.</p>
      </div>
      <div className="flex items-start gap-4">
      <TriangleAlert className="text-error mt-1" aria-hidden={true} focusable="false" />
      <p className="text-body-lg font-body-lg text-on-surface">Avoid Overloads. Crossing incompatible signals results in system failure.</p>
      </div>
      <div className="flex items-start gap-4">
      <Circle className="text-primary-fixed mt-1" aria-hidden={true} focusable="false" />
      <p className="text-body-lg font-body-lg text-on-surface">Maximize Signal Strength for higher bandwidth scores.</p>
      </div>
      </div>
      </section>
      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-12">
      {/* Keyboard Controls */}
      <section className="bg-surface-container border border-outline-variant rounded-DEFAULT p-6">
      <h2 className="text-headline-md font-headline-md text-on-surface mb-6 flex items-center gap-2 border-b border-outline-variant pb-2">
      <Circle className="text-on-surface-variant" aria-hidden={true} focusable="false" />
                          Keyboard Interface
                      </h2>
      <ul className="space-y-6">
      <li className="flex items-center justify-between">
      <span className="text-body-lg font-body-lg text-on-surface-variant">Navigation</span>
      <div className="flex gap-2">
      <span aria-label="Arrow up" className="inline-flex items-center justify-center w-10 h-10 border border-outline-variant bg-surface-bright text-data-md font-data-md rounded-DEFAULT text-on-surface shadow-[0_2px_0_#334155]">↑</span>
      <span aria-label="Arrow left" className="inline-flex items-center justify-center w-10 h-10 border border-outline-variant bg-surface-bright text-data-md font-data-md rounded-DEFAULT text-on-surface shadow-[0_2px_0_#334155]">←</span>
      <span aria-label="Arrow down" className="inline-flex items-center justify-center w-10 h-10 border border-outline-variant bg-surface-bright text-data-md font-data-md rounded-DEFAULT text-on-surface shadow-[0_2px_0_#334155]">↓</span>
      <span aria-label="Arrow right" className="inline-flex items-center justify-center w-10 h-10 border border-outline-variant bg-surface-bright text-data-md font-data-md rounded-DEFAULT text-on-surface shadow-[0_2px_0_#334155]">→</span>
      </div>
      </li>
      <li className="flex items-center justify-between">
      <span className="text-body-lg font-body-lg text-on-surface-variant">Rotate Node / Action</span>
      <span className="inline-flex items-center justify-center px-4 h-10 border border-primary bg-primary/10 text-primary text-data-md font-data-md rounded-DEFAULT shadow-[0_0_8px_rgba(75,226,119,0.3)]">SPACE / ENTER</span>
      </li>
      <li className="flex items-center justify-between">
      <span className="text-body-lg font-body-lg text-on-surface-variant">System Pause</span>
      <span className="inline-flex items-center justify-center px-3 h-10 border border-outline-variant bg-surface-bright text-data-md font-data-md rounded-DEFAULT text-on-surface shadow-[0_2px_0_#334155]">ESC</span>
      </li>
      </ul>
      </section>
      {/* Touch/Mouse Controls */}
      <section className="bg-surface-container border border-outline-variant rounded-DEFAULT p-6">
      <h2 className="text-headline-md font-headline-md text-on-surface mb-6 flex items-center gap-2 border-b border-outline-variant pb-2">
      <MousePointerClick className="text-on-surface-variant" aria-hidden={true} focusable="false" />
                          Tactile &amp; Optic Interface
                      </h2>
      <ul className="space-y-6">
      <li className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full border border-primary bg-primary/10 flex items-center justify-center shrink-0">
      <Circle className="text-primary" aria-hidden={true} focusable="false" />
      </div>
      <div>
      <h3 className="text-body-lg font-body-lg text-on-surface mb-1">Click / Tap</h3>
      <p className="text-body-md font-body-md text-on-surface-variant">Select and rotate a transmission node 90 degrees clockwise.</p>
      </div>
      </li>
      <li className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full border border-outline-variant bg-surface-bright flex items-center justify-center shrink-0">
      <Circle className="text-on-surface" aria-hidden={true} focusable="false" />
      </div>
      <div>
      <h3 className="text-body-lg font-body-lg text-on-surface mb-1">Drag</h3>
      <p className="text-body-md font-body-md text-on-surface-variant">Move the main signal viewpoint across the grid lattice.</p>
      </div>
      </li>
      </ul>
      </section>
      </div>
      {/* Action Area */}
      <div className="flex justify-center mt-12">
      <button className="bg-surface text-on-surface border border-outline-variant px-8 py-3 rounded-DEFAULT font-data-lg text-data-lg hover:bg-primary hover:text-on-primary hover:border-primary transition-colors flex items-center gap-2 h-touch-target-min" type="button" data-action-id="return-to-grid-2" onClick={actions?.["return-to-grid-2"]}>
      <ArrowLeft aria-hidden={true} focusable="false" />
                      RETURN TO GRID
                  </button>
      </div>
      </main>
    </>
  );
}
