import { AnimationProps } from 'framer-motion';

export const RouterFatherAnimationOptions: AnimationProps = {
  initial: {
    opacity: 0,
    y: 15,
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
    duration: 0.3,
  },
};
export const RouterAnimationOptions: AnimationProps = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -10,
  },
  transition: {
    delay: 0.4,
    duration: 0.5,
  },
};
