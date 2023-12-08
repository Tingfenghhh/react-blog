import { RouterAnimationOptions } from '@/pages/router-animation-options';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox, Message } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { useMyAxios } from '@/apis/intercept';
import { loginConfig } from '@/apis/login';
import { useNavigate } from 'react-router-dom';
const FormItem = Form.Item;

const LoginFormBox = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 100%;
  }
`;

const LoginFormMotion = styled(motion.div)`
  width: 500px;
  height: 400px;
  backdrop-filter: blur(10px);
  border-radius: 15px;
`;

function LoginForm() {
  const [remenber, setRemenber] = useState(false);
  const navigate = useNavigate();
  const [{ loading }, Login] = useMyAxios<BlogReturnData<string>, LoginParams>(
    loginConfig.config,
    loginConfig.options,
  );

  const login = (val: LoginParams) => {
    Login({
      data: {
        username: val.username,
        password: val.password,
      },
    }).then((res) => {
      if (res.data.code === 0) {
        if (remenber) {
          // 存储账户密码
          localStorage.setItem('Blogusername', val.username);
          localStorage.setItem('Blogpassword', val.password);
        } else {
          localStorage.removeItem('Blogusername');
          localStorage.removeItem('Blogpassword');
        }

        localStorage.setItem('Blogtoken', res.data.data);
        Message.success('登录成功');
        navigate('/home/index');
        return;
      }
      Message.error(res.data.message);
    });
  };

  const isRemenber = (val: boolean) => {
    localStorage.setItem('remenberPassword', val.toString());
    setRemenber(val);
  };

  useEffect(() => {
    const remenberPassword = localStorage.getItem('remenberPassword');

    if (remenberPassword !== null) {
      setRemenber(remenberPassword === 'true' ? true : false);
    }
  }, []);

  return (
    <>
      <LoginFormBox>
        <LoginFormMotion
          {...RouterAnimationOptions}
          className='LoginFormMotion'
        >
          <Form
            layout={'vertical'}
            style={{ width: 450 }}
            requiredSymbol={false}
            initialValues={{
              username: localStorage.getItem('Blogusername') ?? '',
              password: localStorage.getItem('Blogpassword') ?? '',
            }}
            onSubmit={(values) => login(values)}
          >
            <FormItem
              label='账户'
              field='username'
              rules={[{ required: true, message: '账户名称不可以为空' }]}
            >
              <Input placeholder='请输入账户' />
            </FormItem>
            <FormItem
              label='密码'
              field='password'
              rules={[{ required: true, message: '密码不可以为空' }]}
            >
              <Input.Password placeholder='请输入密码' />
            </FormItem>
            <FormItem>
              <Checkbox checked={remenber} onChange={(val) => isRemenber(val)}>
                记住密码
              </Checkbox>
            </FormItem>
            <FormItem>
              <Button
                style={{ width: '100%' }}
                htmlType='submit'
                loading={loading}
                type='primary'
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </LoginFormMotion>
      </LoginFormBox>
    </>
  );
}

export default LoginForm;
