import User from '@/components/user/index';
import { motion } from 'framer-motion';
import { RouterFatherAnimationOptions } from '../router-animation-options';

const login = () => {
  return (
    <motion.div {...RouterFatherAnimationOptions}>
      <User />
    </motion.div>
  );
};

export default login;
