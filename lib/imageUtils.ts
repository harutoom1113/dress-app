/**
 * Extracts base64 data from a data URL
 */
export function extractBase64(dataUrl: string): { mimeType: string; data: string } {
  const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid data URL format');
  }
  return {
    mimeType: matches[1],
    data: matches[2],
  };
}

/**
 * Validates that a string is a valid image data URL
 */
export function isValidImageDataUrl(dataUrl: string): boolean {
  return /^data:image\/(png|jpeg|jpg|webp|gif);base64,/.test(dataUrl);
}

/**
 * Converts a File to base64 data URL
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
