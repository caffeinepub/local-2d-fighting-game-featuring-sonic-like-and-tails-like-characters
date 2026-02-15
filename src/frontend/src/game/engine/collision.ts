import type { Hitbox, Fighter, AttackState } from './types';

export function checkOverlap(box1: Hitbox, box2: Hitbox): boolean {
  return (
    box1.x < box2.x + box2.width &&
    box1.x + box1.width > box2.x &&
    box1.y < box2.y + box2.height &&
    box1.y + box1.height > box2.y
  );
}

export function getFighterHitbox(fighter: Fighter): Hitbox {
  return {
    x: fighter.position.x,
    y: fighter.position.y,
    width: fighter.width,
    height: fighter.height
  };
}

export function getAttackHitbox(fighter: Fighter, attack: AttackState): Hitbox | null {
  const totalFrames = attack.startupFrames + attack.activeFrames + attack.recoveryFrames;
  
  if (attack.type === 'none' || attack.frame >= totalFrames) {
    return null;
  }

  const isActive = attack.frame >= attack.startupFrames && 
                   attack.frame < attack.startupFrames + attack.activeFrames;
  
  if (!isActive) {
    return null;
  }

  const offsetX = fighter.facingRight ? fighter.width : -attack.range;
  
  return {
    x: fighter.position.x + offsetX,
    y: fighter.position.y + 20,
    width: attack.range,
    height: 60
  };
}
