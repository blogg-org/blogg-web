interface AuthLayoutProps {
    children: React.ReactNode;
    authentication?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    // const navigate = useNavigate();
    // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    // useEffect(() => {
    //     if (authentication && isUserLoggedIn !== authentication) {
    //         navigate("/login");
    //     } else if (!authentication && isUserLoggedIn !== authentication) {
    //         navigate("/");
    //     }
    // }, [authentication, isUserLoggedIn, navigate]);
    return <>{children}</>;
};

export default AuthLayout;
