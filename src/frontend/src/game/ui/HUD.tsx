import type { GameState } from '../engine/types';

interface HUDProps {
  gameState: GameState;
}

export function HUD({ gameState }: HUDProps) {
  const p1HealthPercent = (gameState.player1.health / gameState.player1.maxHealth) * 100;
  const p2HealthPercent = (gameState.player2.health / gameState.player2.maxHealth) * 100;

  return (
    <div className="absolute top-0 left-0 right-0 p-6 z-10">
      <div className="max-w-6xl mx-auto flex items-start justify-between gap-8">
        {/* Player 1 */}
        <div className="flex-1">
          <div className="font-arcade text-xl text-primary uppercase mb-2 arcade-glow">
            Player 1 - Hedgehog
          </div>
          <div className="relative h-8 arcade-border bg-background/80 backdrop-blur-sm rounded-sm overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70 transition-all duration-300"
              style={{ width: `${p1HealthPercent}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-arcade text-sm text-foreground mix-blend-difference">
              {Math.ceil(gameState.player1.health)} / {gameState.player1.maxHealth}
            </div>
          </div>
        </div>

        {/* Center indicator */}
        <div className="font-arcade text-4xl text-accent uppercase arcade-glow">
          FIGHT!
        </div>

        {/* Player 2 */}
        <div className="flex-1">
          <div className="font-arcade text-xl text-secondary uppercase mb-2 text-right arcade-glow">
            Player 2 - Fox
          </div>
          <div className="relative h-8 arcade-border bg-background/80 backdrop-blur-sm rounded-sm overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-l from-secondary to-secondary/70 transition-all duration-300"
              style={{ width: `${p2HealthPercent}%`, marginLeft: 'auto' }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-arcade text-sm text-foreground mix-blend-difference">
              {Math.ceil(gameState.player2.health)} / {gameState.player2.maxHealth}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
