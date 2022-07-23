import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// THUNKS
export const loadListAsync = createAsyncThunk(
    'list/loadListAsync',
    async () => {
        const response = await fetch('./src/data/data.json')
        const json = await response.json()
        return json
    }
)

// SLICE
export const listSlice = createSlice({
    name: 'list',
    initialState: {
        topics: [],
        quizzes: [],
        loading: false,
        failed: false
    },
    reducers: { // ONLY using createSlice, the reducers MUST MUTATE the original States
        addTopic: (state, action) => {
            state.topics.push(action.payload)
        },
        addQuizz: (state, action) => {
            state.quizzes.push(action.payload)
        },
        deleteTopic: (state, action) => {
            state.topics = state.topics.filter(element => element.id !== action.payload)
        },
        deleteQuizz: (state, action) => {
            state.quizzes = state.quizzes.filter(element => element.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadListAsync.pending, (state) => { // Depending on the Promise status it updates the List states
                state.loading = true
                state.failed = false
            })
            .addCase(loadListAsync.fulfilled, (state, action) => { // Depending on the Promise status it updates the List states
                state.loading = false
                state.failed = false
                const obj = action.payload // the json response returned by Thunk

                for(let element in obj) { // This runs only in the first render by useEffect in the List component
                    if(element === 'topics') { // If the object property is "topics", it pushes every value into the topic Array (the state)
                        obj[element].map((el) => {
                            state.topics.push(el)
                        })
                    } else if(element === 'quizzes') { // If the object property is "quizzes", it pushes every value into the quizzes Array (the state)
                        obj[element].map((el) => {
                            state.quizzes.push(el)
                        })
                    }
                }
            })
            .addCase(loadListAsync.rejected, (state) => { // Depending on the Promise status it updates the List states
                state.loading = false
                state.failed = true
            })
    }
})

// SELECTORS
export const selectList = (state) => {
    return state.list
}
export const selectTopics = (state) => {
    return state.list.topics
}
export const selectQuizzes = (state) => {
    return state.list.quizzes
}
export const isLoading = (state) => {
    return state.list.loading
}
export const isFailing = (state) => {
    return state.list.failed
}
// High-Order Function
export const selectQuizzesByTopic = (id) => {
    return (state) => {
        const filteredResult = state.list.quizzes.filter(object => object.topicId === id)
        return filteredResult
    }
}

// EXPORT
export default listSlice.reducer;
export const {addTopic, addQuizz, deleteTopic, deleteQuizz} = listSlice.actions;