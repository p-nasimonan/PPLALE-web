'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SettingsButton from '@/components/ui/SideMenu';
import FireBaseLogin from '@/components/ui/FireBaseLogin';
import { css } from 'styled-system/css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const is2Pick = pathname === '/deck/2pick';

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
            {is2Pick ? (
              <p className={css({ fontSize: '2xl', fontWeight: 'bold' })}>2Pick構築</p>
            ) : (
              <Link className={css({ fontSize: 'xl', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })} href="/">
                ぷぷりえーる デッキ構築
              </Link>
            )}
          </div>
          <div className={css({ display: 'flex', alignItems: 'center', gap: '3', flexShrink: '0' })}>
            <SettingsButton />
            <FireBaseLogin />
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
    </>
  );
}
