import { Typography } from '@arco-design/web-react';

function TypographyEle(text: any) {
  return (
    <>
      <Typography.Paragraph
        style={{
          marginBottom: '0px',
        }}
        ellipsis={{
          rows: 1,
          showTooltip: true,
          expandable: false,
        }}
      >
        {text}
      </Typography.Paragraph>
    </>
  );
}

export default TypographyEle;
