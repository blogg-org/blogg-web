import App from "./App";
import { AuthLayout } from "@components/index";
import {
    AddPost,
    AllPosts,
    EditPost,
    Home,
    Login,
    Post,
    Signup,
} from "@pages/index";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

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
                path="posts"
                element={
                    <AuthLayout authentication={true}>
                        <AllPosts />
                    </AuthLayout>
                }
            />
            <Route
                path="posts/add"
                element={
                    <AuthLayout authentication={true}>
                        <AddPost />
                    </AuthLayout>
                }
            />
            <Route
                path="posts/edit/:slug"
                element={
                    <AuthLayout authentication={true}>
                        <EditPost />
                    </AuthLayout>
                }
            />
            <Route path="posts/:slug" element={<Post />} />
        </Route>
    )
);

export default router;
