import styled from 'styled-components';
import { motion } from 'framer-motion';
import { IconSun, IconMoon } from '@arco-design/web-react/icon';

const HeaderBox = styled(motion.div)`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s;
  box-sizing: border-box;
  border: 1px solid var(--color-border-1);
  box-shadow: 3px 2px 10px 0 gray;
  background-color: transparent !important;
  padding: 0 10px;
  border-radius: var(--border-radius-xlarge);
  backdrop-filter: blur(5px);
  position: fixed;
  top: 3px;
  left: 0;
  z-index: 999;
  &:hover {
    border: 1px solid var(--color-border-3);
    backdrop-filter: blur(10px);
  }
`;

const LogoMotion = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const LogoSpan = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-left: 5px;
  color: var(--color-text-1);
`;

const IconSunStyled = styled(IconSun)`
  color: var(--color-text-1);
  font-weight: bold;
`;
const IconMoonStyled = styled(IconMoon)`
  color: var(--color-text-1);
  font-weight: bold;
`;

const UserInfoMotion = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: var(--border-radius-xlarge);
  box-sizing: border-box;
`;

export {
  HeaderBox,
  LogoMotion,
  LogoImg,
  LogoSpan,
  IconSunStyled,
  IconMoonStyled,
  UserInfoMotion,
};
