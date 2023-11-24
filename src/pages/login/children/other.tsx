import { RouterAnimationOptions } from '@/pages/router-animation-options';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LoginOtherBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  color: var(--color-text-1);
  span {
    color: var(--color-text-1);
  }
`;

function LoginOther() {
  return (
    <LoginOtherBox {...RouterAnimationOptions}>
      <span>LoginOtherBox</span>
    </LoginOtherBox>
  );
}

export default LoginOther;
