export const cancelAnimation = (animationRef: RefObject<number>) => {
  if (animationRef.current !== -1) {
    cancelAnimationFrame(animationRef.current);
  }
};
