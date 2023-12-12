import { RouterAnimationOptions } from '@/pages/router-animation-options';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HomeOtherBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  color: var(--color-text-1);
`;

function HomeOther() {
  return (
    <HomeOtherBox {...RouterAnimationOptions}>
      <span>HomeOtherBox</span>
    </HomeOtherBox>
  );
}

export default HomeOther;
