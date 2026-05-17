import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { AppActions, Difficulty, GameOptions, GameState, GridCell, MoveDirection, ScreenId } from '../types/domain';

const STORAGE_KEY = 'pulse-grid-state';
const STORAGE_RECOVERY_MESSAGE = 'Saved preferences were reset because the stored data was unreadable.';

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

interface PersistedProgress {
  bestScore: number;
  difficulty: Difficulty;
  options: GameOptions;
}

function buildGrid(difficulty: Difficulty): GridCell[] {
  const size = gridSizeByDifficulty[difficulty];

  return Array.from({ length: size * size }, (_, index) => ({
    id: `cell-${index + 1}`,
    row: Math.floor(index / size),
    col: index % size,
    state: index % (size + 1) === 0 ? 'active' : 'idle',
  }));
}

function getInitialActiveCellId(grid: GridCell[]): string {
  return grid.find((cell) => cell.state === 'active')?.id ?? grid[0]?.id ?? 'cell-1';
}

function createInitialState(): GameState {
  const grid = buildGrid('medium');

  return {
    currentScreen: 'play',
    previousScreen: 'menu',
    difficulty: 'medium',
    level: 1,
    score: 0,
    moves: 0,
    bestScore: 0,
    isPaused: false,
    isGameOver: false,
    activeCellId: getInitialActiveCellId(grid),
    tick: 0,
    storageStatus: 'idle',
    lastError: null,
    grid,
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

function isDifficulty(value: unknown): value is Difficulty {
  return value === 'easy' || value === 'medium' || value === 'hard';
}

function hydrateOptions(value: unknown): GameOptions | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Partial<GameOptions>;
  if (
    typeof candidate.sound !== 'boolean' ||
    typeof candidate.reducedMotion !== 'boolean' ||
    typeof candidate.highContrast !== 'boolean' ||
    typeof candidate.pulseSpeed !== 'number'
  ) {
    return null;
  }

  return {
    sound: candidate.sound,
    reducedMotion: candidate.reducedMotion,
    highContrast: candidate.highContrast,
    pulseSpeed: Math.max(1, Math.min(5, Math.round(candidate.pulseSpeed))),
  };
}

function readPersistedProgress(rawState: string): PersistedProgress | null {
  const parsed = JSON.parse(rawState) as Partial<PersistedProgress>;
  const options = hydrateOptions(parsed.options);

  if (typeof parsed.bestScore !== 'number' || !Number.isFinite(parsed.bestScore) || !isDifficulty(parsed.difficulty) || !options) {
    return null;
  }

  return {
    bestScore: Math.max(0, Math.floor(parsed.bestScore)),
    difficulty: parsed.difficulty,
    options,
  };
}

function applyPersistedProgress(persistedProgress: PersistedProgress): GameState {
  const baseState = createInitialState();
  const grid = buildGrid(persistedProgress.difficulty);

  return {
    ...baseState,
    bestScore: persistedProgress.bestScore,
    difficulty: persistedProgress.difficulty,
    grid,
    options: persistedProgress.options,
    activeCellId: getInitialActiveCellId(grid),
    storageStatus: 'loaded',
    lastError: null,
  };
}

function toPersistedProgress(state: GameState): PersistedProgress {
  return {
    bestScore: state.bestScore,
    difficulty: state.difficulty,
    options: state.options,
  };
}

function getStorageErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Storage operation failed';
}

function findNextPlayableCell(grid: GridCell[], startIndex: number): GridCell | undefined {
  if (!grid.length) {
    return undefined;
  }

  for (let offset = 1; offset <= grid.length; offset += 1) {
    const candidate = grid[(startIndex + offset) % grid.length];
    if (candidate.state !== 'cleared') {
      return candidate;
    }
  }

  return undefined;
}

function setActiveCell(grid: GridCell[], activeCellId: string): GridCell[] {
  return grid.map((cell) => {
    if (cell.state === 'cleared') {
      return cell;
    }

    return {
      ...cell,
      state: cell.id === activeCellId ? 'active' : 'idle',
    };
  });
}

export function advanceGameTick(current: GameState): GameState {
  if (current.currentScreen !== 'play' || current.isPaused || current.isGameOver) {
    return current;
  }

  const activeIndex = Math.max(
    0,
    current.grid.findIndex((cell) => cell.id === current.activeCellId),
  );
  const nextCell = findNextPlayableCell(current.grid, activeIndex);

  if (!nextCell) {
    return {
      ...current,
      tick: current.tick + 1,
      currentScreen: 'gameOver',
      isGameOver: true,
    };
  }

  return {
    ...current,
    tick: current.tick + 1,
    activeCellId: nextCell.id,
    grid: setActiveCell(current.grid, nextCell.id),
  };
}

