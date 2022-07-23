import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// THUNKS
export const loadQuizzesAsync = createAsyncThunk(
    'quizz/loadQuizzesAsync',
    async () => {
        const response = await fetch('./src/data/data.json')
        const json = await response.json()
        return json.cards
    }
)

// SLICE
export const quizzSlice = createSlice({
    name: 'quizz',
    initialState: {
        cards: []
    },
    reducers: {
        addCards: (state, action) => {
            state.cards.push(action.payload)
        },
        deleteCards: (state, action) => {
            state.cards = state.cards.filter(element => element.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadQuizzesAsync.fulfilled, (state, action) => { // Depending on the Promise status it updates the List states
            action.payload.map((object) => {
                state.cards.push(object)
            })
        })
    }
})

// SELECTORS
export const selectCards = (state) => {
    return state.quizz.cards
}
// Curry Function
export const selectCardsById = (id) => (state) => {
    let filteredCards = []
    filteredCards = state.quizz.cards.filter(el => el.id === id)
    return filteredCards
}
export const selectCardsByQuizz = (id) => (state) => {
    let filteredCards = []
    filteredCards = state.quizz.cards.filter(el => el.quizzId === id)
    return filteredCards[0]
}

// EXPORT
export default quizzSlice.reducer;
export const { addCards, deleteCards } = quizzSlice.actions;