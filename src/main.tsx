import "./index.css";
import React from "react";
import router from "./router.tsx";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@store/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { envConfig } from "@config/env.config.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={envConfig.googleOAuthCliendId}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
