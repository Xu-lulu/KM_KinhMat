import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import productReducer from "./productSlice.jsx";
import adminReducer from "./productAdmin.jsx";
import cartReducer from "./Cart.jsx";
import { thunk } from "redux-thunk";
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
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  products: productReducer,
  auth: authReducer,
  admin: adminReducer,
  cartUser: cartReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});
export const persistor = persistStore(store);
// export default configureStore({
//   reducer: {
//     products: productReducer,
//     auth: authReducer,
//   },
// });
