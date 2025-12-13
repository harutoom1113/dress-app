'use client';

import { useRef } from 'react';
import { fileToBase64 } from '@/lib/imageUtils';

interface ImageUploaderProps {
  label: string;
  image: string | null;
  onImageSelect: (base64: string) => void;
}

export function ImageUploader({ label, image, onImageSelect }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await fileToBase64(file);
      onImageSelect(base64);
    } catch (error) {
      console.error('Failed to read file:', error);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <div
        onClick={handleClick}
        className="w-full aspect-square border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-xl flex items-center justify-center cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors overflow-hidden bg-zinc-50 dark:bg-zinc-800"
      >
        {image ? (
          <img
            src={image}
            alt={label}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center p-4">
            <svg
              className="mx-auto h-12 w-12 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              クリックして画像を選択
            </p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
