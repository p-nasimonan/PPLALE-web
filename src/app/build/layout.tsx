import Link from 'next/link';
import SettingsButton from '@/components/SideMenu';
import FireBaseLogin from '@/components/FireBaseLogin';
import { css } from 'styled-system/css';

export default function BuildLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className={css({ position: 'fixed', top: '0', left: '0', right: '0', h: '16', zIndex: '40' })}>
        <div className={css({ maxW: 'breakpoint-2xl', mx: 'auto', px: '4', h: 'full', display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
          <div className={css({ display: 'flex', alignItems: 'center', gap: '4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })}>
            <Link className={css({ fontSize: 'xl', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })} href="/">ぷぷりえーる デッキ構築</Link>
          </div>
          <div className={css({ display: 'flex', alignItems: 'center', gap: '4' })}>
            <SettingsButton />
            <FireBaseLogin />
          </div>
        </div>
      </header>
      <main className={css({ pt: '20', px: '2' })}>
        {children}
      </main>
    </>
  );
}
