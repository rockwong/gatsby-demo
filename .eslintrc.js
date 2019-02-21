module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  extends: ["airbnb", "prettier", "plugin:compat/recommended"],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true
  },
  globals: {
    APP_TYPE: true,
    page: true
  },
  rules: {
    "no-return-assign": 0,
    "react/no-array-index-key": 0,
    "react/no-multi-comp": 0,
    "react/prefer-stateless-function": 0,
    "react/button-has-type": 0,
    "react/no-access-state-in-setstate": 0,
    "no-else-return": 0,
    "prefer-destructuring": 0,
    "import/prefer-default-export": 0,
    "no-irregular-whitespace": [1, { skipComments: true }],
    "no-underscore-dangle": 0,
    "react/destructuring-assignment": 0,
    "global-require": 0,
    "react/jsx-filename-extension": [1, { extensions: [".js"] }],
    "react/jsx-wrap-multilines": 0,
    "react/prop-types": 0,
    "react/forbid-prop-types": 0,
    "react/jsx-one-expression-per-line": 0,
    "import/no-unresolved": [
      2,
      {
        ignore: [
          "^@/",
          "^umi/",
          "^assets",
          "^components",
          "^models",
          "^pages",
          "^layouts",
          "^services",
          "^utils"
        ]
      }
    ],
    "import/no-extraneous-dependencies": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "linebreak-style": 0
  },
  settings: {
    polyfills: ["fetch", "promises", "url"],
    "import/resolver": {
      node: true,
      "eslint-import-resolver-typescript": true
    }
  }
};
