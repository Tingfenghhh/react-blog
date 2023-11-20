import { MiddleBox } from './style';

function MiddleContent() {
  return (
    <>
      <MiddleBox
        className='content-box'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0.29, -0.18, 0.37, 1.01],
        }}
      ></MiddleBox>
    </>
  );
}

export default MiddleContent;
