import { FC } from 'react';
import Squer from './components/squer';

interface FramerMotionProps {
  backgroundColor?: string;
}

const FramerMotion: FC<FramerMotionProps> = () => {
  return (
    <>
      <Squer backgroundColor='#339a14bf' />
    </>
  );
};

export default FramerMotion;
