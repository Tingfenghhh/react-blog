import UserInfo from './left-components/user-info';
import Wether from './left-components/wether';
import { LeftBox } from './style';

function LeftContent() {
  return (
    <LeftBox className='content-box'>
      <Wether />
      <UserInfo />
    </LeftBox>
  );
}

export default LeftContent;
