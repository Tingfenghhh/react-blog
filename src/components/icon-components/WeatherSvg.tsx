// 从qweather-icons包导入所有svg图标
import { motion } from 'framer-motion';
import 'qweather-icons/font/qweather-icons.css';
import styled from 'styled-components';

const WeatherIconMotion = styled(motion.i)`
  font-size: 16px;
  color: var(--color-text-1);
`;

function WeatherIcon({ iconId, fill }: { iconId: string; fill?: boolean }) {
  if (!iconId) return null;
  const className = `qi-${iconId}${fill ? '-fill' : ''}`;
  return (
    <WeatherIconMotion
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.8 }}
      className={className}
    />
  );
}

export default WeatherIcon;
