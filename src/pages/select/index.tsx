import SelectTab from '@/components/select-tab';
import TransTo from '@/components/transto';
import { SelectBox } from './style';
import { Space } from '@arco-design/web-react';

function Select() {
  return (
    <>
      <SelectBox>
        <Space>
          <SelectTab />
          <TransTo />
        </Space>
      </SelectBox>
    </>
  );
}

export default Select;
