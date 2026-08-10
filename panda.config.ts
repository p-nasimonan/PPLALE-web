import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Tailwindのbase相当はglobals.cssに静的移植済みのため、Pandaの独自リセットは無効化
  preflight: false,

  // Where to look for your css declarations
  include: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],

  // Files to exclude
  exclude: [],

  // atomicクラス名はハッシュ化して転送量を削減。CSS変数名はglobals.cssから`var(--colors-xxx)`として
  // 直接参照するため可読性を保つ（ハッシュ化しない）
  hash: { cssVar: false, className: true },

  // ダークモードはdocument.documentElementへの`.dark`クラス付与方式（DarkModeProvider.tsx）。
  // Pandaの`_dark`条件のデフォルト値`.dark &`がそのまま一致するため、conditionsのカスタム設定は不要。

  theme: {
    extend: {
      tokens: {
        colors: {
          'primary-color': { value: '#3b82f6' },
          'primary-hover': { value: '#2563eb' },
          'secondary-color': { value: '#10b981' },
          'secondary-hover': { value: '#059669' },
          'danger-color': { value: '#ef4444' },
          'danger-hover': { value: '#dc2626' },
          special: { value: '#3ec6c4' },
          'special-hover': { value: '#0f8c8c' },
          'yojo-deck-text-color': { value: '#800000' },
          'sweet-deck-text-color': { value: '#008080' },
          'playable-deck-text-color': { value: '#000080' },
        },
        radii: {
          'border-radius': { value: '0.5rem' },
        },
        // アニメーション用keyframes(.transform-slide, .animate-disappear)は
        // recipe化せずglobals.cssにプレーンCSSとして残すため、Pandaトークンとしては定義しない
      },

      semanticTokens: {
        colors: {
          'background-color': { value: { base: '#f3f4f6', _dark: '#1f2937' } },
          'hover-back-color': { value: { base: '#9e9e9e', _dark: '#6e6e6e' } },
          'hover-back-color-light': { value: { base: '#e2e2e2', _dark: '#9e9e9e' } },
          'card-background': { value: { base: '#ffffff', _dark: '#374151' } },
          'text-color': { value: { base: '#1f2937', _dark: '#f3f4f6' } },
          'text-light': { value: { base: '#6b7280', _dark: '#9ca3af' } },
          // :root.darkのみに定義され、ライトモードでは未定義値だった変数。挙動を維持するためbaseはtransparentにする
          'background-light': { value: { base: 'transparent', _dark: '#1f2937' } },
          'revers-background-color': { value: { base: '#1f2937', _dark: '#f3f4f6' } },
          'revers-text-color': { value: { base: '#f3f4f6', _dark: '#1f2937' } },
          'deck-background-color': { value: { base: '#c3c3c3', _dark: '#515151' } },
          'deck-text-color': { value: { base: '#1f2937', _dark: '#dddddd' } },
          'yojo-deck-background-color': { value: { base: '#f8d9d9', _dark: '#e09898' } },
          'yojo-deck-border-color': { value: { base: '#e0b0b0', _dark: '#c09090' } },
          'sweet-deck-background-color': { value: { base: '#d9f6f8', _dark: '#98b7e0' } },
          'sweet-deck-border-color': { value: { base: '#90e0e0', _dark: '#9090c0' } },
          'playable-deck-background-color': { value: { base: '#d9d9f8', _dark: '#9898e0' } },
          'playable-deck-border-color': { value: { base: '#9090e0', _dark: '#9090c0' } },
        },
        shadows: {
          shadow: {
            value: {
              base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              _dark: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.4)',
            },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
