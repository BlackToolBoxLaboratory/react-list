module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true,
    "amd": true,
    "jest": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-console":                 ["warn"],
    "no-unused-vars":             ["warn"],

    "react/jsx-uses-react":       ["error"],
    "react/jsx-uses-vars":        ["error"],
    "indent":                     ["error", 2],
    "linebreak-style":            ["error", "unix"],
    "semi":                       ["error", "always"],
    "semi-spacing":               ["error", { "before": false, "after": true}],
    "semi-style":                 ["error", "last"],
    "comma-spacing":              ["error", { "before": false, "after": true }],
    "space-before-blocks":        ["error", "always"],
    "arrow-spacing":              ["error", { "before": true, "after": true }],
    "no-multiple-empty-lines":    ["error", { "max": 1 }],
    "no-multi-assign":            ["error"],
    "padded-blocks":              ["error", "never"],
    "func-call-spacing":          ["error", "never"],
    "key-spacing":                ["error", { "beforeColon": true, "afterColon":true,  "mode": "minimum", "align": { "beforeColon": true, "afterColon": true, "on": "colon"}}],
    "keyword-spacing":            ["error", { "before": true, "after": true}],
    "switch-colon-spacing":       ["error", { "before": false, "after": true}],
    "template-tag-spacing":       ["error", "always"],
    "template-curly-spacing":     ["error", "never"],
    "arrow-spacing":              ["error", { "before": true, "after": true }],
    "generator-star-spacing":     ["error", { "before": true, "after": true}],
    "rest-spread-spacing":        ["error", "never"],
    "prefer-template":            ["error"],
    "wrap-iife":                  ["error", "inside"],
    "no-unreachable":             ["error"]
  }
};
