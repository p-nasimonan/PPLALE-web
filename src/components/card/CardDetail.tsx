import React from 'react';
import { CardInfo } from '@/types/card';
import Card from './Card';
import { css } from 'styled-system/css';

interface CardDetailProps {
  card: CardInfo;
  onClose: () => void;
  canAddToDeck?: (card: CardInfo) => boolean;
  onAddToDeck?: (card: CardInfo) => void;
  handleCardRemove?: (card: CardInfo) => void;
  isInDeck: boolean;
}
    
const CardDetail: React.FC<CardDetailProps> = ({ card, onClose, canAddToDeck, onAddToDeck, isInDeck , handleCardRemove}) => {
  return (
    <div
      className={css({
        position: 'fixed',
        inset: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        w: 'full',
        h: 'full',
        zIndex: '50',
        backdropFilter: 'blur(4px)',
      })}
      onClick={onClose}
    >
      <article
        className={css({
          position: 'relative',
          rounded: 'lg',
          boxShadow: 'lg',
          p: '2',
          maxW: '2xl',
          w: 'full',
          mx: '4',
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={css({
            position: 'absolute',
            top: '2',
            right: '2',
            _hover: { color: 'gray.700' },
          })}
          onClick={onClose}
        >
          ×
        </button>
        <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'center' })}>
          <Card
            card={card}
            sizes={{
              base: { width: 200, height: 300 },
              sm: { width: 250, height: 375 },
              md: { width: 300, height: 450 },
              lg: { width: 500, height: 750 }
            }}
            canShowDetail={false}
          />
          <div className={css({ mt: '4' })}>
            {/* デッキに追加ボタン */}
            {canAddToDeck && onAddToDeck ? (
              <button
                className={css({
                  mt: '4',
                  px: '4',
                  py: '2',
                  bg: 'blue.500',
                  color: 'white',
                  rounded: 'sm',
                  _hover: { bg: 'blue.600' },
                })}
                onClick={() => onAddToDeck(card)}
                disabled={!canAddToDeck(card)}
              >
                {card.type === 'プレイアブル' ? '選択する' : 'デッキに追加'}
              </button>
            ) : isInDeck ? (
              <button
                className={css({
                  mt: '4',
                  px: '4',
                  py: '2',
                  bg: 'red.500',
                  color: 'white',
                  rounded: 'sm',
                  _hover: { bg: 'red.600' },
                })}
                onClick={() => handleCardRemove?.(card)}
              >
                デッキから外す
              </button>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
};

export default CardDetail;
