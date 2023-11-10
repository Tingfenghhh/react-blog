import { HashRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from '@arco-design/web-react';
import Login from '@/pages/login';
import Home from '@/pages/home';
import Notfund from '@/pages/Notfund';
import { Provider } from 'react-redux';
import { store } from '@/store';

const App = () => {
  return (
    // 路由模式
    <HashRouter>
      {/* Arco的全局参数注入 */}
      <ConfigProvider
        componentConfig={{
          Button: {
            shape: 'square',
            style: {
              borderRadius: '5px',
            },
          },
          Card: {
            bordered: false,
          },
          List: {
            bordered: false,
          },
          Table: {
            border: false,
          },
        }}
      >
        <Provider store={store}>
          <Routes>
            <Route path='/' Component={Login} />
            <Route path='/home' Component={Home} />
            <Route path='*' Component={Notfund} />
          </Routes>
        </Provider>
      </ConfigProvider>
    </HashRouter>
  );
};

export default App;
