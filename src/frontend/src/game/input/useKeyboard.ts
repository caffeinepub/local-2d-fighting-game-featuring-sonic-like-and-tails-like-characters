import { useEffect, useState, useRef } from 'react';
import { PLAYER1_KEYS, PLAYER2_KEYS, PAUSE_KEY } from './keybindings';
import type { PlayerInput } from '../engine/simulation';

export function useKeyboard() {
  const [player1Input, setPlayer1Input] = useState<PlayerInput>({
    left: false,
    right: false,
    jump: false,
    jab: false,
    heavy: false
  });

  const [player2Input, setPlayer2Input] = useState<PlayerInput>({
    left: false,
    right: false,
    jump: false,
    jab: false,
    heavy: false
  });

  const [pausePressed, setPausePressed] = useState(false);
  const keysPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.code;
      
      if (keysPressed.current.has(code)) return;
      keysPressed.current.add(code);

      // Pause
      if (code === PAUSE_KEY) {
        setPausePressed(true);
        setTimeout(() => setPausePressed(false), 100);
        return;
      }

      // Player 1
      setPlayer1Input(prev => ({
        ...prev,
        left: code === PLAYER1_KEYS.left ? true : prev.left,
        right: code === PLAYER1_KEYS.right ? true : prev.right,
        jump: code === PLAYER1_KEYS.jump ? true : prev.jump,
        jab: code === PLAYER1_KEYS.jab ? true : prev.jab,
        heavy: code === PLAYER1_KEYS.heavy ? true : prev.heavy
      }));

      // Player 2
      setPlayer2Input(prev => ({
        ...prev,
        left: code === PLAYER2_KEYS.left ? true : prev.left,
        right: code === PLAYER2_KEYS.right ? true : prev.right,
        jump: code === PLAYER2_KEYS.jump ? true : prev.jump,
        jab: code === PLAYER2_KEYS.jab ? true : prev.jab,
        heavy: code === PLAYER2_KEYS.heavy ? true : prev.heavy
      }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const code = e.code;
      keysPressed.current.delete(code);

      // Player 1
      setPlayer1Input(prev => ({
        ...prev,
        left: code === PLAYER1_KEYS.left ? false : prev.left,
        right: code === PLAYER1_KEYS.right ? false : prev.right,
        jump: code === PLAYER1_KEYS.jump ? false : prev.jump,
        jab: code === PLAYER1_KEYS.jab ? false : prev.jab,
        heavy: code === PLAYER1_KEYS.heavy ? false : prev.heavy
      }));

      // Player 2
      setPlayer2Input(prev => ({
        ...prev,
        left: code === PLAYER2_KEYS.left ? false : prev.left,
        right: code === PLAYER2_KEYS.right ? false : prev.right,
        jump: code === PLAYER2_KEYS.jump ? false : prev.jump,
        jab: code === PLAYER2_KEYS.jab ? false : prev.jab,
        heavy: code === PLAYER2_KEYS.heavy ? false : prev.heavy
      }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return { player1Input, player2Input, pausePressed };
}
