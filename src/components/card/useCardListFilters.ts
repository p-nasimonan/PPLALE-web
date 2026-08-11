import { useState, useMemo, useEffect } from 'react';
import { CardInfo, FruitType } from '@/types/card';

/**
 * カードリストのフィルタリング・ソートロジック。
 * CardList のUIから状態管理を分離するためのフック。
 */
export function useCardListFilters(
  displayCardType: 'yojo' | 'sweet' | 'playable',
  allYojoCards: CardInfo[],
  allSweetCards: CardInfo[],
  allPlayableCards: CardInfo[],
) {
  const [fruitFilter, setFruitFilter] = useState<FruitType | 'all'>('all');
  const [sweetTypeFilter, setSweetTypeFilter] = useState<string | 'all'>('all');
  const [versionFilter, setVersionFilter] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 表示するカード種別が切り替わったらフィルターをリセットする
  useEffect(() => {
    setFruitFilter('all');
    setSweetTypeFilter('all');
    setVersionFilter('all');
    setSearchQuery('');
  }, [displayCardType]);

  const currentCards = useMemo(() => {
    switch (displayCardType) {
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

  const sweetTypes = useMemo(
    () => Array.from(new Set(allSweetCards.filter(card => card.sweetType).map(card => card.sweetType ?? ''))).filter(Boolean),
    [allSweetCards],
  );
  const versions = useMemo(
    () => Array.from(new Set(allPlayableCards.filter(card => card.version).map(card => card.version ?? ''))).filter(Boolean),
    [allPlayableCards],
  );

  return {
    fruitFilter, setFruitFilter,
    sweetTypeFilter, setSweetTypeFilter,
    versionFilter, setVersionFilter,
    searchQuery, setSearchQuery,
    sweetTypes, versions,
    sortedFilteredCards,
  };
}
