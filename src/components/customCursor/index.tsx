import { useState, useEffect } from 'react';
import LottieAnimation from '../lottie-animation';
import Point from '@/assets/lottie-mations/point.json';

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [widthAndHeight] = useState(45);
  const [handplay, setHandplay] = useState(false);

  useEffect(() => {
    let lastMousePosition = { x: 0, y: 0 };

    const updateMousePosition = (e: MouseEvent) => {
      lastMousePosition = { x: e.pageX, y: e.pageY };
      setPosition(lastMousePosition);
      console.log('updateMousePosition');
    };

    const updatePositionOnScroll = () => {
      setPosition({
        x: lastMousePosition.x + window.scrollX,
        y: lastMousePosition.y + window.scrollY,
      });
    };
    const play = () => {
      setHandplay(true);
      setTimeout(() => {
        setHandplay(false);
      }, 300);
    };

    const hideCursor = () => {
      setPosition({ x: -100, y: -100 }); // 将鼠标位置设置到窗口外部
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('click', play);
    window.addEventListener('scroll', updatePositionOnScroll);
    document.body.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('click', play);
      window.removeEventListener('scroll', updatePositionOnScroll);
      document.body.removeEventListener('mouseleave', hideCursor);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y - widthAndHeight / 2}px`,
        left: `${position.x - widthAndHeight / 2}px`,
        zIndex: 9999,
        pointerEvents: 'none', // 不添加这一行，会影响鼠标的点击和hover等其他事件，也需要在全局隐藏鼠标样式
        // 其他样式...
      }}
    >
      <LottieAnimation
        name={'mouse'}
        speed={8}
        loop={false}
        autoplay={false}
        handplay={handplay}
        width={widthAndHeight}
        height={widthAndHeight}
        animationData={Point}
      />
    </div>
  );
}

export default CustomCursor;
