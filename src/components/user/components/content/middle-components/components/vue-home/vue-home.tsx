import UploadImg from '@/components/upload/upload-img';

function VueHome() {
  return (
    <>
      <h1>VueHome</h1>
      <UploadImg
        listType='picture-card'
        progressProps={{
          size: 'small',
          type: 'line',
          showText: true,
          width: '100%',
        }}
      />
    </>
  );
}

export default VueHome;
