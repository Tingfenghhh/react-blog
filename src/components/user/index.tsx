import { Button, Space } from '@arco-design/web-react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { useEffect, useState } from 'react';
import { changeName, decrement, increment } from '@/store/modules/user';
import FramerMotion from '../framer-motion';

function User() {
  // `state` arg 已经正确被键入 `RootState`
  const count = useAppSelector((state) => state.counter.value);
  const name = useAppSelector((state) => state.counter.name);
  const price = useAppSelector((state) => state.counter.price);
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTotal(count * price);
  }, [count, price]);

  return (
    <>
      <Space>
        <h1>hello {name}</h1>
        <Button type='primary' onClick={() => dispatch(changeName('sb'))}>
          改变名字
        </Button>
        <span>当前数量：{count}</span>
        <span>当前价格：{price}</span>
        <span>总价：{total}</span>
        <Button type='primary' onClick={() => dispatch(increment(1))}>
          加
        </Button>
        <Button type='primary' onClick={() => dispatch(decrement(1))}>
          减
        </Button>

        {/* 动画组件 */}
        <FramerMotion />
      </Space>
    </>
  );
}

export default User;
