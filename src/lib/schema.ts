import { z } from 'zod';

/**
 * Firestore に保存する Deck ドキュメントのスキーマ定義
 * - users/{uid}/decks/{deckId}
 * フィールド:
 * - createdAt: Date (任意、作成日時)
 * - name: string
 * - playableCardId: string | null
 * - sweetDeckIds: string[]
 * - updatedAt: Date (任意、更新日時)
 * - yojoDeckIds: string[]
 */

export const deckSchema = z.object({
  createdAt: z.instanceof(Date).optional(),
  name: z.string().min(1).max(200),
  playableCardId: z.string().nullable(),
  sweetDeckIds: z.array(z.string()).max(10),
  updatedAt: z.instanceof(Date).optional(),
  yojoDeckIds: z.array(z.string()).max(20),
});

export type Deck = z.infer<typeof deckSchema>;

// Helper: validate data and return typed Deck or throw
export function validateDeckData(data: unknown): Deck {
  const parsed = deckSchema.parse(data);
  return parsed;
}
