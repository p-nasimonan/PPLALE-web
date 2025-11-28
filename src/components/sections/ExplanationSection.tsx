'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import Image from 'next/image';
import { Darumadrop_One } from 'next/font/google';

const darumadrop = Darumadrop_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// 解説カード情報
const explanationCards = [
  { 
    title: 'ぷぷりえーるとは', 
    description: 'ぷぷりえの幼女とお菓子のカードゲーム。20枚の幼女カードと10枚のお菓子カードでデッキを構築し対戦します。ぷぷりえポイント(PP)を使用してカードを使って、先に相手のお菓子(HP)を食べた方が勝ちです。',
    img: '/images/fruits/いちご.png' 
  },
  { 
    title: 'ぷぷりえとは', 
    description: 'ロリっ子喫茶ぷぷりえはロリっ子とロリ好きのための交流がメインの店舗型イベント。可愛い声で接客してくれるよ！VRChatで開催されているイベントです。そしてそして！店員さんを使ってたたかえるカードゲームがぷぷりえーるなの！',
    img: 'https://pple.vr2.info/_assets/GI2XJgG18B_DTXqu.webp',
    link: 'https://pple.vr2.info/'
  }
];

// 解説カードアニメーション
const explanationVariants = {
  hidden: { 
    opacity: 0,
    y: 100
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20
    }
  }
};

interface ExplanationSectionProps {
  explanationOpacity: MotionValue<number>;
  explanationY: MotionValue<number>;
}

export default function ExplanationSection({ explanationOpacity, explanationY }: ExplanationSectionProps) {
  return (
    <section className="relative min-h-screen w-full">
      {/* 解説セクションの背景 - チェック柄をリピート */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: 'url("/images/check-pattern.png")',
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px'
        }}
      >
        {/* 背景オーバーレイ */}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>

      <motion.div 
        className="relative z-10 w-full flex items-center justify-center py-20 px-4"
        style={{
          opacity: explanationOpacity,
          y: explanationY
        }}
      >
        <div className="w-full max-w-6xl">
          <motion.h2 
            className={`${darumadrop.className} text-4xl md:text-5xl text-center mb-20 text-white`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              background: 'linear-gradient(to top,rgba(255, 255, 255, 1),rgba(255, 234, 243, 1))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextStroke: '3px pink'
            }}
          >
            ゲームについて
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-10 mt-10">
            {explanationCards.map((card) => (
              <motion.div
                key={card.title}
                className="bg-yellow-200 bg-opacity-90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white border-opacity-20 hover:shadow-2xl transition-all duration-300 hover:scale-105"
                variants={explanationVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex flex-col h-full">
                  <h3 className={`${darumadrop.className} text-2xl md:text-3xl mb-4 text-pink-400`}>
                    {card.title}
                  </h3>
                  
                  <div className="mb-6 flex-grow">
                    <p className="text-black-500 text-lg leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  
                  <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer" onClick={() => card.link && window.open(card.link, '_blank')}>
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                    {card.link && (
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center rounded-xl">
                        <span className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          公式ホームページへ →
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
