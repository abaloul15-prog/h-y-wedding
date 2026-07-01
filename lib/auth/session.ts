import { createHmac, timingSafeEqual } from "crypto";

const SESSION_COOKIE = "hy_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

// Falls back to a static dev secret so local development works without
// any env setup. Set SESSION_SECRET in production deployments.
const DEV_FALLBACK_SECRET = "hy-private-estate-dev-secret-2026";

function getSecret(): string {
  return (
    process.env.SESSION_SECRET ??
    process.env.WEDDING_ACCESS_CODE ??
    DEV_FALLBACK_SECRET
  );
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

/** Creates a signed, tamper-proof session token that embeds its own expiry. */
export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${expiresAt}`;
  const signature = sign(payload);
  return Buffer.from(`${payload}.${signature}`).toString("base64url");
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;

  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [payload, signature] = decoded.split(".");
    if (!payload || !signature) return false;

    const expected = sign(payload);
    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);

    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return false;
    }

    const expiresAt = Number(payload);
    return Number.isFinite(expiresAt) && Date.now() < expiresAt;
  } catch {
    return false;
  }
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;
