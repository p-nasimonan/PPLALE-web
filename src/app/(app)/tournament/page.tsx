'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Darumadrop_One } from 'next/font/google';
import { css } from 'styled-system/css';
import { button } from 'styled-system/recipes';

const darumadrop = Darumadrop_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const officialTournaments = [
  { title: 'つぼみ杯', description: '初心者向けの大会です。いちごカードのみを使用します。上級者は出禁もしくはハンデになりますので初めてでも勝ちやすい大会です！', fruits: 'いちご', color: css({ bg: 'yellow.100', rounded: '2xl', p: '8' }) },
  { title: 'イチゴ杯', description: 'いちごカードのみを使う大会です。つぼみ杯で出禁になった人も出場できます！', fruits: 'いちご', color: css({ bg: 'red.100', rounded: '2xl', p: '8' }) },
  { title: 'ぶどう杯', description: 'ぶどうカードといちごカードを使う大会です。つぼみ杯より難しいけど初心者も歓迎！', fruits: 'ぶどう・いちご', color: css({ bg: 'purple.100', rounded: '2xl', p: '8' }) },
  { title: 'メロン杯', description: 'めろん・ぶどう・いちごカードを使う大会です。新しく追加されたメロンカードを使って推しの幼女でデッキを組んでみましょう！', fruits: 'めろん・ぶどう・いちご', color: css({ bg: 'green.100', rounded: '2xl', p: '8' }) },
];

const personalTournaments = [
  { title: 'ようかん杯', description: 'このサイトで2Pickゲームを使ってデッキを構築し、そのデッキで対戦する大会です。ランダムな選択肢から自分のデッキを組む独特の楽しさが味わえます。', fruits: 'いちご', color: css({ bg: 'indigo.100', rounded: '2xl', p: '8' }), link: '/deck/2pick?twoCardLimit=false&fruits=いちご' },
];

export default function TournamentPage() {
  return (
    <main className={css({ minH: '100vh', w: 'full', pt: '10', pb: '12', px: '4' })}>
      <div className="container">
        <div className={css({ textAlign: 'center', mb: '12' })}>
          <h1 className={`${darumadrop.className} ${css({ fontSize: '4xl', md: { fontSize: '5xl' }, mb: '4' })}`}>
            大会について
          </h1>
          <p className={css({ fontSize: 'lg', color: 'gray.700' })}>
            レギュレーションの詳細や参加についてはDiscordを確認してください
          </p>
        </div>

        <section className={`main-background ${css({ mb: '16', p: '8', rounded: '2xl', borderWidth: '2px', borderColor: 'blue.300' })}`}>
          <h2 className={`${darumadrop.className} ${css({ fontSize: '2xl', mb: '6', textAlign: 'center', color: 'gray.800' })}`}>
            大会に参加したい方へ
          </h2>
          <p className={css({ textAlign: 'center', color: 'gray.700', mb: '6', fontSize: 'base', lineHeight: 'relaxed' })}>
            大会への参加をご希望の方は、VRChatグループとDiscordサーバーに参加してください。
          </p>

          <div className={css({ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', md: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }, gap: '4' })}>
            <a href="https://discord.com/invite/tjvQHMNgYc" target="_blank" rel="noopener noreferrer"
              className={`${button({ variant: 'primary', size: 'lg' })} ${css({
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3',
              })}`}>
              <Image src="/Discord-Symbol-Black.svg" alt="Discord" width={24} height={24} className={css({ filter: 'invert(1)' })} />
              Discordサーバーに参加
            </a>

            <a href="https://vrchat.com/home/group/grp_866c5ce6-7c41-49ce-9f60-6a1a143d7acf" target="_blank" rel="noopener noreferrer"
              className={`${button({ variant: 'primary', size: 'lg' })} ${css({
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3',
                bg: 'gray.900', _hover: { bg: 'black' },
              })}`}>
              <Image src="/VRChat-Logo-Black.png" alt="VRChat" width={24} height={24} className={css({ filter: 'invert(1)' })} />
              VRChatグループに参加
            </a>
          </div>
        </section>

        <section className={css({ mb: '16' })}>
          <h2 className={`${darumadrop.className} ${css({ fontSize: '3xl', mb: '8', color: 'gray.800' })}`}>公式大会</h2>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '6' })}>
            {officialTournaments.map((tournament) => (
              <div key={tournament.title} className={tournament.color}>
                <div className={css({ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: '4' })}>
                  <h3 className={`${darumadrop.className} ${css({ fontSize: '2xl', color: 'gray.800' })}`}>{tournament.title}</h3>
                  <span className={css({ display: 'inline-block', px: '3', py: '1', bg: 'white', rounded: 'full', fontSize: 'xs', fontWeight: 'bold', color: 'gray.700' })}>{tournament.fruits}</span>
                </div>
                <p className={css({ color: 'gray.700', lineHeight: 'relaxed', fontSize: 'base' })}>{tournament.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={css({ mb: '16' })}>
          <h2 className={`${darumadrop.className} ${css({ fontSize: '3xl', mb: '8', color: 'gray.800' })}`}>個人主催</h2>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '6' })}>
            {personalTournaments.map((tournament) => (
              <div key={tournament.title} className={tournament.color}>
                <div className={css({ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: '4' })}>
                  <h3 className={`${darumadrop.className} ${css({ fontSize: '2xl', color: 'gray.800' })}`}>{tournament.title}</h3>
                  <span className={css({ display: 'inline-block', px: '3', py: '1', bg: 'white', rounded: 'full', fontSize: 'xs', fontWeight: 'bold', color: 'gray.700' })}>{tournament.fruits}</span>
                </div>
                <p className={css({ color: 'gray.700', lineHeight: 'relaxed', fontSize: 'base', mb: '4' })}>{tournament.description}</p>
                <Link href={tournament.link || '#'}>
                  <button className={button({ variant: 'primary', size: 'md' })}>デッキ構築してみる</button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className={`${darumadrop.className} ${css({ fontSize: '3xl', mb: '8', color: 'gray.800' })}`}>その他</h2>
          <div className={css({ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', md: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }, gap: '6' })}>
            <Link href="/build">
              <div className={`main-background ${css({
                p: '6', rounded: 'xl', cursor: 'pointer',
                transitionProperty: 'color, background-color',
              })}`}>
                <h3 className={`${darumadrop.className} ${css({ fontSize: 'xl', mb: '2' })}`}>デッキをつくる</h3>
                <p className={css({ color: 'gray.700', fontSize: 'sm' })}>web上でもデッキを組むことができます</p>
              </div>
            </Link>
            <Link href="/deck-view">
              <div className={`main-background ${css({
                p: '6', rounded: 'xl', cursor: 'pointer',
                transitionProperty: 'color, background-color',
              })}`}>
                <h3 className={`${darumadrop.className} ${css({ fontSize: 'xl', mb: '2' })}`}>デッキのがぞうをつくる</h3>
                <p className={css({ color: 'gray.700', fontSize: 'sm' })}>デッキコードから画像を生成できます</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
