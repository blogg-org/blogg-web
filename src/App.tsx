import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { allPosts } from "@store/slice/blogsSlice";
import { Header, Footer, Container } from "@components/index";
import { useAppDispatch, useAppSelector } from "@store/store";
import { currentUser, getSigninStatus } from "@store/slice/authSlice";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const isSignedIn = useAppSelector(getSigninStatus) === "true";

    // fetch current user and all posts while the app is loading if and only if when the user is logged in
    useEffect(() => {
        // IIFE
        (async () => {
            if (isSignedIn) {
                await dispatch(currentUser());
                await dispatch(allPosts());
            }
        })();
    }, [isSignedIn, dispatch]);

    return (
        <div className="relative min-w-screen min-h-screen flex flex-col justify-between">
            <Header />
            <main className="py-6">
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
            <Toaster reverseOrder={false} toastOptions={{ duration: 5000 }} />
        </div>
    );
};

export default App;
