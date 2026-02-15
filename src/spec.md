# Specification

## Summary
**Goal:** Build a fully local/offline, playable 2D fighting game in the React frontend where two lookalike-inspired fighters (blue hedgehog-like and orange two-tailed fox-like) can battle on the same keyboard.

**Planned changes:**
- Create a 2D game loop and match scene with two simultaneously controlled players (separate keyboard controls).
- Implement core fighting mechanics: left/right movement, jumping, facing direction, two attacks per fighter, hit detection with active frames, damage, knockback, and health.
- Add match flow: HUD with names + health, round/win state, game-over screen, and restart/reset that restores health/positions/state.
- Add UI screens and overlays: title/start screen with Start action, controls/help overlay, and pause/resume that halts gameplay updates.
- Apply a consistent, energetic arcade UI theme across screens (not primarily blue/purple).
- Load and render generated static art assets (stage background, fighter sprites, HUD elements) from `frontend/public/assets/generated`.

**User-visible outcome:** The app opens to a start screen, lets two players view controls, start a match, fight locally with movement/jumps/attacks, pause/resume, see health and win state, and restart a completed match—using original, non-trademarked lookalike art.
