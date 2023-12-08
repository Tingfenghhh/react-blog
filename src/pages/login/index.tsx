import styled from 'styled-components';
import LoginSwiper from './components/login-swiper';
import LoginForm from './components/login-form';
import './login.less';

const LoginBox = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const login = () => {
  return (
    <>
      <LoginBox>
        <LoginSwiper></LoginSwiper>
        <LoginForm></LoginForm>
      </LoginBox>
    </>
  );
};

export default login;
