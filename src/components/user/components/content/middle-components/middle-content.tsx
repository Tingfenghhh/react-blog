import { Trigger } from '@arco-design/web-react';
import { MiddleBox } from '../style';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { IconMessage, IconClose } from '@arco-design/web-react/icon';
import HeaderMenu from '../../header/components/header-menu';

function MiddleContent() {
  const [popupVisibleOne, setPopupVisibleOne] = useState(false);
  const header = () => {
    return <HeaderMenu show={true} mode={'popButton'} />;
  };
  return (
    <>
      <MiddleBox className='content-box'>
        {/* 二级路由出口  */}
        <Outlet />
        {/* 小屏幕的菜单按钮 */}
        <div className={'motion-button-trigger'}>
          <Trigger
            popup={header}
            trigger={['click', 'hover']}
            clickToClose
            position='top'
            onVisibleChange={(v) => setPopupVisibleOne(v)}
          >
            <div
              className={`button-trigger ${
                popupVisibleOne ? 'button-trigger-active' : ''
              }`}
            >
              {popupVisibleOne ? <IconClose /> : <IconMessage />}
            </div>
          </Trigger>
        </div>
      </MiddleBox>
    </>
  );
}

export default MiddleContent;
