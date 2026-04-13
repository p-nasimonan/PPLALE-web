import { CardInfo } from '@/types/card';
import sweetData from '@/data/sweet.json';
import yojoData from '@/data/yojo.json';
import playableData from '@/data/playable.json';
import { playableDataSchema, sweetDataSchema, yojoDataSchema } from '@/lib/schema';

const parsedYojoData = yojoDataSchema.parse(yojoData);
const parsedSweetData = sweetDataSchema.parse(sweetData);
const parsedPlayableData = playableDataSchema.parse(playableData);

// 幼女カードデータ
export const allYojoCards: CardInfo[] = parsedYojoData.yojo;

// お菓子カードデータ
export const allSweetCards: CardInfo[] = parsedSweetData.sweet;

export const allPlayableCards: CardInfo[] = parsedPlayableData.playable;