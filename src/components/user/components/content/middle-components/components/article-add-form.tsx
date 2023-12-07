import { Form, Input, Button } from '@arco-design/web-react';

const FormItem = Form.Item;

interface ArticleAddFromProps {
  submitData: (data: AddCategoryData) => void;
}

function ArticleAddFrom(ArticleAddFromProps: ArticleAddFromProps) {
  const submitData = (values: AddCategoryData) => {
    ArticleAddFromProps.submitData({
      categoryName: values.categoryName,
      categoryAlias: values.categoryAlias,
    });
  };

  return (
    <Form
      style={{
        maxWidth: 600,
      }}
      autoComplete='off'
      layout={'vertical'}
      onSubmit={(values: AddCategoryData) => submitData(values)}
    >
      <FormItem
        label='分类名称'
        field='categoryName'
        rules={[{ required: true, message: '分类名称不可以为空' }]}
      >
        <Input autoWidth={{ minWidth: 200 }} placeholder='请输入分类名称' />
      </FormItem>
      <FormItem
        label='分类别名'
        field='categoryAlias'
        rules={[{ required: true, message: '分类别名不可以为空' }]}
      >
        <Input autoWidth={{ minWidth: 200 }} placeholder='请输入分类别名' />
      </FormItem>
      <FormItem>
        <Button type='primary' htmlType='submit'>
          添加
        </Button>
      </FormItem>
    </Form>
  );
}

export default ArticleAddFrom;
