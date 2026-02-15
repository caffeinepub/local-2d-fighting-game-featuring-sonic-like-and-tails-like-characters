import { FighterSprite } from './FighterSprite';
import { ASSETS } from './assets';
import type { GameState } from '../engine/types';

interface StageProps {
  gameState: GameState;
}

export function Stage({ gameState }: StageProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background */}
      <img 
        src={ASSETS.stageBg} 
        alt="Stage background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Game arena overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[1200px] h-[600px]">
          {/* Player 1 - Hedgehog */}
          <FighterSprite 
            fighter={gameState.player1}
            spriteSheet={ASSETS.hedgehogSprites}
            color="primary"
          />
          
          {/* Player 2 - Fox */}
          <FighterSprite 
            fighter={gameState.player2}
            spriteSheet={ASSETS.foxSprites}
            color="secondary"
          />
        </div>
      </div>
    </div>
  );
}
