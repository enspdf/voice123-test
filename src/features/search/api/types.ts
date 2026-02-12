export interface ProviderStats {
  water_level?: number | null;
  ranking_score?: number | null;
  ranking_score_centil?: number | null;
  ranking_score_v1?: number | null;
  ranking_score_centil_v1?: number | null;
  ctr_score?: number | null;
  messages_response_rate?: number | null;
  messages_median_response_time?: number | null;
  offers_posted?: number | null;
  offers_liked?: number | null;
  favorited_count?: number | null;
  reviews_count?: number | null;
  reviews_rating?: number | null;
  search_ctr?: number | null;
  search_impressions?: number | null;
  search_actions?: number | null;
  unread_bookings_invitations?: number | null;
  unread_projects_invitations?: number | null;
  bookings_accepted?: number | null;
  bookings_accepted_last_year?: number | null;
  booked_clients?: number | null;
  bought_subscriptions?: number | null;
  reviews_score?: number | null;
}

export interface ProviderUser {
  id: number;
  public_hash: string;
  name: string;
  last_interaction: string;
  roles: string[];
  experiments: string[];
  created_at: string;
  username?: string;
  url?: string;
  linkedin_url?: string;
  location?: string;
  facebook_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  picture_small?: string;
  picture_medium?: string;
  picture_large?: string;
  pronouns?: string;
}

export interface SampleMetaData {
  duration?: number;
  container?: string;
  codec?: string;
  trackInfo?: unknown[];
  codecProfile?: string;
  numberOfChannels?: number;
  bitrate?: number;
  lossless?: boolean;
  sampleRate?: number;
  tagTypes?: string[];
  tool?: string;
  [key: string]: unknown;
}

export interface RelevantSample {
  id: number;
  name: string;
  provider_id: number;
  demo_id: number;
  display_order: number;
  file: string;
  is_valid: boolean;
  display_transcript: boolean;
  service_id: string;
  additional_info?: string;
  additional_services?: number[];
  languages?: number[];
  voice_types?: number[];
  voice_age_genders?: number[];
  tones?: number[];
  search_tags?: string[];
  meta_data?: SampleMetaData;
  tags?: string[];
  accents?: string[];
  transcript?: string;
  old_name?: string;
  old_additional_info?: string;
}

export interface ProviderLocationBounds {
  southwest: { lon: number; lat: number };
  northeast: { lon: number; lat: number };
}

export interface ProviderLocation {
  id: number;
  is_valid: boolean;
  country_name: string;
  country_code: string;
  full_name: string;
  locality?: string | null;
  locality_aliases?: string[] | null;
  administrative_area_name?: string | null;
  administrative_area_code?: string | null;
  utc_offset?: number | null;
  place_id?: string;
  location: { lon: number; lat: number };
  bounds?: ProviderLocationBounds;
  providers_locations?: { providerId: number; locationId: number };
}

export interface BookingRates {
  currency: number;
  rates_by_length: [number, number | null][];
  rates_by_audience: [number, number | null][];
  audience_sizes: number[];
  audience_rates: (number | null)[];
  script_lengths: number[];
  length_rates: (number | null)[];
}

export interface TtsSample {
  id: number;
  name: string;
  provider_id: number;
  display_order: number;
  file: string;
  is_valid: boolean;
  display_transcript?: boolean;
  transcript?: string;
  tts_voice_id?: number;
  tts_provider_id?: string;
  service_id: string;
  languages?: number[];
  tones?: number[];
  voice_types?: number[];
  voice_age_genders?: number[];
  accents?: string[];
}

export interface TtsHumanSample {
  is_valid: boolean;
  display_transcript: boolean;
}

export interface ProviderSeoProperties {
  awards?: string;
  gender?: string;
  allow_seo?: boolean;
  birthdate?: string;
  experience_years?: number;
  [key: string]: unknown;
}

export interface VoiceProvider {
  id: number;
  user_id: number;
  service_id: string;
  favorite: boolean;
  allow_bookings: boolean;
  stats: ProviderStats;
  tts_enabled: boolean;
  tts_human_sample: TtsHumanSample;
  user: ProviderUser;
  payment_methods?: number[];
  headline?: string;
  summary?: string;
  additional_services?: number[];
  seo_properties?: ProviderSeoProperties | null;
  booking_rates?: BookingRates | null;
  membership_product_name?: string;
  membership_peak_start?: number;
  locations?: ProviderLocation[];
  tts_samples?: TtsSample[];
  relevant_sample?: RelevantSample | null;
  additional_details?: string;
  description?: string;
  languages?: number[];
  voice_age_genders?: number[];
  voice_types?: number[];
  recording_capabilities?: number[];
  unions?: number[];
  allow_seo?: boolean;
  autoenable_secure_payments?: boolean;
}

export interface AggregationBucket {
  value: number | string;
  count: number;
}

export type SearchAggregations = Record<string, AggregationBucket[]>;

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages?: number;
}

export interface SearchProvidersResponseBody {
  providers: VoiceProvider[];
  pagination?: {
    page?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
  };
  aggregations?: SearchAggregations;
}

export interface NormalizedSearchResult {
  providers: VoiceProvider[];
  pagination: PaginationMeta;
  aggregations?: SearchAggregations;
}

export type PaginationFromHeaders = {
  page?: number;
  perPage?: number;
  total?: number;
};
