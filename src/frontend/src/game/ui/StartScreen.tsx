import { useState } from 'react';
import { UI_CLASSES } from './uiClasses';
import { ControlsOverlay } from './ControlsOverlay';
import { Heart } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [showControls, setShowControls] = useState(false);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/20">
      <div className="text-center space-y-8 animate-slide-in">
        <h1 className={`${UI_CLASSES.title} text-primary mb-4`}>
          SPEED BRAWL
        </h1>
        <p className={`${UI_CLASSES.subtitle} text-secondary`}>
          Hedgehog vs Fox
        </p>
        
        <div className="flex flex-col gap-4 mt-12">
          <button
            onClick={onStart}
            className={`${UI_CLASSES.button} animate-pulse-glow`}
          >
            Start Fight
          </button>
          
          <button
            onClick={() => setShowControls(true)}
            className={UI_CLASSES.buttonSecondary}
          >
            Controls
          </button>
        </div>

        <footer className="mt-16 pt-8 border-t border-border/50">
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

      {showControls && <ControlsOverlay onClose={() => setShowControls(false)} />}
    </div>
  );
}
