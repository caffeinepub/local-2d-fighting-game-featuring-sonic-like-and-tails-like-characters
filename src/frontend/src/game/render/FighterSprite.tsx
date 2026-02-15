import type { Fighter } from '../engine/types';

interface FighterSpriteProps {
  fighter: Fighter;
  spriteSheet: string;
  color: 'primary' | 'secondary';
}

export function FighterSprite({ fighter, spriteSheet, color }: FighterSpriteProps) {
  // Determine animation frame based on state
  let frameX = 0;
  const frameWidth = 128;
  const frameHeight = 128;

  if (fighter.attackState.type !== 'none') {
    // Attack animation
    frameX = fighter.attackState.type === 'jab' ? 2 : 3;
  } else if (!fighter.isGrounded) {
    // Jump animation
    frameX = 1;
  } else if (fighter.velocity.x !== 0) {
    // Run animation
    frameX = Math.floor(fighter.position.x / 20) % 2;
  }

  const glowColor = color === 'primary' ? 'oklch(0.65 0.22 35)' : 'oklch(0.70 0.25 350)';

  return (
    <div
      className="absolute transition-all duration-75"
      style={{
        left: `${fighter.position.x}px`,
        top: `${fighter.position.y}px`,
        width: `${fighter.width}px`,
        height: `${fighter.height}px`,
        transform: fighter.facingRight ? 'scaleX(1)' : 'scaleX(-1)',
        filter: fighter.hitStun > 0 ? 'brightness(1.5) saturate(0)' : 'none'
      }}
    >
      {/* Sprite */}
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(${spriteSheet})`,
          backgroundPosition: `-${frameX * frameWidth}px 0`,
          backgroundSize: `${frameWidth * 6}px ${frameHeight}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          filter: `drop-shadow(0 0 8px ${glowColor})`
        }}
      />
      
      {/* Attack indicator */}
      {fighter.attackState.type !== 'none' && 
       fighter.attackState.frame >= fighter.attackState.startupFrames &&
       fighter.attackState.frame < fighter.attackState.startupFrames + fighter.attackState.activeFrames && (
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            left: fighter.facingRight ? '100%' : 'auto',
            right: fighter.facingRight ? 'auto' : '100%',
            width: `${fighter.attackState.range}px`,
            height: '60px',
            background: `linear-gradient(${fighter.facingRight ? '90deg' : '-90deg'}, ${glowColor}40, transparent)`,
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  );
}
