/**
 * Redacts PII from text using simple regex patterns.
 * Covers SSNs, emails, and long digit runs (credit cards, phone-like numbers).
 */
export function redactPII(text: string): string {
  if (!text || typeof text !== "string") return text;

  let out = text;

  // SSN: XXX-XX-XXXX
  out = out.replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[SSN_REDACTED]");

  // Email addresses
  out = out.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    "[EMAIL_REDACTED]"
  );

  // Long digit runs (16+ digits = likely card; 10+ = phone/ID-like)
  out = out.replace(/\b\d{16,}\b/g, "[CARD_REDACTED]");
  out = out.replace(/\b\d{10,15}\b/g, "[DIGITS_REDACTED]");

  return out;
}
