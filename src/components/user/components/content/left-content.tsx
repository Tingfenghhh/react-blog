import { LeftBox } from './style';

function LeftContent() {
  return (
    <>
      <LeftBox
        className='content-box'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0.29, -0.18, 0.37, 1.01],
        }}
      ></LeftBox>
    </>
  );
}

export default LeftContent;
