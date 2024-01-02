import { createConfig } from './createConfig';

const baseURL = '/blog/user';

// 获取用户信息
export const getUserInfoConfig = createConfig(`${baseURL}/getUserInfo`, 'GET');

// 更新用户头像
export const updateAvatarConfig = createConfig(
  `${baseURL}/updateAvatar`,
  'PATCH',
);

// 更新用户信息

export const updateUserInfoConfig = createConfig(
  `${baseURL}/updateUser`,
  'PUT',
);
