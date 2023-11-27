import { useEffect, useState } from 'react';
import { Skeleton } from '@arco-design/web-react';
import useAxios from 'axios-hooks';
import { motion } from 'framer-motion';
import { WeatherSpan } from './style';
import { IconLocation } from '@arco-design/web-react/icon';
import WeatherIcon from '@/components/icon-components/WeatherSvg';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入中文语言包
import weekday from 'dayjs/plugin/weekday'; // 导入 weekday 插件
const { VITE_API_WEATHER_KEY, VITE_API_WEATHER_URL } = import.meta.env;

function WeatherModal7({
  cityValue,
  weatherValue,
  isLight,
  iconId,
  visible,
  setUpDateTime,
}: {
  cityValue: CityLocation | null;
  weatherValue: NowWeatherInfo | null;
  isLight: string;
  iconId: string;
  visible: boolean;
  setUpDateTime: (value: string) => void;
}) {
  dayjs.locale('zh-cn'); // 设置语言为中文
  dayjs.extend(weekday); // 使用 weekday 插件
  const [cityId, setCityId] = useState('');
  const [sevenDayWeather, setSevenDayWeather] = useState<City7DWeather[]>();
  // 查询7天天气
  const [{ data, loading }, execute] = useAxios<City7DWeatherInfo>(
    {
      url: `${VITE_API_WEATHER_URL}/7d?location=${cityId}&key=${VITE_API_WEATHER_KEY}`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    if (cityValue) {
      setCityId(cityValue.id);
    }
  }, [cityValue]);

  useEffect(() => {
    if (cityId !== '' && visible) {
      execute();
    }
  }, [cityId, visible]);

  useEffect(() => {
    if (data?.daily) {
      setSevenDayWeather(data?.daily);
      setUpDateTime(
        '天气更新时间：' + dayjs(data?.updateTime).format('YYYY-MM-DD HH:mm'),
      );
    }
  }, [data]);
  if (!cityValue && !weatherValue) {
    return (
      <>
        <span>天气数据错误</span>
      </>
    );
  }
  return (
    <>
      <Skeleton
        loading={loading}
        text={{
          rows: 5,
          width: '100%',
          className: 'weather-skeleton',
        }}
        animation
      >
        <motion.div
          className={'weather-info-box'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
          exit={{ opacity: 0 }}
          style={{
            backgroundImage: 'transparent',
          }}
        >
          {/* 上部分当日天气 */}
          <div className={'weather-info-top'}>
            <div className={'weather-info-top-left-right'}>
              <WeatherSpan>
                {cityValue?.name} <IconLocation />
              </WeatherSpan>
              <WeatherSpan
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginLeft: '-10px',
                }}
              >
                {weatherValue?.now.temp}°
              </WeatherSpan>
            </div>
            <div
              className={'weather-info-top-left-right weather-info-top-right'}
            >
              <WeatherSpan>
                <WeatherSpan>{weatherValue?.now.text} </WeatherSpan>
                <WeatherIcon
                  iconId={iconId}
                  fill={isLight === 'light' ? false : true}
                />
              </WeatherSpan>
              <WeatherSpan>气压：{weatherValue?.now.pressure}Pa</WeatherSpan>
            </div>
          </div>
          {/* 下部分7天 */}
          <div className={'weather-info-bottom'}>
            <div className='footer-pre'>
              {sevenDayWeather ? (
                <>
                  {sevenDayWeather.map((item: City7DWeather) => {
                    return (
                      <div className={'day-info'} key={item.fxDate}>
                        <span>
                          {
                            // 显示中文周几
                            dayjs(item.fxDate).format('dddd')
                          }
                        </span>
                        <WeatherIcon
                          iconId={item.iconDay}
                          fill={isLight === 'light' ? false : true}
                        ></WeatherIcon>
                        <span>{item.textDay}</span>
                        <span>{`${item.tempMin}° - ${item.tempMax}°`}</span>
                      </div>
                    );
                  })}
                </>
              ) : null}
            </div>
          </div>
        </motion.div>
      </Skeleton>
    </>
  );
}

export default WeatherModal7;
