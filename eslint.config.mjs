import { defineConfig } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import security from "eslint-plugin-security";
import node from "eslint-plugin-node";
import sonarjs from "eslint-plugin-sonarjs";
import _import from "eslint-plugin-import";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:security/recommended",
        "plugin:node/recommended",
        "plugin:sonarjs/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
    )),

    plugins: {
        security: fixupPluginRules(security),
        node: fixupPluginRules(node),
        sonarjs: fixupPluginRules(sonarjs),
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },
    },

    rules: {
        "no-console": "warn",

        "no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
        }],

        "no-magic-numbers": ["warn", {
            ignore: [0, 1],
        }],

        eqeqeq: ["error", "always"],
        curly: "error",
        "consistent-return": "warn",
        "security/detect-unsafe-regex": "error",
        "security/detect-possible-timing-attacks": "warn",
        "security/detect-non-literal-regexp": "error",
        "security/detect-unsafe-buffer-constructor": "error",
        "security/detect-hardcoded-credentials": "warn",
        "sonarjs/no-identical-functions": "warn",
        "sonarjs/cognitive-complexity": ["warn", 15],
        "import/no-unresolved": "error",
    },
}]);