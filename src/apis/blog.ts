import axiosInstance from './intercept';

// 添加文章
export const addCategory = (data: AddCategoryData) =>
  axiosInstance.post<BlogReturnData<string>>('/blog/category', data);
