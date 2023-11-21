import { useAppSelector } from '@/hooks/redux';
import { MotionColock, RightBox } from './style';
import Clocks from '@/components/clcok';
import { Variants } from 'framer-motion';

function RightContent() {
  const isLight = useAppSelector((state) => state.user.theme);

  const variants: Variants = {
    light: {
      opacity: [0, 1],
      y: [20, 0],
      transition: {
        delay: 0.5,
      },
    },
    dark: {
      opacity: [0, 1],
      y: [-20, 0],
      transition: {
        delay: 0.5,
      },
    },
  };

  return (
    <>
      <RightBox
        className='content-box'
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0.29, -0.18, 0.37, 1.01],
        }}
      >
        <MotionColock
          animate={isLight === 'light' ? 'light' : 'dark'}
          variants={variants}
          transition={{
            duration: 0.5,
            delay: 1,
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
      </RightBox>
    </>
  );
}

export default RightContent;
