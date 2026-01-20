'use client';

import React from 'react';
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
  { title: '大会について', href: '/tournament', img: '/images/back-card.webp' },
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
          className="w-full text-center pt-16 md:pt-24 lg:pt-28"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Image src="/pupu_game.webp" alt="ぷぷりえーる" width={500} height={281} className="absolute left-0 right-0 mx-auto top-1/2" priority/>
        </motion.div>

        {/* カードボタンコンテナ - 絶対位置で画面外下部に配置 */}
        {isMounted && (
          <motion.div 
            className="absolute left-0 right-0 bottom-0 z-20 flex justify-center px-3"
            style={{ 
              top: cardsYPosition
            }}
          >
            <motion.div 
              className="flex flex-wrap justify-center gap-5 md:gap-8 lg:gap-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {cardButtons.map((btn, idx) => (
                <motion.div
                  key={btn.title}
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
                        p-2 text-center`}
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
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
