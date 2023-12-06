interface BlogReturnData<T> {
  code: number;
  message: string;
  data: T;
}

// 添加文章类型参数
interface AddCategoryData {
  categoryName: string; // 分类名称
  categoryAlias: string; // 分类别名
}

// 查询文章列表返回结果
interface GetCategoryListReturnData {
  id: number;
  categoryName: string;
  categoryAlias: string;
  createTime: string;
  updateTime: string;
}

type CategoryDataList = BlogReturnData<GetCategoryListReturnData[]>;

interface CategoryDataListOfTable {
  id: number;
  key: string;
  categoryName: string;
  categoryAlias: string;
  createTime: string;
  updateTime: string;
}
