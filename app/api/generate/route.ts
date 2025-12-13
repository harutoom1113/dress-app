import { NextRequest, NextResponse } from 'next/server';
import { generateOutfitImage } from '@/lib/gemini';
import { isValidImageDataUrl } from '@/lib/imageUtils';
import type { GenerateRequest, GenerateResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<GenerateResponse>> {
  try {
    const body: GenerateRequest = await request.json();

    const { topClothingImage, bottomClothingImage, personOptions, customPrompt } = body;

    // Validate required fields
    if (!topClothingImage || !bottomClothingImage) {
      return NextResponse.json(
        { success: false, error: 'Both top and bottom clothing images are required' },
        { status: 400 }
      );
    }

    if (!isValidImageDataUrl(topClothingImage) || !isValidImageDataUrl(bottomClothingImage)) {
      return NextResponse.json(
        { success: false, error: 'Invalid image format' },
        { status: 400 }
      );
    }

    if (!personOptions || !personOptions.gender || !personOptions.hairstyle || !personOptions.height) {
      return NextResponse.json(
        { success: false, error: 'Person options are required' },
        { status: 400 }
      );
    }

    // Generate the outfit image
    const imageData = await generateOutfitImage(
      topClothingImage,
      bottomClothingImage,
      personOptions,
      customPrompt
    );

    return NextResponse.json({
      success: true,
      imageData,
    });
  } catch (error) {
    console.error('Generate API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
