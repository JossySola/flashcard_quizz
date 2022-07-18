import { configureStore } from '@reduxjs/toolkit'
import listReducer from './containers/components/slices/listSlice'

export const store = configureStore({
    reducer: {
        list: listReducer
    }
})