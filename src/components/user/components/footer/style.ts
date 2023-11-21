import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterBox = styled(motion.div)`
  width: 100%;
  height: 40px;
  cursor: pointer;
  transition: all 0.3s;
  box-sizing: border-box;
  border: 1px solid var(--color-border-1);
  background-color: var(--color-fill-2);
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

const FooterSpan = styled(motion.span)`
  font-size: 16px;
  font-weight: bold;
  color: var(--color-text-1);
`;

export { FooterBox, FooterSpan };
