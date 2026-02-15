import type { Fighter, AttackState } from './types';

export const GRAVITY = 0.8;
export const MOVE_SPEED = 5;
export const JUMP_IMPULSE = -15;
export const GROUND_Y = 450;
export const ARENA_LEFT = 50;
export const ARENA_RIGHT = 1150;

export const FIGHTER_WIDTH = 80;
export const FIGHTER_HEIGHT = 100;

export const ATTACKS = {
  jab: {
    type: 'jab' as const,
    frame: 0,
    startupFrames: 3,
    activeFrames: 4,
    recoveryFrames: 8,
    damage: 8,
    knockback: 5,
    range: 90
  },
  heavy: {
    type: 'heavy' as const,
    frame: 0,
    startupFrames: 8,
    activeFrames: 6,
    recoveryFrames: 15,
    damage: 18,
    knockback: 12,
    range: 100
  },
  none: {
    type: 'none' as const,
    frame: 0,
    startupFrames: 0,
    activeFrames: 0,
    recoveryFrames: 0,
    damage: 0,
    knockback: 0,
    range: 0
  }
};

export const INITIAL_FIGHTER_STATE: Omit<Fighter, 'position'> = {
  velocity: { x: 0, y: 0 },
  health: 100,
  maxHealth: 100,
  facingRight: true,
  isGrounded: true,
  isJumping: false,
  attackState: { ...ATTACKS.none },
  hitStun: 0,
  width: FIGHTER_WIDTH,
  height: FIGHTER_HEIGHT
};
