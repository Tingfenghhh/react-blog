import { UseAxiosCutomConfig } from '@/typings/customConfig';

const baseURL = '/blog/user';
const options: UseAxiosCutomConfig['options'] = {
  manual: true,
};

// 登录

export const loginConfig: UseAxiosCutomConfig = {
  config: {
    url: `${baseURL}/login`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
  options,
};
