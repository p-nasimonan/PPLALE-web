/**
 * カードリスト
 * displayCardType に応じて幼女/お菓子/プレイアブルを切り替え、
 * フルーツ・タイプ・バージョン・テキスト検索でフィルタリングする。
 */
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { CardInfo, FruitType } from '@/types/card';
import Card from './Card';
import { css } from 'styled-system/css';

/* ── Props ─────────────────────────────────────────────── */

interface CardListProps {
  allYojoCards: CardInfo[];
  allSweetCards: CardInfo[];
  allPlayableCards: CardInfo[];
  /** 現在のタブ。外部(TabButtons)から渡される */
  displayCardType: 'yojo' | 'sweet' | 'playable';
  onCardSelect?: (card: CardInfo) => void;
  selectedCardId?: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent, card: CardInfo) => void;
  canAddToDeck?: (card: CardInfo) => boolean;
  onAddToDeck?: (card: CardInfo) => void;
}

/* ── フィルター入力の共通スタイル ──────────────────────── */

const filterInput = css({
  rounded: 'md',
  borderWidth: '1px',
  borderColor: 'gray.300',
  bg: 'white',
  px: '2',
  py: '1',
  fontSize: 'sm',
  color: 'gray.900',
  _dark: { borderColor: 'gray.600', bg: 'gray.900', color: 'gray.100' },
});

/* ── コンポーネント ────────────────────────────────────── */

