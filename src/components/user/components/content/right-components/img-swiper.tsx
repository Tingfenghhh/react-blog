import MotionSwiper from '@/components/swiper';
// import required modules
import { SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import { useEffect, useState } from 'react';
import mountain from '@/assets/images/swiper/mountain.jpg';
import waterGod from '@/assets/images/swiper/water-god.jpg';
import hwei from '@/assets/images/swiper/hwei.jpg';
import cmd from '@/assets/images/swiper/cmd.png';
import serda from '@/assets/images/swiper/serda.jpg';
import { useAppSelector } from '@/hooks/redux';
import { Variants } from 'framer-motion';

function ImgSwiper() {
  const [swiperContent, setSwiperContent] = useState<
    JSX.Element | JSX.Element[]
  >([]);
  const isLight = useAppSelector((state) => state.user.theme);

  const variants: Variants = {
    light: {
      opacity: [0, 1],
      y: [20, 0],
      transition: {
        delay: 0.8,
      },
    },
    dark: {
      opacity: [0, 1],
      y: [-20, 0],
      transition: {
        delay: 0.8,
      },
    },
  };
  const imglist: {
    name: string;
    src: string;
  }[] = [
    {
      name: 'mountain',
      src: mountain,
    },
    {
      name: 'waterGod',
      src: waterGod,
    },
    {
      name: 'hwei',
      src: hwei,
    },
    {
      name: 'cmd',
      src: cmd,
    },
    {
      name: 'serda',
      src: serda,
    },
  ];

  useEffect(() => {
    if (imglist.length > 0) {
      setSwiperContent(
        imglist.map((item, index) => {
          return (
            <SwiperSlide key={index + item.name}>
              <img
                className={'SwiperSlideImg'}
                src={item.src}
                alt={item.name}
              />
            </SwiperSlide>
          );
        }),
      );

      return;
    }
    setSwiperContent(
      <SwiperSlide>
        <span>暂无数据</span>
      </SwiperSlide>,
    );
  }, []);

  return (
    <>
      <MotionSwiper
        className={'img-motion-swipe'}
        swiperClassName={'img-swiper'}
        swiperOptions={{
          modules: [Autoplay, Pagination, EffectCards],
          pagination: {
            clickable: true,
          },
          autoplay: {
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          effect: 'cards',
        }}
        swiperContent={swiperContent}
        motionSwiperOptions={{
          initial: {
            opacity: 0,
            y: 20,
          },
          animate: isLight === 'light' ? 'light' : 'dark',
          variants: variants,
          transition: {
            duration: 0.5,
            delay: 1.5,
            ease: [0.29, -0.18, 0.37, 1.01],
          },
        }}
      />
    </>
  );
}

export default ImgSwiper;
