import { Poem, DivanPoem, MixedPoem, HighlightedVerse, Quote } from '@shared/schema';

export type BookType = 'masnavi' | 'divan' | 'mixed';

export interface BasePoem {
  id: number;
  poemText: string;
  sectionTitle?: string;
  bookTitle?: string;
}

export interface MasnaviPoem extends BasePoem {
  type: 'masnavi';
  volumeNum: number;
  uniqueId: number;
  volumeNumber: string;
}

export interface DivanPoemEnhanced extends BasePoem {
  type: 'divan';
  poemId: number;
  createdAt: Date;
}

export interface MixedPoemEnhanced extends BasePoem {
  type: 'mixed';
  createdAt: Date;
}

export type EnhancedPoem = MasnaviPoem | DivanPoemEnhanced | MixedPoemEnhanced;

export interface PoemModalProps {
  poem: EnhancedPoem;
  isOpen: boolean;
  onClose: () => void;
}

export interface PoemCardProps {
  poem: EnhancedPoem;
  onPoemClick: (poem: EnhancedPoem) => void;
}

export interface SearchResult {
  poems: EnhancedPoem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SearchParams extends PaginationParams {
  query: string;
  bookType?: BookType;
  volumeNum?: number;
} 