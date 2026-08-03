/**
 * Normalises a date for JSON-LD.
 *
 * Google's Rich Results Test rejects a date-only value in ProfilePage's
 * `dateCreated`/`dateModified` and in Article's `datePublished` with "Invalid
 * datetime value" — those fields want a full ISO 8601 datetime. Content should
 * still be able to write a plain `2026-08-03`, so the conversion happens here
 * rather than in every front matter block.
 *
 * Passes through anything that already carries a time component.
 */
export default function isoDateTime(value) {
  if (!value) {
    return undefined;
  }
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00+00:00` : value;
}
