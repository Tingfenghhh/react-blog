import {
  Button,
  Input,
  Message,
  Space,
  Table,
  TableColumnProps,
} from '@arco-design/web-react';
import { IconDelete, IconEdit } from '@arco-design/web-react/icon';
import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGFpbXMiOnsiaWQiOjMsInVzZXJuYW1lIjoiemhvdXhpYW9kIn0sImV4cCI6MTcwMTg1NzAyNn0.B3FtkTkSzyAH6fvZKEmOedUZcs3r3qay5pEDZOXhCJ0';

function MiddleHome() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryAlias, setCategoryAlias] = useState('');
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
  const [, execute] = useAxios<BlogReturnData<string>, AddCategoryData>(
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
  const [{ data, loading }, ListExecute] = useAxios<CategoryDataList>(
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
  const [{ loading: deletLoading }, DeleteExecute] = useAxios<
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

  const addCategoryList = () => {
    execute({
      data: {
        categoryName,
        categoryAlias,
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
    Message.info('暂未开放');
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
        direction={'vertical'}
        size={20}
        style={{
          width: '100%',
        }}
      >
        <Input
          value={categoryName}
          onChange={(value) => setCategoryName(value)}
          autoWidth={{ minWidth: 200 }}
          placeholder='分类名称'
        />
        <Input
          value={categoryAlias}
          onChange={(value) => setCategoryAlias(value)}
          autoWidth={{ minWidth: 200 }}
          placeholder='分类别名'
        />
        <Button type='primary' onClick={addCategoryList}>
          添加文章列表
        </Button>
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
