import { motion } from 'framer-motion';
import styled from 'styled-components';

const MyContentBox = styled(motion.div)`
  width: 100%;
  height: calc(100vh - 110px);
  transition: all 0.3s;
  box-sizing: border-box;
  padding: 5px 5px;
`;

const LeftBox = styled(motion.div)`
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const MiddleBox = styled(motion.div)``;

const RightBox = styled(motion.div)`
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

export { MyContentBox, LeftBox, MiddleBox, RightBox };
