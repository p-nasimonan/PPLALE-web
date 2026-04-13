import crypto from 'node:crypto';

const DEFAULT_TTL_SECONDS = 60 * 60; // 1 hour

function getSigningKey(): string | null {
  const key = process.env.OG_IMAGE_SIGNING_KEY;
  return key && key.length > 0 ? key : null;
}

export function createOgSignature(payload: string): string | null {
  const key = getSigningKey();
  if (!key) return null;

  return crypto.createHmac('sha256', key).update(payload).digest('hex');
}

export function createOgSignaturePayload(userId: string, deckId: string, ts: number): string {
  return `${userId}:${deckId}:${ts}`;
}

export function isValidOgSignature(options: {
  userId: string;
  deckId: string;
  tsParam: string | null;
  sigParam: string | null;
  now?: number;
  ttlSeconds?: number;
}): boolean {
  const { userId, deckId, tsParam, sigParam, now = Date.now(), ttlSeconds = DEFAULT_TTL_SECONDS } = options;

  if (!tsParam || !sigParam) return false;

  const ts = Number(tsParam);
  if (!Number.isFinite(ts)) return false;

  const ageSeconds = Math.floor(now / 1000) - ts;
  if (ageSeconds < 0 || ageSeconds > ttlSeconds) return false;

  const payload = createOgSignaturePayload(userId, deckId, ts);
  const expected = createOgSignature(payload);
  if (!expected) return false;

  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sigParam));
  } catch {
    return false;
  }
}
