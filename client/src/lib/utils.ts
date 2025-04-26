import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('tg-TJ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Format time in MM:SS format
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Extract bayt (verse) count from poem content
export function countBayts(content: string): number {
  return content.split('\n').filter(line => line.trim().length > 0).length / 2;
}

// Generate tag color based on tag name
export function getTagColor(tag: string): { bg: string, text: string } {
  const colors = {
    'Ишқ': { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-800 dark:text-blue-100' },
    'Ирфон': { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-800 dark:text-purple-100' },
    'Ҳикмат': { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-100' },
    'Табиат': { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-800 dark:text-yellow-100' },
    'Инсон': { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-800 dark:text-red-100' },
    'default': { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-800 dark:text-gray-100' }
  };
  
  return colors[tag as keyof typeof colors] || colors.default;
}

// Generate daftar color based on daftar number
export function getDaftarColor(daftarNumber: number): string {
  const colors = [
    'bg-primary-700', // 1
    'bg-secondary-700', // 2
    'bg-accent-600', // 3
    'bg-green-700', // 4
    'bg-purple-700', // 5
    'bg-red-700' // 6
  ];
  
  return colors[(daftarNumber - 1) % colors.length];
}

// Share content via Web Share API if available
export function shareContent(title: string, text: string, url?: string): void {
  if (navigator.share) {
    navigator.share({
      title,
      text,
      url: url || window.location.href
    }).catch(error => console.log('Error sharing', error));
  } else {
    // Fallback
    const textArea = document.createElement('textarea');
    textArea.value = `${title}\n\n${text}\n\n${url || window.location.href}`;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Матн ба ҳофиза нусхабардорӣ шуд. Шумо метавонед онро ба дигарон фиристед.');
  }
}
