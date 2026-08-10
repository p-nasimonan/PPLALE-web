import Link from 'next/link';
import SettingsButton from '@/components/SideMenu';
import FireBaseLogin from '@/components/FireBaseLogin';
import { css } from 'styled-system/css';

export default function DeckLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className={css({
        position: 'fixed', top: '0', left: '0', right: '0', h: '16', zIndex: '40',
        bg: { base: 'white/90', _dark: 'gray.900/90' },
        backdropBlur: 'md',
        borderBottomWidth: '1px',
        borderColor: { base: 'gray.200', _dark: 'gray.700' },
      })}>
        <div className={css({ maxW: 'breakpoint-2xl', mx: 'auto', px: '4', h: 'full', display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
          <div className={css({ display: 'flex', alignItems: 'center', gap: '4', minW: '0' })}>
            <Link className={css({ fontSize: 'xl', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })} href="/build">
              ぷぷりえーる デッキ構築
            </Link>
          </div>
          <div className={css({ display: 'flex', alignItems: 'center', gap: '3', flexShrink: '0' })}>
            <SettingsButton />
            <FireBaseLogin />
          </div>
        </div>
      </header>
      <main className={css({ pt: '16', px: '4' })}>
        {children}
      </main>
    </>
  );
}
