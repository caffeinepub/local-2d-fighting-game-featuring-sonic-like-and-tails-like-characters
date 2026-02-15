export interface Vector2 {
  x: number;
  y: number;
}

export interface Hitbox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type AttackType = 'jab' | 'heavy' | 'none';

export interface AttackState {
  type: AttackType;
  frame: number;
  startupFrames: number;
  activeFrames: number;
  recoveryFrames: number;
  damage: number;
  knockback: number;
  range: number;
}

export interface Fighter {
  position: Vector2;
  velocity: Vector2;
  health: number;
  maxHealth: number;
  facingRight: boolean;
  isGrounded: boolean;
  isJumping: boolean;
  attackState: AttackState;
  hitStun: number;
  width: number;
  height: number;
}

export interface GameState {
  player1: Fighter;
  player2: Fighter;
  frameCount: number;
}
