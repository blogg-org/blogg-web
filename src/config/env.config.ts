export const envConfig = {
    backendBaseURI: String(import.meta.env.VITE_BACKEND_BASE_URI),
    googleOAuthCliendId: String(import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID),
    googleOAuthClientSecret: String(
        import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_SECRET
    ),
};
