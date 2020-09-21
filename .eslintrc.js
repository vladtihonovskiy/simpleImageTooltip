module.exports = {
  root: true,

  extends: [
    "@react-native-community",
    "airbnb-typescript",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  parserOptions: {
    createDefaultProgram: true,
    project: "./tsconfig.json",

    tsconfigRootDir: __dirname,
  },
  rules: {
    "import/prefer-default-export": 0,
    "react/prop-types": 0
  },
};
