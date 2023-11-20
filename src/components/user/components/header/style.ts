import styled from 'styled-components';
import { motion } from 'framer-motion';
import { IconSun, IconMoon } from '@arco-design/web-react/icon';

const HeaderBox = styled(motion.div)`
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
  &:hover {
    border: 1px solid var(--color-border-3);
  }
`;

const LogoMotion = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
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

const UserInfoMotion = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
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
