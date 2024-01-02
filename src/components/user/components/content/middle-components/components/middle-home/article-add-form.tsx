import { getArticleListConfig } from '@/apis/blog';
import { useMyAxios } from '@/apis/intercept';
import {
  Form,
  Input,
  Button,
  Select,
  Space,
  Modal,
  Message,
} from '@arco-design/web-react';
import { useEffect, useState } from 'react';

const FormItem = Form.Item;
const Option = Select.Option;
interface ArticleAddFromProps {
  submitData?: (data: AddArticleParams) => void;
  editSubmitData?: (data: UpdateArticleParams) => void;
  isEdit?: boolean;
  data?: ArticleDetailListDataOfTable;
  showCancel?: boolean;
  buttonString?: string;
  close?: () => void;
  loading?: boolean;
}

interface ArticleClassOptionsList {
  label: string;
  value: number;
}

function ArticleAddFrom(Props: ArticleAddFromProps) {
  const stateOptions = ['草稿', '已发布'];
  // 文章分类列表
  const [articleClassOptionsList, setArticleClassOptionsList] =
    useState<ArticleClassOptionsList[]>();

  const [{ data, loading }, ListExecute] = useMyAxios<
    BlogReturnData<GetCategoryListReturnData[]>
  >(getArticleListConfig.config, getArticleListConfig.options);

  const submitData = (values: AddArticleParams) => {
    if (Props.isEdit && Props.editSubmitData && Props.data) {
      Props.editSubmitData({
        id: Props.data.id,
        title: values.title,
        content: values.content,
        coverImg: values.coverImg,
        state: values.state,
        categoryId: values.categoryId,
      });
      return;
    }
    if (!Props.submitData) return;
    Props.submitData({
      ...values,
    });
  };

  const cancle = () => {
    Modal.confirm({
      title: '确定要取消编辑吗？',
      onOk: () => {
        Props.close && Props.close();
      },
      onCancel: () => {
        Message.info('已取消');
      },
    });
  };

  useEffect(() => {
    if (data) {
      setArticleClassOptionsList(
        data.data.map((item) => ({ label: item.categoryName, value: item.id })),
      );
    }
  }, [data]);

  useEffect(() => {
    ListExecute();
  }, []);

  return (
    <Form
      style={{
        maxWidth: 600,
      }}
      autoComplete='off'
      layout={'vertical'}
      requiredSymbol={false}
      initialValues={{
        title: Props.data?.title ?? '',
        content: Props.data?.content ?? '',
        coverImg: Props.data?.coverImg ?? '',
        state: Props.data?.state ?? '草稿',
        // 根据文章分类名称获取文章分类id
        categoryId: Props.data?.categoryId,
      }}
      onSubmit={(values: AddArticleParams) => submitData(values)}
    >
      <FormItem
        label='文章标题'
        field='title'
        rules={[
          { required: true, message: '文章标题不可以为空' },
          {
            validator(value, cb) {
              //  标题5-16个字符
              if (value.length < 5 || value.length > 16) {
                cb('标题5-16个字符');
              } else {
                cb();
              }
            },
          },
        ]}
      >
        <Input allowClear placeholder='请输入文章标题' />
      </FormItem>
      <FormItem
        label='文章内容'
        field='content'
        rules={[{ required: true, message: '文章内容不可以为空' }]}
      >
        <Input allowClear placeholder='请输入文章内容' />
      </FormItem>
      <FormItem
        label='文章封面'
        field='coverImg'
        rules={[
          { required: true, message: '文章封面不可以为空' },
          {
            validator(value, cb) {
              // 以http://或者https://开头，以.jpg、.jpeg或者.png结尾
              const reg = /^(http|https):\/\/.*\.(?:png|jpg|jpeg)$/;
              if (!reg.test(value)) {
                cb('请输入正确的图片地址');
              } else {
                cb();
              }
            },
          },
        ]}
      >
        <Input allowClear placeholder='请输入文章封面图片地址' />
      </FormItem>
      <FormItem
        label='文章状态'
        field='state'
        rules={[{ required: true, message: '文章状态不可以为空' }]}
      >
        <Select
          placeholder='请选择文章状态'
          style={{ minWidth: 200 }}
          allowClear
        >
          {stateOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </FormItem>
      <FormItem
        label='文章所属分类'
        field='categoryId'
        rules={[{ required: true, message: '分类别名不可以为空' }]}
      >
        <Select
          placeholder='请选择文章所属分类'
          allowClear
          style={{ minWidth: 200 }}
          loading={loading}
          onVisibleChange={(val) => val && ListExecute()}
        >
          {articleClassOptionsList?.map((option) => (
            <Option key={option.label} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </FormItem>
      <FormItem
        wrapperCol={{
          offset: Props.showCancel ? 8 : 0,
        }}
      >
        <Space size={20}>
          {Props.showCancel && (
            <Button type='outline' onClick={() => cancle()}>
              取消
            </Button>
          )}
          <Button type='primary' htmlType='submit' loading={Props.loading}>
            {Props.buttonString ?? '添加'}
          </Button>
        </Space>
      </FormItem>
    </Form>
  );
}

export default ArticleAddFrom;
