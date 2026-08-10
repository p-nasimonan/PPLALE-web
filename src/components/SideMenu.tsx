'use client';

import React, { useRef, useEffect } from 'react';
import { useSettings } from '@/app/SideMenuProvider';
import { useDarkMode } from '@/app/DarkModeProvider';
import { usePathname } from 'next/navigation';
import { css } from 'styled-system/css';
import { button, iconButton } from 'styled-system/recipes';

export default function SettingsButton() {
  const { 
    showSettings, 
    setShowSettings,
    isTwoCardLimit,
    setIsTwoCardLimit
  } = useSettings();
  const { themeMode, setThemeMode } = useDarkMode();
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
    <div className={css({ position: 'relative' })} ref={menuRef}>
      <button
        className={iconButton({ variant: 'ghost', size: 'xl' })}
        onClick={() => setShowSettings(!showSettings)}
        aria-label="メニュー"
      >
        {showSettings ? '✕' : '☰'}
      </button>
      {showSettings && (
        <div
          className={css({
            position: 'absolute',
            right: '0',
            zIndex: '50',
            mt: '2',
            w: '56',
            rounded: 'lg',
            borderWidth: '1px',
            borderColor: 'gray.200',
            bg: 'white',
            p: '4',
            color: 'gray.900',
            boxShadow: 'lg',
            _dark: { borderColor: 'gray.700', bg: 'gray.800', color: 'gray.100' },
          })}
        >
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '4' })}>
            {/* テーマ設定 */}
            <div className={css({ display: 'flex', flexDirection: 'column', gap: '2' })}>
              <p className={css({ fontSize: 'sm', fontWeight: 'medium' })}>テーマ</p>
              <div
                className={css({
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1',
                  rounded: 'lg',
                  borderWidth: '1px',
                  borderColor: 'gray.200',
                  bg: 'gray.50',
                  p: '1',
                  _dark: { borderColor: 'gray.700', bg: 'gray.900' },
                })}
              >
                {[
                  { key: 'system', label: 'System' },
                  { key: 'light', label: 'Light' },
                  { key: 'dark', label: 'Dark' },
                ].map((mode) => {
                  const isActive = themeMode === mode.key;
                  return (
                    <button
                      key={mode.key}
                      onClick={() => setThemeMode(mode.key as 'system' | 'light' | 'dark')}
                      className={isActive
                        ? button({ variant: 'primary', size: 'sm' })
                        : button({ variant: 'ghost', size: 'sm' })
                      }
                      aria-pressed={isActive}
                    >
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2枚制限設定 */}
            <div className={css({ display: 'flex', alignItems: 'center', gap: '2' })}>
              <input
                type="checkbox"
                id="twoCardLimit"
                checked={isTwoCardLimit}
                onChange={(e) => setIsTwoCardLimit(e.target.checked)}
                className={css({ h: '4', w: '4', color: 'blue.600' })}
              />
              <label htmlFor="twoCardLimit" className={css({ fontSize: 'sm' })}>
                2枚制限
              </label>
            </div>
            <p className={css({ fontSize: 'xs', color: 'gray.600', _dark: { color: 'gray.300' } })}>
              {isTwoCardLimit ? "同じカードは最大2枚まで" : "同じカードを何枚でも追加可能"}
            </p>

            {/* エクスポート/インポートボタン */}
            {!is2PickPage && !isMainPage ?(
            <div className={css({ display: 'flex', flexDirection: 'column', gap: '2' })}>
              <button
                className={button({ variant: 'primary', size: 'md' })}
                onClick={() => window.dispatchEvent(new CustomEvent('exportDeck'))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={css({ w: '5', h: '5' })}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span>エクスポート</span>
              </button>
              <button
                className={button({ variant: 'secondary', size: 'md' })}
                onClick={() => window.dispatchEvent(new CustomEvent('importDeck'))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={css({ w: '5', h: '5' })}>
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
