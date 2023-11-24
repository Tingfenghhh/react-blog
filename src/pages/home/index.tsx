import Clocks from '@/components/clcok';
import { motion } from 'framer-motion';
import { RouterAnimationOptions } from '../router-animation-options';

const Home = () => {
  return (
    <motion.div {...RouterAnimationOptions}>
      <Clocks />
    </motion.div>
  );
};

export default Home;
