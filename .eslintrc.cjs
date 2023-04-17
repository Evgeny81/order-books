module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:prettier/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    settings: {
        react: {
            version: 'detect',
        }
    },
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['prettier', 'react', '@typescript-eslint', 'unused-imports'],
    rules: {
        'prettier/prettier': 'error',
        'unused-imports/no-unused-imports': 'error',
        curly: 'error',
    },
};
