import {
  Button,
  Message,
  PaginationProps,
  Space,
  Table,
  TableColumnProps,
} from '@arco-design/web-react';
import { IconDelete, IconEdit } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import ArticleAddFrom from './article-add-form';
import { useMyAxios } from '@/apis/intercept';
import {
  addArticleConfig,
  deleteArticleConfig,
  getArticleDetailListConfig,
  getArticleListConfig,
} from '@/apis/blog';
import { articleClassColumns, articleListColumns } from './table-columns';

function MiddleHome() {
  const [listData, setListData] = useState<CategoryDataListOfTable[]>();
  const [articleListData, setArticleListData] =
    useState<GetArticleDetailListData[]>();
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    total: 0,
    pageSize: 5,
    current: 1,
    defaultPageSize: 5,
    sizeOptions: [5, 10, 20, 50],
    pageSizeChangeResetCurrent: true,
  });
  const [arcleListLoading, setArcleListLoading] = useState(false);

  const columns: TableColumnProps[] = [
    ...articleClassColumns,
    {
      title: '操作按钮',
      dataIndex: 'op',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => editBtn()}
            type='primary'
            status={'success'}
            icon={<IconEdit />}
          >
            编辑
          </Button>
          <Button
            onClick={() => deleteBtn(record)}
            type='primary'
            status={'danger'}
            icon={<IconDelete />}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const artilceListColumns: TableColumnProps[] = [
    ...articleListColumns,
    {
      title: '操作按钮',
      dataIndex: 'op',
      align: 'center',
      render: () => (
        <Space>
          <Button type='primary' status={'success'} icon={<IconEdit />}>
            编辑
          </Button>
          <Button type='primary' status={'danger'} icon={<IconDelete />}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  //   添加文章分类列表
  //  useMyAxios可以传递三个类型TResponse, TBody, TError，对应返回值，请求体，错误类型
  const [, execute] = useMyAxios<BlogReturnData<string>, AddCategoryData>(
    addArticleConfig.config,
    addArticleConfig.options,
  );

  // 查询文章分类列表
  const [{ data, loading }, ListExecute] = useMyAxios<CategoryDataList>(
    getArticleListConfig.config,
    getArticleListConfig.options,
  );

  // 删除文章分类
  const [{ loading: deletLoading }, DeleteExecute] = useMyAxios<
    BlogReturnData<string>,
    { id: number }
  >(deleteArticleConfig.config, deleteArticleConfig.options);

  //  添加文章分类提交数据
  const submitData = (val: AddCategoryData) => {
    execute({
      data: {
        ...val,
      },
    }).then((res) => {
      if (res && res.data.code === 0) {
        Message.success(res.data.message);
        ListExecute();
        return;
      }
      Message.error(res.data.message ?? '操作失败');
    });
  };

  //  编辑按钮
  const editBtn = () => {
    Message.info({
      id: 'editBtn',
      content: '暂未开放',
    });
  };

  //   删除按钮
  const deleteBtn = (record: CategoryDataListOfTable) => {
    DeleteExecute({
      params: { id: record.id },
    }).then((res) => {
      if (res && res.data.code === 0) {
        Message.success('删除成功');
        ListExecute();
      }
    });
  };

  const [{ data: ArticlListData, loading: ArticlListLoading }, ArticleListRun] =
    useMyAxios<GetArticleDetailListReturnData, GetArticleDetailListParams>(
      getArticleDetailListConfig.config,
      getArticleDetailListConfig.options,
    );

  // 文章列表
  const onChangeTable = (pagination: PaginationProps) => {
    const { current, pageSize } = pagination;
    ArticleListRun({
      params: {
        pageSize,
        pageNum: current,
      },
    });
    setArcleListLoading(true);
    setTimeout(() => {
      setPagination((pagination) => ({ ...pagination, current, pageSize }));
      setArcleListLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (ArticlListData && ArticlListData.code === 0) {
      setPagination((pagination) => ({
        ...pagination,
        total: ArticlListData.data.total,
      }));
      const list: GetArticleDetailListData[] = ArticlListData.data.item.map(
        (item) => {
          return {
            ...item,
          };
        },
      );
      setArticleListData(list);
    }
  }, [ArticlListData]);

  useEffect(() => {
    if (data && data.code === 0) {
      if (data.data.length > 0) {
        const list: CategoryDataListOfTable[] = data.data.map((item) => {
          return {
            ...item,
            key: String(item.id),
          };
        });
        setListData(list);
        return;
      }
      setListData([]);
    }
  }, [data]);

  useEffect(() => {
    if (loading || deletLoading) setGlobalLoading(true);
    setTimeout(() => {
      setGlobalLoading(false);
    }, 500);
  }, [loading, deletLoading]);

  useEffect(() => {
    ListExecute();
    ArticleListRun({
      params: {
        pageSize: pagination.pageSize,
        pageNum: pagination.current,
      },
    });
  }, []);
  return (
    <>
      <Space
        direction='vertical'
        size={10}
        style={{
          width: '100%',
        }}
      >
        <Space size={100}>
          <div>
            <h2>添加文章分类</h2>
            <ArticleAddFrom submitData={(val) => submitData(val)} />
          </div>
          <div>
            <h2>添加文章</h2>
            <ArticleAddFrom submitData={(val) => submitData(val)} />
          </div>
        </Space>
        <h2>文章分类表格</h2>
        <Table
          style={{
            width: '100%',
          }}
          stripe
          columns={columns}
          data={listData}
          loading={globalLoading}
        />
        <h2>文章列表表格</h2>
        <Table
          loading={ArticlListLoading || arcleListLoading}
          columns={artilceListColumns}
          data={articleListData}
          pagination={pagination}
          onChange={onChangeTable}
        />
      </Space>
    </>
  );
}

export default MiddleHome;
