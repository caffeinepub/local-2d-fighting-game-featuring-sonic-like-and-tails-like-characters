import { useEffect, useRef, useState } from 'react';
import { createInitialGameState, simulateFrame, type PlayerInput } from './simulation';
import { useKeyboard } from '../input/useKeyboard';
import type { GameState } from './types';

interface UseGameLoopProps {
  isPlaying: boolean;
  onGameOver: (winner: 'player1' | 'player2') => void;
  onPause: () => void;
}

export function useGameLoop({ isPlaying, onGameOver, onPause }: UseGameLoopProps): GameState {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const { player1Input, player2Input, pausePressed } = useKeyboard();
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const gameOverTriggeredRef = useRef<boolean>(false);

  // Reset game state when starting
  useEffect(() => {
    if (isPlaying && gameState.frameCount === 0) {
      setGameState(createInitialGameState());
      gameOverTriggeredRef.current = false;
    }
  }, [isPlaying]);

  // Handle pause
  useEffect(() => {
    if (isPlaying && pausePressed) {
      onPause();
    }
  }, [pausePressed, isPlaying, onPause]);

  // Game loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const FPS = 60;
    const FRAME_TIME = 1000 / FPS;

    const loop = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;

      if (deltaTime >= FRAME_TIME) {
        setGameState(prevState => {
          const newState = simulateFrame(prevState, player1Input, player2Input);

          // Check for game over
          if (!gameOverTriggeredRef.current) {
            if (newState.player1.health <= 0) {
              gameOverTriggeredRef.current = true;
              setTimeout(() => onGameOver('player2'), 100);
            } else if (newState.player2.health <= 0) {
              gameOverTriggeredRef.current = true;
              setTimeout(() => onGameOver('player1'), 100);
            }
          }

          return newState;
        });

        lastTimeRef.current = currentTime;
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, player1Input, player2Input, onGameOver]);

  return gameState;
}
