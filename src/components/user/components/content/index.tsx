import { motion } from 'framer-motion';
import styled from 'styled-components';
import LeftContent from './left-content';
import { Grid } from '@arco-design/web-react';
import MiddleContent from './middle-content';
import RightContent from './right-content';

const { Row, Col } = Grid;

const MyContentBox = styled(motion.div)`
  width: 100%;
  height: calc(100vh - 110px);
  transition: all 0.3s;
  box-sizing: border-box;
  padding: 5px 5px;
`;

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
