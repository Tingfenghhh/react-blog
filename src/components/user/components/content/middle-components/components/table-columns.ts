import { TableColumnProps } from '@arco-design/web-react';

export const articleClassColumns: TableColumnProps[] = [
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
];

export const articleListColumns: TableColumnProps[] = [
  {
    title: 'Id',
    dataIndex: 'id',
    align: 'center',
    width: 80,
  },
  {
    title: '文章标题',
    dataIndex: 'title',
    align: 'center',
    ellipsis: true,
    width: 100,
  },
  {
    title: '文章状态',
    dataIndex: 'state',
    align: 'center',
    width: 90,
  },
  {
    title: '文章类别',
    dataIndex: 'categoryId',
    align: 'center',
    ellipsis: true,
    width: 100,
  },
  {
    title: '文章内容',
    dataIndex: 'content',
    align: 'center',
    ellipsis: true,
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    ellipsis: true,
    width: 150,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'center',
    ellipsis: true,
    width: 150,
  },
];
