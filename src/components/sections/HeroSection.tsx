'use client';

import React, { useState } from 'react';
import { motion, MotionValue } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Darumadrop_One } from 'next/font/google';

const darumadrop = Darumadrop_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const cardButtons = [
  { title: 'たいかいについて', href: '/tournament', img: '/images/back-card.webp' },
  { title: 'デッキをつくる', href: '/build', img: '/images/back-card.webp' },
  { title: 'デッキのがぞうをつくる', href: '/deck-view', img: '/images/back-card.webp' },
];

// アニメーション設定
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.6,
    }
  }
};

const cardVariants = {
  hidden: {
    y: -400,
    opacity: 0.1,
    rotateY: 100,
    rotateX: 90,
    scale: 0.8
  },
  visible: {
    y: 0,
    opacity: 1,
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 70,
      damping: 20,
      duration: 0.7
    }
  }
};

interface HeroSectionProps {
  cardsYPosition: MotionValue<string>;
  isMounted: boolean;
}

export default function HeroSection({ cardsYPosition, isMounted }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, cardButtons.length - 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="relative h-screen">
      {/* タイトル部分の背景画像 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/top.jpg")' }}
      >
        {/* 背景オーバーレイ */}
        <div className="absolute inset-0"></div>
      </div>

      {/* タイトルコンテナ */}
      <div className="relative z-10">
        <motion.div
          className="w-full text-center pt-20 md:pt-28 lg:pt-32"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Image src="/pupu_game.webp" alt="ぷぷりえーる" width={500} height={281} className="absolute left-0 right-0 mx-auto top-1/2" priority />
        </motion.div>

        {/* カードボタンコンテナ - 絶対位置で画面外下部に配置 */}
        <motion.div
          className="absolute left-0 right-0 bottom-0 z-20 flex justify-start md:justify-center"
          style={{
            top: cardsYPosition
          }}
        >
          {/* 左右の矢印 (スマホのみ) */}
          <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center z-30 md:hidden pointer-events-none px-2" style={{ top: '-10vh' }}>
            <button
              className={`p-3 bg-black/30 rounded-full backdrop-blur-sm transition-all ${activeIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto hover:bg-black/50 hover:scale-110'}`}
              onClick={handlePrev}
              disabled={activeIndex === -1}
              aria-label="前のカード"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-8 h-8 text-white drop-shadow-md">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className={`p-3 bg-black/30 rounded-full backdrop-blur-sm transition-all ${activeIndex === cardButtons.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto hover:bg-black/50 hover:scale-110'}`}
              onClick={handleNext}
              disabled={activeIndex === cardButtons.length - 1}
              aria-label="次のカード"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-8 h-8 text-white drop-shadow-md">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <motion.div
            className="flex md:flex-wrap justify-start md:justify-center md:gap-8 lg:gap-10 transition-transform duration-500 ease-out md:!transform-none"
            style={{ transform: `translateX(-${activeIndex * 100}vw)` }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cardButtons.map((btn, idx) => (
              <div key={btn.title} className="w-[100vw] flex-shrink-0 flex justify-center md:w-auto md:flex-shrink">
                <motion.div
                  variants={cardVariants}
                  custom={idx}
                  whileHover={{
                    transition: { duration: 0.2, ease: "easeOut" },
                    y: -100
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative mb-1"
                >
                  <Link href={btn.href} className="block">
                    <div
                      className="relative"
                      style={{
                        width: 'calc(280px + 1vw)',
                        maxWidth: '320px',
                        aspectRatio: '220/320'
                      }}
                    >
                      {/* タイトルを画像の上に重ねる */}
                      <div
                        className={`${darumadrop.className} absolute inset-0 z-10 flex items-center justify-center 
                        bg-black bg-opacity-25 rounded-2xl font-bold text-xl sm:text-2xl text-white shadow-lg
                        p-4 text-center transition-all ${activeIndex === idx ? 'scale-100' : 'scale-95 md:scale-100'}`}
                      >
                        {btn.title}
                      </div>
                      <Image
                        src={btn.img}
                        alt={btn.title}
                        fill
                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 45vw, 320px"
                        style={{
                          objectFit: 'cover',
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
                        }}
                        priority={idx === 0}
                      />
                    </div>
                  </Link>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
