import {
  Button,
  Message,
  Space,
  Table,
  TableColumnProps,
} from '@arco-design/web-react';
import { IconDelete, IconEdit } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import ArticleAddFrom from './article-add-form';
import { useMyAxios } from '@/apis/intercept';

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGFpbXMiOnsiaWQiOjMsInVzZXJuYW1lIjoiemhvdXhpYW9kIn0sImV4cCI6MTcwMTk0ODc3NX0.w4L5KdqJsx4hyG25va-9VulF_VbblTR-S_6zL-jm1qY';

function MiddleHome() {
  const [listData, setListData] = useState<CategoryDataListOfTable[]>();

  const columns: TableColumnProps[] = [
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      align: 'center',
    },
    {
      title: '分类别名',
      dataIndex: 'categoryAlias',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      align: 'center',
    },
    {
      title: '操作按钮',
      dataIndex: 'op',
      align: 'center',
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

  //   添加文章列表
  //  useMyAxios可以传递三个类型TResponse, TBody, TError，对应返回值，请求体，错误类型
  const [, execute] = useMyAxios<BlogReturnData<string>, AddCategoryData>(
    {
      url: `/blog/category`,
      method: 'POST',
      headers: {
        Authorization: token,
      },
    },
    { manual: true },
  );

  // 查询文章列表
  const [{ data, loading }, ListExecute] = useMyAxios<CategoryDataList>(
    {
      url: `/blog/category`,
      method: 'GET',
      headers: {
        Authorization: token,
      },
    },
    { manual: true },
  );

  // 删除文章
  const [{ loading: deletLoading }, DeleteExecute] = useMyAxios<
    BlogReturnData<string>,
    { id: number }
  >(
    {
      url: `/blog/category/delete`,
      method: 'POST',
      headers: {
        Authorization: token,
      },
    },
    { manual: true },
  );

  //  提交数据
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
  const editBtn = (record: CategoryDataListOfTable) => {
    Message.info({
      id: 'editBtn',
      content: '暂未开放',
    });
    console.log('editBtn', record.id);
  };

  //   删除按钮
  const deleteBtn = (record: CategoryDataListOfTable) => {
    console.log('deleteBtn', record.id);
    DeleteExecute({
      params: { id: record.id },
    }).then((res) => {
      if (res && res.data.code === 0) {
        Message.success('删除成功');
        ListExecute();
      }
    });
  };

  useEffect(() => {
    if (data && data.code === 0) {
      if (data.data.length > 0) {
        console.log('data.data', data.data);
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
    ListExecute();
  }, []);
  return (
    <>
      <Space
        direction='vertical'
        size={20}
        style={{
          width: '100%',
        }}
      >
        <ArticleAddFrom submitData={(val) => submitData(val)} />
        <Table
          style={{
            width: '100%',
          }}
          stripe
          columns={columns}
          data={listData}
          loading={loading || deletLoading}
        />
      </Space>
    </>
  );
}

export default MiddleHome;
