import { motion } from 'framer-motion';
import styled from 'styled-components';

const RotateBox = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: #339a14;
  border-radius: 20px;
`;

const Squer = () => (
  <RotateBox
    animate={{
      x: 50,
      y: 30,
      scale: 0.5,
      rotate: 45,
      opacity: 0.5,
    }}
    transition={{ duration: 0.5 }}
  />
);

export default Squer;
