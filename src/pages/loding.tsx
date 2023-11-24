import { Spin } from '@arco-design/web-react';
import { motion } from 'framer-motion';

function LoadingSpin() {
  return (
    <>
      <motion.div
        className='loadingSpin'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Spin size={40} tip='页面加载中...' loading />
      </motion.div>
    </>
  );
}

export default LoadingSpin;
