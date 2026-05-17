import { useEffect } from 'react';
import {
  ControlsHelpHelp,
  GameBoardPlay,
  GameOptionsSettings,
  GameOverResult,
  MainMenuMenu,
  PauseOverlayOverlay,
} from './screens';
import { useAppState } from './hooks/useAppState';

export default function App() {
  const { state, actions } = useAppState();

  useEffect(() => {
    globalThis.app = { state, actions };
    if (typeof window !== 'undefined') {
      window.app = { state, actions };
    }
  }, [state, actions]);

  useEffect(() => {
    if (state.currentScreen !== 'play' || state.isPaused || state.isGameOver) {
      return undefined;
    }

    const baseInterval = state.options.reducedMotion ? 1800 : 1300;
    const tickIntervalMs = Math.max(450, baseInterval - state.options.pulseSpeed * 175);
    const intervalId = window.setInterval(actions.tickGame, tickIntervalMs);

    return () => window.clearInterval(intervalId);
  }, [
    actions.tickGame,
    state.currentScreen,
    state.isGameOver,
    state.isPaused,
    state.options.pulseSpeed,
    state.options.reducedMotion,
  ]);

  useEffect(() => {
    if (state.currentScreen !== 'play' || state.isPaused || state.isGameOver) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.altKey || event.ctrlKey) {
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        actions.moveActiveCell('up');
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        actions.moveActiveCell('down');
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        actions.moveActiveCell('left');
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        actions.moveActiveCell('right');
      } else if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        actions.selectCell(state.activeCellId);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        actions.pauseGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    actions.moveActiveCell,
    actions.pauseGame,
    actions.selectCell,
    state.activeCellId,
    state.currentScreen,
    state.isGameOver,
    state.isPaused,
  ]);

  const activeCell = state.grid.find((cell) => cell.id === state.activeCellId);
  const clearedCount = state.grid.filter((cell) => cell.state === 'cleared').length;
  const gridSize = Math.sqrt(state.grid.length);

  const mainMenuActions = {
    'resume-game-1': actions.resumeGame,
    'start-new-game-2': () => actions.startNewGame(),
    'easy-3': () => actions.setDifficulty('easy'),
    'medium-4': () => actions.setDifficulty('medium'),
    'hard-5': () => actions.setDifficulty('hard'),
    'quit-system-6': actions.quitSystem,
  };

  const boardActions = {
    'board-1': () => actions.selectCell(state.activeCellId),
    'menu-2': actions.returnToMainMenu,
    'options-3': actions.openSettings,
    'button-4-4': actions.openHelp,
    'button-5-5': () => actions.startNewGame(state.difficulty),
    'pause-6': actions.pauseGame,
    'reset-level-7': actions.resetLevel,
  };

  const settingsActions = {
    'button-1-1': actions.openSettings,
    'button-2-2': actions.openHelp,
    'execute-purge-3': actions.purgeProgress,
    'abort-4': actions.closeSettings,
    'commit-changes-5': actions.commitOptions,
  };

  const helpActions = {
    'button-1-1': actions.closeHelp,
    'return-to-grid-2': actions.closeHelp,
  };

  const pauseActions = {
    'resume-1': actions.resumeGame,
    'restart-level-2': actions.restartLevel,
    'return-to-main-menu-3': actions.returnToMainMenu,
  };

  const gameOverActions = {
    'main-menu-1': actions.returnToMainMenu,
    'play-again-2': () => actions.startNewGame(state.difficulty),
  };

  return (
    <div data-setfarm-root="pulse-grid" className="min-h-screen bg-slate-950 text-white">
      {state.currentScreen === 'menu' && <MainMenuMenu actions={mainMenuActions} />}
      {state.currentScreen === 'play' && (
        <>
          <GameBoardPlay actions={boardActions} />
          <section
            aria-label="Playable pulse grid"
            data-setfarm-playable-grid="true"
            className="fixed left-1/2 top-1/2 z-40 w-[min(84vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-cyan-200/35 bg-slate-950/80 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-md"
          >
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
            >
              {state.grid.map((cell) => (
                <button
                  key={cell.id}
                  type="button"
                  aria-label={`Cell ${cell.row + 1}, ${cell.col + 1} ${cell.state}`}
                  aria-pressed={cell.state === 'cleared'}
                  disabled={cell.state === 'cleared'}
                  data-cell-id={cell.id}
                  data-cell-state={cell.state}
                  onClick={() => actions.selectCell(cell.id)}
                  className={[
                    'aspect-square rounded border text-label-sm font-label-sm transition focus:outline-none focus:ring-2 focus:ring-cyan-100',
                    cell.state === 'active'
                      ? 'border-cyan-100 bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-400/40'
                      : '',
                    cell.state === 'idle'
                      ? 'border-cyan-200/40 bg-cyan-950/60 text-cyan-50 hover:border-cyan-100 hover:bg-cyan-800/80'
                      : '',
                    cell.state === 'cleared'
                      ? 'cursor-not-allowed border-emerald-300/30 bg-emerald-500/25 text-emerald-100 opacity-70'
                      : '',
                  ].join(' ')}
                >
                  {cell.row + 1}.{cell.col + 1}
                </button>
              ))}
            </div>
          </section>
          <div
            role="status"
            aria-live="polite"
            data-setfarm-game-status="play"
            className="fixed bottom-4 left-4 z-50 max-w-[calc(100vw-2rem)] rounded border border-cyan-300/40 bg-slate-950/90 px-4 py-3 text-sm leading-6 text-cyan-50 shadow-lg shadow-cyan-950/30 backdrop-blur"
          >
            <div className="font-label-sm text-label-sm uppercase text-cyan-200">Pulse Grid</div>
            <div>
              Score {state.score} | Moves {state.moves} | Cleared {clearedCount}/{state.grid.length}
            </div>
            <div>
              Active {activeCell ? `${activeCell.row + 1},${activeCell.col + 1}` : state.activeCellId} | Tick {state.tick}
            </div>
          </div>
        </>
      )}
      {state.lastError && (
        <div
          role="alert"
          data-setfarm-storage-recovery="true"
          className="fixed right-4 top-4 z-50 max-w-[calc(100vw-2rem)] rounded border border-amber-300/50 bg-amber-950/90 px-4 py-3 text-sm leading-6 text-amber-50 shadow-lg shadow-amber-950/30"
        >
          {state.lastError}
        </div>
      )}
      {state.currentScreen === 'settings' && <GameOptionsSettings actions={settingsActions} />}
      {state.currentScreen === 'help' && <ControlsHelpHelp actions={helpActions} />}
      {state.currentScreen === 'pause' && <PauseOverlayOverlay actions={pauseActions} />}
      {state.currentScreen === 'gameOver' && <GameOverResult actions={gameOverActions} />}
    </div>
  );
}
