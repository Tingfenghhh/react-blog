import UserInfo from './user-info';
import Wether from './wether';
import { LeftBox } from '../style';

function LeftContent({ show }: { show?: boolean }) {
  return (
    <LeftBox
      className='content-box'
      style={{
        display: show ? 'block' : '',
      }}
    >
      <Wether />
      <UserInfo />
    </LeftBox>
  );
}

export default LeftContent;
