import { useState, useCallback } from 'react';
import { StartScreen } from './ui/StartScreen';
import { GameOverScreen } from './ui/GameOverScreen';
import { HUD } from './ui/HUD';
import { PauseOverlay } from './ui/PauseOverlay';
import { Stage } from './render/Stage';
import { useGameLoop } from './engine/useGameLoop';
import { INITIAL_FIGHTER_STATE } from './engine/constants';
import type { GameState } from './engine/types';

type Screen = 'start' | 'playing' | 'paused' | 'gameover';

export function GameRoot() {
  const [screen, setScreen] = useState<Screen>('start');
  const [winner, setWinner] = useState<'player1' | 'player2' | null>(null);

  const handleStart = useCallback(() => {
    setScreen('playing');
    setWinner(null);
  }, []);

  const handlePause = useCallback(() => {
    setScreen('paused');
  }, []);

  const handleResume = useCallback(() => {
    setScreen('playing');
  }, []);

  const handleGameOver = useCallback((winningPlayer: 'player1' | 'player2') => {
    setWinner(winningPlayer);
    setScreen('gameover');
  }, []);

  const handleRestart = useCallback(() => {
    setScreen('start');
    setWinner(null);
  }, []);

  const gameState = useGameLoop({
    isPlaying: screen === 'playing',
    onGameOver: handleGameOver,
    onPause: handlePause
  });

  return (
    <div className="relative w-full h-full">
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      
      {(screen === 'playing' || screen === 'paused' || screen === 'gameover') && (
        <>
          <Stage gameState={gameState} />
          <HUD gameState={gameState} />
          {screen === 'paused' && <PauseOverlay onResume={handleResume} />}
          {screen === 'gameover' && winner && (
            <GameOverScreen winner={winner} onRestart={handleRestart} />
          )}
        </>
      )}
    </div>
  );
}
