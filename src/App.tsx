import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { allPosts } from "@store/slice/blogsSlice";
import { getLoginStatus } from "@store/slice/authSlice";
import { Header, Footer, Container } from "@components/index";
import { useAppDispatch, useAppSelector } from "@store/store";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(getLoginStatus);

    // fetch all posts while the app is loading only when the user is logged in
    useEffect(() => {
        // IIFE
        (async () => {
            if (isLoggedIn === "true") {
                await dispatch(allPosts());
            }
        })();
    }, [isLoggedIn, dispatch]);

    return (
        <div className="relative min-w-screen min-h-screen flex flex-col justify-between">
            <Header />
            <main className="py-6">
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
            <Toaster reverseOrder={false} />
        </div>
    );
};

export default App;
