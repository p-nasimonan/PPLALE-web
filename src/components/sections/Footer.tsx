'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-4 w-full gap-1 justify-center items-center flex flex-col maincolor z-1 bg-black/50">
      <div>© 2025 ぷぷりえーる デッキ構築</div>
      <div className="flex gap-4 mt-2">
        <div>
          <Link href="/privacy-policy">プライバシーポリシー</Link>
        </div>
        <div>
          <Link href="/terms">利用規約</Link>
        </div>
      </div>
      <div className="flex gap-1 mt-2">
        <div>
          <Link href="/credits">クレジット</Link>
        </div>
        <div>
          <Link href="/contact">お問い合わせ</Link>
        </div>
      </div>
    </footer>
  );
}
