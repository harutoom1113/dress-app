'use client';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export function ChatInput({ value, onChange, disabled }: ChatInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        追加の指示（任意）
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="例：カジュアルなポーズで、背景は屋外の公園にして"
        rows={3}
        className="w-full py-2 px-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-50 resize-none"
      />
    </div>
  );
}
