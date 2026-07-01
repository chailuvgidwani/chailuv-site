import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // The ported design-system components use `any` deliberately for their
      // polymorphic `as` props and pass-through prop spreads. Keep it visible
      // as a warning rather than failing the build.
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
