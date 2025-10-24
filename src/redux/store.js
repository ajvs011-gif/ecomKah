// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./reducers/productReducer";
import bazarReducer from "./bazarSlice";

// 🔹 Combine les reducers
const rootReducer = combineReducers({
  product: productReducer,
  bazar: bazarReducer, // ✅ pour gérer le panier et l'utilisateur
});

// 🔹 Configuration de redux-persist
const persistConfig = {
  key: "root",
  storage,
};

// 🔹 Création du reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Création du store Redux
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 🔹 Création du persistor
export const persistor = persistStore(store);
