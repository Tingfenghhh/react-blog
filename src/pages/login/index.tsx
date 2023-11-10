import User from '@/components/user';
import { Button, Space } from '@arco-design/web-react';

const login = () => {
  return (
    <>
      <Space direction='vertical'>
        <h1>login</h1>
        <User />
        {/* 点击按钮,react-router跳转到home */}
        <Button type='primary' onClick={() => (window.location.hash = '/home')}>
          登录
        </Button>
      </Space>
    </>
  );
};

export default login;
