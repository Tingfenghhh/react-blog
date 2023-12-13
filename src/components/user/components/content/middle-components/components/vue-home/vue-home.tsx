import UploadImg from '@/components/upload/upload-img';

function VueHome() {
  return (
    <>
      <UploadImg
        listType='picture-card'
        progressProps={{
          size: 'small',
          type: 'line',
          showText: true,
          width: '100%',
        }}
        returnUrl={(url) => {
          console.log('多个url', url.split(','));
        }}
      />
    </>
  );
}

export default VueHome;
