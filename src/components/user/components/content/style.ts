import { motion } from 'framer-motion';
import styled from 'styled-components';

const MyContentBox = styled(motion.div)`
  width: 100%;
  transition: all 0.3s;
  box-sizing: border-box;
  padding: 5px 5px;
`;

const LeftBox = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const MiddleBox = styled.div`
  min-height: 100vh;
  margin-bottom: 35px;
  border: 1px solid var(--color-border-1);
  box-shadow: 0px 0px 1px 0 var(--color-border-3);
  background-color: transparent;
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
