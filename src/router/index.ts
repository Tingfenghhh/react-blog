import { IRoute } from '@/typings/router';
import { lazy } from 'react';

const routes: IRoute[] = [
  {
    name: 'login',
    key: 'login',
    children: [
      {
        name: 'Home',
        key: 'Home',
      },
      {
        name: 'Vue',
        key: 'Vue',
      },
      {
        name: 'React',
        key: 'React',
      },
      {
        name: 'other',
        key: 'other',
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
