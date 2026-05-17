import '@testing-library/jest-dom/vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import { GameOptionsSettings } from '../screens/GameOptionsSettings';
import type { Difficulty, GameOptions } from '../types/domain';

beforeEach(() => {
  window.localStorage.clear();
  globalThis.app = undefined;
});

describe('GameOptionsSettings', () => {
  it('updates option and difficulty handlers from controlled inputs before saving', () => {
    const updateOptions = vi.fn();
    const setDifficulty = vi.fn();
    const commitChanges = vi.fn();
    const options: GameOptions = {
      sound: true,
      reducedMotion: false,
      highContrast: false,
      pulseSpeed: 2,
    };

    render(createElement(GameOptionsSettings, {
      actions: { 'commit-changes-5': commitChanges },
      options,
      difficulty: 'medium',
      updateOptions,
      setDifficulty,
    }));

    fireEvent.click(screen.getByLabelText('Sound'));
    fireEvent.click(screen.getByLabelText('Reduced motion'));
    fireEvent.click(screen.getByLabelText('High contrast'));
    fireEvent.change(screen.getByLabelText('Signal propagation speed'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('Security clearance difficulty'), { target: { value: 'hard' satisfies Difficulty } });
    fireEvent.click(screen.getByRole('button', { name: /commit_changes/i }));

    expect(updateOptions).toHaveBeenCalledWith({ sound: false });
    expect(updateOptions).toHaveBeenCalledWith({ reducedMotion: true });
    expect(updateOptions).toHaveBeenCalledWith({ highContrast: true });
    expect(updateOptions).toHaveBeenCalledWith({ pulseSpeed: 4 });
    expect(setDifficulty).toHaveBeenCalledWith('hard');
    expect(updateOptions).toHaveBeenLastCalledWith({
      sound: false,
      reducedMotion: true,
      highContrast: true,
      pulseSpeed: 4,
    });
    expect(commitChanges).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('status')).toHaveTextContent('Changes saved');
  });

  it('uses the app bridge fallback when rendered without controlled props', () => {
    const updateOptions = vi.fn();
    const setDifficulty = vi.fn();
    const commitChanges = vi.fn();
    const options: GameOptions = {
      sound: true,
      reducedMotion: false,
      highContrast: false,
      pulseSpeed: 2,
    };

    globalThis.app = {
      state: {
        currentScreen: 'settings',
        previousScreen: 'play',
        difficulty: 'medium',
        level: 1,
        score: 0,
        moves: 0,
        bestScore: 0,
        isPaused: false,
        isGameOver: false,
        activeCellId: 'cell-1',
        tick: 0,
        storageStatus: 'idle',
        lastError: null,
        grid: [],
        options,
      },
      actions: {
        startNewGame: vi.fn(),
        resumeGame: vi.fn(),
        pauseGame: vi.fn(),
        restartLevel: vi.fn(),
        returnToMainMenu: vi.fn(),
        openSettings: vi.fn(),
        closeSettings: vi.fn(),
        openHelp: vi.fn(),
        closeHelp: vi.fn(),
        selectCell: vi.fn(),
        moveActiveCell: vi.fn(),
        tickGame: vi.fn(),
        resetLevel: vi.fn(),
        setDifficulty,
        updateOptions,
        commitOptions: commitChanges,
        purgeProgress: vi.fn(),
        quitSystem: vi.fn(),
      },
    };

    render(createElement(GameOptionsSettings, {
      actions: { 'commit-changes-5': commitChanges },
    }));

    fireEvent.click(screen.getByLabelText('Sound'));
    fireEvent.click(screen.getByLabelText('Reduced motion'));
    fireEvent.click(screen.getByLabelText('High contrast'));
    fireEvent.change(screen.getByLabelText('Signal propagation speed'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('Security clearance difficulty'), { target: { value: 'easy' satisfies Difficulty } });
    fireEvent.click(screen.getByRole('button', { name: /commit_changes/i }));

    expect(updateOptions).toHaveBeenCalledWith({ sound: false });
    expect(updateOptions).toHaveBeenCalledWith({ reducedMotion: true });
    expect(updateOptions).toHaveBeenCalledWith({ highContrast: true });
    expect(updateOptions).toHaveBeenCalledWith({ pulseSpeed: 5 });
    expect(updateOptions).toHaveBeenLastCalledWith({
      sound: false,
      reducedMotion: true,
      highContrast: true,
      pulseSpeed: 5,
    });
    expect(setDifficulty).toHaveBeenLastCalledWith('easy');
    expect(commitChanges).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('status')).toHaveTextContent('Pulse 5.0x');
  });
});

describe('App settings integration', () => {
  it('opens settings with current app options and persists committed changes', async () => {
    render(createElement(App));

    act(() => {
      globalThis.app?.actions.openSettings();
    });

    expect(await screen.findByRole('heading', { name: 'System_Options' })).toBeInTheDocument();
    expect(screen.getByLabelText('Signal propagation speed')).toHaveValue('2');
    expect(screen.getByLabelText('Security clearance difficulty')).toHaveValue('medium');

    fireEvent.click(screen.getByLabelText('Sound'));
    fireEvent.change(screen.getByLabelText('Signal propagation speed'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('Security clearance difficulty'), { target: { value: 'hard' satisfies Difficulty } });
    fireEvent.click(screen.getByRole('button', { name: /commit_changes/i }));

    expect(globalThis.app?.state.options.sound).toBe(false);
    expect(globalThis.app?.state.options.pulseSpeed).toBe(5);
    expect(globalThis.app?.state.difficulty).toBe('hard');
    expect(window.localStorage.getItem('pulse-grid-state')).toContain('"difficulty":"hard"');
  });

  it('confirms the settings action while already on the settings screen', async () => {
    render(createElement(App));

    act(() => {
      globalThis.app?.actions.openSettings();
    });

    expect(await screen.findByRole('heading', { name: 'System_Options' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));

    expect(screen.getAllByText('Settings panel active').length).toBeGreaterThan(0);
  });
});
