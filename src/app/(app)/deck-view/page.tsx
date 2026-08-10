'use client';

import React, { useState, useEffect } from 'react';
import { CardInfo } from '@/types/card';
import { allYojoCards, allSweetCards, allPlayableCards } from '@/data/cards';
import { generateDeckImageDataUrl } from '@/components/deck/DeckImagePreview';
import Image from 'next/image';
import { css } from 'styled-system/css';
import { button } from 'styled-system/recipes';

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

  useEffect(() => {
    const generateImage = async () => {
      try {
        setError(null);
        setLoading(true);

        const yojoIds = yojoCardIds
          .split(',')
          .map(id => id.trim())
          .filter(id => id !== '')
          .map(id => {
            const num = parseInt(id, 10).toString();
            return `y_${num}`;
          });

        const yojoDeck = yojoIds
          .map(id => allYojoCards.find(card => card.id === id))
          .filter((card): card is CardInfo => card !== undefined);

        const sweetIds = sweetCardIds
          .split(',')
          .map(id => id.trim())
          .filter(id => id !== '')
          .map(id => `s_${id.padStart(2, '0')}`);

        const sweetDeck = sweetIds
          .map(id => allSweetCards.find(card => card.id === id))
          .filter((card): card is CardInfo => card !== undefined);

        const playableId = playableCardId.trim();
        const playableCard = playableId
          ? allPlayableCards.find(card => card.id === playableId) || null
          : null;

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

    if (yojoCardIds || sweetCardIds || playableCardId) {
      const timer = setTimeout(() => { generateImage(); }, 500);
      return () => clearTimeout(timer);
    } else {
      setDeckImage(null);
      setLoading(false);
    }
  }, [yojoCardIds, sweetCardIds, playableCardId]);

  return (
    <div className={`container ${css({ px: '4', py: '8' })}`}>

      <div className={css({ maxW: '4xl', mx: 'auto' })}>
        <div className={`main-background ${css({ p: '6', rounded: 'lg', mb: '8' })}`}>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '6' })}>
            <div>
              <label className={`main-color ${css({ display: 'block', fontWeight: 'bold', mb: '2' })}`}>
                幼女デッキ（カンマ区切り）
              </label>
              <textarea
                className={css({
                  w: 'full', p: '3', borderWidth: '1px', rounded: 'md',
                  _focus: { boxShadow: '0 0 0 2px #3b82f6', borderColor: 'transparent' },
                })}
                rows={3}
                value={yojoCardIds}
                onChange={(e) => setYojoCardIds(e.target.value)}
                placeholder="例: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20"
              />
              <p className={css({ fontSize: 'sm', color: 'gray.600', mt: '1' })}>
                1〜64の数字をカンマ区切りで入力してください（最大20枚）
              </p>
            </div>

            <div>
              <label className={`main-color ${css({ display: 'block', fontWeight: 'bold', mb: '2' })}`}>
                お菓子デッキ（カンマ区切り）
              </label>
              <textarea
                className={css({
                  w: 'full', p: '3', borderWidth: '1px', rounded: 'md',
                  _focus: { boxShadow: '0 0 0 2px #3b82f6', borderColor: 'transparent' },
                })}
                rows={2}
                value={sweetCardIds}
                onChange={(e) => setSweetCardIds(e.target.value)}
                placeholder="例: 1,2,3,4,5,6,7,8,9,10"
              />
              <p className={css({ fontSize: 'sm', color: 'gray.600', mt: '1' })}>
                お菓子カードの番号をカンマ区切りで入力してください（最大10枚）
              </p>
            </div>

            <div>
              <label className={`main-color ${css({ display: 'block', fontWeight: 'bold', mb: '2' })}`}>
                プレイアブルカード（任意）
              </label>
              <div className={css({
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                sm: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
                md: { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' },
                lg: { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' },
                gap: '3',
              })}>
                {allPlayableCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setPlayableCardId(playableCardId === card.id ? '' : card.id)}
                    className={`${css({
                      cursor: 'pointer', rounded: 'lg',
                      transitionProperty: 'border-color', transitionDuration: '300ms',
                      borderWidth: '2px',
                      borderColor: playableCardId === card.id ? '#3b82f6' : '#d1d5db',
                      _hover: { borderColor: playableCardId === card.id ? '#3b82f6' : '#9ca3af' },
                    })}`}
                  >
                    <div className={css({ position: 'relative', aspectRatio: '220/320' })}>
                      <Image
                        src={card.imageUrl} alt={card.name} fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className={css({ objectFit: 'cover' })} unoptimized
                      />
                    </div>
                    <div className={css({ p: '2', bg: 'white', textAlign: 'center' })}>
                      <p className={css({ fontSize: 'xs', fontWeight: 'medium', truncate: true })}>{card.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className={css({ fontSize: 'sm', color: 'gray.600', mt: '2' })}>
                カードをクリックして選択してください。もう一度クリックすると選択解除されます。
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className={css({ bg: 'red.100', borderWidth: '1px', borderColor: 'red.400', color: 'red.700', px: '4', py: '3', rounded: 'sm', mb: '4' })}>
            {error}
          </div>
        )}

        {loading && (
          <div className={css({ textAlign: 'center', py: '12' })}>
            <div className={css({ display: 'inline-block', animation: 'spin', rounded: 'full', h: '12', w: '12', borderBottomWidth: '2px', borderColor: 'blue.500' })}></div>
            <p className={css({ mt: '4', color: 'gray.600' })}>デッキ画像を生成中...</p>
          </div>
        )}

        {!loading && deckImage && (
          <div className={`main-background ${css({ p: '6', rounded: 'lg' })}`}>
            <h2 className={`main-color ${css({ fontSize: 'xl', fontWeight: 'bold', mb: '4' })}`}>生成されたデッキ画像</h2>
            <div className={css({ mb: '4' })}>
              <Image src={deckImage} alt="デッキ画像" width={1920} height={1080}
                className={css({ w: 'full', h: 'auto', rounded: 'lg', boxShadow: 'lg' })} unoptimized />
            </div>
            <div className={css({ display: 'flex', justifyContent: 'center' })}>
              <a href={deckImage} download="deck.png" className={`${button({ variant: 'primary', size: 'lg' })} ${css({ display: 'inline-block' })}`}>
                画像をダウンロード
              </a>
            </div>
          </div>
        )}

        {!loading && !deckImage && !yojoCardIds && !sweetCardIds && !playableCardId && (
          <div className={css({ textAlign: 'center', py: '12', color: 'gray.500' })}>
            <p className={css({ fontSize: 'lg' })}>カードコードを入力すると自動で画像が生成されます</p>
          </div>
        )}
      </div>
    </div>
  );
}
