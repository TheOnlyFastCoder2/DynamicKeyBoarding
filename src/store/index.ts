import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import gameReducer from "./game";

export const rootReducer: Reducer = combineReducers({
  gameReducer
});

export const store = configureStore({
  reducer: rootReducer
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;