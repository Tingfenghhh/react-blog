import { createConfig } from './createConfig';

const baseURL = '/blog/category';
const articleBaseURL = '/blog/article';

// 添加文章分类
export const addArticleConfig = createConfig(baseURL, 'POST');

// 更新文章分类
export const updateArticleConfig = createConfig(baseURL, 'PUT');

// 查询文章分类列表
export const getArticleListConfig = createConfig(baseURL, 'GET');

// 查询文章分类列表(分页)
export const getArticleListByPageConfig = createConfig(
  `${baseURL}/listByPage`,
  'GET',
);

// 删除文章分类
export const deleteArticleConfig = createConfig(`${baseURL}/delete`, 'POST');

// 分页查询文章列表
export const getArticleDetailListConfig = createConfig(
  `${articleBaseURL}/listByPage`,
  'GET',
);

// 删除文章
export const deleteArticleDetailConfig = createConfig(
  `${articleBaseURL}/delete`,
  'POST',
);

// 添加文章
export const addArticleDetailConfig = createConfig(
  `${articleBaseURL}/add`,
  'POST',
);

// 更新文章
export const updateArticleDetailConfig = createConfig(
  `${articleBaseURL}/update`,
  'POST',
);
