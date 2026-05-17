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

  const mainMenuActions = {
    'resume-game-1': actions.resumeGame,
    'start-new-game-2': () => actions.startNewGame(),
    'easy-3': () => actions.setDifficulty('easy'),
    'medium-4': () => actions.setDifficulty('medium'),
    'hard-5': () => actions.setDifficulty('hard'),
    'quit-system-6': actions.quitSystem,
  };

  const boardActions = {
    'board-1': () => actions.selectCell(state.grid.find((cell) => cell.state !== 'cleared')?.id ?? state.grid[0]?.id ?? 'cell-1'),
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
      {state.currentScreen === 'play' && <GameBoardPlay actions={boardActions} />}
      {state.currentScreen === 'settings' && <GameOptionsSettings actions={settingsActions} />}
      {state.currentScreen === 'help' && <ControlsHelpHelp actions={helpActions} />}
      {state.currentScreen === 'pause' && (
        <>
          <GameBoardPlay actions={boardActions} />
          <PauseOverlayOverlay actions={pauseActions} />
        </>
      )}
      {state.currentScreen === 'gameOver' && <GameOverResult actions={gameOverActions} />}
    </div>
  );
}
