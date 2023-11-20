import { Layout } from '@arco-design/web-react';
import MyHeader from './components/header';
import MyContent from './components/content';
import MyFooter from './components/footer';
import './style/index.less';

const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

function User() {
  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Header className={'header'}>
          <MyHeader />
        </Header>
        <Content className={'content'}>
          <MyContent />
        </Content>
        <Footer className={'footer'}>
          <MyFooter />
        </Footer>
      </Layout>
    </>
  );
}

export default User;
