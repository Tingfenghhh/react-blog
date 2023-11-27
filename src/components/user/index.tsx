import { Layout } from '@arco-design/web-react';
import MyHeader from './components/header';
import MyContent from './components/content';
import './style/index.less';

const Header = Layout.Header;
const Content = Layout.Content;

function User() {
  return (
    <Layout style={{ height: '100%' }}>
      <Header className={'header'}>
        <MyHeader />
      </Header>
      <Content className={'content'}>
        <MyContent />
      </Content>
    </Layout>
  );
}

export default User;
