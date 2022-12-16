import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { nanoid } from '@reduxjs/toolkit'
import { apiPath } from '../utils/routes'

const initialState = {
    items: [],
    favourites: [],
}


export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
    const response = await axios.get(apiPath)
    return response.data
})

const dogsSlice = createSlice({
    name: 'dogs',
    initialState,
    reducers: {
        addedToFavourites: (state, action) => {
            state.favourites.push(action.payload);
        },
        imageRemoved: (state, action) => {
            const imageId = action.payload;
            const filtered = state.items.filter((item) => item.id !== imageId);
            state.items = filtered;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImages.fulfilled, (state, action) => {
                const urls = action.payload;
                urls.forEach((url) => {
                    const imageData = { id: nanoid(), url };
                    state.items.push(imageData);
                })
                
            })
    }
})

export const { addedToFavourites, imageRemoved } = dogsSlice.actions;

export default dogsSlice.reducer;