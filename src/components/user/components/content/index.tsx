import './index.less';
import { MyContentBox } from './style';
import LeftContent from './left-content';
import { Grid } from '@arco-design/web-react';
import MiddleContent from './middle-content';
import RightContent from './right-content';

const { Row, Col } = Grid;

function MyContent() {
  return (
    <>
      <MyContentBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
        }}
      >
        <Row gutter={24}>
          <Col xl={4}>
            <LeftContent />
          </Col>
          <Col xl={16} xs={24}>
            <MiddleContent />
          </Col>
          <Col xl={4}>
            <RightContent />
          </Col>
        </Row>
      </MyContentBox>
    </>
  );
}

export default MyContent;
