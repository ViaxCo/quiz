// Function that takes an array and shuffles its contents
export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

// Create custom shake animation
type CSSValue = string | number;
type Keyframe = {
  [property: string]: CSSValue;
};
type Animation = {
  [keyframe: string]: Keyframe;
};

const translate3d = (a: CSSValue, b: CSSValue, c: CSSValue): string =>
  `translate3d(${a}, ${b}, ${c})`;

const noShake: Keyframe = {
  transform: translate3d(0, 0, 0),
};
const downShake: Keyframe = {
  transform: translate3d("-10px", 0, 0),
};
const upShake: Keyframe = {
  transform: translate3d("10px", 0, 0),
};

export const shake: Animation = {
  from: noShake,
  "10%": downShake,
  "20%": upShake,
  "30%": downShake,
  "40%": upShake,
  "50%": downShake,
  to: noShake,
};
