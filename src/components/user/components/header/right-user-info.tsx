import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import logos from '@/assets/images/user/logos.png';
import { Avatar, Button } from '@arco-design/web-react';

import { changeTheme } from '@/store/modules/user';
import { useEffect, useState } from 'react';
import { IconMoonStyled, IconSunStyled, UserInfoMotion } from './style';

function UserInfo() {
  const dispatch = useAppDispatch();
  const isLight = useAppSelector((state) => state.user.theme);
  const [themeName, setThemeName] = useState('暗黑模式');
  const change = () => {
    dispatch(changeTheme(isLight === 'light' ? 'dark' : 'light'));
  };
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme !== 'light') {
      document.body.setAttribute('arco-theme', 'dark');
      setThemeName('暗黑模式');
      return;
    }
    document.body.removeAttribute('arco-theme');
    setThemeName('亮色模式');
  }, [isLight]);

  return (
    <>
      <UserInfoMotion className='UserInfoMotion'>
        <Button
          shape='round'
          type='text'
          icon={isLight !== 'light' ? <IconMoonStyled /> : <IconSunStyled />}
          onClick={() => change()}
        >
          <span className='theme-btn'> {themeName}</span>
        </Button>
        <Avatar>
          <img width={30} height={30} src={logos} alt='logo' />
        </Avatar>
      </UserInfoMotion>
    </>
  );
}

export default UserInfo;
