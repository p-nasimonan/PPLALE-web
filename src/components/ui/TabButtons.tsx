'use client';

import React from 'react';
import { css } from 'styled-system/css';

/**
 * @JSDoc
 * @description タブボタンのタブ定義
 * @property {string} key - タブの一意なキー
 * @property {string} label - タブに表示されるラベル
 */
export interface TabDefinition {
  key: string;
  label: string;
}

/**
 * @JSDoc
 * @description TabButtonsコンポーネントのProps
 * @property {TabDefinition[]} tabs - 表示するタブの定義配列
 * @property {string} activeTabKey - 現在アクティブなタブのキー
 * @property {(tabKey: string) => void} onTabClick - タブがクリックされたときのコールバック関数
 * @property {'default' | 'cardList'} [variant='default'] - タブのスタイルバリアント
 */
interface TabButtonsProps {
  tabs: TabDefinition[];
  activeTabKey: string;
  onTabClick: (tabKey: string) => void;
  variant?: 'default' | 'cardList';
}

/**
 * @JSDoc
 * @description 汎用的なタブボタンコンポーネント
 * @param {TabButtonsProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} タブボタンコンポーネント
 */
const TabButtons: React.FC<TabButtonsProps> = ({
  tabs,
  activeTabKey,
  onTabClick,
  variant = 'default',
}) => {

  const getButtonColor = (tabKey: string) => {
    if (tabKey === 'yojo') {
      return css({
        bg: 'rose.200',
        color: 'rose.900',
        borderColor: 'rose.300',
        _dark: { bg: 'rose.900/40', color: 'rose.100', borderColor: 'rose.700' },
      });
    } else if (tabKey === 'sweet') {
      return css({
        bg: 'cyan.200',
        color: 'cyan.900',
        borderColor: 'cyan.300',
        _dark: { bg: 'cyan.900/40', color: 'cyan.100', borderColor: 'cyan.700' },
      });
    } else if (tabKey === 'playable') {
      return css({
        bg: 'indigo.200',
        color: 'indigo.900',
        borderColor: 'indigo.300',
        _dark: { bg: 'indigo.900/40', color: 'indigo.100', borderColor: 'indigo.700' },
      });
    }
    return css({
      bg: 'gray.200',
      color: 'gray.900',
      borderColor: 'gray.300',
      _dark: { bg: 'gray.700', color: 'gray.100', borderColor: 'gray.600' },
    });
  };

  const getButtonClassName = (tabKey: string) => {
    const isActive = tabKey === activeTabKey;
    if (variant === 'cardList') {
      const base = css({
        roundedTop: 'md',
        borderWidth: '2px',
        px: '4',
        py: '2',
        fontSize: 'sm',
        fontWeight: 'medium',
        transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
      });
      return isActive
        ? `${base} ${css({ borderBottomColor: 'transparent' })} ${getButtonColor(tabKey)}`
        : `${base} ${css({
            borderColor: 'transparent',
            bg: 'transparent',
            color: 'gray.500',
            _hover: { color: 'gray.700' },
            _dark: { color: 'gray.400', _hover: { color: 'gray.200' } },
          })}`;
    }
    // default variant (DeckList用)
    const base = css({ rounded: 'sm', px: '4', py: '2' });
    return isActive
      ? `${base} ${css({ bg: 'blue.500', color: 'white' })}`
      : `${base} ${css({
          color: 'gray.700',
          _hover: { bg: 'gray.100' },
          _dark: { color: 'gray.300', _hover: { bg: 'gray.800' } },
        })}`;
  };


  return (
    <div className={css({ display: 'flex' })}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabClick(tab.key)}
          className={getButtonClassName(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabButtons; 