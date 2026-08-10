/**
 * カードリストコンポーネント
 * 
 * 複数のカードを表示するコンポーネント
 * フィルタリングやソート機能を提供する
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { CardInfo, FruitType } from '@/types/card';
import Card from './Card';
import { css } from 'styled-system/css';

/**
 * @JSDoc
 * @description CardListコンポーネントのProps
 * @property {CardInfo[]} allYojoCards - 表示する幼女カードのリスト
 * @property {CardInfo[]} allSweetCards - 表示するお菓子カードのリスト
 * @property {CardInfo[]} allPlayableCards - 表示するプレイアブルカードのリスト
 * @property {'yojo' | 'sweet' | 'playable'} displayCardType - 表示するカードの種類 (外部から指定)
 * @property {(card: CardInfo) => void} [onCardSelect] - カードが選択されたときのコールバック関数
 * @property {string} [selectedCardId] - 選択されているカードのID
 * @property {boolean} [draggable=false] - カードがドラッグ可能かどうか
 * @property {(e: React.DragEvent, card: CardInfo) => void} [onDragStart] - ドラッグ開始時のコールバック関数
 * @property {(card: CardInfo) => boolean} [canAddToDeck] - デッキに追加可能かどうかを判定する関数
 * @property {(card: CardInfo) => void} [onAddToDeck] - カードがデッキに追加されたときのコールバック関数
 */
interface CardListProps {
  allYojoCards: CardInfo[];
  allSweetCards: CardInfo[];
  allPlayableCards: CardInfo[];
  displayCardType: 'yojo' | 'sweet' | 'playable'; // 外部から渡されるアクティブなタブキー
  onCardSelect?: (card: CardInfo) => void;
  selectedCardId?: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent, card: CardInfo) => void;
  canAddToDeck?: (card: CardInfo) => boolean;
  onAddToDeck?: (card: CardInfo) => void;
}

/**
 * @JSDoc
 * @description カードリストとフィルタリング機能を提供するコンポーネント
 * @param {CardListProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} カードリストコンポーネント
 */
