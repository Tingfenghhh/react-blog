import { Button, Space } from '@arco-design/web-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import './index.less';
import { IconCloseCircle } from '@arco-design/web-react/icon';
import { ModalBox, ModalContent, ModalTiltle } from './style';

function TransTo() {
  const [selectedId, setSelectedId] = useState<string>('');
  const items = [
    {
      id: 'transTo1',
      title: 'transTo1',
      content: 'transTo1',
    },
    {
      id: 'transTo2',
      title: 'transTo2',
      content: 'transTo2',
    },
    {
      id: 'transTo3',
      title: 'transTo3',
      content: 'transTo3',
    },
    {
      id: 'transTo4',
      title: 'transTo4',
      content: 'transTo4',
    },
  ];

  return (
    <>
      <Space>
        {items.map(({ id, title, content }) => (
          <motion.div
            key={id}
            layoutId={id}
            onClick={() => setSelectedId(id)}
            className='trnas-item'
          >
            <h4>{title}</h4>
            <p>{content}</p>
          </motion.div>
        ))}
        <AnimatePresence mode='wait'>
          {selectedId && (
            <ModalBox>
              <ModalContent layoutId={selectedId}>
                <ModalTiltle>
                  <h4>{selectedId}</h4>
                  <Button
                    type='primary'
                    shape='circle'
                    onClick={() => setSelectedId('')}
                  >
                    <IconCloseCircle />
                  </Button>
                </ModalTiltle>
                <p>{selectedId}</p>
              </ModalContent>
            </ModalBox>
          )}
        </AnimatePresence>
      </Space>
    </>
  );
}

export default TransTo;
