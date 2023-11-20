import { useAppSelector, useAppDispatch } from '@/hooks/redux';

import { Button } from '@arco-design/web-react';

import { changeTheme } from '@/store/modules/user';
import { useEffect } from 'react';
import { IconMoonStyled, IconSunStyled, UserInfoMotion } from './style';

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
