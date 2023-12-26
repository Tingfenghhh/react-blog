import { CSSProperties, useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

interface LottieAnimationProps {
  animationData: any;
  name: string;
  width?: number;
  height?: number;
  renderer?: 'svg' | 'canvas' | 'html';
  loop?: boolean;
  autoplay?: boolean;
  style?: CSSProperties;
  speed?: number;
  left?: number;
  top?: number;
}

function LottieAnimation(LottieAnimationProps: LottieAnimationProps) {
  const {
    animationData,
    name,
    renderer,
    loop,
    autoplay,
    width,
    height,
    style,
    speed,
    top,
    left,
  } = LottieAnimationProps;
  const container = useRef(null);
  const [styles, setStyles] = useState<CSSProperties>();
  const [lefts, setLeft] = useState<number>();
  const [tops, setTop] = useState<number>();

  useEffect(() => {
    if (!container) return;
    if (!animationData) return;
    lottie.loadAnimation({
      container: container.current as unknown as Element, // 必须是一个DOM元素
      name,
      renderer: renderer ?? 'svg', // 可以是 'svg' / 'canvas' / 'html'
      loop: loop ?? true, // 是否循环播放
      autoplay: autoplay ?? true, // 是否自动播放
      animationData: animationData, // 动画数据
    });
    if (speed) lottie.setSpeed(speed, name);
  }, [animationData]);

  // 组件卸载时销毁动画
  useEffect(() => {
    return () => {
      lottie.destroy(name);
    };
  }, []);

  useEffect(() => {
    if (style) setStyles(style);
  }, [styles]);

  useEffect(() => {
    lottie.stop(name);
    setLeft(left ?? 0);
    setTop(top ?? 0);
    console.log('lefts', lefts, 'tops', tops);
    lottie.play(name);
  }, [top, left]);

  return (
    <div
      ref={container}
      style={{
        width: width ?? '100%',
        height: height ?? '100%',
        left: `${lefts}px` ?? 0,
        top: `${tops}px` ?? 0,
        ...styles,
      }}
    ></div>
  );
}

export default LottieAnimation;
