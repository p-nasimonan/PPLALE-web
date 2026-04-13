'use client';

import React from 'react';

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
      return 'bg-rose-200 text-rose-900 border-rose-300 dark:bg-rose-900/40 dark:text-rose-100 dark:border-rose-700';
    } else if (tabKey === 'sweet') {
      return 'bg-cyan-200 text-cyan-900 border-cyan-300 dark:bg-cyan-900/40 dark:text-cyan-100 dark:border-cyan-700';
    } else if (tabKey === 'playable') {
      return 'bg-indigo-200 text-indigo-900 border-indigo-300 dark:bg-indigo-900/40 dark:text-indigo-100 dark:border-indigo-700';
    }
    return 'bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600';
  };

  const getButtonClassName = (tabKey: string) => {
    const isActive = tabKey === activeTabKey;
    if (variant === 'cardList') {
      return `rounded-t-md border-2 px-4 py-2 text-sm font-medium transition-colors 
              ${isActive 
                ? `border-b-transparent ${getButtonColor(tabKey)}` 
                : `border-transparent bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200`}
              `;
    }
    // default variant (DeckList用)
    return `rounded px-4 py-2 ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`;
  };


  return (
    <div className={`flex `}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabClick(tab.key)}
          className={`${getButtonClassName(tab.key)} `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabButtons; 