import { ApiResponse, SearchParams, SearchResult, EnhancedPoem } from '@/types/poetry';

class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.error || 'An error occurred',
      data
    );
  }
  
  return {
    data,
    status: response.status
  };
}

export const apiClient = {
  async searchPoems(params: SearchParams): Promise<ApiResponse<SearchResult>> {
    const searchParams = new URLSearchParams({
      query: params.query,
      page: params.page.toString(),
      pageSize: params.pageSize.toString(),
      ...(params.bookType && { bookType: params.bookType }),
      ...(params.volumeNum && { volumeNum: params.volumeNum.toString() })
    });

    const response = await fetch(`${API_BASE_URL}/api/search?${searchParams}`);
    return handleResponse<SearchResult>(response);
  },

  async getPoemById(id: number, type: 'masnavi' | 'divan' | 'mixed'): Promise<ApiResponse<EnhancedPoem>> {
    const response = await fetch(`${API_BASE_URL}/api/poems/${type}/${id}`);
    return handleResponse<EnhancedPoem>(response);
  },

  async getDailyVerse(): Promise<ApiResponse<EnhancedPoem>> {
    const response = await fetch(`${API_BASE_URL}/api/daily-verse`);
    return handleResponse<EnhancedPoem>(response);
  },

  async getMasnaviVolume(volumeNum: number): Promise<ApiResponse<EnhancedPoem[]>> {
    const response = await fetch(`${API_BASE_URL}/api/masnavi/${volumeNum}`);
    return handleResponse<EnhancedPoem[]>(response);
  },

  async getDivanPoems(page: number = 1, pageSize: number = 10): Promise<ApiResponse<SearchResult>> {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      bookType: 'divan'
    });

    const response = await fetch(`${API_BASE_URL}/api/divan?${searchParams}`);
    return handleResponse<SearchResult>(response);
  },

  async getMixedPoems(page: number = 1, pageSize: number = 10): Promise<ApiResponse<SearchResult>> {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      bookType: 'mixed'
    });

    const response = await fetch(`${API_BASE_URL}/api/mixed?${searchParams}`);
    return handleResponse<SearchResult>(response);
  }
}; 