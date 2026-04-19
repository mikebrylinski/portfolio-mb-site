/** Editorial / product-style easing — smooth deceleration */
export const appleEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const sectionRevealViewport = {
  once: true as const,
  amount: 0.14,
  margin: "0px 0px -16% 0px",
};

export function sectionRevealTransition(reducedMotion: boolean) {
  return reducedMotion
    ? { duration: 0 }
    : { duration: 1.08, ease: appleEase };
}

export const staggerViewport = {
  once: true as const,
  amount: 0.12,
  margin: "0px 0px -14% 0px",
};
