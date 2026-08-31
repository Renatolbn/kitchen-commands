import globals from "globals";

export default [
  {
    files: ["**/*.js"],

    ignores: [
      "node_modules/**",
      "coverage/**",
      "dist/**",
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },

    rules: {
      // Variáveis
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Console.log
      "no-console": "off",

      // Ponto e vírgula
      "semi": ["error", "always"],

      // Aspas
      "quotes": ["error", "double"],

      // Chaves
      "curly": ["error", "all"],

      // Igualdade
      "eqeqeq": ["error", "always"],

      // Evita var
      "no-var": "error",

      // Prefere const quando possível
      "prefer-const": "error",

      // Espaços
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],

      // Funções
      "arrow-spacing": ["error", { before: true, after: true }],

      // Linhas muito longas
      "max-len": [
        "warn",
        {
          code: 100,
          ignoreUrls: true,
          ignoreStrings: true,
        },
      ],
    },
  },
];