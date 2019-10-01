module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends":  ["eslint:recommended",
    "plugin:react/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "import/no-unresolved": [2, { "ignore": ["^[~$#]"] }],
        "import/no-named-as-default": [0],
        "react/jsx-sort-props": [0],
        "no-confusing-arrow": "off"
    }
};
