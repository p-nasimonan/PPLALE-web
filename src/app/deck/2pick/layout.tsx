import { css } from 'styled-system/css';

export default function DeckLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
          <header className={css({ position: 'fixed', top: '0', left: '0', right: '0', h: '16', zIndex: '40' })}>
        <div className={css({ maxW: '1536px', mx: 'auto', px: '4', h: 'full', display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
          <div className={css({ display: 'flex', alignItems: 'center', gap: '4', truncate: true })}>
            <p className={css({ fontSize: 'xl', fontWeight: 'bold', truncate: true })}>2Pick構築</p>
          </div>
        </div>
      </header>
      <main className={css({ pt: '20', px: '2' })}>
        {children}
      </main>
    </>
  );
}
