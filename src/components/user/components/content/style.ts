import { motion } from 'framer-motion';
import styled from 'styled-components';

const MyContentBox = styled(motion.div)`
  width: 100%;
  transition: all 0.3s;
  box-sizing: border-box;
  padding: 5px 5px;
`;

const LeftBox = styled.div`
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const MiddleBox = styled.div`
  height: 1800px !important;
  margin-bottom: 35px;
  border: 1px solid var(--color-border-1);
  box-shadow: 0px 0px 1px 0 var(--color-border-3);
`;

const RightBox = styled.div`
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const MotionColock = styled(motion.div)`
  width: 100%;
`;

export { MyContentBox, LeftBox, MiddleBox, RightBox, MotionColock };
