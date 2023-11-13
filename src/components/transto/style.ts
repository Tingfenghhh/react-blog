import { motion } from 'framer-motion';
import styled from 'styled-components';

export const ModalBox = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  /* 背景颜色动画 */
  transition: background-color 0.2s linear;
  backdrop-filter: blur(2px);
`;

export const ModalTiltle = styled.div`
  width: 100%;
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalContent = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -150px;
  width: 500px;
  height: 300px;
  background: var(--transColor-1);
  border-radius: 15px;
  box-sizing: border-box;
  padding: 20px;
`;
