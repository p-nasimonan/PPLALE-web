/**
 * 2Pick結果表示コンポーネント
 * 
 * 2pickが完了した後の結果画面を表示し、デッキの保存やエクスポート、共有などの機能を提供します。
 * 
 * @packageDocumentation
 */

'use client';

import React, { useState } from 'react';
import { CardInfo } from '@/types/card';
import ShareButtons from '@/components/ui/ShareButtons';
import { User } from 'firebase/auth';
import DeckImagePreview from '@/components/deck/DeckImagePreview';
import JungaryCopy from '@/svgs/jungary-copy.svg';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { button } from 'styled-system/recipes';

/**
 * 2Pick結果表示コンポーネントのProps
 * 
 * @interface
 * @property {CardInfo[]} yojoDeck - 構築された幼女デッキ
 * @property {CardInfo[]} sweetDeck - 構築されたお菓子デッキ
 * @property {CardInfo | null} playableCard - 選択されたプレイアブルカード
 * @property {User | null} user - 現在のユーザー情報
 * @property {() => Promise<void>} onSave - デッキを保存ボタンがクリックされたときのコールバック関数
 */
interface TwoPickResultProps {
  /** 構築された幼女デッキ */
  yojoDeck: CardInfo[];
  /** 構築されたお菓子デッキ */
  sweetDeck: CardInfo[];
  /** 選択されたプレイアブルカード */
  playableCard: CardInfo | null;
  /** 現在のユーザー情報 */
  user: User | null;
  /** デッキを保存ボタンがクリックされたときのコールバック関数 */
  onSave: () => Promise<void>;
  /** もう一度プレイボタンがクリックされたときのコールバック関数 */
  onRestart: () => void;
}

/**
 * 2Pick結果表示コンポーネント
 * 
 * @param {TwoPickResultProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} 2Pick結果表示画面
 */
const TwoPickResult: React.FC<TwoPickResultProps> = ({
  yojoDeck,
  sweetDeck,
  playableCard,
  user,
  onSave,
  onRestart,
}) => {
  // 幼女デッキのコピー状態
  const [yojoCopied, setYojoCopied] = useState(false);
  // お菓子デッキのコピー状態
  const [sweetCopied, setSweetCopied] = useState(false);

  /**
   * IDから数字のみを抽出する関数
   */
  const extractNumber = (id: string) => {
    return id.replace(/\D/g, '');
  };

  /**
   * 幼女デッキをクリップボードにコピーする
   */
  const handleCopyYojoDeck = () => {
    navigator.clipboard.writeText(yojoDeck.map(card => extractNumber(card.id)).join(','));
    setYojoCopied(true);
    setTimeout(() => setYojoCopied(false), 2000);
  };

  /**
   * お菓子デッキをクリップボードにコピーする
   */
  const handleCopySweetDeck = () => {
    navigator.clipboard.writeText(sweetDeck.map(card => extractNumber(card.id)).join(','));
    setSweetCopied(true);
    setTimeout(() => setSweetCopied(false), 2000);
  };

  return (
    <div className={css({ textAlign: 'center', position: 'relative' })}>
      <div className={css({ position: 'absolute', top: '0', right: '20' })}>
        <ShareButtons
          share_url={window.location.href}
          share_text="2pickでデッキを作成しました！
          #お菓子争奪戦争ぷぷりえーる"
          isLocal={true}
          yojoDeck={yojoDeck}
          sweetDeck={sweetDeck}
          playableCard={playableCard}
        />
      </div>
      <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', mb: '4' })}>デッキ構築結果</h2>
      <p className={css({ mb: '4' })}>構築したデッキをシェアしよう</p>

      {/* デッキ画像プレビュー */}
      <div className={css({ w: '1/2', mx: 'auto', mb: '4' })}>
      <DeckImagePreview
        yojoDeck={yojoDeck}
        sweetDeck={sweetDeck}
        playableCard={playableCard}
        onClose={() => {}}
        isPopup={false}
      />
      </div>
      
      {/* エクスポート機能 */}
      <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10', mb: '6' })}>
        <div className={css({ mb: '4' })}>
          <h4 className={css({ fontWeight: 'bold', mb: '2' })}>幼女デッキ</h4>
          <div className={css({ bg: 'gray.100', p: '3', rounded: 'sm', borderWidth: '1px', borderColor: 'gray.300', overflow: 'auto', maxH: '40', mb: '2' })}>
            <pre className={css({ fontSize: 'sm' })}>{yojoDeck.map(card => extractNumber(card.id)).join(',')}</pre>
          </div>
          <button
            className={`${button({ variant: 'primary', size: 'md' })} ${css({ mb: '2' })}`}
            onClick={handleCopyYojoDeck}
          >
            {yojoCopied ? 'コピーしました！' : '幼女デッキをコピー'}
          </button>
        </div>

        <div className={css({ mb: '4' })}>
          <h4 className={css({ fontWeight: 'bold', mb: '2' })}>お菓子デッキ</h4>
          <div className={css({ bg: 'gray.100', p: '3', rounded: 'sm', borderWidth: '1px', borderColor: 'gray.300', overflow: 'auto', maxH: '40', mb: '2' })}>
            <pre className={css({ fontSize: 'sm' })}>{sweetDeck.map(card => extractNumber(card.id)).join(',')}</pre>
          </div>
          <button
            className={`${button({ variant: 'primary', size: 'md' })} ${css({ mb: '2', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2' })}`}
            onClick={handleCopySweetDeck}
          >
            <JungaryCopy width={24} height={24} className={css({ display: 'inline-block' })} />
            {sweetCopied ? 'コピーしました！' : 'コピー'}
          </button>
        </div>
      </div>

      <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4', mb: '4', mt: '10' })}>
        {user ? (
          <button
            className={button({ variant: 'primary', size: 'md' })}
            onClick={onSave}
          >
            デッキを保存
          </button>
        ) : (
          <button
            className={button({ variant: 'primary', size: 'md' })}
            onClick={onSave}
          >
            ログインしてデッキを保存
          </button>
        )}
        <div className={css({ display: 'flex', alignItems: 'center', gap: '4' })}>
        <button
          className={button({ variant: 'secondary', size: 'md' })}
          onClick={onRestart}
        >
          もう一度プレイ
        </button>
        <Link href="/" className={button({ variant: 'secondary', size: 'md' })}>
          ホームに戻る
        </Link>
        </div>
      </div>
    </div>
  );
};

export default TwoPickResult;