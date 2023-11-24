import { Routes, Route, useLocation } from 'react-router-dom';
import { ConfigProvider } from '@arco-design/web-react';
import Notfund from '@/pages/Notfund';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Suspense, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import routes from './router';
import LoadingSpin from './pages/loding';

const Login = routes[0].component;

const App = () => {
  const theme = localStorage.getItem('theme');
  const location = useLocation();
  // 路由切换时，进度条
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      const preloaad = Login.preload();
      NProgress.start();
      preloaad.then(() => {
        NProgress.done();
      });
      return;
    }
    // 根据routes找到当前路由的key
    const currentRoute = routes.find((route) => {
      return route.key === path.split('/')[1];
    });
    if (currentRoute) {
      const preloaad = currentRoute.component.preload();
      NProgress.start();
      preloaad.then(() => {
        NProgress.done();
      });
    }
  }, [location]);

  useEffect(() => {
    if (theme !== 'light') {
      document.body.setAttribute('arco-theme', 'dark');
      return;
    }
    document.body.removeAttribute('arco-theme');
  }, [theme]);
  return (
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
        <AnimatePresence mode='wait'>
          <Routes key={location.key} location={location}>
            {routes &&
              routes.map((route) => {
                const Component = route.component;
                return (
                  <Route
                    key={route.name}
                    path={`/${route.key}`}
                    element={
                      <Suspense fallback={<LoadingSpin />}>
                        <Component />
                      </Suspense>
                    }
                  />
                );
              })}
            <Route
              path='/'
              element={
                <Suspense fallback={<LoadingSpin />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path='*'
              element={
                <Suspense fallback={<LoadingSpin />}>
                  <Notfund />
                </Suspense>
              }
            />
          </Routes>
        </AnimatePresence>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
