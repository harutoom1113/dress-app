export interface PersonOptions {
  gender: 'male' | 'female';
  hairstyle: string;
  height: 'short' | 'average' | 'tall';
}

export interface GenerateRequest {
  topClothingImage: string;
  bottomClothingImage: string;
  personOptions: PersonOptions;
  customPrompt?: string;
}

export interface GenerateResponse {
  success: boolean;
  imageData?: string;
  error?: string;
}

export interface GeminiPart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

export interface GeminiContent {
  parts: GeminiPart[];
  role?: string;
}

export interface GeminiCandidate {
  content: {
    parts: GeminiPart[];
  };
  finishReason: string;
}

export interface GeminiResponse {
  candidates: GeminiCandidate[];
}

export const HAIRSTYLE_OPTIONS = {
  male: [
    { value: 'short', label: 'ショート' },
    { value: 'medium', label: 'ミディアム' },
    { value: 'buzz', label: 'ベリーショート' },
    { value: 'wavy', label: 'ウェーブ' },
  ],
  female: [
    { value: 'short-bob', label: 'ショートボブ' },
    { value: 'medium', label: 'ミディアム' },
    { value: 'long-straight', label: 'ロングストレート' },
    { value: 'long-wavy', label: 'ロングウェーブ' },
    { value: 'ponytail', label: 'ポニーテール' },
  ],
} as const;

export const HEIGHT_OPTIONS = [
  { value: 'short', label: '低め (160cm)', cm: 160 },
  { value: 'average', label: '普通 (170cm)', cm: 170 },
  { value: 'tall', label: '高め (180cm)', cm: 180 },
] as const;
