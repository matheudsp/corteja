
import { configureStore } from '@reduxjs/toolkit';
import salonReducer from './salon/salon.slice';

const store = configureStore({
  reducer: {
    salon: salonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
