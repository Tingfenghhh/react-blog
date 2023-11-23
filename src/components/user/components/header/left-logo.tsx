import ProGress from './components/progress';
import { LogoMotion, LogoSpan } from './style';

function Logo() {
  return (
    <>
      <LogoMotion className='LogoMotion'>
        <ProGress />
        <LogoSpan>欢迎！</LogoSpan>
      </LogoMotion>
    </>
  );
}

export default Logo;
