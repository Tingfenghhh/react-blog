import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s;
  box-sizing: border-box;
  border: 1px solid var(--color-border-1);
  background-color: var(--color-fill-2);
  border-radius: 5px;
  padding: 0 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-1);
  &:hover {
    border: 1px solid var(--color-border-3);
  }
`;

function MyFooter() {
  return (
    <>
      <FooterBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
        }}
        whileHover={{
          transition: {
            duration: 0.6,
            ease: [0, 0.71, 0.2, 1.01],
          },
        }}
      >
        <h4>tingfeng</h4>
      </FooterBox>
    </>
  );
}

export default MyFooter;
