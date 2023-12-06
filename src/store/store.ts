import authReducer from "./slice/authSlice";
import postsReducer from "./slice/postsSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
    },
});

export const rootState = store.getState();

// custom dispatch hook
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

// custom selector hook
export const useAppSelector: TypedUseSelectorHook<typeof rootState> =
    useSelector;

export default store;
