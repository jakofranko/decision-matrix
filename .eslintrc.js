module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "globals": {
        "module": "readonly",
        "require": "readonly",
        "process": "readonly",
        "__dirname": "readonly"
    },
    "rules": {
        "no-console": "warn"
    }
}
