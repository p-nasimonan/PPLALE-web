'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Darumadrop_One } from 'next/font/google';

const darumadrop = Darumadrop_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// 公式大会
const officialTournaments = [
  {
    title: 'つぼみ杯',
    description: '初心者向けの大会です。いちごカードのみを使用します。上級者は出禁もしくはハンデになりますので初めてでも勝ちやすい大会です！',
    fruits: 'いちご',
    color: 'bg-yellow-100'
  },
  {
    title: 'イチゴ杯',
    description: 'いちごカードのみを使う大会です。つぼみ杯で出禁になった人も出場できます！',
    fruits: 'いちご',
    color: 'bg-red-100'
  },
  {
    title: 'ぶどう杯',
    description: 'ぶどうカードといちごカードを使う大会です。つぼみ杯より難しいけど初心者も歓迎！',
    fruits: 'ぶどう・いちご',
    color: 'bg-purple-100'
  },
  {
    title: 'メロン杯',
    description: 'めろん・ぶどう・いちごカードを使う大会です。新しく追加されたメロンカードを使って推しの幼女でデッキを組んでみましょう！',
    fruits: 'めろん・ぶどう・いちご',
    color: 'bg-green-100'
  }
];

// 個人主催の大会
const personalTournaments = [
  {
    title: 'ようかん杯',
    description: 'このサイトで2Pickゲームを使ってデッキを構築し、そのデッキで対戦する大会です。ランダムな選択肢から自分のデッキを組む独特の楽しさが味わえます。',
    fruits: 'いちご',
    color: 'bg-indigo-100',
    link: '/deck/2pick?twoCardLimit=false&fruits=いちご'
  }
];

export default function TournamentPage() {
  return (
    <main className="min-h-screen w-full py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* ページタイトル */}
        <div className="text-center mb-12">
          <h1 className={`${darumadrop.className} text-4xl md:text-5xl mb-4`}>
            大会について
          </h1>
          <p className="text-lg text-gray-700">
            レギュレーションの詳細や参加についてはDiscordを確認してください
          </p>
        </div>

        {/* 参加案内セクション */}
        <section className="mb-16 main-background p-8 rounded-2xl shadow-lg border-2 border-blue-300">
          <h2 className={`${darumadrop.className} text-2xl mb-6 text-center text-gray-800`}>
            大会に参加したい方へ
          </h2>
          
          <p className="text-center text-gray-700 mb-6 text-base leading-relaxed">
            大会への参加をご希望の方は、VRChatグループとDiscordサーバーに参加してください。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://discord.com/invite/tjvQHMNgYc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
            >
              <Image
                src="/Discord-Symbol-Black.svg"
                alt="Discord"
                width={24}
                height={24}
                className="invert"
              />
              Discordサーバーに参加
            </a>
            
            <a
              href="https://vrchat.com/home/group/grp_866c5ce6-7c41-49ce-9f60-6a1a143d7acf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
            >
              <Image
                src="/VRChat-Logo-Black.png"
                alt="VRChat"
                width={24}
                height={24}
                className="invert"
              />
              VRChatグループに参加
            </a>
          </div>
        </section>

        {/* 開催中の大会 */}
        <section className="mb-16">
          <h2 className={`${darumadrop.className} text-3xl mb-8 text-gray-800`}>
            公式大会
          </h2>
          
          <div className="space-y-6">
            {officialTournaments.map((tournament) => (
              <div
                key={tournament.title}
                className={`${tournament.color} rounded-2xl p-8 shadow-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className={`${darumadrop.className} text-2xl text-gray-800`}>
                    {tournament.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-700">
                    {tournament.fruits}
                  </span>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-base">
                  {tournament.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 個人主催の大会 */}
        <section className="mb-16">
          <h2 className={`${darumadrop.className} text-3xl mb-8 text-gray-800`}>
            個人主催
          </h2>
          
          <div className="space-y-6">
            {personalTournaments.map((tournament) => (
              <div
                key={tournament.title}
                className={`${tournament.color} rounded-2xl p-8 shadow-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className={`${darumadrop.className} text-2xl text-gray-800`}>
                    {tournament.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-700">
                    {tournament.fruits}
                  </span>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  {tournament.description}
                </p>

                <Link href={tournament.link || '#'}>
                  <button className="btn-primary px-6 py-2 rounded-lg font-bold transition-all duration-200 hover:scale-105">
                    デッキ構築してみる
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* その他のリンク */}
        <section>
          <h2 className={`${darumadrop.className} text-3xl mb-8 text-gray-800`}>
            その他
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/build">
              <div className="main-background p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
                <h3 className={`${darumadrop.className} text-xl mb-2`}>
                  デッキをつくる
                </h3>
                <p className="text-gray-700 text-sm">
                  web上でもデッキを組むことができます
                </p>
              </div>
            </Link>

            <Link href="/deck-view">
              <div className="main-background p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
                <h3 className={`${darumadrop.className} text-xl mb-2`}>
                  デッキのがぞうをつくる
                </h3>
                <p className="text-gray-700 text-sm">
                  デッキコードから画像を生成できます
                </p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
