import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Anime } from '../../types/anime';

interface HomeState {
  topAnime: Anime[];
  seasonNow: Anime[];
  loading: {
    topAnime: boolean;
    seasonNow: boolean;
  };
  error: string | null;
}

const initialState: HomeState = {
  topAnime: [],
  seasonNow: [],
  loading: {
    topAnime: false,
    seasonNow: false,
  },
  error: null,
};

const BASE_URL = 'https://api.jikan.moe/v4';

export const fetchTopAnime = createAsyncThunk(
  'home/fetchTopAnime',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/top/anime?limit=20`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An error occurred');
    }
  }
);

export const fetchSeasonNow = createAsyncThunk(
  'home/fetchSeasonNow',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/seasons/now?limit=20`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An error occurred');
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Top Anime
      .addCase(fetchTopAnime.pending, (state) => {
        state.loading.topAnime = true;
        state.error = null;
      })
      .addCase(fetchTopAnime.fulfilled, (state, action) => {
        state.loading.topAnime = false;
        state.topAnime = action.payload;
      })
      .addCase(fetchTopAnime.rejected, (state, action) => {
        state.loading.topAnime = false;
        state.error = action.payload as string;
      })
      // Season Now
      .addCase(fetchSeasonNow.pending, (state) => {
        state.loading.seasonNow = true;
        state.error = null;
      })
      .addCase(fetchSeasonNow.fulfilled, (state, action) => {
        state.loading.seasonNow = false;
        state.seasonNow = action.payload;
      })
      .addCase(fetchSeasonNow.rejected, (state, action) => {
        state.loading.seasonNow = false;
        state.error = action.payload as string;
      });
  },
});

export default homeSlice.reducer;

