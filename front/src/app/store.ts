import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../Features/users/usersSlice';
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  REHYDRATE,
  PURGE,
  REGISTER,
} from "redux-persist";

const usersPersistConfig = {
  key: "cocktail:users",
  storage: storage,
  whitelist: ["user"],
};


export const store = configureStore({
  reducer: {
    users: persistReducer(usersPersistConfig, userReducer),
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;