import { UseAxiosCutomConfig } from '@/typings/customConfig';

const baseURL = '/blog/category';
const options: UseAxiosCutomConfig['options'] = {
  manual: true,
};

// 添加文章列表
export const addArticleConfig: UseAxiosCutomConfig = {
  config: {
    url: baseURL,
    method: 'POST',
  },
  options,
};

// 查询文章列表
export const getArticleListConfig: UseAxiosCutomConfig = {
  config: {
    url: baseURL,
    method: 'GET',
  },
  options,
};

// 删除文章
export const deleteArticleConfig: UseAxiosCutomConfig = {
  config: {
    url: `${baseURL}/delete`,
    method: 'POST',
  },
  options,
};
