import { useCallback, useMemo, useState } from 'react';
import type { AppActions, Difficulty, GameOptions, GameState, GridCell, ScreenId } from '../types/domain';

const STORAGE_KEY = 'pulse-grid-state';

const gridSizeByDifficulty: Record<Difficulty, number> = {
  easy: 4,
  medium: 5,
  hard: 6,
};

const defaultOptions: GameOptions = {
  sound: true,
  reducedMotion: false,
  highContrast: false,
  pulseSpeed: 2,
};

function buildGrid(difficulty: Difficulty): GridCell[] {
  const size = gridSizeByDifficulty[difficulty];

  return Array.from({ length: size * size }, (_, index) => ({
    id: `cell-${index + 1}`,
    row: Math.floor(index / size),
    col: index % size,
    state: index % (size + 1) === 0 ? 'active' : 'idle',
  }));
}

function createInitialState(): GameState {
  return {
    currentScreen: 'menu',
    previousScreen: 'menu',
    difficulty: 'medium',
    level: 1,
    score: 0,
    moves: 0,
    bestScore: 0,
    isPaused: false,
    isGameOver: false,
    grid: buildGrid('medium'),
    options: defaultOptions,
  };
}

function withScreen(state: GameState, currentScreen: ScreenId): GameState {
  return {
    ...state,
    previousScreen: state.currentScreen,
    currentScreen,
  };
}

export function useAppState() {
  const [state, setState] = useState<GameState>(() => {
    if (typeof window === 'undefined') {
      return createInitialState();
    }

    try {
      const rawState = window.localStorage.getItem(STORAGE_KEY);
      return rawState ? { ...createInitialState(), ...JSON.parse(rawState) } : createInitialState();
    } catch {
      return createInitialState();
    }
  });

  const startNewGame = useCallback((difficulty: Difficulty = state.difficulty) => {
    setState((current) => ({
      ...current,
      currentScreen: 'play',
      previousScreen: current.currentScreen,
      difficulty,
      level: 1,
      score: 0,
      moves: 0,
      isPaused: false,
      isGameOver: false,
      grid: buildGrid(difficulty),
    }));
  }, [state.difficulty]);

  const resumeGame = useCallback(() => {
    setState((current) => ({
      ...current,
      currentScreen: 'play',
      previousScreen: current.currentScreen,
      isPaused: false,
    }));
  }, []);

  const pauseGame = useCallback(() => {
    setState((current) => ({
      ...withScreen(current, 'pause'),
      isPaused: true,
    }));
  }, []);

  const restartLevel = useCallback(() => {
    setState((current) => ({
      ...current,
      currentScreen: 'play',
      previousScreen: current.currentScreen,
      score: 0,
      moves: 0,
      isPaused: false,
      isGameOver: false,
      grid: buildGrid(current.difficulty),
    }));
  }, []);

  const returnToMainMenu = useCallback(() => {
    setState((current) => ({
      ...withScreen(current, 'menu'),
      isPaused: false,
    }));
  }, []);

  const openSettings = useCallback(() => {
    setState((current) => withScreen(current, 'settings'));
  }, []);

  const closeSettings = useCallback(() => {
    setState((current) => withScreen(current, current.previousScreen === 'settings' ? 'play' : current.previousScreen));
  }, []);

  const openHelp = useCallback(() => {
    setState((current) => withScreen(current, 'help'));
  }, []);

  const closeHelp = useCallback(() => {
    setState((current) => withScreen(current, current.previousScreen === 'help' ? 'play' : current.previousScreen));
  }, []);

  const selectCell = useCallback((cellId: string) => {
    setState((current) => {
      const nextGrid: GridCell[] = current.grid.map((cell) =>
        cell.id === cellId ? { ...cell, state: cell.state === 'cleared' ? 'idle' : 'cleared' } : cell,
      );
      const clearedCount = nextGrid.filter((cell) => cell.state === 'cleared').length;
      const score = current.score + 10;
      const isGameOver = clearedCount === nextGrid.length;

      return {
        ...current,
        currentScreen: isGameOver ? 'gameOver' : current.currentScreen,
        moves: current.moves + 1,
        score,
        bestScore: Math.max(current.bestScore, score),
        isGameOver,
        grid: nextGrid,
      };
    });
  }, []);

  const resetLevel = useCallback(() => {
    setState((current) => ({
      ...current,
      moves: 0,
      grid: buildGrid(current.difficulty),
    }));
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setState((current) => ({
      ...current,
      difficulty,
      grid: buildGrid(difficulty),
    }));
  }, []);

  const updateOptions = useCallback((options: Partial<GameOptions>) => {
    setState((current) => ({
      ...current,
      options: {
        ...current.options,
        ...options,
      },
    }));
  }, []);

  const commitOptions = useCallback(() => {
    setState((current) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      } catch {
        // Persistence is best effort; runtime state remains authoritative.
      }
      return withScreen(current, current.previousScreen === 'settings' ? 'play' : current.previousScreen);
    });
  }, []);

  const purgeProgress = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage failures in restricted browser contexts.
    }
    setState(createInitialState());
  }, []);

  const quitSystem = useCallback(() => {
    setState((current) => ({
      ...createInitialState(),
      bestScore: current.bestScore,
    }));
  }, []);

  const actions = useMemo<AppActions>(
    () => ({
      startNewGame,
      resumeGame,
      pauseGame,
      restartLevel,
      returnToMainMenu,
      openSettings,
      closeSettings,
      openHelp,
      closeHelp,
      selectCell,
      resetLevel,
      setDifficulty,
      updateOptions,
      commitOptions,
      purgeProgress,
      quitSystem,
    }),
    [
      closeHelp,
      closeSettings,
      commitOptions,
      openHelp,
      openSettings,
      pauseGame,
      purgeProgress,
      quitSystem,
      resetLevel,
      restartLevel,
      resumeGame,
      returnToMainMenu,
      selectCell,
      setDifficulty,
      startNewGame,
      updateOptions,
    ],
  );

  return { state, actions };
}
