'use client';

import type { PersonOptions as PersonOptionsType } from '@/types';
import { HAIRSTYLE_OPTIONS, HEIGHT_OPTIONS } from '@/types';

interface PersonOptionsProps {
  options: PersonOptionsType;
  onChange: (options: PersonOptionsType) => void;
}

export function PersonOptions({ options, onChange }: PersonOptionsProps) {
  const hairstyles = HAIRSTYLE_OPTIONS[options.gender];

  const handleGenderChange = (gender: 'male' | 'female') => {
    const newHairstyles = HAIRSTYLE_OPTIONS[gender];
    onChange({
      ...options,
      gender,
      hairstyle: newHairstyles[0].value,
    });
  };

  return (
    <div className="space-y-4">
      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          性別
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleGenderChange('male')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              options.gender === 'male'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
            }`}
          >
            男性
          </button>
          <button
            type="button"
            onClick={() => handleGenderChange('female')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              options.gender === 'female'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
            }`}
          >
            女性
          </button>
        </div>
      </div>

      {/* Hairstyle */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          髪型
        </label>
        <select
          value={options.hairstyle}
          onChange={(e) => onChange({ ...options, hairstyle: e.target.value })}
          className="w-full py-2 px-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
        >
          {hairstyles.map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
      </div>

      {/* Height */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          身長
        </label>
        <select
          value={options.height}
          onChange={(e) =>
            onChange({ ...options, height: e.target.value as 'short' | 'average' | 'tall' })
          }
          className="w-full py-2 px-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
        >
          {HEIGHT_OPTIONS.map((height) => (
            <option key={height.value} value={height.value}>
              {height.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
