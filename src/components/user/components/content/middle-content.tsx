import { Button, Space } from '@arco-design/web-react';
import { MiddleBox } from './style';
import { useNavigate } from 'react-router-dom';

function MiddleContent() {
  const navigate = useNavigate();
  const goto = (key: string) => {
    navigate(`/${key}`);
  };
  return (
    <>
      <MiddleBox className='content-box'>
        <Space>
          <Button onClick={() => goto('home')}>notfound</Button>
        </Space>
      </MiddleBox>
    </>
  );
}

export default MiddleContent;
