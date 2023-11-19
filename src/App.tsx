import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { Header, Footer, Container } from "@components/index";

const App: React.FC = () => {
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
