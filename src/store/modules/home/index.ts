import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeState {
  homeName: string;
}

const initialState: HomeState = {
  homeName: 'homeName-zxd',
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeHomeName: (state, action: PayloadAction<string>) => {
      state.homeName = action.payload;
    },
  },
});

export const { changeHomeName } = homeSlice.actions;

export default homeSlice.reducer;
