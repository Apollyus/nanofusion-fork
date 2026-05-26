import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeMediaUrl(url: string): string {
  if (!url) return ''

  // Google Drive
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^\/\?]+)/)
  if (driveMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`
  }

  // YouTube
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^\/\?\&]+)/)
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`
  }

  return url
}

export async function compressImage(file: File, maxWidth = 1920): Promise<File> {
  if (!file.type.startsWith('image/')) return file;
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(file);
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file);
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/jpeg',
          0.8
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}
