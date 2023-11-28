import { useAppSelector } from "@store/store";
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getLoginStatus } from "@store/slice/authSlice";
import { Container, Logo, Avatar } from "@components/index";

const Header: React.FC = () => {
    // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const isUserLoggedIn = useAppSelector(getLoginStatus) === "true";
    const [showLink, setShowLink] = useState(true);

    const checkWindowWidth = () => {
        if (window.innerWidth < 640) {
            setShowLink(false);
        } else {
            setShowLink(true);
        }
    };

    useEffect(() => {
        checkWindowWidth();
    }, []);

    useEffect(() => {
        window.addEventListener("resize", checkWindowWidth);

        return () => {
            window.removeEventListener("resize", checkWindowWidth);
        };
    });

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
            show: true,
        },
        {
            name: "Sign in",
            slug: "/signin",
            active: !isUserLoggedIn,
            show: showLink,
        },
        {
            name: "Sign up",
            slug: "/signup",
            active: !isUserLoggedIn,
            show: showLink,
        },
        {
            name: "All Posts",
            slug: "/posts",
            active: isUserLoggedIn,
            show: showLink,
        },
        {
            name: "Add Post",
            slug: "/posts/add",
            active: isUserLoggedIn,
            show: showLink,
        },
    ];
    return (
        <header className="shadow bg-blue-200 sticky top-0 z-50">
            <Container>
                <nav className="flex h-20">
                    <div className="mr-4 h-full flex items-center justify-center">
                        <Link to="/">
                            <Logo className="hover:fill-blue-800" />
                        </Link>
                    </div>
                    <ul className=" relative h-full flex ml-auto gap-4 text-lg">
                        {navItems.map((item) =>
                            item.active ? (
                                item.show ? (
                                    <li key={item.name}>
                                        <NavLink
                                            to={item.slug}
                                            end
                                            className={({ isActive }) =>
                                                `h-full px-4 flex justify-center items-center hover:bg-blue-300 transition-colors duration-200 ease-in
                                            ${
                                                isActive
                                                    ? "bg-blue-300 font-medium text-blue-950"
                                                    : ""
                                            }
                                            `
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ) : null
                            ) : null
                        )}
                        <li className=" flex items-center">
                            <Avatar showLink={showLink} />
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
