import { motion } from 'framer-motion';
import styled from 'styled-components';
interface props {
  backgroundColor: string;
}

const RotateBox = styled(motion.div)<props>`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 20px;
`;

export default RotateBox;
