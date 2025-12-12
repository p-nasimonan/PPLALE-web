import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import path from 'path'
import { fileURLToPath } from 'url'
import security from 'eslint-plugin-security'
import unicorn from 'eslint-plugin-unicorn'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  js.configs.recommended,
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
  ),
  {
    plugins: {
      security,
      unicorn,
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      // Security ルール
      'security/detect-object-injection': 'off', // Dynamic object access is necessary for card data management
      'security/detect-non-literal-regexp': 'warn',

      // Unicorn ルール
      'unicorn/better-regex': 'warn',
      'unicorn/consistent-destructuring': 'warn',
      'unicorn/no-array-push-push': 'error',
      'unicorn/no-console-spaces': 'warn',
      'unicorn/no-for-loop': 'warn',
      'unicorn/prefer-includes': 'warn',
      'unicorn/prefer-string-starts-ends-with': 'warn',

      // React ルール
      'react/no-unescaped-entities': 'warn',
      'react/react-in-jsx-scope': 'off', // Next.jsでは不要
      'react/prop-types': 'off', // TypeScriptを使用しているため

      // React Hooks ルール
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['src/app/api/og/**/*.tsx'],
    rules: {
      '@next/next/no-img-element': 'off', // OG image generation requires HTML strings
    },
  },
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'node_modules/**',
    ],
  },
]

export default eslintConfig