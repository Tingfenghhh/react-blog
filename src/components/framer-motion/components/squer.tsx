import RotateBox from './rotate-box';
import { FC } from 'react';
interface props {
  backgroundColor: string;
}

const Squer: FC<props> = ({ backgroundColor }) => (
  <RotateBox
    animate={{
      x: 50,
      y: 30,
      scale: 0.5,
      rotate: 45,
      opacity: 0.5,
    }}
    transition={{ duration: 0.5 }}
    backgroundColor={backgroundColor}
  />
);

export default Squer;
