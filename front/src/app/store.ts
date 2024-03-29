import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../Features/users/usersSlice';
import { cocktailReducer } from "../Features/cocktails/cocktailsSlice";

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

const rootReducer = combineReducers({
  cocktail: cocktailReducer,
  users: persistReducer(usersPersistConfig, userReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;