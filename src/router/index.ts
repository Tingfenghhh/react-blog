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
  },
  {
    name: 'select',
    key: 'select',
  },
];

// 再根据routes生成带有component的routes
routes.forEach((route) => {
  route.component = lazy(() => import(`../pages/${route.key}/index.tsx`));
  route.component.preload = () => import(`../pages/${route.key}/index.tsx`);
});

export default routes;