const CardList: React.FC<CardListProps> = ({
  allYojoCards, allSweetCards, allPlayableCards,
  displayCardType,
  onCardSelect, selectedCardId,
  draggable = false, onDragStart,
  canAddToDeck, onAddToDeck,
}) => {
  /* --- フィルター状態 ----------------------------------- */
  const [fruitFilter,      setFruitFilter]      = useState<FruitType | 'all'>('all');
  const [sweetTypeFilter,  setSweetTypeFilter]  = useState<string | 'all'>('all');
  const [versionFilter,    setVersionFilter]    = useState<string | 'all'>('all');
  const [searchQuery,      setSearchQuery]      = useState('');

  /* タブ切替時にフィルターをリセット */
  useEffect(() => {
    setFruitFilter('all');
    setSweetTypeFilter('all');
    setVersionFilter('all');
    setSearchQuery('');
  }, [displayCardType]);

  /* --- カードリスト ----------------------------------- */
  const currentCards = useMemo(() => {
    switch (displayCardType) {
      case 'yojo':     return allYojoCards;
      case 'sweet':    return allSweetCards;
      case 'playable': return allPlayableCards;
    }
  }, [displayCardType, allYojoCards, allSweetCards, allPlayableCards]);

  /* --- フィルタリング --------------------------------- */
  const filteredCards = useMemo(() =>
    currentCards.filter(card => {
      if (versionFilter !== 'all' && card.version !== versionFilter) return false;
      if (displayCardType !== 'playable' && fruitFilter !== 'all' && card.fruit !== fruitFilter) return false;
      if (displayCardType === 'sweet' && sweetTypeFilter !== 'all' && card.sweetType !== sweetTypeFilter) return false;
      if (searchQuery && !card.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    }),
  [currentCards, versionFilter, fruitFilter, sweetTypeFilter, searchQuery, displayCardType]);

  /* --- ソート ----------------------------------------- */
  const sortedCards = useMemo(() =>
    [...filteredCards].sort((a, b) => {
      if (displayCardType === 'playable') {
        const cmp = (a.version || '').localeCompare(b.version || '');
        if (cmp !== 0) return cmp;
      }
      const aNum = parseInt(a.id.split('_')[1], 10);
      const bNum = parseInt(b.id.split('_')[1], 10);
      if (isNaN(aNum) && isNaN(bNum)) return a.id.localeCompare(b.id);
      if (isNaN(aNum)) return 1;
      if (isNaN(bNum)) return -1;
      return aNum - bNum;
    }),
  [filteredCards, displayCardType]);

  /* --- フィルター選択肢 ------------------------------- */
  const sweetTypes = useMemo(() =>
    Array.from(new Set(allSweetCards.map(c => c.sweetType))).filter(Boolean) as string[],
  [allSweetCards]);
  const versions = useMemo(() =>
    Array.from(new Set(allPlayableCards.map(c => c.version))).filter(Boolean) as string[],
  [allPlayableCards]);

  const handleCardSelect = useCallback((card: CardInfo) => {
    onCardSelect?.(card);
  }, [onCardSelect]);

  /* --- レンダリング ----------------------------------- */
  return (
    <div
      className={css({
        rounded: 'lg',
        borderWidth: '1px',
        borderColor: 'gray.200',
        bg: 'white',
        overflow: 'hidden',
        _dark: { borderColor: 'gray.700', bg: 'gray.900' },
      })}
    >
      {/* ── フィルター行 ──────────────────────────────── */}
      <div className={css({
        display: 'flex', flexWrap: 'wrap', gap: '2',
        px: '3', py: '2',
        borderBottomWidth: '1px',
        borderColor: 'gray.100',
        bg: 'gray.50/70',
        _dark: { borderColor: 'gray.800', bg: 'gray.800/50' },
      })}>
        {/* フルーツ (幼女のみ) */}
        {displayCardType === 'yojo' && (
          <select className={filterInput} value={fruitFilter}
            onChange={e => setFruitFilter(e.target.value as FruitType | 'all')}>
            <option value="all">🍓 フルーツ</option>
            <option value="いちご">いちご</option>
            <option value="ぶどう">ぶどう</option>
            <option value="めろん">めろん</option>
            <option value="おれんじ">おれんじ</option>
          </select>
        )}

        {/* お菓子タイプ */}
        {displayCardType === 'sweet' && (
          <select className={filterInput} value={sweetTypeFilter}
            onChange={e => setSweetTypeFilter(e.target.value)}>
            <option value="all">🍬 お菓子タイプ</option>
            {sweetTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        )}

        {/* バージョン (プレイアブルのみ) */}
        {displayCardType === 'playable' && (
          <select className={filterInput} value={versionFilter}
            onChange={e => setVersionFilter(e.target.value)}>
            <option value="all">🏷 バージョン</option>
            {versions.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        )}

        {/* テキスト検索 */}
        <input
          type="text" placeholder="🔍 カード名検索..."
          className={`${filterInput} ${css({ flex: '1', minW: '150px' })}`}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        {/* 件数表示 */}
        <span className={css({
          display: 'flex', alignItems: 'center',
          ml: 'auto', fontSize: 'xs', color: 'gray.500',
          whiteSpace: 'nowrap',
        })}>
          {sortedCards.length} / {currentCards.length}枚
        </span>
      </div>

      {/* ── カードグリッド ────────────────────────────── */}
      <div className={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: '1', p: '1',
        overflow: 'auto',
        maxH: 'calc(75vh - 56px)',
        sm: { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' },
        md: { gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' },
        lg: { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' },
        xl: { gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' },
      })}>
        {sortedCards.map((card, index) => {
          const isAddable = canAddToDeck ? canAddToDeck(card) : true;
          return (
            <div key={card.id} className={css({
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              transition: 'all',
              opacity: isAddable ? undefined : 0.4,
              filter: isAddable ? undefined : 'saturate(0.5)',
              pointerEvents: isAddable ? undefined : 'none',
            })}>
              <Card
                card={card}
                isSelected={card.id === selectedCardId}
                onClick={handleCardSelect}
                draggable={draggable && isAddable}
                onDragStart={onDragStart}
                canAddToDeck={canAddToDeck}
                onAddToDeck={onAddToDeck}
                priority={index < 6}
              />
            </div>
          );
        })}
      </div>

      {/* ── 検索結果なし ───────────────────────────────── */}
      {sortedCards.length === 0 && (
        <div className={css({ textAlign: 'center', py: '12', color: 'gray.400' })}>
          条件に一致するカードが見つかりませんでした
        </div>
      )}
    </div>
  );
};

export default CardList;
