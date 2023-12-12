import VueHome from '@/components/user/components/content/middle-components/components/vue-home/vue-home';
import { RouterAnimationOptions } from '@/pages/router-animation-options';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HomeVueBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  color: var(--color-text-1);
`;
function HomeVue() {
  return (
    <HomeVueBox {...RouterAnimationOptions}>
      <VueHome />
    </HomeVueBox>
  );
}

export default HomeVue;
