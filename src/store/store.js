import { configureStore } from '@reduxjs/toolkit';
import widgetReducer from '../features/widgets/widgetSlice';

export default configureStore({
  reducer: {
    widgets: widgetReducer,
  },
});