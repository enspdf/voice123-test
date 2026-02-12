const DEFAULT_VOICE123_API_BASE = "https://api.sandbox.voice123.com";

export const VOICE123_API_BASE_URL =
  process.env.VOICE123_API_BASE_URL ?? DEFAULT_VOICE123_API_BASE;

export const VOICE123_ATTRIBUTES_URL = `${VOICE123_API_BASE_URL}/attributes`;
export const VOICE123_SEARCH_URL = `${VOICE123_API_BASE_URL}/providers/search`;
