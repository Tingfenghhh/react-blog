import logos from '@/assets/images/user/logos.png';
import { LogoImg, LogoMotion, LogoSpan } from './style';

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
