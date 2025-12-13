'use client';

import { useState } from 'react';
import { ImageUploader } from '@/components/ImageUploader';
import { PersonOptions } from '@/components/PersonOptions';
import { GenerateButton } from '@/components/GenerateButton';
import { ChatInput } from '@/components/ChatInput';
import { ResultModal } from '@/components/ResultModal';
import type { PersonOptions as PersonOptionsType, GenerateResponse } from '@/types';

export default function Home() {
  const [topImage, setTopImage] = useState<string | null>(null);
  const [bottomImage, setBottomImage] = useState<string | null>(null);
  const [personOptions, setPersonOptions] = useState<PersonOptionsType>({
    gender: 'female',
    hairstyle: 'medium',
    height: 'average',
  });
  const [customPrompt, setCustomPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canGenerate = topImage && bottomImage && !isLoading;

  const handleGenerate = async () => {
    if (!topImage || !bottomImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topClothingImage: topImage,
          bottomClothingImage: bottomImage,
          personOptions,
          customPrompt: customPrompt || undefined,
        }),
      });

      const data: GenerateResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Generation failed');
      }

      setResultImage(data.imageData || null);
      setIsModalOpen(true);
      setCustomPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
      <main className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            服の組み合わせチェック
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            上下の服を選んで着用イメージを生成
          </p>
        </div>

        {/* Image Uploaders */}
        <div className="grid grid-cols-2 gap-4">
          <ImageUploader
            label="トップス"
            image={topImage}
            onImageSelect={setTopImage}
          />
          <ImageUploader
            label="ボトムス"
            image={bottomImage}
            onImageSelect={setBottomImage}
          />
        </div>

        {/* Person Options */}
        <PersonOptions options={personOptions} onChange={setPersonOptions} />

        {/* Generate Button */}
        <GenerateButton
          disabled={!canGenerate}
          loading={isLoading}
          onClick={handleGenerate}
        />

        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Chat Input */}
        <ChatInput
          value={customPrompt}
          onChange={setCustomPrompt}
          disabled={isLoading}
        />
      </main>

      {/* Result Modal */}
      <ResultModal
        isOpen={isModalOpen}
        imageData={resultImage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
