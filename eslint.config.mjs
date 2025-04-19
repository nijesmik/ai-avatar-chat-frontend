import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    languageOptions: {
      parser: tsParser,
    },
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.plugins("@typescript-eslint", "simple-import-sort"),

  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", {}],
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxEOF: 1,
          maxBOF: 0,
        },
      ],
      "object-shorthand": ["error", "always"],
      "react-hooks/exhaustive-deps": "off",
      "simple-import-sort/exports": "warn",
    },
  },
];

export default eslintConfig;
