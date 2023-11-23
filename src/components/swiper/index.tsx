import { MotionProps } from 'framer-motion';
import { MSwiper } from './style';
// Import Swiper React components
import { Swiper, SwiperProps } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

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
