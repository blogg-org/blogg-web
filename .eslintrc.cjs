module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "prettier",
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ["dist", ".eslintrc.cjs", "tailwind.config.js"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "@typescript-eslint"],
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
    },
    settings: {
        react: {
            version: "detect", // Automatically includes the React version
        },
    },
    rules: {
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                checksVoidReturn: false,
            },
        ],
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/no-unsafe-call": "error",
        "@typescript-eslint/no-floating-promises": [
            "error",
            {
                ignoreIIFE: true,
            },
        ],
    },
};
