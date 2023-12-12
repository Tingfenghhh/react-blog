import React, { useState } from 'react';
import { Button, Grid, Slider } from '@arco-design/web-react';
import {
  IconMinus,
  IconPlus,
  IconRotateLeft,
} from '@arco-design/web-react/icon';
import EasyCropper, { Area } from 'react-easy-crop';
import './cropper.less';

interface MyCropperProps {
  file: File;
  onOk: (file: File) => void;
  onCancel: () => void;
}

// 获取裁剪后的图片
async function _getCroppedImg(
  url: string,
  pixelCrop: Area | undefined,
  rotation = 0,
): Promise<Blob | null> {
  const image: HTMLImageElement = await new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx || !image) {
    return null;
  }

  const imageSize =
    2 * ((Math.max(image.width, image.height) / 2) * Math.sqrt(2));
  canvas.width = imageSize;
  canvas.height = imageSize;

  if (rotation) {
    ctx.translate(imageSize / 2, imageSize / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-imageSize / 2, -imageSize / 2);
  }

  ctx.drawImage(
    image,
    imageSize / 2 - image.width / 2,
    imageSize / 2 - image.height / 2,
  );
  const data = ctx.getImageData(0, 0, imageSize, imageSize);
  if (!pixelCrop) {
    return null;
  }
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.putImageData(
    data,
    Math.round(0 - imageSize / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - imageSize / 2 + image.height * 0.5 - pixelCrop.y),
  );
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    });
  });
}

const MyCropper = (props: MyCropperProps) => {
  const { file, onOk } = props;
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState<number>(0);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [showCropper, setShowCropper] = useState(false);
  const url = React.useMemo(() => {
    // 延迟显示组件，防止裁剪框不能拖动到图片边缘(react-easy-crop的bug)
    setTimeout(() => {
      setShowCropper(true);
      setZoom(1);
    }, 200);
    return URL.createObjectURL(file);
  }, [file]);
  return (
    <div>
      <div
        style={{
          width: '100%',
          height: 320,
          position: 'relative',
          boxSizing: 'border-box',
          padding: '10px',
        }}
      >
        {!showCropper ? null : (
          <EasyCropper
            style={{
              containerStyle: {
                width: '100%',
                height: 300,
              },
              cropAreaStyle: {
                background: 'transparent',
              },
            }}
            aspect={1 / 1}
            image={url}
            crop={crop}
            zoom={zoom}
            objectFit='contain'
            rotation={rotation}
            onRotationChange={setRotation}
            onCropComplete={(_, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            }}
            onCropChange={setCrop}
            onZoomChange={setZoom}
          />
        )}
      </div>
      <Grid.Row
        justify='space-between'
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <Grid.Row
          style={{
            flex: 1,
            marginLeft: 12,
            marginRight: 12,
          }}
        >
          <IconMinus
            style={{ marginRight: 10 }}
            onClick={() => {
              setZoom(Math.max(0, zoom - 0.1));
            }}
          />
          <Slider
            style={{ flex: 1 }}
            step={0.1}
            value={zoom}
            onChange={(v) => {
              setZoom(v as number);
            }}
            min={1}
            max={4}
          />
          <IconPlus
            style={{ marginLeft: 10 }}
            onClick={() => {
              setZoom(Math.min(4, zoom + 0.1));
            }}
          />
        </Grid.Row>
        <IconRotateLeft
          onClick={() => {
            setRotation(rotation - 90);
          }}
        />
      </Grid.Row>

      <Grid.Row justify='center'>
        <Button onClick={props.onCancel} style={{ marginRight: 40 }}>
          取消
        </Button>
        <Button
          type='primary'
          onClick={async () => {
            const blob = await _getCroppedImg(
              url || '',
              croppedAreaPixels,
              rotation,
            );

            if (blob) {
              const newFile = new File([blob], file.name || 'image', {
                type: file.type || 'image/png',
              });
              onOk(newFile);
            }
          }}
        >
          确定
        </Button>
      </Grid.Row>
    </div>
  );
};

export default MyCropper;
