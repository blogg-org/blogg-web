import App from "./App";
import { AuthLayout } from "@components/index";
import { AddPost, AllPosts, EditPost, Home, Login, Post, Signup } from "@pages/index";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route
                path="signin"
                element={
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                }
            />
            <Route
                path="signup"
                element={
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>
                }
            />
            <Route
                path="all-posts"
                element={
                    <AuthLayout authentication={true}>
                        <AllPosts />
                    </AuthLayout>
                }
            />
            <Route
                path="add-post"
                element={
                    <AuthLayout authentication={true}>
                        <AddPost />
                    </AuthLayout>
                }
            />
            <Route
                path="edit-post/:slug"
                element={
                    <AuthLayout authentication={true}>
                        <EditPost />
                    </AuthLayout>
                }
            />
            <Route path="post/:slug" element={<Post />} />
        </Route>
    )
);

export default router;
