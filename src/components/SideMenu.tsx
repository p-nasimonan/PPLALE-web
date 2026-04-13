'use client';

import React, { useRef, useEffect } from 'react';
import { useSettings } from '@/app/SideMenuProvider';
import { useDarkMode } from '@/app/DarkModeProvider';
import { usePathname } from 'next/navigation';

export default function SettingsButton() {
  const { 
    showSettings, 
    setShowSettings,
    isTwoCardLimit,
    setIsTwoCardLimit
  } = useSettings();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const pathname = usePathname();
  const isMainPage = pathname === '/';
  const is2PickPage = pathname === '/deck/2pick';
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings, setShowSettings]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="rounded-md border border-gray-300 bg-white px-3 py-1 text-2xl text-gray-800 shadow-sm transition-transform duration-200 hover:scale-110 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        onClick={() => setShowSettings(!showSettings)}
        aria-label="メニュー"
      >
        {showSettings ? '✕' : '☰'}
      </button>
      {showSettings && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-4 text-gray-900 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
          <div className="space-y-4">
            {/* ダークモード設定 */}
            <div className="flex items-center justify-between">
              <button
                onClick={toggleDarkMode}
                className="rounded-lg border border-gray-300 px-3 py-1 text-lg transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>

            {/* 2枚制限設定 */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="twoCardLimit"
                checked={isTwoCardLimit}
                onChange={(e) => setIsTwoCardLimit(e.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <label htmlFor="twoCardLimit" className="text-sm">
                2枚制限
              </label>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {isTwoCardLimit ? "同じカードは最大2枚まで" : "同じカードを何枚でも追加可能"}
            </p>

            {/* エクスポート/インポートボタン */}
            {!is2PickPage && !isMainPage ?(
            <div className="flex flex-col gap-2">
              <button
                className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-blue-700"
                onClick={() => window.dispatchEvent(new CustomEvent('exportDeck'))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span>エクスポート</span>
              </button>
              <button
                className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-emerald-700"
                onClick={() => window.dispatchEvent(new CustomEvent('importDeck'))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                <span>インポート</span>
              </button>
          </div>
            ): is2PickPage ? (
          <></>
          ) : null}
          </div>
        </div>
      )}
    </div>
  );
} 