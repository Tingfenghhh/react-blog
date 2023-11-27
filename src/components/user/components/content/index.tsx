import './index.less';
import { MyContentBox } from './style';
import LeftContent from './left-components/left-content';
import { Affix, Grid } from '@arco-design/web-react';
import MiddleContent from './middle-components/middle-content';
import RightContent from './right-components/right-content';
import MiniRightContent from './right-components/mini-right-content';
import MiniLeftContent from './left-components/mini-left-content';

const { Row, Col } = Grid;

function MyContent() {
  return (
    <>
      <MyContentBox>
        <Row gutter={24}>
          <Col xl={4}>
            <Affix offsetTop={76}>
              <LeftContent />
            </Affix>
          </Col>
          <Col xl={16} xs={24}>
            <MiddleContent />
          </Col>
          <Col xl={4}>
            <Affix offsetTop={76}>
              <RightContent />
            </Affix>
          </Col>
        </Row>
      </MyContentBox>
      <MiniLeftContent />
      <MiniRightContent />
    </>
  );
}

export default MyContent;
