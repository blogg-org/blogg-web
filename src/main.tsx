import "./index.css";
import React from "react";
import router from "./router.tsx";
import store from "@store/store.ts";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { envConfig } from "@config/env.config.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";

// console.log(typeof localStorage.getItem("isSignedIn"));
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={envConfig.googleOAuthCliendId}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
