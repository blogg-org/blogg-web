import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export const rootState = store.getState();

// custom dispatch hook
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

// custom selector hook
export const useAppSelector: TypedUseSelectorHook<typeof rootState> = useSelector;

export default store;
