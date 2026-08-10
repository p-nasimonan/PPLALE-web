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
          <p className={css({ fontSize: '2xl', fontWeight: 'bold' })}>2Pick構築</p>
        </div>
      </header>
      <main className={css({ pt: '16', px: '4' })}>
        {children}
      </main>
    </>
  );
}
