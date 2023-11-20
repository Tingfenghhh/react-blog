import { HeaderBox } from './style';
import Logo from './left-logo';
import UserInfo from './right-user-info';

function MyHeader() {
  return (
    <>
      <HeaderBox
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
        }}
        whileHover={{
          transition: {
            duration: 0.6,
            ease: [0, 0.71, 0.2, 1.01],
          },
        }}
      >
        <Logo />
        <UserInfo />
      </HeaderBox>
    </>
  );
}

export default MyHeader;
