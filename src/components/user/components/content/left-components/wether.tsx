import WeatherIcon from '@/components/icon-components/WeatherSvg';
import { useAppSelector } from '@/hooks/redux';
import { useGetLocation } from '@/hooks/useGetLocation';
import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';
import './index.less';
import { Modal, Skeleton } from '@arco-design/web-react';
import { WeatherSpan } from './style';
import { IconLocation } from '@arco-design/web-react/icon';
import { Variants, motion } from 'framer-motion';
import WeatherModal7 from './weather-Modal';
import { DelayTime } from '@/components/user/delay';
import { getRandomWarmGradient } from '@/hooks/useColor';

const {
  VITE_API_WEATHER_KEY,
  VITE_API_WEATHER_LOCATION,
  VITE_API_WEATHER_URL,
} = import.meta.env;

function Wether() {
  const { getIp, getCity } = useGetLocation();
  const [cityName, setCityName] = useState('');
  const [cityId, setCityId] = useState('');
  const [iconId, setIconId] = useState('');
  const [nowLoading, setNowLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [upDateTime, setUpDateTime] = useState(''); // 更新时间
  const isLight = useAppSelector((state) => state.user.theme);
  const [bacColor, setBacColor] = useState(''); // 背景颜色

  const variants: Variants = {
    light: {
      opacity: [0, 1],
      y: [20, 0],
      transition: {
        delay: DelayTime.delay,
      },
    },
    dark: {
      opacity: [0, 1],
      y: [-20, 0],
      transition: {
        delay: DelayTime.delay,
      },
    },
  };
  const getCityName = async () => {
    const ip = await getIp();
    const city = await getCity(ip);
    setCityName(city);
  };
  // 查询城市详情信息
  const [{ data }, execute] = useAxios<CityLocationInfo>(
    {
      url: `${VITE_API_WEATHER_LOCATION}?location=${cityName}&key=${VITE_API_WEATHER_KEY}`,
      method: 'GET',
    },
    { manual: true },
  );
  // 查询实时天气
  const [{ data: nowData }, nowExecute] = useAxios<NowWeatherInfo>(
    {
      url: `${VITE_API_WEATHER_URL}/now?location=${cityId}&key=${VITE_API_WEATHER_KEY}`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    getCityName();
  }, []);

  useEffect(() => {
    setBacColor(getRandomWarmGradient(isLight === 'light' ? true : false));
  }, [isLight]);

  useEffect(() => {
    if (cityName) {
      execute().then((res) => {
        if (!res) return;
        setCityId(res.data.location[0].id);
      });
    }
  }, [cityName]);

  useEffect(() => {
    if (cityId !== '') {
      nowExecute();
    }
  }, [cityId]);

  useEffect(() => {
    if (nowData) {
      setIconId(nowData.now.icon);
      setTimeout(() => {
        setNowLoading(false);
      }, 300);
    }
  }, [nowData]);

  return (
    <>
      <div className={'weather-box'}>
        <Skeleton
          loading={nowLoading}
          text={{
            rows: 2,
            width: ['85%', '85%'],
            className: 'weather-skeleton',
          }}
          animation
        >
          <motion.div
            className={'weather-info-box'}
            animate={isLight === 'light' ? 'light' : 'dark'}
            variants={variants}
            exit={{ opacity: 0 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            style={{
              backgroundImage: bacColor,
            }}
          >
            {/* 上部分当日天气 */}
            <div
              className={'weather-info-top'}
              onClick={() => setVisible(true)}
            >
              <div className={'weather-info-top-left-right'}>
                <WeatherSpan>
                  {data?.location[0].name} <IconLocation />
                </WeatherSpan>
                <WeatherSpan
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginLeft: '-10px',
                  }}
                >
                  {nowData?.now.temp}°
                </WeatherSpan>
              </div>
              <div
                className={'weather-info-top-left-right weather-info-top-right'}
              >
                <WeatherSpan>
                  <WeatherSpan>{nowData?.now.text} </WeatherSpan>
                  <WeatherIcon
                    iconId={iconId}
                    fill={isLight === 'light' ? false : true}
                  />
                </WeatherSpan>
                <WeatherSpan>气压：{nowData?.now.pressure}Pa</WeatherSpan>
              </div>
            </div>
          </motion.div>
        </Skeleton>

        <Modal
          title={upDateTime}
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          maskClosable={false}
          footer={null}
          style={{
            backgroundImage: bacColor,
          }}
        >
          <WeatherModal7
            cityValue={data ? data?.location[0] : null}
            weatherValue={nowData ? nowData : null}
            iconId={iconId}
            isLight={isLight}
            visible={visible}
            setUpDateTime={setUpDateTime}
          />
        </Modal>
      </div>
    </>
  );
}

export default Wether;
