import { motion } from 'framer-motion';
import RightContent from './right-content';
import styled from 'styled-components';
import { Button } from '@arco-design/web-react';
import { useState } from 'react';
import { IconLeft, IconRight } from '@arco-design/web-react/icon';

const MiniRight = styled(motion.div)`
  position: fixed;
  top: 70px;
  right: 10px;
  width: 300px;
  transition: all 0.5s;
  display: none;
  @media screen and (max-width: 1199px) {
    display: block;
  }
`;

const MiniButton = styled(Button)`
  position: absolute;
  top: 0px;
  right: 302px;
  width: 40px;
  height: 40px;
  border-radius: 50% !important;
`;

function MiniRightContent() {
  const [show, setShow] = useState(false);

  return (
    <>
      <MiniRight
        style={{
          right: show ? '30px' : '-310px',
        }}
      >
        {show && <RightContent show={true} />}
        <MiniButton
          shape='circle'
          icon={!show ? <IconLeft /> : <IconRight />}
          onClick={() => setShow(!show)}
        />
      </MiniRight>
    </>
  );
}

export default MiniRightContent;
