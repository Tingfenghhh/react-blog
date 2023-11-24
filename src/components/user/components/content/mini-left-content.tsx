import { motion } from 'framer-motion';
import LeftContent from './left-content';
import styled from 'styled-components';
import { Button } from '@arco-design/web-react';
import { useState } from 'react';
import { IconLeft, IconRight } from '@arco-design/web-react/icon';

const MiniLeft = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 10px;
  width: 300px;
  transition: all 0.5s;
  @media screen and (max-width: 1920px) {
    display: none;
  }
  @media screen and (max-width: 1199px) {
    display: block;
  }
`;

const MiniButton = styled(Button)`
  position: absolute;
  top: 0px;
  left: 302px;
  width: 40px;
  height: 40px;
  border-radius: 50% !important;
`;

function MiniLeftContent() {
  const [show, setShow] = useState(false);

  return (
    <>
      <MiniLeft
        style={{
          left: show ? '10px' : '-310px',
        }}
      >
        <LeftContent show={true} />
        <MiniButton
          shape='circle'
          icon={show ? <IconLeft /> : <IconRight />}
          onClick={() => setShow(!show)}
        />
      </MiniLeft>
    </>
  );
}

export default MiniLeftContent;
