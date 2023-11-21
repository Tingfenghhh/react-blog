import { FooterBox, FooterSpan } from './style';

function MyFooter() {
  return (
    <>
      <FooterBox
        initial={{ opacity: 0, y: 10 }}
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
        <FooterSpan>TingFeng</FooterSpan>
      </FooterBox>
    </>
  );
}

export default MyFooter;
