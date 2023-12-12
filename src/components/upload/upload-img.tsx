import { useState } from 'react';
import {
  Button,
  Message,
  Modal,
  ProgressProps,
  Upload,
} from '@arco-design/web-react';
import { RequestOptions, UploadItem } from '@arco-design/web-react/es/Upload';
import MyCropper from './cropper';
import axiosInstance from '@/apis/intercept';
import axios from 'axios';

interface UploadImgProps {
  listType: 'text' | 'picture-card' | 'picture-list';
  accept?:
    | string
    | {
        type: string;
        strict?: boolean | undefined;
      }
    | undefined;
  limit?: number;
  progressProps?: Partial<ProgressProps>;
}

function UploadImg(Props: UploadImgProps) {
  const [fileList, setFileList] = useState<UploadItem[]>([]);

  // 上传前的校验
  const beforeUpload = (file: File) => {
    // 校验文件的大小
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
      Message.error('图片大小不能超过20MB!');
      return false;
    }

    return new Promise((resolve) => {
      const modal = Modal.info({
        title: '图片裁剪工具',
        onCancel: () => {
          Message.info('取消上传');
          resolve(false);
          modal.close();
        },
        escToExit: false,
        maskClosable: false,
        simple: false,
        style: { width: 500 },
        content: (
          <MyCropper
            file={file}
            onOk={(file) => {
              resolve(file);
              modal.close();
            }}
            onCancel={() => {
              resolve(false);
              Message.info('取消上传');
              modal.close();
            }}
          />
        ),
        footer: null,
      });
    });
  };

  // 自定义上传
  const customRequest = (fileOprions: RequestOptions) => {
    // 创建一个取消请求的方法
    const source = axios.CancelToken.source();
    const { onProgress, onError, onSuccess, file } = fileOprions;
    // 使用axios上传
    const formData = new FormData();
    formData.append('file', file);
    axiosInstance
      .post('/blog/file/upload', formData, {
        cancelToken: source.token,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          if (e.total) {
            // 上传进度
            onProgress(parseInt(((e.loaded / e.total) * 100).toFixed(0), 10));
          }
        },
      })
      .then((res) => {
        if (res.data.code === 0) {
          Message.success('上传成功');
          return onSuccess(res);
        }
        Message.error(res.data.msg);
        return onError(res);
      })
      .catch((err) => {
        onError(err);
      });
    return {
      // 返回一个取消上传的方法
      abort() {
        source.cancel();
        Message.info('取消上传');
      },
    };
  };

  // getProgress(手动更新进度条)
  const getProgress = (file: UploadItem) => {
    setFileList((v) => {
      return v.map((x) => {
        return x.uid === file.uid ? file : x;
      });
    });
  };

  return (
    <div
      className={
        Props.listType !== 'picture-card' ? 'custom-upload-progress' : ''
      }
    >
      <Upload
        showUploadList={
          Props.listType !== 'picture-card'
            ? {
                cancelIcon: (
                  <Button size='mini' type='text'>
                    取消上传
                  </Button>
                ),
                reuploadIcon: (
                  <Button size='mini' type='text'>
                    点击重试
                  </Button>
                ),
              }
            : true
        }
        listType={Props.listType ?? 'picture-card'}
        limit={Props.limit ?? 3}
        accept={Props.accept ?? 'image/png, image/jpeg'}
        multiple
        imagePreview
        fileList={fileList}
        beforeUpload={beforeUpload}
        customRequest={customRequest}
        progressProps={
          Props.listType !== 'picture-card' ? Props.progressProps : undefined
        }
        onChange={setFileList}
        onProgress={getProgress}
      />
    </div>
  );
}

export default UploadImg;
