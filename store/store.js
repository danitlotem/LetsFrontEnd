import {configureStore} from '@reduxjs/toolkit';
import configurationSlice from './Slices/configurationSlice';
import chatSlice from './Slices/chatSlice';
import generalSlice from './Slices/generalSlice';
import peopleSlice from './Slices/peopleSlice';
import picturesSlice from './Slices/picturesSlice';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './Sagas/Saga';

export const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    general: generalSlice,
    people: peopleSlice,
    chat: chatSlice,
    configuration: configurationSlice,
    pictures: picturesSlice,
  },
  middleware: [saga],
});
saga.run(rootSaga);

export default store;
