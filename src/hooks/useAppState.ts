import { useCallback, useMemo, useState } from 'react';
import type { AppActions, Difficulty, GameOptions, GameState, GridCell, MoveDirection, ScreenId } from '../types/domain';

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

function getInitialActiveCellId(grid: GridCell[]): string {
  return grid.find((cell) => cell.state === 'active')?.id ?? grid[0]?.id ?? 'cell-1';
}

function createInitialState(): GameState {
  const grid = buildGrid('medium');

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

function normalizeHydratedState(hydratedState: Partial<GameState>): GameState {
  const baseState = createInitialState();
  const difficulty = hydratedState.difficulty ?? baseState.difficulty;
  const grid = hydratedState.grid?.length ? hydratedState.grid : buildGrid(difficulty);

  return {
    ...baseState,
    ...hydratedState,
    difficulty,
    grid,
    options: {
      ...baseState.options,
      ...hydratedState.options,
    },
    activeCellId: hydratedState.activeCellId ?? getInitialActiveCellId(grid),
    storageStatus: 'loaded',
    lastError: null,
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
  const [state, setState] = useState<GameState>(() => {
    if (typeof window === 'undefined') {
      return createInitialState();
    }

    try {
      const rawState = window.localStorage.getItem(STORAGE_KEY);
      return rawState ? normalizeHydratedState(JSON.parse(rawState)) : createInitialState();
    } catch (error) {
      return {
        ...createInitialState(),
        storageStatus: 'error',
        lastError: getStorageErrorMessage(error),
      };
    }
  });

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
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
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
