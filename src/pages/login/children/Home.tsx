import MiddleHome from '@/components/user/components/content/middle-components/components/middle-home';
import { RouterAnimationOptions } from '@/pages/router-animation-options';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LoginHomeBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  color: var(--color-text-1);
  span {
    color: var(--color-text-1);
  }
`;

function LoginHome() {
  return (
    <LoginHomeBox {...RouterAnimationOptions}>
      <MiddleHome />
    </LoginHomeBox>
  );
}

export default LoginHome;
