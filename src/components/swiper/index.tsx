import { MotionProps } from 'framer-motion';
import { MSwiper } from './style';
// Import Swiper React components
import { Swiper, SwiperProps } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

/**
 * @interface MotionSwiperPorps
 * @description MotionSwiper组件的属性接口
 * @property {JSX.Element | JSX.Element[]} swiperContent - 轮播内容，可以是单个元素或元素数组
 * @property {string} [className] - 组件的类名
 * @property {string} [swiperClassName] - 轮播组件的类名
 * @property {SwiperProps} [swiperOptions] - 轮播组件的配置选项
 * @property {MotionProps} [motionSwiperOptions] - Motion动画组件的配置选项
 */
interface MotionSwiperPorps {
  swiperContent: JSX.Element | JSX.Element[];
  className?: string;
  swiperClassName?: string;
  swiperOptions?: SwiperProps;
  motionSwiperOptions?: MotionProps;
}

function MotionSwiper(MotionSwipers: MotionSwiperPorps) {
  return (
    <>
      <MSwiper
        {...MotionSwipers.motionSwiperOptions}
        className={MotionSwipers.className ?? ''}
      >
        <Swiper
          {...MotionSwipers.swiperOptions}
          className={MotionSwipers.swiperClassName}
        >
          {MotionSwipers.swiperContent}
        </Swiper>
      </MSwiper>
    </>
  );
}

export default MotionSwiper;
