import { useAppSelector } from '@/hooks/redux';
import { MotionColock, RightBox } from './style';
import Clocks from '@/components/clcok';
import { Variants } from 'framer-motion';
import ImgSwiper from './right-components/img-swiper';
import { DelayTime } from '../../delay';

function RightContent() {
  const isLight = useAppSelector((state) => state.user.theme);

  const variants: Variants = {
    light: {
      opacity: [0, 1],
      y: [20, 0],
      transition: {
        delay: DelayTime.delay,
      },
    },
    dark: {
      opacity: [0, 1],
      y: [-20, 0],
      transition: {
        delay: DelayTime.delay,
      },
    },
  };

  return (
    <>
      <RightBox className='content-box'>
        {/* 时钟 */}
        <MotionColock
          animate={isLight === 'light' ? 'light' : 'dark'}
          variants={variants}
          transition={{
            duration: 0.5,
            delay: 1.8,
            ease: [0.29, -0.18, 0.37, 1.01],
          }}
          drag
          dragConstraints={{
            top: 1,
            left: 1,
            right: 0,
            bottom: 0,
          }}
        >
          <Clocks />
        </MotionColock>
        {/* 图片swiper */}
        <ImgSwiper />
      </RightBox>
    </>
  );
}

export default RightContent;
