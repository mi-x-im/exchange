import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCryptocurrencies = createAsyncThunk(
  'cryptocurrencies/fetch',
  async () => {
    const response = await fetch('/api/users/cryptocurrencies');
    const data = await response.json();
    return data;
  }
);

const initialState = {
  cryptocurrencies: [],
  loading: false,
};

const cryptocurrenciesSlice = createSlice({
  name: 'cryptocurrencies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCryptocurrencies.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCryptocurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptocurrencies = action.payload;
      })
      .addCase(fetchCryptocurrencies.rejected, state => {
        state.loading = false;
      });
  },
});

export default cryptocurrenciesSlice.reducer;