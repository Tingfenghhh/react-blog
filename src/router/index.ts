import { IRoute } from '@/typings/router';
import { lazy } from 'react';

const routes: IRoute[] = [
  {
    name: 'login',
    key: 'login',
  },
];

// 再根据routes生成带有component的routes
routes.forEach((route) => {
  route.component = lazy(() => import(`../pages/${route.key}/index.tsx`));
  route.component.preload = () => import(`../pages/${route.key}/index.tsx`);
});

export default routes;
