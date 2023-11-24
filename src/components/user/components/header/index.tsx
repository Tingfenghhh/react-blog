import { HeaderBox } from './style';
import Logo from './left-logo';
import UserInfo from './right-user-info';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import './index.less';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import HeaderMenu from './components/header-menu';

function MyHeader() {
  const ref = useRef(null);
  const isLight = useAppSelector((state) => state.user.theme);
  const { scrollY } = useScroll();
  const [width, setWidth] = useState('100%');
  const [left, setLeft] = useState('0');
  const [boxShadow, setBoxShadow] = useState('none');

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest >= 30 && ref.current) {
      setWidth('90%');
      setLeft('5%');
    } else if (latest < 30 && ref.current) {
      setWidth('100%');
      setLeft('0');
    }
  });

  useEffect(() => {
    if (isLight === 'dark' && ref.current) {
      setBoxShadow('none');
    } else if (isLight === 'light' && ref.current) {
      setBoxShadow('0px 0px 10px 0px rgba(0,0,0,0.4)');
    }
  }, [isLight]);

  return (
    <>
      <HeaderBox
        ref={ref}
        style={{
          width: width,
          left: left,
          backdropFilter: 'blur(8px)',
          boxShadow: boxShadow,
          transition: ' 0.3s cubic-bezier(0.29, -0.18, 0.37, 1.01)',
        }}
      >
        <Logo />
        <HeaderMenu />
        <UserInfo />
      </HeaderBox>
    </>
  );
}

export default MyHeader;
