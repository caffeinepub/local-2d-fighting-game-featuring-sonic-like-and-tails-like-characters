import { X } from 'lucide-react';
import { UI_CLASSES } from './uiClasses';

interface ControlsOverlayProps {
  onClose: () => void;
}

export function ControlsOverlay({ onClose }: ControlsOverlayProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-md z-50">
      <div className={`${UI_CLASSES.panel} max-w-3xl w-full mx-4 relative animate-slide-in`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-accent rounded-sm transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className={`${UI_CLASSES.subtitle} text-primary mb-6`}>Controls</h2>

        <div className="grid grid-cols-2 gap-8">
          {/* Player 1 */}
          <div className="space-y-4">
            <h3 className="font-arcade text-xl text-primary uppercase">Player 1 - Hedgehog</h3>
            <div className="space-y-2 font-display">
              <div className="flex justify-between items-center">
                <span>Move Left:</span>
                <span className={UI_CLASSES.keyBadge}>A</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Move Right:</span>
                <span className={UI_CLASSES.keyBadge}>D</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Jump:</span>
                <span className={UI_CLASSES.keyBadge}>W</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Quick Jab:</span>
                <span className={UI_CLASSES.keyBadge}>G</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Heavy Attack:</span>
                <span className={UI_CLASSES.keyBadge}>H</span>
              </div>
            </div>
          </div>

          {/* Player 2 */}
          <div className="space-y-4">
            <h3 className="font-arcade text-xl text-secondary uppercase">Player 2 - Fox</h3>
            <div className="space-y-2 font-display">
              <div className="flex justify-between items-center">
                <span>Move Left:</span>
                <span className={UI_CLASSES.keyBadge}>←</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Move Right:</span>
                <span className={UI_CLASSES.keyBadge}>→</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Jump:</span>
                <span className={UI_CLASSES.keyBadge}>↑</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Quick Jab:</span>
                <span className={UI_CLASSES.keyBadge}>NUM1</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Heavy Attack:</span>
                <span className={UI_CLASSES.keyBadge}>NUM2</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex justify-between items-center font-display">
            <span>Pause Game:</span>
            <span className={UI_CLASSES.keyBadge}>ESC</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className={`${UI_CLASSES.button} w-full mt-6`}
        >
          Got It!
        </button>
      </div>
    </div>
  );
}
