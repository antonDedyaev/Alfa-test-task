/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import apiPath from '../utils/routes';

const initialState = {
  items: [],
  filtered: false,
  status: 'idle',
};

export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
  const response = await axios.get(apiPath);
  return response.data;
});

const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    addedToFavourites: (state, action) => {
      const imageId = action.payload;
      const addedImage = state.items.find((item) => item.id === imageId);
      addedImage.isFavourite = true;
    },
    removedFromFavourites: (state, action) => {
      const imageId = action.payload;
      const favouriteImage = state.items.find((item) => item.id === imageId);
      favouriteImage.isFavourite = false;
    },
    imageRemoved: (state, action) => {
      const imageId = action.payload;
      const filtered = state.items.filter((item) => item.id !== imageId);
      state.items = filtered;
    },
    imagesFiltered: (state, action) => {
      state.filtered = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const urls = action.payload;
        urls.forEach((url) => {
          const imageData = { id: nanoid(), url, isFavourite: false };
          state.items.push(imageData);
        });
      });
  },
});

export const {
  addedToFavourites, removedFromFavourites, imageRemoved, imagesFiltered,
} = dogsSlice.actions;

export default dogsSlice.reducer;
