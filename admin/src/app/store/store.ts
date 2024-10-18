import { configureStore } from '@reduxjs/toolkit';
import selectReducer from '../../widgets/selectWidget/model/slices/selectSlice';
import taskReducer from '../../features/getLink/model/slices/taskSlice'

const store = configureStore({
  reducer: {
    select: selectReducer,
    taskLink: taskReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store};