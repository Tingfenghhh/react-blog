import { AnimationProps } from 'framer-motion';

export const RouterAnimationOptions: AnimationProps = {
  initial: {
    opacity: 0.5,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
  transition: {
    duration: 0.5,
  },
};
