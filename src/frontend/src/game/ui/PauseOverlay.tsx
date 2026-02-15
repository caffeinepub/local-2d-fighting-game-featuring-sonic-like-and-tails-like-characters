import { UI_CLASSES } from './uiClasses';

interface PauseOverlayProps {
  onResume: () => void;
}

export function PauseOverlay({ onResume }: PauseOverlayProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-md z-40">
      <div className={`${UI_CLASSES.panel} text-center space-y-6 animate-slide-in`}>
        <h2 className={`${UI_CLASSES.title} text-accent text-5xl`}>PAUSED</h2>
        <p className={`${UI_CLASSES.text} text-muted-foreground`}>
          Press ESC or click below to resume
        </p>
        <button
          onClick={onResume}
          className={UI_CLASSES.button}
        >
          Resume Fight
        </button>
      </div>
    </div>
  );
}
