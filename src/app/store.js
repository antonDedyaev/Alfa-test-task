import { configureStore } from "@reduxjs/toolkit";
import dogsReducer from "../slices/dogsSlice";

export default configureStore({
    reducer: {
        dogs: dogsReducer,
    }
})

