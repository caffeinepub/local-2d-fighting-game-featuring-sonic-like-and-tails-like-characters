import type { GameState, Fighter, AttackState } from './types';
import { 
  GRAVITY, 
  MOVE_SPEED, 
  JUMP_IMPULSE, 
  GROUND_Y, 
  ARENA_LEFT, 
  ARENA_RIGHT,
  ATTACKS,
  INITIAL_FIGHTER_STATE
} from './constants';
import { checkOverlap, getFighterHitbox, getAttackHitbox } from './collision';

export interface PlayerInput {
  left: boolean;
  right: boolean;
  jump: boolean;
  jab: boolean;
  heavy: boolean;
}

export function createInitialGameState(): GameState {
  return {
    player1: {
      ...INITIAL_FIGHTER_STATE,
      position: { x: 200, y: GROUND_Y },
      facingRight: true
    },
    player2: {
      ...INITIAL_FIGHTER_STATE,
      position: { x: 900, y: GROUND_Y },
      facingRight: false
    },
    frameCount: 0
  };
}

function updateFighter(
  fighter: Fighter,
  input: PlayerInput,
  opponent: Fighter
): Fighter {
  const updated = { ...fighter };

  // Update hit stun
  if (updated.hitStun > 0) {
    updated.hitStun--;
    return updated;
  }

  // Update attack state
  if (updated.attackState.type !== 'none') {
    updated.attackState.frame++;
    const totalFrames = 
      updated.attackState.startupFrames + 
      updated.attackState.activeFrames + 
      updated.attackState.recoveryFrames;
    
    if (updated.attackState.frame >= totalFrames) {
      updated.attackState = { ...ATTACKS.none };
    }
  }

  // Handle new attacks
  if (updated.attackState.type === 'none') {
    if (input.jab) {
      updated.attackState = { ...ATTACKS.jab };
    } else if (input.heavy) {
      updated.attackState = { ...ATTACKS.heavy };
    }
  }

  // Movement (only if not attacking)
  if (updated.attackState.type === 'none') {
    if (input.left) {
      updated.velocity.x = -MOVE_SPEED;
      updated.facingRight = false;
    } else if (input.right) {
      updated.velocity.x = MOVE_SPEED;
      updated.facingRight = true;
    } else {
      updated.velocity.x = 0;
    }

    // Jump
    if (input.jump && updated.isGrounded) {
      updated.velocity.y = JUMP_IMPULSE;
      updated.isGrounded = false;
      updated.isJumping = true;
    }
  } else {
    updated.velocity.x = 0;
  }

  // Apply gravity
  if (!updated.isGrounded) {
    updated.velocity.y += GRAVITY;
  }

  // Update position
  updated.position.x += updated.velocity.x;
  updated.position.y += updated.velocity.y;

  // Ground collision
  if (updated.position.y >= GROUND_Y) {
    updated.position.y = GROUND_Y;
    updated.velocity.y = 0;
    updated.isGrounded = true;
    updated.isJumping = false;
  } else {
    updated.isGrounded = false;
  }

  // Arena bounds
  if (updated.position.x < ARENA_LEFT) {
    updated.position.x = ARENA_LEFT;
  }
  if (updated.position.x + updated.width > ARENA_RIGHT) {
    updated.position.x = ARENA_RIGHT - updated.width;
  }

  // Auto-face opponent
  if (updated.attackState.type === 'none') {
    if (opponent.position.x < updated.position.x) {
      updated.facingRight = false;
    } else {
      updated.facingRight = true;
    }
  }

  return updated;
}

function checkHit(attacker: Fighter, defender: Fighter): boolean {
  const attackHitbox = getAttackHitbox(attacker, attacker.attackState);
  if (!attackHitbox) return false;

  const defenderHitbox = getFighterHitbox(defender);
  return checkOverlap(attackHitbox, defenderHitbox);
}

export function simulateFrame(
  state: GameState,
  input1: PlayerInput,
  input2: PlayerInput
): GameState {
  let newState = { ...state, frameCount: state.frameCount + 1 };

  // Update fighters
  newState.player1 = updateFighter(state.player1, input1, state.player2);
  newState.player2 = updateFighter(state.player2, input2, state.player1);

  // Check hits
  if (checkHit(newState.player1, newState.player2) && newState.player2.hitStun === 0) {
    newState.player2.health = Math.max(0, newState.player2.health - newState.player1.attackState.damage);
    newState.player2.hitStun = 15;
    const knockbackDir = newState.player1.facingRight ? 1 : -1;
    newState.player2.velocity.x = knockbackDir * newState.player1.attackState.knockback;
    newState.player2.velocity.y = -5;
    newState.player2.isGrounded = false;
  }

  if (checkHit(newState.player2, newState.player1) && newState.player1.hitStun === 0) {
    newState.player1.health = Math.max(0, newState.player1.health - newState.player2.attackState.damage);
    newState.player1.hitStun = 15;
    const knockbackDir = newState.player2.facingRight ? 1 : -1;
    newState.player1.velocity.x = knockbackDir * newState.player2.attackState.knockback;
    newState.player1.velocity.y = -5;
    newState.player1.isGrounded = false;
  }

  return newState;
}
