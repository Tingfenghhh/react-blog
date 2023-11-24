import User from '@/components/user/index';
import { motion } from 'framer-motion';
import { RouterAnimationOptions } from '../router-animation-options';

const login = () => {
  return (
    <motion.div {...RouterAnimationOptions}>
      <User />
    </motion.div>
  );
};

export default login;
