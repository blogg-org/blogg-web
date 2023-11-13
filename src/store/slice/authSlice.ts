import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    status: "idle" | "loading" | "succeeded" | "failed";
    data: { fullname?: string; email?: string };
    error: string;
}

const initialState: IInitialState = {
    status: "idle",
    data: {},
    error: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});

export default authSlice.reducer;
