import {
  Form,
  Input,
  Button,
  Space,
  Modal,
  Message,
} from '@arco-design/web-react';

const FormItem = Form.Item;

interface ArticleClassAddFromProps {
  submitData?: (data: AddCategoryData) => void;
  editSubmitData?: (data: UpdateCategoryData) => void;
  isEdit?: boolean;
  data?: CategoryDataListOfTable;
  showCancel?: boolean;
  buttonString?: string;
  close?: () => void;
  loading?: boolean;
}

function ArticleClassAddFrom(Props: ArticleClassAddFromProps) {
  const submitData = (values: AddCategoryData) => {
    if (Props.isEdit && Props.editSubmitData && Props.data) {
      Props.editSubmitData({
        id: Props.data.id,
        categoryName: values.categoryName,
        categoryAlias: values.categoryAlias,
      });
      return;
    }
    if (!Props.submitData) return;
    Props.submitData({
      categoryName: values.categoryName,
      categoryAlias: values.categoryAlias,
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

  return (
    <Form
      style={{
        maxWidth: 600,
      }}
      autoComplete='off'
      layout={'vertical'}
      requiredSymbol={false}
      initialValues={{
        categoryName: Props.data?.categoryName ?? '',
        categoryAlias: Props.data?.categoryAlias ?? '',
      }}
      onSubmit={(values: AddCategoryData) => submitData(values)}
    >
      <FormItem
        label='分类名称'
        field='categoryName'
        rules={[{ required: true, message: '分类名称不可以为空' }]}
      >
        <Input placeholder='请输入分类名称' />
      </FormItem>
      <FormItem
        label='分类别名'
        field='categoryAlias'
        rules={[{ required: true, message: '分类别名不可以为空' }]}
      >
        <Input placeholder='请输入分类别名' />
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

export default ArticleClassAddFrom;
