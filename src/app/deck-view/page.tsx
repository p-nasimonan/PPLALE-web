'use client';

import React, { useState, useEffect } from 'react';
import { CardInfo } from '@/types/card';
import { allYojoCards, allSweetCards, allPlayableCards } from '@/data/cards';
import { generateDeckImageDataUrl } from '@/components/DeckImagePreview';
import Image from 'next/image';

/**
 * デッキ表示ページ
 * 幼女デッキとお菓子デッキのコードを入力すると自動で画像を生成
 */
export default function DeckViewPage() {
  const [yojoCardIds, setYojoCardIds] = useState('');
  const [sweetCardIds, setSweetCardIds] = useState('');
  const [playableCardId, setPlayableCardId] = useState('');
  const [deckImage, setDeckImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // カードコードが変更されたら自動で画像を生成
  useEffect(() => {
    const generateImage = async () => {
      try {
        setError(null);
        setLoading(true);

        // 幼女デッキのカードIDを取得
        const yojoIds = yojoCardIds
          .split(',')
          .map(id => id.trim())
          .filter(id => id !== '')
          .map(id => {
            // 数値部分を取得して先頭の0を削除
            const num = parseInt(id, 10).toString();
            return `y_${num}`;
          });

        // 幼女デッキのカードを取得
        const yojoDeck = yojoIds
          .map(id => allYojoCards.find(card => card.id === id))
          .filter((card): card is CardInfo => card !== undefined);

        // お菓子デッキのカードIDを取得
        const sweetIds = sweetCardIds
          .split(',')
          .map(id => id.trim())
          .filter(id => id !== '')
          .map(id => `s_${id.padStart(2, '0')}`);

        // お菓子デッキのカードを取得
        const sweetDeck = sweetIds
          .map(id => allSweetCards.find(card => card.id === id))
          .filter((card): card is CardInfo => card !== undefined);

        // プレイアブルカードのIDを取得
        const playableId = playableCardId.trim();
        const playableCard = playableId
          ? allPlayableCards.find(card => card.id === playableId) || null
          : null;

        // 画像を生成
        if (yojoDeck.length > 0 || sweetDeck.length > 0 || playableCard) {
          const imageUrl = await generateDeckImageDataUrl(yojoDeck, sweetDeck, playableCard);
          setDeckImage(imageUrl);
        } else {
          setDeckImage(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'デッキ画像の生成に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    // 入力がある場合のみ生成
    if (yojoCardIds || sweetCardIds || playableCardId) {
      // デバウンス処理（500ms待ってから実行）
      const timer = setTimeout(() => {
        generateImage();
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setDeckImage(null);
      setLoading(false);
    }
  }, [yojoCardIds, sweetCardIds, playableCardId]);

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="max-w-4xl mx-auto">
        {/* 入力フォーム */}
        <div className="main-background p-6 rounded-lg mb-8">
          <div className="space-y-6">
            <div>
              <label className="block font-bold mb-2 main-color">
                幼女デッキ（カンマ区切り）
              </label>
              <textarea
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                value={yojoCardIds}
                onChange={(e) => setYojoCardIds(e.target.value)}
                placeholder="例: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20"
              />
              <p className="text-sm text-gray-600 mt-1">
                1〜64の数字をカンマ区切りで入力してください（最大20枚）
              </p>
            </div>

            <div>
              <label className="block font-bold mb-2 main-color">
                お菓子デッキ（カンマ区切り）
              </label>
              <textarea
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                value={sweetCardIds}
                onChange={(e) => setSweetCardIds(e.target.value)}
                placeholder="例: 1,2,3,4,5,6,7,8,9,10"
              />
              <p className="text-sm text-gray-600 mt-1">
                お菓子カードの番号をカンマ区切りで入力してください（最大10枚）
              </p>
            </div>

            <div>
              <label className="block font-bold mb-2 main-color">
                プレイアブルカード（任意）
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {allPlayableCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setPlayableCardId(playableCardId === card.id ? '' : card.id)}
                    className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 ${
                      playableCardId === card.id
                        ? 'ring-4 ring-blue-500 shadow-lg'
                        : 'ring-2 ring-gray-300 hover:ring-gray-400'
                    }`}
                  >
                    <div className="relative aspect-[220/320]">
                      <Image
                        src={card.imageUrl}
                        alt={card.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="p-2 bg-white text-center">
                      <p className="text-xs font-medium truncate">{card.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                カードをクリックして選択してください。もう一度クリックすると選択解除されます。
              </p>
            </div>
          </div>
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* ローディング表示 */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">デッキ画像を生成中...</p>
          </div>
        )}

        {/* 生成された画像の表示 */}
        {!loading && deckImage && (
          <div className="main-background p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 main-color">生成されたデッキ画像</h2>
            <div className="mb-4">
              <Image 
                src={deckImage} 
                alt="デッキ画像" 
                width={1920} 
                height={1080}
                className="w-full h-auto rounded-lg shadow-lg" 
                unoptimized
              />
            </div>
            <div className="flex justify-center">
              <a
                href={deckImage}
                download="deck.png"
                className="btn-primary inline-block px-6 py-3 rounded-lg font-bold"
              >
                画像をダウンロード
              </a>
            </div>
          </div>
        )}

        {/* 入力がない場合の表示 */}
        {!loading && !deckImage && !yojoCardIds && !sweetCardIds && !playableCardId && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">カードコードを入力すると自動で画像が生成されます</p>
          </div>
        )}
      </div>
    </div>
  );
}
