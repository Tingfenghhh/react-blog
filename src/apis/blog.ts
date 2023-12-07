import { UseAxiosCutomConfig } from '@/typings/customConfig';
// 添加文章列表
export const addArticleConfig: UseAxiosCutomConfig = {
  config: {
    url: `/blog/category`,
    method: 'POST',
  },
  options: {
    manual: true,
  },
};

// 查询文章列表
export const getArticleListConfig: UseAxiosCutomConfig = {
  config: {
    url: `/blog/category`,
    method: 'GET',
  },
  options: {
    manual: true,
  },
};

// 删除文章
export const deleteArticleConfig: UseAxiosCutomConfig = {
  config: {
    url: `/blog/category/delete`,
    method: 'POST',
  },
  options: {
    manual: true,
  },
};
