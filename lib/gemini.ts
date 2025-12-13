import type { PersonOptions, GeminiResponse, GeminiPart } from '@/types';
import { extractBase64 } from './imageUtils';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

const HEIGHT_MAP = {
  short: '160cm',
  average: '170cm',
  tall: '180cm',
} as const;

function buildPrompt(personOptions: PersonOptions, customPrompt?: string): string {
  const gender = personOptions.gender === 'male' ? 'male' : 'female';
  const genderJa = personOptions.gender === 'male' ? '男性' : '女性';
  const height = HEIGHT_MAP[personOptions.height];

  let prompt = `Generate a full-body fashion image of a ${gender} person (${genderJa}) with ${personOptions.hairstyle} hairstyle, approximately ${height} tall. `;
  prompt += `The person should be shown as a simple, clean silhouette/figure wearing the exact clothing items provided in the reference images. `;
  prompt += `The TOP/upper body clothing from the FIRST reference image must be worn on the upper body. `;
  prompt += `The BOTTOM/lower body clothing from the SECOND reference image must be worn on the lower body. `;
  prompt += `IMPORTANT: Faithfully reproduce the exact colors, patterns, textures, and details of both clothing items from the reference images. `;
  prompt += `Use a clean, neutral white or light gray background. `;
  prompt += `The pose should be natural and show both clothing items clearly. `;

  if (customPrompt && customPrompt.trim()) {
    prompt += `Additional user instructions: ${customPrompt.trim()}`;
  }

  return prompt;
}

export async function generateOutfitImage(
  topImageDataUrl: string,
  bottomImageDataUrl: string,
  personOptions: PersonOptions,
  customPrompt?: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const topImage = extractBase64(topImageDataUrl);
  const bottomImage = extractBase64(bottomImageDataUrl);
  const prompt = buildPrompt(personOptions, customPrompt);

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: topImage.mimeType,
                data: topImage.data,
              },
            },
            {
              inlineData: {
                mimeType: bottomImage.mimeType,
                data: bottomImage.data,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `API request failed with status ${response.status}`
    );
  }

  const data: GeminiResponse = await response.json();

  const imagePart = data.candidates?.[0]?.content?.parts?.find(
    (part: GeminiPart) => part.inlineData
  );

  if (!imagePart?.inlineData?.data) {
    throw new Error('No image generated in response');
  }

  return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
}
