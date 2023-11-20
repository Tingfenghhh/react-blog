import styled from 'styled-components';
import { motion } from 'framer-motion';
import logos from '@/assets/images/user/logos.png';

const LogoMotion = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
`;

const LogoSpan = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-left: 5px;
  color: var(--color-text-1);
`;

function Logo() {
  return (
    <>
      <LogoMotion
        className='LogoMotion'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0, 0.71, 0.2, 1.01],
          delay: 0.4,
        }}
      >
        <LogoImg src={logos} alt='logo' />
        <LogoSpan>React</LogoSpan>
      </LogoMotion>
    </>
  );
}

export default Logo;
