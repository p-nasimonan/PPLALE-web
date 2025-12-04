'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-2 px-4 w-full justify-center items-center flex flex-col gap-1 bg-black/80 text-center">
      <div className="text-xs text-gray-400">© 2025 ぷぷりえーる デッキ構築</div>
      <div className="flex gap-3 text-xs">
        <Link href="/privacy-policy" className="text-gray-400 hover:text-gray-300 transition-colors">プライバシーポリシー</Link>
        <span className="text-gray-600">•</span>
        <Link href="/terms" className="text-gray-400 hover:text-gray-300 transition-colors">利用規約</Link>
        <span className="text-gray-600">•</span>
        <Link href="/credits" className="text-gray-400 hover:text-gray-300 transition-colors">クレジット</Link>
        <span className="text-gray-600">•</span>
        <Link href="/contact" className="text-gray-400 hover:text-gray-300 transition-colors">お問い合わせ</Link>
      </div>
    </footer>
  );
}
