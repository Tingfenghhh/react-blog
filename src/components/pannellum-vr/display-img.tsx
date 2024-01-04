import { usePannellum } from '@/hooks/usePannellum';
import { useEffect } from 'react';

function DisplayImg() {
  const pannellum = new usePannellum();

  useEffect(() => {
    pannellum.initPannellumViewer('panorama', {
      default: {
        firstScene: 'circle',
        author: 'tingfeng',
        sceneFadeDuration: 1000,
        autoLoad: true,
        autoRotate: -2,
      },
      scenes: {
        circle: {
          title: 'zxd',
          hfov: 110,
          pitch: -3,
          yaw: 117,
          type: 'equirectangular',
          panorama: 'https://pannellum.org/images/alma.jpg',
          hotSpots: [
            {
              pitch: -2.1,
              yaw: 132.9,
              type: 'scene',
              text: 'Spring House or Dairy',
              sceneId: 'house',
            },
          ],
        },

        house: {
          title: 'zxd',
          hfov: 110,
          yaw: 5,
          type: 'equirectangular',
          panorama: 'https://pannellum.org/images/alma.jpg',
          hotSpots: [
            {
              pitch: -0.6,
              yaw: 37.1,
              type: 'scene',
              text: 'Mason Circle',
              sceneId: 'circle',
              targetYaw: -23,
              targetPitch: 2,
            },
          ],
        },
      },
    });
    return () => {
      pannellum.destroy();
    };
  }, []);

  return (
    <>
      <div
        id='panorama'
        style={{
          width: '100%',
          height: '600px',
        }}
      ></div>
    </>
  );
}

export default DisplayImg;
