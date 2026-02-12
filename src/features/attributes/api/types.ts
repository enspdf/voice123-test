export interface AttributeHighlight {
  scope: string[];
}

export interface AttributeValueBase {
  id: number;
  name: string;
  stripe_payouts_enabled: boolean;
  enabled: boolean;
}

export interface AttributeValue extends AttributeValueBase {
  code?: string;
  custom_data?: Record<string, unknown>;
  score?: number;
  old?: boolean;
  category_page_slug?: string;
  filterable?: boolean;
  icon?: string;
  caption?: string[];
  service_id?: string;
  order?: number;
  scope?: string[];
  roles?: string[];
}

export interface AttributeDefinition {
  id: number;
  scope: string[];
  roles: string[];
  name: string;
  display_name: string;
  highlight: AttributeHighlight;
  values: AttributeValue[];
}

export type AttributesResponse = AttributeDefinition[];

export interface AttributeValueSlim {
  id: number;
  name: string;
}

export interface AttributeSlim {
  id: number;
  name: string;
  display_name: string;
  values: AttributeValueSlim[];
}

export type AttributesSlimResponse = AttributeSlim[];

export const ATTRIBUTE_NAMES_ALLOWED: readonly string[] = [
  "languages",
  "voice_age_genders",
  "tones",
  "voice_types",
] as const;
