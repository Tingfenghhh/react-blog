import { DelayTime } from '@/components/user/delay';
import { useAppSelector } from '@/hooks/redux';
import { Descriptions, Skeleton } from '@arco-design/web-react';
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
  background-color: var(--color-bg-4);
`;

const UserInfoTietle = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function UserInfo() {
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    }, 3500);
  }, []);

  const titleTsx = () => {
    return (
      <UserInfoTietle>
        <motion.img
          whileHover={{
            y: [0, -15],
            boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.3)',
            borderRadius: '50%',
            transition: {
              duration: 0.3,
            },
          }}
          src={logos}
          style={{
            height: '70px',
            borderRadius: '50%',
          }}
          alt='头像'
        />
      </UserInfoTietle>
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
            data={UserInfoData}
            border
            column={1}
            layout='inline-vertical'
          />
        </UserInfoBox>
      )}
    </>
  );
}

export default UserInfo;
