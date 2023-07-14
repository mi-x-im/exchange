import pkg from '@reduxjs/toolkit'
const {createAsyncThunk, createSlice} =pkg;

// Создаем асинхронное действие с типом 'cryptos/get'
export const getCryptos = createAsyncThunk("cryptos/get", async (_, thunkAPI) => {
  try {
    // Добавляем лог перед запросом
    console.log("Making a request to the backend");

    // Делаем запрос к бекенду по адресу /api/cryptos
    const res = await fetch("/api/users/cryptocurrencies", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    // Добавляем лог после запроса
    console.log("Got a response from the backend");

    const data = await res.json();

    // Добавляем лог данных в консоль
    console.log(data);

    if (res.status === 200) {
      // Возвращаем данные, если статус ответа 200
      console.log("200");
      return data;
    } else {
      // Возвращаем ошибку, если нет
      console.log("cho za h");
      return thunkAPI.rejectWithValue(data);
    }
  } catch (err) {
    // Добавляем лог ошибки в консоль
    console.log("cho za hh");
    console.error(err);

    // Возвращаем ошибку, если есть исключение
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// Создаем начальное состояние для стейта с данными о криптовалютах
const initialState = {
  cryptos: [],
  loading: false,
  error: null,
};

// Создаем слайс с именем cryptoSlice
const cryptoSlice = createSlice({
  name: "cryptoSlice",
  initialState,
  // Добавляем редьюсеры для обработки разных стадий асинхронного действия
  extraReducers: {
    // Обрабатываем начало запроса
    [getCryptos.pending]: (state) => {
      // Устанавливаем loading в true и error в null
      state.loading = true;
      state.error = null;
    },
    // Обрабатываем успешный ответ
    [getCryptos.fulfilled]: (state, action) => {
      // Устанавливаем loading в false и cryptos в данные из действия
      state.loading = false;
      state.cryptos = action.payload;
    },
    // Обрабатываем неудачный ответ
    [getCryptos.rejected]: (state, action) => {
      // Устанавливаем loading в false и error в данные из действия
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Экспортируем редьюсер из слайса
export default cryptoSlice.reducer;