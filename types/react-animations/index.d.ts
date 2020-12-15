declare module "react-animations" {
  type CSSValue = string | number;
  type Keyframe = {
    [property: string]: CSSValue;
  };
  type Animation = {
    [keyframe: string]: Keyframe;
  };
  export const pulse: Animation;
}
