import {
  Button,
  Message,
  PaginationProps,
  Popconfirm,
  Space,
  Table,
  TableColumnProps,
} from '@arco-design/web-react';
import { IconDelete, IconEdit } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import ArticleClassAddFrom from './article-class-add-form';
import { useMyAxios } from '@/apis/intercept';
import {
  addArticleConfig,
  addArticleDetailConfig,
  deleteArticleConfig,
  deleteArticleDetailConfig,
  getArticleDetailListConfig,
  getArticleListByPageConfig,
  updateArticleConfig,
  updateArticleDetailConfig,
} from '@/apis/blog';
import { articleClassColumns, articleListColumns } from './table-columns';
import ArticleAddFrom from './article-add-form';
import CustomModal from '@/components/modal';

function MiddleHome() {
  const [listData, setListData] = useState<CategoryDataListOfTable[]>();
  const [articleListData, setArticleListData] =
    useState<ArticleDetailListDataOfTable[]>();
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);
  const [categoryPagination, setCategoryPagination] = useState<PaginationProps>(
    {
      sizeCanChange: true,
      showTotal: true,
      total: 0,
      pageSize: 5,
      current: 1,
      defaultPageSize: 5,
      sizeOptions: [3, 5, 10],
      pageSizeChangeResetCurrent: true,
    },
  );
  const [pagination, setPagination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    total: 0,
    pageSize: 5,
    current: 1,
    defaultPageSize: 5,
    sizeOptions: [3, 5, 10],
    pageSizeChangeResetCurrent: true,
  });
  const [arcleListLoading, setArcleListLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<CategoryDataListOfTable>();

  const columns: TableColumnProps[] = [
    ...articleClassColumns,
    {
      title: '操作按钮',
      dataIndex: 'op',
      align: 'center',
      width: 250,
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => editBtn(record)}
            type='primary'
            status={'success'}
            icon={<IconEdit />}
          >
            编辑
          </Button>
          <Popconfirm
            focusLock
            title='警告'
            content='删除该分类，会删除所有属于该分类的文章，是否删除?'
            onOk={() => {
              deleteBtn(record);
            }}
            onCancel={() => {
              Message.error({
                content: '取消删除',
              });
            }}
          >
            <Button type='primary' status={'danger'} icon={<IconDelete />}>
              删除
            </Button>
          </Popconfirm>
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
      width: 250,
      render: (_, record) => (
        <Space>
          <Button
            type='primary'
            status={'success'}
            icon={<IconEdit />}
            onClick={() => editArticle(record)}
          >
            编辑
          </Button>
          <Button
            type='primary'
            status={'danger'}
            icon={<IconDelete />}
            onClick={() => deleteArticleBtn(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  /* ----------------------------------- 文章分类 ----------------------------------- */

  //   添加文章分类列表
  //  useMyAxios可以传递三个类型TResponse, TBody, TError，对应返回值，请求体，错误类型
  const [, execute] = useMyAxios<BlogReturnData<string>, AddCategoryData>(
    addArticleConfig.config,
    addArticleConfig.options,
  );

  // 查询文章分类列表
  const [{ data, loading }, ListExecute] = useMyAxios<
    CategoryDataList,
    GetCategoryDataListByPageParams
  >(getArticleListByPageConfig.config, getArticleListByPageConfig.options);

  // 删除文章分类
  const [{ loading: deletLoading }, DeleteExecute] = useMyAxios<
    BlogReturnData<string>,
    { id: number }
  >(deleteArticleConfig.config, deleteArticleConfig.options);

  // 更新文章分类
  const [{ loading: UpdateLoading }, UpdateExecute] = useMyAxios<
    BlogReturnData<string>,
    UpdateCategoryData
  >(updateArticleConfig.config, updateArticleConfig.options);

  //  添加文章分类提交数据
  const submitData = (val: AddCategoryData) => {
    execute({
      data: {
        ...val,
      },
    }).then((res) => {
      if (res && res.data.code === 0) {
        Message.success(res.data.message);
        ListExecute({
          params: {
            pageSize: categoryPagination.pageSize,
            pageNum: categoryPagination.current,
          },
        });
        return;
      }
      Message.error(res.data.message ?? '操作失败');
    });
  };

  //  编辑按钮
  const editBtn = (recod: CategoryDataListOfTable) => {
    setEditData(recod);
    setIsOpen(true);
  };

  // 编辑提交数据
  const editSubmitData = (val: UpdateCategoryData) => {
    console.log('val', val);
    UpdateExecute({
      data: {
        ...val,
      },
    }).then((res) => {
      if (res && res.data.code === 0) {
        ListExecute({
          params: {
            pageSize: categoryPagination.pageSize,
            pageNum: categoryPagination.current,
          },
        });
        Message.success('更新成功');
        setTimeout(() => {
          onClose();
          ArticleListRun({
            params: {
              pageSize: pagination.pageSize,
              pageNum: pagination.current,
            },
          });
        }, 150);
        return;
      }
      Message.error(res.data.message ?? '操作失败');
    });
  };

  //  关闭弹窗
  const onClose = () => {
    setIsOpen(false);
  };

  //   删除按钮
  const deleteBtn = (record: CategoryDataListOfTable) => {
    DeleteExecute({
      params: { id: record.id },
    }).then((res) => {
      if (res && res.data.code === 0) {
        Message.success('删除成功');
        ListExecute({
          params: {
            pageSize: categoryPagination.pageSize,
            pageNum: categoryPagination.current,
          },
        });
        ArticleListRun({
          params: {
            pageSize: pagination.pageSize,
            pageNum: pagination.current,
          },
        });
      }
    });
  };

  // 文章分类列表
  const onChangeCategoryTable = (pagination: PaginationProps) => {
    const { current, pageSize } = pagination;
    ListExecute({
      params: {
        pageSize,
        pageNum: current,
      },
    });
    setTimeout(() => {
      setCategoryPagination((pagination) => ({
        ...pagination,
        current,
        pageSize,
      }));
    }, 1000);
  };

  // 根据文章分类id获取文章分类名称
  const getCategorName = (id: number) => {
    if (listData) {
      const data = listData.find((item) => item.id === id);
      if (data) return data.categoryName;
    }
    return '暂无分类';
  };

  /* ----------------------------------- 文章 ----------------------------------- */
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

  // 删除文章
  const [{ loading: ArticleDeleteLoading }, ArticleDelete] = useMyAxios<
    BlogReturnData<string>,
    { id: number }
  >(deleteArticleDetailConfig.config, deleteArticleDetailConfig.options);

  const deleteArticleBtn = (record: GetArticleDetailListData) => {
    ArticleDelete({
      params: {
        id: record.id,
      },
    }).then((res) => {
      if (res && res.data.code === 0) {
        Message.success('删除成功');
        ArticleListRun({
          params: {
            pageSize: pagination.pageSize,
            pageNum: pagination.current,
          },
        });
      }
    });
  };

  // 添加文章
  const [{ loading: ArticleAddLoading }, ArticleAdd] = useMyAxios<
    BlogReturnData<string>,
    AddArticleParams
  >(addArticleDetailConfig.config, addArticleDetailConfig.options);

  const submitArticleData = (val: AddArticleParams) => {
    ArticleAdd({
      data: {
        ...val,
      },
    }).then((res) => {
      if (res && res.data.code === 0) {
        Message.success('添加成功');
        ArticleListRun({
          params: {
            pageSize: pagination.pageSize,
            pageNum: pagination.current,
          },
        });
      }
    });
  };

  // 编辑文章

  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const [artcileEditData, setArtcileEditData] =
    useState<ArticleDetailListDataOfTable>();

  const onArticleClose = () => {
    setIsArticleOpen(false);
  };

  const editArticle = (record: ArticleDetailListDataOfTable) => {
    console.log('record', record);
    if (record.id) {
      setArtcileEditData(record);
      setIsArticleOpen(true);
    }
  };

  const [{ loading: ArticleEditLoading }, ArticleEdit] = useMyAxios<
    BlogReturnData<string>,
    UpdateArticleParams
  >(updateArticleDetailConfig.config, updateArticleDetailConfig.options);

  const editArticleSubmitData = (val: UpdateArticleParams) => {
    console.log('val', val);
    ArticleEdit({
      data: {
        ...val,
      },
    }).then((res) => {
      if (res && res.data.code === 0) {
        Message.success('更新成功');
        ArticleListRun({
          params: {
            pageSize: pagination.pageSize,
            pageNum: pagination.current,
          },
        });
        setTimeout(() => {
          onArticleClose();
        }, 150);
        return;
      }
      Message.error(res.data.message ?? '操作失败');
    });
  };

  /* -------------------------------- useEffect ------------------------------- */
  useEffect(() => {
    if (ArticlListData && ArticlListData.code === 0) {
      setPagination((pagination) => ({
        ...pagination,
        total: ArticlListData.data.total,
      }));
      const list: ArticleDetailListDataOfTable[] = ArticlListData.data.item.map(
        (item) => {
          return {
            ...item,
            // 根据文章分类id获取文章分类名称
            categoryIdString: getCategorName(item.categoryId),
          };
        },
      );
      setArticleListData(list);
    }
  }, [ArticlListData]);

  useEffect(() => {
    if (data && data.code === 0) {
      if (data.data.item.length > 0) {
        setCategoryPagination((pagination) => ({
          ...pagination,
          total: data.data.total,
        }));
        const list: CategoryDataListOfTable[] = data.data.item.map((item) => {
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
    if (
      ArticlListLoading ||
      ArticleDeleteLoading ||
      ArticleAddLoading ||
      ArticleEditLoading
    )
      setArcleListLoading(true);
    setTimeout(() => {
      setArcleListLoading(false);
    }, 500);
  }, [
    ArticlListLoading,
    ArticleDeleteLoading,
    ArticleAddLoading,
    ArticleEditLoading,
  ]);

  useEffect(() => {
    ListExecute({
      params: {
        pageSize: categoryPagination.pageSize,
        pageNum: categoryPagination.current,
      },
    });
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
        size={10}
        direction='vertical'
        style={{
          width: '100%',
        }}
      >
        <Space direction='vertical' size={10}>
          <div>
            <h2>添加文章分类</h2>
            <ArticleClassAddFrom submitData={(val) => submitData(val)} />
          </div>
          <div>
            <h2>添加文章</h2>
            <ArticleAddFrom submitData={(val) => submitArticleData(val)} />
          </div>
        </Space>
        <div>
          <h2>文章分类表格</h2>
          <Table
            stripe
            columns={columns}
            data={listData}
            loading={globalLoading}
            pagination={categoryPagination}
            onChange={onChangeCategoryTable}
            rowKey='id'
          />
          <h2>文章表格</h2>
          <Table
            stripe
            loading={arcleListLoading}
            columns={artilceListColumns}
            data={articleListData}
            pagination={pagination}
            onChange={onChangeTable}
            rowKey='id'
          />
        </div>
      </Space>

      {/* 文章分类弹窗 */}
      <CustomModal
        isOpen={isOpen}
        onClose={() => onClose()}
        secondConfirm={true}
        hasFooter={null}
        title='文章分类编辑'
        children={
          <ArticleClassAddFrom
            isEdit={true}
            editSubmitData={(val) => editSubmitData(val)}
            showCancel={true}
            close={() => onClose()}
            loading={UpdateLoading}
            data={editData}
            buttonString='确定'
          />
        }
      />

      {/* 文章详情编辑弹窗 */}
      <CustomModal
        isOpen={isArticleOpen}
        onClose={() => onArticleClose()}
        secondConfirm={true}
        hasFooter={null}
        title='文章详情编辑'
        children={
          <ArticleAddFrom
            isEdit={true}
            close={() => onArticleClose()}
            data={artcileEditData}
            showCancel={true}
            buttonString='确定'
            editSubmitData={(val) => editArticleSubmitData(val)}
          />
        }
      />
    </>
  );
}

export default MiddleHome;
