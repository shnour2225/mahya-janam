const TEHRAN_OFFSET_MS = (3 * 60 + 30) * 60_000;

export function normalizeAccessCode(value: string): string {
  return value.trim()
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));
}

export function matchesTehranCode(code: string, now = Date.now()): boolean {
  if (!/^\d{4}$/.test(code)) return false;

  // Use UTC getters after applying the offset so the visitor's local time zone doesn't matter.
  const tehran = new Date(now + TEHRAN_OFFSET_MS);
  const minutes = String(tehran.getUTCMinutes()).padStart(2, '0');
  const hours = String(tehran.getUTCHours()).padStart(2, '0');
  return code === `${minutes}${hours}`;
}
