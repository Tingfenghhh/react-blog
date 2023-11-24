import { MiddleBox } from './style';
import { Outlet } from 'react-router-dom';

function MiddleContent() {
  return (
    <>
      <MiddleBox className='content-box'>
        {/* 二级路由出口  */}
        <Outlet />
      </MiddleBox>
    </>
  );
}

export default MiddleContent;
