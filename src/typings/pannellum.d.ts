interface HotSpot {
  pitch: number;
  yaw: number;
  type: string;
  text: string;
  URL: string;
  cssClass: string;
  createTooltipArgs: string;
  sceneId: string;
  targetYaw: number;
  targetPitch: number;
}

interface ViewerConfig {
  type: string;
  panorama: string;
  title: string;
  hfov: number;
  pitch: number;
  yaw: number;
  firstScene: string;
  author: string;
  sceneFadeDuration: number;
  preview: string;
  autoLoad: boolean;
  autoRotate: number;
  hotSpots: Partial<HotSpot>[];
}

interface InitViewerConfig {
  default: Partial<ViewerConfig>;
  scenes?: {
    [key: string]: Partial<ViewerConfig>;
  };
}
