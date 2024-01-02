import { TableColumnProps } from '@arco-design/web-react';
import TypographyEle from './typography';

export const articleClassColumns: TableColumnProps[] = [
  {
    title: '分类名称',
    dataIndex: 'categoryName',
    align: 'center',
    width: 180,
    render: (text) => TypographyEle(text),
  },
  {
    title: '分类别名',
    dataIndex: 'categoryAlias',
    align: 'center',
    width: 180,
    render: (text) => TypographyEle(text),
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    width: 200,
    render: (text) => TypographyEle(text),
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'center',
    width: 200,
    render: (text) => TypographyEle(text),
  },
];

export const articleListColumns: TableColumnProps[] = [
  {
    title: '编号',
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
    render: (text) => TypographyEle(text),
  },
  {
    title: '文章状态',
    dataIndex: 'state',
    align: 'center',
    width: 90,
  },
  {
    title: '文章类别',
    dataIndex: 'categoryIdString',
    align: 'center',
    ellipsis: true,
    width: 100,
    render: (text) => TypographyEle(text),
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
    render: (text) => TypographyEle(text),
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'center',
    ellipsis: true,
    width: 150,
    render: (text) => TypographyEle(text),
  },
];
