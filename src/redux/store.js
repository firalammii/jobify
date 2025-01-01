import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlice';
import authReducer from './authSlice';
import companiesReducer from './companySlice';
import jobsReducer from './jobSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  jobs: jobsReducer,
  companies: companiesReducer
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
