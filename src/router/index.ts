import { IRoute } from '@/typings/router';
import { lazy } from 'react';

const routes: IRoute[] = [
  {
    name: 'login',
    key: 'login',
  },
  {
    name: 'home',
    key: 'home',
    children: [
      {
        name: 'index',
        key: 'index',
        text: '首页',
      },
      {
        name: 'Vue',
        key: 'Vue',
        text: 'Vue',
      },
      {
        name: 'React',
        key: 'React',
        text: 'React',
      },
      {
        name: 'other',
        key: 'other',
        text: '其他',
      },
    ],
  },
];

// 再根据routes生成带有component的routes
routes.forEach((route) => {
  route.component = lazy(() => import(`../pages/${route.key}/index.tsx`));
  route.component.preload = () => import(`../pages/${route.key}/index.tsx`);
  if (route.children) {
    route.children.forEach((child) => {
      child.component = lazy(
        () => import(`../pages/${route.key}/children/${child.key}.tsx`),
      );
      child.component.preload = () =>
        import(`../pages/${route.key}/children/${child.key}.tsx`);
    });
  }
});

export default routes;
