import { Header, Footer, Container } from "@components/index";
import React from "react";
import { Outlet } from "react-router-dom";

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
        </div>
    );
};

export default App;
