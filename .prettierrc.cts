import { type Config } from "prettier";

const config: Config = {
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 80,
  singleQuote: true,
  jsxSingleQuote: true,
  htmlWhitespaceSensitivity: "css",
  endOfLine: "lf",
  bracketSpacing: true,
  arrowParens: "always",
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  tailwindFunctions: ["tv"],
  importOrder: ["<THIRD_PARTY_MODULES>", "^@/.*$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = config;
