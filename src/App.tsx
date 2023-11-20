import { HashRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from '@arco-design/web-react';
import Login from '@/pages/login';
import Home from '@/pages/home';
import Select from '@/pages/select';
import Notfund from '@/pages/Notfund';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect } from 'react';

const App = () => {
  const theme = localStorage.getItem('theme');
  useEffect(() => {
    if (theme !== 'light') {
      document.body.setAttribute('arco-theme', 'dark');
      return;
    }
    document.body.removeAttribute('arco-theme');
  }, [theme]);
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
            <Route path='/select' Component={Select} />
            <Route path='*' Component={Notfund} />
          </Routes>
        </Provider>
      </ConfigProvider>
    </HashRouter>
  );
};

export default App;
