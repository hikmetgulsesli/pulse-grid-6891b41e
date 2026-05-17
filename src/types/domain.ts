export type ScreenId = 'menu' | 'play' | 'pause' | 'settings' | 'help' | 'gameOver';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type CellState = 'idle' | 'active' | 'cleared';

export interface GridCell {
  id: string;
  row: number;
  col: number;
  state: CellState;
}

export interface GameOptions {
  sound: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  pulseSpeed: number;
}

export interface GameState {
  currentScreen: ScreenId;
  previousScreen: ScreenId;
  difficulty: Difficulty;
  level: number;
  score: number;
  moves: number;
  bestScore: number;
  isPaused: boolean;
  isGameOver: boolean;
  grid: GridCell[];
  options: GameOptions;
}

export interface AppActions {
  startNewGame: (difficulty?: Difficulty) => void;
  resumeGame: () => void;
  pauseGame: () => void;
  restartLevel: () => void;
  returnToMainMenu: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  openHelp: () => void;
  closeHelp: () => void;
  selectCell: (cellId: string) => void;
  resetLevel: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  updateOptions: (options: Partial<GameOptions>) => void;
  commitOptions: () => void;
  purgeProgress: () => void;
  quitSystem: () => void;
}

export interface AppBridge {
  state: GameState;
  actions: AppActions;
}

declare global {
  interface Window {
    app?: AppBridge;
  }

  // eslint-disable-next-line no-var
  var app: AppBridge | undefined;
}
