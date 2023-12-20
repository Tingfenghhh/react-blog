import { Message, Modal } from '@arco-design/web-react';
import { ReactNode } from 'react';
import './index.less';

/**
 * 自定义模态框属性
 * @interface CustomModalProps
 * @description 自定义模态框属性
 * @property {boolean} isOpen - 是否打开模态框
 * @property {() => void} onClose - 关闭模态框的回调函数
 * @property {boolean} [confirmLoading] - 确认按钮加载状态
 * @property {string} [title] - 模态框标题
 * @property {boolean} [secondConfirm] - 是否显示第二个确认按钮
 * @property {string} [secondConfirmTitle] - 第二个确认按钮的标题
 * @property {ReactNode} [children] - 子元素
 * @property {() => void} [onOk] - 确认按钮的回调函数
 * @property {ReactNode | ((cancelButtonNode: ReactNode, okButtonNode: ReactNode) => ReactNode)} [hasFooter] - 是否显示底部
 *
 * @example
 * <CustomModal
 *    title='编辑个人资料'
 *    secondConfirm={true}
 *    secondConfirmTitle='是否退出编辑'
 *    isOpen={isOpen}
 *    confirmLoading={editUserLoading}
 *    children={EditUserInfo({
 *      userData: userInfo,
 *      isValidate: (val: boolean) => checkValidate(val),
 *      returnData: (val: FormData & { imgUrl: string }) =>
 *        saveUserInfoData(val),
 *    })}
 *    onClose={() => setIsOpen(false)}
 *    onOk={() => ok()}
 * />
 */
interface CustomModalProps {
  /**
   * 是否打开模态框
   */
  isOpen: boolean;
  /**
   * 关闭模态框的回调函数
   */
  onClose: () => void;
  /**
   * 确认按钮加载状态
   */
  confirmLoading?: boolean;
  /**
   * 模态框标题
   */
  title?: string;
  /**
   * 是否显示第二个确认按钮
   */
  secondConfirm?: boolean;
  /**
   * 第二个确认按钮的标题
   */
  secondConfirmTitle?: string;
  /**
   * 子元素
   */
  children?: ReactNode;
  /**
   * 确认按钮的回调函数
   */
  onOk?: () => void;
  /**
   * 是否显示底部
   */
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
