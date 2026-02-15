import { Trophy, Heart } from 'lucide-react';
import { UI_CLASSES } from './uiClasses';

interface GameOverScreenProps {
  winner: 'player1' | 'player2';
  onRestart: () => void;
}

export function GameOverScreen({ winner, onRestart }: GameOverScreenProps) {
  const winnerName = winner === 'player1' ? 'Hedgehog' : 'Fox';
  const winnerColor = winner === 'player1' ? 'text-primary' : 'text-secondary';

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-md z-50">
      <div className={`${UI_CLASSES.panel} text-center space-y-6 animate-slide-in`}>
        <Trophy className={`w-24 h-24 mx-auto ${winnerColor} arcade-glow`} />
        
        <h2 className={`${UI_CLASSES.title} text-4xl`}>
          <span className={winnerColor}>{winnerName}</span> Wins!
        </h2>
        
        <p className={`${UI_CLASSES.subtitle} text-accent`}>
          Victory!
        </p>

        <button
          onClick={onRestart}
          className={`${UI_CLASSES.button} animate-pulse-glow`}
        >
          Play Again
        </button>

        <footer className="mt-8 pt-6 border-t border-border/50">
          <p className="text-muted-foreground text-sm font-display">
            © {new Date().getFullYear()} · Built with <Heart className="inline w-4 h-4 text-destructive fill-destructive" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
