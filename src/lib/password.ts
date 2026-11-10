import crypto from 'crypto';

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;
const ITERATIONS = 10000;
const DIGEST = 'sha512';

/**
 * Hash a plain password using PBKDF2 with a cryptographically secure random salt.
 * Returns salt:hash format.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
  const derivedKey = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
  return `${salt}:${derivedKey}`;
}

/**
 * Verify a plain password against a stored password hash.
 * Handles both PBKDF2 (salt:hash) and legacy plain text hashes for smooth migration.
 */
export function verifyPassword(password: string, storedHash: string): { isValid: boolean; needsRehash: boolean } {
  if (!storedHash || !password) {
    return { isValid: false, needsRehash: false };
  }

  // Check if storedHash is in salt:hash format (PBKDF2)
  if (storedHash.includes(':')) {
    const [salt, key] = storedHash.split(':');
    if (salt && key) {
      try {
        const derivedKey = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
        
        // Constant-time comparison
        const a = Buffer.from(key, 'hex');
        const b = Buffer.from(derivedKey, 'hex');
        if (a.length !== b.length) {
          return { isValid: false, needsRehash: false };
        }
        const isValid = crypto.timingSafeEqual(a, b);
        return { isValid, needsRehash: false };
      } catch (err) {
        return { isValid: false, needsRehash: false };
      }
    }
  }

  // Legacy fallback: direct match with demo seed passwords
  // (e.g. "admin123", "counselor123", "trainer123", "student123")
  const isDirectMatch = storedHash === password;
  if (isDirectMatch) {
    return { isValid: true, needsRehash: true };
  }

  return { isValid: false, needsRehash: false };
}

