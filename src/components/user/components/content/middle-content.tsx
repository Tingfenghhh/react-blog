import { motion } from 'framer-motion';
import styled from 'styled-components';

const MiddleBox = styled(motion.div)`
  width: 100%;
  height: calc(100vh - 130px);
  background-color: var(--color-fill-2);
  border-radius: 15px;
  border: 1px solid var(--color-border-1);
  box-shadow: 0px 0px 1px 0 var(--color-border-3);
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--color-border-3);
  }
`;

function MiddleContent() {
  return (
    <>
      <MiddleBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0.29, -0.18, 0.37, 1.01],
        }}
      ></MiddleBox>
    </>
  );
}

export default MiddleContent;
