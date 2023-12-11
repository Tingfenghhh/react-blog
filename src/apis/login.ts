import { UseAxiosCustomConfig } from '@/typings/customConfig';

const baseURL = '/blog/user';
const options: UseAxiosCustomConfig['options'] = {
  manual: true,
};

// 登录

export const loginConfig: UseAxiosCustomConfig = {
  config: {
    url: `${baseURL}/login`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
  options,
};
