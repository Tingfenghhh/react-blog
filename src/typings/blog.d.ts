interface BlogReturnData<T> {
  code: number;
  message: string;
  data: T;
}

// 添加文章分类类型参数
interface AddCategoryData {
  categoryName: string; // 分类名称
  categoryAlias: string; // 分类别名
}

type UpdateCategoryData = AddCategoryData & {
  id: number;
};

// 查询文章分类列表返回结果
interface GetCategoryListReturnData {
  id: number;
  categoryName: string;
  categoryAlias: string;
  createTime: string;
  updateTime: string;
}

type CategoryDataList = BlogReturnData<{
  page: number;
  size: number;
  total: number;
  item: GetCategoryListReturnData[];
}>;

interface CategoryDataListOfTable {
  id: number;
  key: string;
  categoryName: string;
  categoryAlias: string;
  createTime: string;
  updateTime: string;
}

// 查询文章分类列表参数
interface GetCategoryDataListByPageParams {
  pageNum: number;
  pageSize: number;
  categoryName?: string;
  createUser?: number;
}

// 查询文章详情列表参数
interface GetArticleDetailListParams {
  pageNum: number;
  pageSize: number;
  categoryId?: number;
  state?: string;
}

// 文章详情列表返回结果
interface GetArticleDetailListData {
  id: number;
  title: string;
  content: string;
  coverImg: string;
  state: string;
  categoryId: number;
  createUser: number;
  createTime: string;
  updateTime: string;
}

type ArticleDetailListDataOfTable = GetArticleDetailListData & {
  categoryIdString: string;
};

type GetArticleDetailListReturnData = BlogReturnData<{
  page: number;
  size: number;
  total: number;
  item: GetArticleDetailListData[];
}>;

// 添加文章参数
interface AddArticleParams {
  title: string;
  content: string;
  coverImg: string;
  state: string;
  categoryId: number;
}

// 更新文章参数
interface UpdateArticleParams extends AddArticleParams {
  id: number;
}
