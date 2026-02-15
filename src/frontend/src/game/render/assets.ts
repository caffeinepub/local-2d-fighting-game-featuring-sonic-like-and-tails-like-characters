export const ASSETS = {
  stageBg: '/assets/generated/stage-bg.dim_1920x1080.png',
  hedgehogSprites: '/assets/generated/hedgehog-fighter-sprites.dim_768x512.png',
  foxSprites: '/assets/generated/fox-fighter-sprites.dim_768x512.png',
  hudElements: '/assets/generated/hud-elements.dim_1024x256.png'
};

export function preloadAssets(): Promise<void[]> {
  const promises = Object.values(ASSETS).map(src => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  });

  return Promise.all(promises);
}
