import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { GameOptionsSettings } from '../screens/GameOptionsSettings';
import type { Difficulty, GameOptions } from '../types/domain';

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
});
