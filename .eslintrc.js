module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module",
    },
    "plugins": [
        "react",
        "react-native",
        "@typescript-eslint"
    ],
    "settings": {
        "react": {
            "version": "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
    "rules": {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/camelcase": ["error", { "properties": "never" }],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "prettier/prettier": ["error"]
    }
};