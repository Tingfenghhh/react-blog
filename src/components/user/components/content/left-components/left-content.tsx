import UserInfo from './user-info';
import Wether from './wether';
import { LeftBox } from '../style';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/redux';

function LeftContent({ show }: { show?: boolean }) {
  const img = useAppSelector((state) => state.user.backImg);
  const [backImg, setBackImg] = useState<string>('');
  useEffect(() => {
    if (img) {
      setBackImg(img);
    }
  }, [img]);

  return (
    <LeftBox
      className='content-box left-content-box'
      style={{
        display: show ? 'block' : '',
        backgroundImage: `url(${backImg})`,
      }}
    >
      <Wether />
      <UserInfo />
    </LeftBox>
  );
}

export default LeftContent;
