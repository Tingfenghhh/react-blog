import * as Cesium from 'cesium';
import { Viewer } from 'cesium';
import { MapEnum } from '@/enums/mapEnum';

const { DEFAULT_LONGITUDE, DEFAULT_LATITUDE, CHINA_HEIGHT } = MapEnum;

// 高德地图底图urL
const geodeUrl =
  'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}';

// 高德地图底图
const gaodeImgBaseMapLayer = new Cesium.UrlTemplateImageryProvider({
  url: geodeUrl,
  maximumLevel: 18,
  minimumLevel: 0,
});

// 基础配置
const baseConfig: Viewer.ConstructorOptions = {
  animation: false, // 是否创建动画小器件，左下角仪表
  baseLayerPicker: false, // 是否显示图层选择器
  fullscreenButton: false, // 是否显示全屏按钮
  geocoder: false, // 是否显示geocoder小器件，右上角查询按钮
  homeButton: false, // 是否显示Home按钮
  infoBox: true, // 是否显示信息框
  sceneModePicker: false, // 是否显示3D/2D选择器
  selectionIndicator: false, // 是否显示选取指示器组件
  timeline: false, // 是否显示时间轴
  sceneMode: Cesium.SceneMode.SCENE3D, // 设定3维地图的默认场景模式
  navigationHelpButton: false, // 是否显示右上角的帮助按钮
  scene3DOnly: true, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
  navigationInstructionsInitiallyVisible: false,
  showRenderLoopErrors: true,
  automaticallyTrackDataSourceClocks: false,
  creditContainer: document.createElement('div'), // 关闭版权信息
  baseLayer: false,
};

export class useCesiumViewer {
  viewer: Viewer | null = null;

  /**
   * 初始化viewer
   * @param id    容器id
   * @returns     Cesium.Viewer
   */
  initViewer(id: string, options?: Viewer.ConstructorOptions): Promise<Viewer> {
    // 初始化viewer
    this.viewer = new Viewer(id ?? 'cesiumContainer', {
      ...baseConfig,
      ...options,
    });

    // Cesium处理iframe的allow-scripts权限问题
    this.allowScripts();
    // 相机配置设置
    this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 50; // 相机的高度的最小值
    this.viewer.scene.globe.depthTestAgainstTerrain = false; // 解决Cesium绘制几何图形被高程遮挡问题
    this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
    ); //禁用双击marker触发切换视角

    // 设置地图底图
    this.viewer.imageryLayers.addImageryProvider(gaodeImgBaseMapLayer);

    // 设置相机视角
    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(116.3975, 39.9085, 4000),
    });

    // 监听点击事件
    this.viewer.screenSpaceEventHandler.setInputAction((event: any) => {
      console.log('pickedObject', event);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    return Promise.resolve(this.viewer);
  }

  // 添加一些东西
  addSome(viewer: Viewer) {
    if (!viewer) return;
    // 清除所有实体
    viewer.entities.removeAll();

    const point = new Cesium.Entity({
      position: Cesium.Cartesian3.fromDegrees(116.3975, 39.9085, 1000),
      label: {
        text: 'cesium hhhh',
        font: '20px sans-serif',
        fillColor: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cesium.Cartesian2(0, -30),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
      point: {
        pixelSize: 10, //点像素大小
        color: Cesium.Color.RED, //点颜色，不能用rgb等css方法，需要用Cesium.Color
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
      },
    });

    // 添加实体
    viewer.entities.add(point);
  }

  /**
   * 飞行到指定位置
   * @param longitude
   * @param latitude
   * @param height
   * @param duration
   * @param pitch
   * @returns
   */
  flyToPosition(
    longitude: number = DEFAULT_LONGITUDE,
    latitude: number = DEFAULT_LATITUDE,
    height: number = CHINA_HEIGHT,
    duration = 1.5,
    pitch?: number,
  ): Promise<string> {
    if (!this.viewer) return Promise.reject('viewer is null');
    const { camera } = this.viewer;
    return new Promise((resolve) => {
      try {
        camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            longitude,
            latitude,
            height,
          ),
          orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(pitch ?? -90),
            roll: Cesium.Math.toRadians(0.0),
          },
          duration,
          complete: () => {
            resolve('complete');
          },
        });
      } catch (error) {
        throw new Error(error as string);
      }
    });
  }

  /**
   * Cesium处理iframe的allow-scripts权限问题
   */
  allowScripts() {
    if (!this.viewer) return;
    const iframe = document.getElementsByClassName('cesium-infoBox-iframe')[0]; // 获取iframe dom元素
    iframe.setAttribute(
      'sandbox',
      'allow-same-origin allow-scripts allow-popups allow-forms',
    );
    iframe.setAttribute('src', '');
  }

  /**
   * 销毁viewer
   */
  destroyViewer() {
    if (this.viewer) {
      this.viewer.destroy();
    }
    this.viewer = null;
  }
}
