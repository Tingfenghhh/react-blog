import { configureStore } from '@reduxjs/toolkit';
import counterStoreReducer from './modules/user';
export const store = configureStore({
  reducer: {
    counter: counterStoreReducer,
  },
});

// 从 store 本身推断出 `RootState` 和 `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
// 类型推断: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
