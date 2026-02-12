import type { VoiceProvider } from "@/features/search/api/types";
import type { AttributesSlimResponse } from "@/features/attributes/api/types";

const getAttributeValueName = (
  attributes: AttributesSlimResponse,
  attributeName: string,
  valueId: number,
): string | null => {
  const attr = attributes.find((attribute) => attribute.name === attributeName);
  const value = attr?.values.find((value) => value.id === valueId);

  return value?.name ?? null;
};

function formatLastActive(isoString: string): string | null {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return null;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "Active now";
  if (diffMinutes < 60) return "Active today";
  if (diffHours < 24) return "Active today";
  if (diffDays === 1) return "Active yesterday";
  if (diffDays < 7) return `Active ${diffDays} days ago`;
  if (diffDays < 30) return `Active ${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `Active ${Math.floor(diffDays / 30)} months ago`;
  return `Active ${Math.floor(diffDays / 365)} years ago`;
}

export interface ProviderDisplayData {
  user: VoiceProvider["user"];
  headline: string | undefined;
  summary: string | null;
  allow_bookings: boolean;
  languageLabel: string | null;
  voiceAgeGenderLabel: string | null;
  voiceTypeLabel: string | null;
  picture: string | undefined;
  rating: number | null;
  reviewsCount: number;
  locationLabel: string | null;
  lastActiveLabel: string | null;
}

export const getProviderDisplayData = (
  provider: VoiceProvider,
  attributes: AttributesSlimResponse,
): ProviderDisplayData => {
  const { user, headline, allow_bookings, stats, locations, summary } =
    provider;
  const languageId = provider.languages?.[0];
  const voiceAgeGenderId = provider.voice_age_genders?.[0];
  const voiceTypeId = provider.voice_types?.[0];

  return {
    user,
    headline,
    allow_bookings,
    summary: summary ?? null,
    languageLabel:
      languageId != null
        ? getAttributeValueName(attributes, "languages", languageId)
        : null,
    voiceAgeGenderLabel:
      voiceAgeGenderId != null
        ? getAttributeValueName(
            attributes,
            "voice_age_genders",
            voiceAgeGenderId,
          )
        : null,
    voiceTypeLabel:
      voiceTypeId != null
        ? getAttributeValueName(attributes, "voice_types", voiceTypeId)
        : null,
    picture: user.picture_medium ?? user.picture_small ?? user.picture_large,
    rating: stats.reviews_rating ?? stats.reviews_score ?? null,
    reviewsCount: stats.reviews_count ?? 0,
    locationLabel:
      user?.location ??
      locations?.[0]?.full_name ??
      locations?.[0]?.country_name ??
      null,
    lastActiveLabel: user.last_interaction
      ? formatLastActive(user.last_interaction)
      : null,
  };
};
