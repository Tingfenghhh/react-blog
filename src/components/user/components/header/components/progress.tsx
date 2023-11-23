import { scroll } from 'framer-motion/dom';

function ProGress() {
  const progressWheel = document.querySelector('.progress') as HTMLElement;

  scroll((progress) => {
    if (progressWheel) {
      progressWheel.style.strokeDasharray = `${progress}, 1`;
    }
  });
  return (
    <>
      <svg
        width='50'
        height='50'
        viewBox='0 0 100 100'
        className='progress-wheel'
      >
        <circle cx='50' cy='50' r='30' pathLength='1' className='bg' />
        <circle cx='50' cy='50' r='30' pathLength='1' className='progress' />
      </svg>
    </>
  );
}

export default ProGress;