export function useAppState() {
  const skipNextPersistRef = useRef(false);
  const [state, setState] = useState<GameState>(() => {
    if (typeof window === 'undefined') {
      return createInitialState();
    }

    try {
      const rawState = window.localStorage.getItem(STORAGE_KEY);
      if (!rawState) {
        return createInitialState();
      }

      const persistedProgress = readPersistedProgress(rawState);
      return persistedProgress
        ? applyPersistedProgress(persistedProgress)
        : {
            ...createInitialState(),
            storageStatus: 'error',
            lastError: STORAGE_RECOVERY_MESSAGE,
          };
    } catch (error) {
      return {
        ...createInitialState(),
        storageStatus: 'error',
        lastError: `${STORAGE_RECOVERY_MESSAGE} ${getStorageErrorMessage(error)}`,
      };
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false;
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersistedProgress(state)));
    } catch (error) {
      setState((current) => ({
        ...current,
        storageStatus: 'error',
        lastError: getStorageErrorMessage(error),
      }));
    }
  }, [state.bestScore, state.difficulty, state.options]);

  const startNewGame = useCallback((difficulty: Difficulty = state.difficulty) => {
    const grid = buildGrid(difficulty);

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
      activeCellId: getInitialActiveCellId(grid),
      tick: 0,
      lastError: null,
      grid,
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
    setState((current) => {
      const grid = buildGrid(current.difficulty);

      return {
        ...current,
        currentScreen: 'play',
        previousScreen: current.currentScreen,
        score: 0,
        moves: 0,
        isPaused: false,
        isGameOver: false,
        activeCellId: getInitialActiveCellId(grid),
        tick: 0,
        grid,
      };
    });
  }, []);

  const returnToMainMenu = useCallback(() => {
    setState((current) => ({
      ...withScreen(current, 'menu'),
      isPaused: false,
    }));
  }, []);

  const openSettings = useCallback(() => {
    setState((current) => (current.currentScreen === 'settings' ? current : withScreen(current, 'settings')));
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
      if (current.currentScreen !== 'play' || current.isPaused || current.isGameOver) {
        return current;
      }

      const selectedCell = current.grid.find((cell) => cell.id === cellId && cell.state !== 'cleared');
      if (!selectedCell) {
        return current;
      }

      const selectedIndex = current.grid.findIndex((cell) => cell.id === selectedCell.id);
      const nextPlayableCell = findNextPlayableCell(current.grid, selectedIndex);
      const nextGrid: GridCell[] = current.grid.map((cell) => {
        if (cell.id === selectedCell.id) {
          return { ...cell, state: 'cleared' };
        }

        if (nextPlayableCell && cell.state !== 'cleared') {
          return { ...cell, state: cell.id === nextPlayableCell.id ? 'active' : 'idle' };
        }

        return cell;
      });
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
        activeCellId: nextPlayableCell?.id ?? selectedCell.id,
        grid: nextGrid,
      };
    });
  }, []);

  const moveActiveCell = useCallback((direction: MoveDirection) => {
    setState((current) => {
      if (current.currentScreen !== 'play' || current.isPaused || current.isGameOver) {
        return current;
      }

      const size = gridSizeByDifficulty[current.difficulty];
      const activeCell = current.grid.find((cell) => cell.id === current.activeCellId && cell.state !== 'cleared');
      if (!activeCell) {
        return current;
      }

      const targetRow = direction === 'up' ? activeCell.row - 1 : direction === 'down' ? activeCell.row + 1 : activeCell.row;
      const targetCol = direction === 'left' ? activeCell.col - 1 : direction === 'right' ? activeCell.col + 1 : activeCell.col;
      const targetCell = current.grid.find(
        (cell) =>
          cell.row === Math.max(0, Math.min(size - 1, targetRow)) &&
          cell.col === Math.max(0, Math.min(size - 1, targetCol)) &&
          cell.state !== 'cleared',
      );

      if (!targetCell || targetCell.id === current.activeCellId) {
        return current;
      }

      return {
        ...current,
        activeCellId: targetCell.id,
        grid: setActiveCell(current.grid, targetCell.id),
      };
    });
  }, []);

  const tickGame = useCallback(() => {
    setState((current) => advanceGameTick(current));
  }, []);

  const resetLevel = useCallback(() => {
    setState((current) => {
      const grid = buildGrid(current.difficulty);

      return {
        ...current,
        moves: 0,
        activeCellId: getInitialActiveCellId(grid),
        tick: 0,
        grid,
      };
    });
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    const grid = buildGrid(difficulty);

    setState((current) => ({
      ...current,
      difficulty,
      activeCellId: getInitialActiveCellId(grid),
      tick: 0,
      grid,
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
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersistedProgress(current)));
        return {
          ...withScreen(current, current.previousScreen === 'settings' ? 'play' : current.previousScreen),
          storageStatus: 'saved',
          lastError: null,
        };
      } catch (error) {
        return {
          ...current,
          storageStatus: typeof window === 'undefined' ? 'unavailable' : 'error',
          lastError: getStorageErrorMessage(error),
        };
      }
    });
  }, []);

  const purgeProgress = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      skipNextPersistRef.current = true;
      setState({
        ...createInitialState(),
        storageStatus: 'purged',
        lastError: null,
      });
    } catch (error) {
      setState((current) => ({
        ...current,
        storageStatus: typeof window === 'undefined' ? 'unavailable' : 'error',
        lastError: getStorageErrorMessage(error),
      }));
    }
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
      moveActiveCell,
      tickGame,
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
      moveActiveCell,
      selectCell,
      setDifficulty,
      startNewGame,
      tickGame,
      updateOptions,
    ],
  );

  return { state, actions };
}
