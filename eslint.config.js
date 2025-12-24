import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'

// Resolve plugin configs safely for ESLint v9 Flat Config
const reactHooksConfig =
  reactHooks?.configs?.flat?.recommended ?? reactHooks?.configs?.recommended ?? null

const reactRefreshConfig =
  reactRefresh?.configs?.vite ?? reactRefresh?.configs?.recommended ?? null

export default [
  // Ignore build output
  globalIgnores(['dist']),

  // Base JavaScript recommended rules
  js.configs.recommended,

  // React Hooks rules (flat if available)
  ...(reactHooksConfig ? [reactHooksConfig] : []),

  // React Refresh (Vite) rules
  ...(reactRefreshConfig ? [reactRefreshConfig] : []),

  // Project-specific rules
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
]
