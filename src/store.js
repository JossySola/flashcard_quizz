import { configureStore } from '@reduxjs/toolkit'
import listReducer from './containers/components/slices/listSlice'
import quizzReducer from './containers/components/slices/quizzSlice'

export const store = configureStore({
    reducer: {
        list: listReducer,
        quizz: quizzReducer
    }
})