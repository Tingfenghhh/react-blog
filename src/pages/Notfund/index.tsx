import { motion } from 'framer-motion';
import { RouterAnimationOptions } from '../router-animation-options';

function NotFound() {
  return (
    <motion.div {...RouterAnimationOptions}>
      <h1>404</h1>
    </motion.div>
  );
}

export default NotFound;
