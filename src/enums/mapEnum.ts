export enum MapEnum {
  /**
   * 相机最大缩放高度
   */
  MAXIMUMZOOMDISTANCE = 28000000,
  /**
   * 相机最小缩放高度
   */
  MINIMUMZOOMDISTANCE = 500,

  /**
   * 判断相机高度渲染不同实体图片
   */
  CHANGE_HEIGHT = 3000001,

  /**
   * 相机默认经度
   */
  DEFAULT_LONGITUDE = 103.523768,
  /**
   * 相机默认纬度
   */
  DEFAULT_LATITUDE = 36.220055,

  /**
   * 显示选中省级区域边界高度
   */
  BOUNDARY_PROVINCE_HEIGHT = 3000000,
  /**
   * 显示选中市级区域边界高度
   */
  BOUNDARY_CITY_HEIGHT = 700000,

  /**
   * 切换到全国相机高度
   * 初始8000000  中国全屏 5500000
   */
  CHINA_HEIGHT = 5500000,
  /**
   * 展示动画图标的相机高度
   */
  SHOW_ICON_HEIGHT = 6900000,
  /**
   * 切换到省份的相机高度
   */
  PROVINCE_HEIGHT = 1500000,
  /**
   * 切换到市的相机高度
   */
  CITY_HEIGHT = 360000,

  /**
   * 切换到区县的相机高度
   * @type {number}
   */
  COUNTY_HEIGHT = 30000,

  /**
   * 切换到学校的相机高度
   */
  SCHOOL_HEIGHT = 5500,
}
