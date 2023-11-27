import { DelayTime } from '@/components/user/delay';
import { useAppSelector } from '@/hooks/redux';
import {
  Descriptions,
  DescriptionsProps,
  Skeleton,
} from '@arco-design/web-react';
import { Variants, motion } from 'framer-motion';
import styled from 'styled-components';
import { UserInfoData } from './user-info-data';
import logos from '@/assets/images/user/logos.png';
import { useEffect, useState } from 'react';

const UserInfoBox = styled(motion.div)`
  width: 100%;
  border-radius: var(--border-radius-xlarge);
  margin: 10px 0;
  box-sizing: border-box;
  padding: var(--box-padding);
  background-color: transparent !important;
`;

const UserInfoTietle = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function UserInfo() {
  const [loading, setLoading] = useState(true);
  const [userInfoData, setUserInfoData] = useState<DescriptionsProps['data']>();
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

  useEffect(() => {
    setTimeout(() => {
      setUserInfoData(UserInfoData);
      setLoading(false);
    }, 3500);
  }, []);

  const titleTsx = () => {
    return (
      <motion.div
        style={{
          boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px) brightness(0.9) saturate(100%)',
          borderRadius: '15px',
          boxSizing: 'border-box',
          padding: '10px 0',
        }}
        whileHover={{}}
      >
        <UserInfoTietle>
          <img
            src={logos}
            style={{
              height: '70px',
              borderRadius: '50%',
            }}
            alt='头像'
          />
        </UserInfoTietle>
      </motion.div>
    );
  };

  return (
    <>
      {loading ? (
        <>
          <Skeleton
            loading={loading}
            className={'user-info-skeleton'}
            text={{
              rows: 0,
              width: '100%',
            }}
            animation
            image={{
              shape: 'circle',
              className: 'user-info-img-skeleton',
              style: {
                position: 'absolute',
                height: '70px',
                width: '70px',
                marginLeft: '-35px',
              },
            }}
          />
          <Skeleton
            loading={loading}
            className={'user-info-skeleton user-info-skeleton-1 '}
            text={{
              rows: 5,
              width: '100%',
              className: 'user-info-li',
            }}
            animation
          />
        </>
      ) : (
        <UserInfoBox
          animate={isLight === 'light' ? 'light' : 'dark'}
          variants={variants}
        >
          <Descriptions
            title={titleTsx()}
            data={userInfoData}
            border
            column={1}
            layout='inline-vertical'
            className={'user-info-descriptions'}
          />
        </UserInfoBox>
      )}
    </>
  );
}

export default UserInfo;
