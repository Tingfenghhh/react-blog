import { DescriptionsProps, Typography } from '@arco-design/web-react';

function DescriptionsValue(value: string) {
  return (
    <>
      <Typography.Paragraph
        ellipsis={{
          rows: 1,
          showTooltip: true,
          expandable: false,
          wrapper: 'span',
        }}
      >
        {value}
      </Typography.Paragraph>
    </>
  );
}

export const UserInfoData: DescriptionsProps['data'] = [
  {
    label: '姓名🤵',
    // value: '某人眼中的小可爱😘',
    // 返回一个组件
    value: DescriptionsValue('某人眼中的小可爱😘'),
  },
  {
    label: '手机号📱',
    value: DescriptionsValue('191********'),
  },
  {
    label: 'outlook邮箱📫',
    value: DescriptionsValue('shisanlailin@outlook.com'),
  },
  {
    label: '故乡🏠',
    value: DescriptionsValue('中国'),
  },
  {
    label: '详细地址🛣️',
    value: DescriptionsValue('暂时不想写出来'),
  },
];
