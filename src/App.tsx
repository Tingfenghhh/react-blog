import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ConfigProvider, Message } from '@arco-design/web-react';
import Notfund from '@/pages/not-found';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Suspense, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import routes from './router';
import LoadingSpin from './pages/loading';
import CustomCursor from './components/customCursor';

const Login = routes[0].component;

const App = () => {
  const theme = localStorage.getItem('theme');
  const navigate = useNavigate();
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
    const token = localStorage.getItem('Blogtoken');
    if (!token) {
      Message.info({
        id: 'login',
        content: '请先登录',
      });
      navigate('/');
      return;
    }
    const pathArr = path.split('/');
    if (pathArr.length > 2) {
      routes.forEach((route) => {
        if (route.key === pathArr[1]) {
          route.children?.find((child) => {
            if (child.key === pathArr[2]) {
              const preloaad = child.component.preload();
              NProgress.start();
              preloaad.then(() => {
                NProgress.done();
              });
            }
          });
        }
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
    <div style={{ overflow: 'hidden', position: 'relative' }}>
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
            <Routes location={location}>
              {routes &&
                routes.map((route) => {
                  const Component = route.component;
                  return (
                    <Route
                      key={`/${route.key}`}
                      path={`/${route.key}`}
                      element={
                        <Suspense fallback={<LoadingSpin />}>
                          <Component />
                        </Suspense>
                      }
                    >
                      {route.children &&
                        route.children.map((child) => {
                          const ChildComponent = child.component;
                          return (
                            <Route
                              key={`/${route.key}/${child.key}`}
                              path={`/${route.key}/${child.key}`}
                              element={
                                <Suspense fallback={<LoadingSpin />}>
                                  <ChildComponent />
                                </Suspense>
                              }
                            />
                          );
                        })}
                    </Route>
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
      <CustomCursor />
    </div>
  );
};

export default App;
