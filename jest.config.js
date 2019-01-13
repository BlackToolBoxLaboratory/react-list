const jest_config = {
  "moduleFileExtensions": [
    "js"
  ],
  "transform": {
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest"
  },
  "moduleNameMapper": {
    "@/(.*)$": "<rootDir>/module/$1"
  },
  "collectCoverage": true,
  "coverageDirectory": "__reports__",
  "coverageReporters": [
    "lcov",
    "text"
  ]
};

module.exports = jest_config;
