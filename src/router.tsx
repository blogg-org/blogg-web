import {
    Home,
    Post,
    Login,
    Signup,
    AddPost,
    AllPosts,
    EditPost,
    ChangePassword,
} from "@pages/index";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import { AuthLayout } from "@components/index";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="signin" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route
                path="auth/change-password"
                element={
                    <AuthLayout>
                        <ChangePassword />
                    </AuthLayout>
                }
            />
            <Route
                path="posts"
                element={
                    <AuthLayout>
                        <AllPosts />
                    </AuthLayout>
                }
            />
            <Route
                path="posts/add"
                element={
                    <AuthLayout>
                        <AddPost />
                    </AuthLayout>
                }
            />
            <Route
                path="posts/:slug/edit"
                element={
                    <AuthLayout>
                        <EditPost />
                    </AuthLayout>
                }
            />
            <Route
                path="posts/:slug"
                element={
                    <AuthLayout>
                        <Post />
                    </AuthLayout>
                }
            />
        </Route>
    )
);

export default router;
