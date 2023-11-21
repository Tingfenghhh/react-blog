import { motion } from 'framer-motion';
import styled from 'styled-components';

const MyContentBox = styled(motion.div)`
  width: 100%;
  transition: all 0.3s;
  box-sizing: border-box;
  padding: 5px 5px;
`;

const LeftBox = styled(motion.div)`
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const MiddleBox = styled(motion.div)`
  height: 1800px !important;
  margin-bottom: 35px;
`;

const RightBox = styled(motion.div)`
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

export { MyContentBox, LeftBox, MiddleBox, RightBox };
