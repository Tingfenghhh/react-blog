import { motion } from 'framer-motion';
import { RouterFatherAnimationOptions } from '../router-animation-options';
import { Button, Result } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <motion.div
      {...RouterFatherAnimationOptions}
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Result
        status='404'
        subTitle='未找到该页面 '
        extra={[
          <Button
            key='back'
            type='primary'
            onClick={() => {
              navigate('/');
            }}
          >
            返回上一页
          </Button>,
        ]}
      ></Result>
    </motion.div>
  );
}

export default NotFound;
