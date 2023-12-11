import { UseAxiosCustomConfig } from '@/typings/customConfig';

const baseURL = '/blog/category';
const articleBaseURL = '/blog/article';
const options: UseAxiosCustomConfig['options'] = {
  manual: true,
};

// 添加文章分类
export const addArticleConfig: UseAxiosCustomConfig = {
  config: {
    url: baseURL,
    method: 'POST',
  },
  options,
};
// 更新文章分类
export const updateArticleConfig: UseAxiosCustomConfig = {
  config: {
    url: baseURL,
    method: 'PUT',
  },
  options,
};

// 查询文章分类列表
export const getArticleListConfig: UseAxiosCustomConfig = {
  config: {
    url: baseURL,
    method: 'GET',
  },
  options,
};
// 查询文章分类列表(分页)
export const getArticleListByPageConfig: UseAxiosCustomConfig = {
  config: {
    url: `${baseURL}/listByPage`,
    method: 'GET',
  },
  options,
};

// 删除文章分类
export const deleteArticleConfig: UseAxiosCustomConfig = {
  config: {
    url: `${baseURL}/delete`,
    method: 'POST',
  },
  options,
};

// 分页查询文章列表
export const getArticleDetailListConfig: UseAxiosCustomConfig = {
  config: {
    url: `${articleBaseURL}/listByPage`,
    method: 'GET',
  },
  options,
};

// 删除文章
export const deleteArticleDetailConfig: UseAxiosCustomConfig = {
  config: {
    url: `${articleBaseURL}/delete`,
    method: 'POST',
  },
  options,
};

// 添加文章
export const addArticleDetailConfig: UseAxiosCustomConfig = {
  config: {
    url: `${articleBaseURL}/add`,
    method: 'POST',
  },
  options,
};
