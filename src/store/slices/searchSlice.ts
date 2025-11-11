import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { animeApi } from '../../services/animeApi';
import { Anime } from '../../types/anime';

interface SearchState {
  results: Anime[];
  loading: boolean;
  error: string | null;
  query: string;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
  query: '',
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
};

export const searchAnime = createAsyncThunk(
  'search/searchAnime',
  async ({ query, page }: { query: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await animeApi.searchAnime(query, page);
      return {
        results: response.data,
        currentPage: response.pagination.current_page,
        totalPages: response.pagination.last_visible_page,
        hasNextPage: response.pagination.has_next_page,
        query,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Request cancelled') {
          return rejectWithValue('cancelled');
        }
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An error occurred');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.error = null;
    },
    resetSearch: (state) => {
      state.results = [];
      state.loading = false;
      state.error = null;
      state.query = '';
      state.currentPage = 1;
      state.totalPages = 1;
      state.hasNextPage = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.query = action.payload.query;
      })
      .addCase(searchAnime.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== 'cancelled') {
          state.error = action.payload as string;
        }
      });
  },
});

export const { setQuery, clearResults, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;