const CardList: React.FC<CardListProps> = ({
  allYojoCards,
  allSweetCards,
  allPlayableCards,
  displayCardType, // Props から受け取る
  onCardSelect,
  selectedCardId,
  draggable = false,
  onDragStart,
  canAddToDeck,
  onAddToDeck,
}) => {
  // activeTabKey の内部状態管理は削除
  const [fruitFilter, setFruitFilter] = useState<FruitType | 'all'>('all');
  const [sweetTypeFilter, setSweetTypeFilter] = useState<string | 'all'>('all');
  const [versionFilter, setVersionFilter] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentCards = useMemo(() => {
    switch (displayCardType) { // displayCardType を使用
      case 'yojo': return allYojoCards;
      case 'sweet': return allSweetCards;
      case 'playable': return allPlayableCards;
      default: return [];
    }
  }, [displayCardType, allYojoCards, allSweetCards, allPlayableCards]);

  const filteredCards = useMemo(() => currentCards.filter(card => {
    if (versionFilter !== 'all' && card.version !== versionFilter) return false;
    if (displayCardType !== 'playable' && fruitFilter !== 'all' && card.fruit !== fruitFilter) return false;
    if (displayCardType === 'sweet' && sweetTypeFilter !== 'all' && card.sweetType !== sweetTypeFilter) return false;
    if (searchQuery && !card.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }), [currentCards, versionFilter, fruitFilter, sweetTypeFilter, searchQuery, displayCardType]);

  const sortedFilteredCards = useMemo(() => {
    return [...filteredCards].sort((a, b) => {
      if (displayCardType === 'playable') {
        const versionCompare = (a.version || '').localeCompare(b.version || '');
        if (versionCompare !== 0) return versionCompare;
      }
      const idNumA = parseInt(a.id.split('_')[1], 10);
      const idNumB = parseInt(b.id.split('_')[1], 10);
      if (isNaN(idNumA) && isNaN(idNumB)) return a.id.localeCompare(b.id);
      if (isNaN(idNumA)) return 1;
      if (isNaN(idNumB)) return -1;
      return idNumA - idNumB;
    });
  }, [filteredCards, displayCardType]);

  const sweetTypes = useMemo(() => Array.from(new Set(allSweetCards.filter(card => card.sweetType).map(card => card.sweetType ?? ''))).filter(Boolean), [allSweetCards]);
  const versions = useMemo(() => Array.from(new Set(allPlayableCards.filter(card => card.version).map(card => card.version ?? ''))).filter(Boolean), [allPlayableCards]);

  const handleCardSelect = useCallback((card: CardInfo) => {
    if (onCardSelect) onCardSelect(card);
  }, [onCardSelect]);

  
  useEffect(() => {
    setFruitFilter('all');
    setSweetTypeFilter('all');
    setVersionFilter('all');
    setSearchQuery('');
  }, [displayCardType]); // displayCardType の変更を監視

  return (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '4' })}>
      {/* TabButtons は DeckPageClient に移動したので削除 */}

      {/* フィルターセクション */}
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '3' })}>
        <div className={css({ display: 'flex', flexDirection: 'column', sm: { flexDirection: 'row' }, gap: '2' })}>
          {displayCardType === 'yojo' && (
            <select
              className={css({
                rounded: 'md',
                borderWidth: '1px',
                borderColor: 'gray.300',
                bg: 'white',
                px: '2',
                py: '1',
                fontSize: 'sm',
                color: 'gray.900',
                _dark: { borderColor: 'gray.600', bg: 'gray.900', color: 'gray.100' },
              })}
              value={fruitFilter}
              onChange={(e) => setFruitFilter(e.target.value as FruitType | 'all')}
            >
              <option value="all">フルーツ</option>
              <option value="いちご">いちご</option>
              <option value="ぶどう">ぶどう</option>
              <option value="めろん">めろん</option>
              <option value="おれんじ">おれんじ</option>
            </select>
          )}
          {displayCardType === 'sweet' && (
            <select
              className={css({
                rounded: 'md',
                borderWidth: '1px',
                borderColor: 'gray.300',
                bg: 'white',
                px: '2',
                py: '1',
                fontSize: 'sm',
                color: 'gray.900',
                _dark: { borderColor: 'gray.600', bg: 'gray.900', color: 'gray.100' },
              })}
              value={sweetTypeFilter}
              onChange={(e) => setSweetTypeFilter(e.target.value)}
            >
              <option value="all">お菓子タイプ</option>
              {sweetTypes.map(type => (
                type && <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}
          {displayCardType === 'playable' && (
            <select
              className={css({
                rounded: 'md',
                borderWidth: '1px',
                borderColor: 'gray.300',
                bg: 'white',
                px: '2',
                py: '1',
                fontSize: 'sm',
                color: 'gray.900',
                _dark: { borderColor: 'gray.600', bg: 'gray.900', color: 'gray.100' },
              })}
              value={versionFilter}
              onChange={(e) => setVersionFilter(e.target.value)}
            >
              <option value="all">バージョン</option>
              {versions.map(version => (
                version && <option key={version} value={version}>{version}</option>
              ))}
            </select>
          )}
          <input
            type="text"
            placeholder="カード名検索..."
            className={css({
              flexGrow: '1',
              rounded: 'md',
              borderWidth: '1px',
              borderColor: 'gray.300',
              bg: 'white',
              px: '2',
              py: '1',
              fontSize: 'sm',
              color: 'gray.900',
              _dark: { borderColor: 'gray.600', bg: 'gray.900', color: 'gray.100' },
            })}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '1',
          overflow: 'auto',
          maxH: 'calc(75vh - 50px)',
          sm: { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' },
          md: { gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' },
          lg: { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' },
          xl: { gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' },
        })}>
          {sortedFilteredCards
            .map((card, index) => {
              const isAddable = canAddToDeck ? canAddToDeck(card) : true;
              return (
              <div
                key={card.id}
                className={css({
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transitionProperty: 'all',
                  opacity: !isAddable ? '40' : undefined,
                  filter: !isAddable ? 'saturate(0.5)' : undefined,
                  pointerEvents: !isAddable ? 'none' : undefined,
                })}
              >
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
            )})}
        </div>
      </div>

      {sortedFilteredCards.length === 0 && (
        <div className={css({ textAlign: 'center', py: '8', color: 'gray.500' })}>
          条件に一致するカードが見つかりませんでした。
        </div>
      )}
    </div>
  );
};

export default CardList;