import { useEffect } from 'react';
import { EnhancedPoem } from '@/types/poetry';
import { LoadingSpinner } from './ui/LoadingSpinner';

interface PoemModalProps {
  poem: EnhancedPoem;
  isOpen: boolean;
  onClose: () => void;
}

export function PoemModal({ poem, isOpen, onClose }: PoemModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {poem.sectionTitle || poem.bookTitle}
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-lg">
              {poem.poemText}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
