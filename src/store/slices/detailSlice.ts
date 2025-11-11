import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { animeApi } from '../../services/animeApi';
import { Anime } from '../../types/anime';

interface DetailState {
  anime: Anime | null;
  loading: boolean;
  error: string | null;
}

const initialState: DetailState = {
  anime: null,
  loading: false,
  error: null,
};

export const fetchAnimeDetail = createAsyncThunk(
  'detail/fetchAnimeDetail',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await animeApi.getAnimeById(id);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An error occurred');
    }
  }
);

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    clearDetail: (state) => {
      state.anime = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.anime = action.payload;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDetail } = detailSlice.actions;
export default detailSlice.reducer;

