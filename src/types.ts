export interface SnowflakeItem {
  id: string;
  left: number; // percentage of viewport width
  size: number; // pixel size
  opacity: number;
  duration: number; // fall duration in seconds
  sway: number; // lateral sway in vw
  rotation: number; // initial tilt
}

export interface BalloonItem {
  id: string;
  left: number; // percentage of viewport width
  size: number; // pixel width
  color: string;
  glowColor: string;
  duration: number; // float duration in seconds
  sway: number; // lateral sway in vw
}

export type ActiveEffect = 'snow' | 'balloons' | null;
