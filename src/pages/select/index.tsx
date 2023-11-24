import SelectTab from '@/components/select-tab';
import TransTo from '@/components/transto';
import { SelectBox } from './style';
import { Space } from '@arco-design/web-react';
import { motion } from 'framer-motion';
import { RouterAnimationOptions } from '../router-animation-options';

function Select() {
  return (
    <motion.div {...RouterAnimationOptions}>
      <SelectBox>
        <Space>
          <SelectTab />
          <TransTo />
        </Space>
      </SelectBox>
    </motion.div>
  );
}

export default Select;
