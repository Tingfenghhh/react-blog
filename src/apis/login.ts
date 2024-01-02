import { createConfig } from './createConfig';

const baseURL = '/blog/user';

// 登录
export const loginConfig = createConfig(`${baseURL}/login`, 'POST', {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
