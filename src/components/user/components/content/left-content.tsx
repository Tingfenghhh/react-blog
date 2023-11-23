import Wether from './left-components/wether';
import { LeftBox } from './style';

function LeftContent() {
  return (
    <LeftBox className='content-box'>
      <Wether />
    </LeftBox>
  );
}

export default LeftContent;
