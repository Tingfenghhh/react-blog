import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../';
import { Message } from '@arco-design/web-react';

// 定义 slice state 的类型
interface UserState {
  value: number;
  name: string;
  price: number;
}

// 使用该类型定义初始 state
const initialState: UserState = {
  value: 0,
  name: 'zxd',
  price: 10,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      if (state.value === 0) {
        Message.info('不能再减了');
        return;
      }
      state.value -= action.payload;
    },
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, changeName } =
  userSlice.actions;

// selectors 等其他代码可以使用导入的 `RootState` 类型
export const selectCount = (state: RootState) => state.user.value;

export default userSlice.reducer;
