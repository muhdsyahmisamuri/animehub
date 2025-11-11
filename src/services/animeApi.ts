import { SearchAnimeResponse, AnimeDetailResponse } from '../types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

// AbortController storage for request cancellation
let searchAbortController: AbortController | null = null;

export const animeApi = {
  searchAnime: async (query: string, page: number = 1): Promise<SearchAnimeResponse> => {
    // Cancel previous request if exists
    if (searchAbortController) {
      searchAbortController.abort();
    }

    // Create new abort controller for this request
    searchAbortController = new AbortController();

    try {
      const response = await fetch(
        `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20`,
        { signal: searchAbortController.signal }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request cancelled');
      }
      throw error;
    }
  },

  getAnimeById: async (id: number): Promise<AnimeDetailResponse> => {
    const response = await fetch(`${BASE_URL}/anime/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }
};

