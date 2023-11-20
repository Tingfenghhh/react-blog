import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { motion } from 'framer-motion';
import { Button } from '@arco-design/web-react';
import { IconSun, IconMoon } from '@arco-design/web-react/icon';
import { changeTheme } from '@/store/modules/user';
import { useEffect } from 'react';

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

function UserInfo() {
  const dispatch = useAppDispatch();
  const isLight = useAppSelector((state) => state.user.theme);
  const change = () => {
    dispatch(changeTheme(isLight === 'light' ? 'dark' : 'light'));
  };
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme !== 'light') {
      document.body.setAttribute('arco-theme', 'dark');
      return;
    }
    document.body.removeAttribute('arco-theme');
  }, [isLight]);

  return (
    <>
      <UserInfoMotion
        className='UserInfoMotion'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0, 0.71, 0.2, 1.01],
          delay: 0.4,
        }}
      >
        <Button
          shape='circle'
          type='text'
          icon={isLight !== 'light' ? <IconMoonStyled /> : <IconSunStyled />}
          onClick={() => change()}
        />
      </UserInfoMotion>
    </>
  );
}

export default UserInfo;