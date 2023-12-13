import { Message, Modal } from '@arco-design/web-react';
import { ReactNode } from 'react';
import './index.less';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmLoading?: boolean;
  title?: string;
  secondConfirm?: boolean;
  secondConfirmTitle?: string;
  children?: ReactNode;
  onOk?: () => void;
  hasFooter?:
    | ReactNode
    | ((cancelButtonNode: ReactNode, okButtonNode: ReactNode) => ReactNode);
}

// 动态接受data数据和data类型

function CustomModal(Props: CustomModalProps) {
  // 关闭弹窗（二次确认）
  const cancel = () => {
    if (Props.secondConfirm) {
      Modal.confirm({
        title: Props.secondConfirmTitle ?? '确定要关闭弹窗吗？',
        onOk: () => {
          Props.onClose();
        },
        onCancel: () => {
          Message.info('已取消');
        },
      });
      return;
    }
    Props.onClose();
  };

  return (
    <>
      <Modal
        title={Props.title}
        visible={Props.isOpen}
        onOk={() => (Props.onOk ? Props.onOk() : Props.onClose())}
        onCancel={() => cancel()}
        escToExit={false}
        maskClosable={false}
        autoFocus={false}
        footer={Props.hasFooter}
        unmountOnExit={true}
        confirmLoading={Props.confirmLoading ?? false}
        focusLock={true}
      >
        {Props.children}
      </Modal>
    </>
  );
}

export default CustomModal;
