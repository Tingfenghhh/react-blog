import styled from 'styled-components';
import mountain from '@/assets/images/swiper/mountain.jpg';
import waterGod from '@/assets/images/swiper/water-god.jpg';
import hwei from '@/assets/images/swiper/hwei.jpg';
import cmd from '@/assets/images/swiper/cmd.png';
import serda from '@/assets/images/swiper/serda.jpg';
import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import MotionSwiper from '@/components/swiper';
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { DelayTime } from '@/components/user/delay';
import { Variants } from 'framer-motion';
import { useAppSelector } from '@/hooks/redux';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const LoginSwiperBox = styled.div`
  width: 30%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

function LoginSwiper() {
  const [swiperContent, setSwiperContent] = useState<
    JSX.Element | JSX.Element[]
  >([]);
  const isLight = useAppSelector((state) => state.user.theme);

  const variants: Variants = {
    light: {
      opacity: [0, 1],
      y: [20, 0],
      transition: {
        delay: DelayTime.delay + 0.2,
      },
    },
    dark: {
      opacity: [0, 1],
      y: [-20, 0],
      transition: {
        delay: DelayTime.delay + 0.2,
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
              <div
                className={'SwiperSlideBackImg'}
                style={{
                  backgroundImage: `url(${item.src})`,
                }}
              >
                <div className={'SwiperSlideImgBox'}>
                  <img
                    className={'SwiperSlideImg'}
                    src={item.src}
                    alt={item.name}
                  />
                </div>
              </div>
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
      <LoginSwiperBox>
        <MotionSwiper
          className={'login-img-motion-swipe'}
          swiperClassName={'login-img-swiper'}
          swiperOptions={{
            modules: [Autoplay, Pagination, Navigation, EffectCoverflow],
            navigation: true,
            loop: true,
            pagination: {
              clickable: true,
            },
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            },
            centeredSlides: true,
            slidesPerView: 'auto',
            grabCursor: true,
            effect: 'coverflow',
            autoplay: {
              delay: 10000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
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
      </LoginSwiperBox>
    </>
  );
}

export default LoginSwiper;
