import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// THUNKS
export const loadListAsync = createAsyncThunk(
    'list/getList',
    async () => {
        const response = await fetch('./src/data/data.json')
        const json = await response.json()
        return json
    }
)

// SLICER
export const listSlice = createSlice({
    name: 'list',
    initialState: {
        topics: [],
        quizzes: [],
        loading: false,
        failed: false
    },
    reducers: {
        addTopic: (state, action) => {
            state.topics.push(action.payload)
        },
        addQuizz: (state, action) => {
            state.quizzes.push(action.payload)
        },
        deleteTopic: (state, action) => {
            state.topics.filter(element => element.id != action.payload)
        },
        deleteQuizz: (state, action) => {
            state.quizzes.filter(element => element.id != action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadListAsync.pending, (state) => {
                state.loading = true
                state.failed = false
            })
            .addCase(loadListAsync.fulfilled, (state, action) => {
                state.loading = false
                state.failed = false
                const obj = action.payload // the json response returned by Thunk

                console.log(obj)
                /*
                
                    for(let element in obj) {
                        if(element === 'topics') {
                            console.log(obj[element])
                            obj[element].map((el) => {
                                state.topics.push(el)
                            })
                        } else if(element === 'quizzes') {
                            obj[element].map((el) => {
                                state.quizzes.push(el)
                            })
                        }
                    }
                
                */
            })
            .addCase(loadListAsync.rejected, (state) => {
                state.loading = false
                state.failed = true
            })
    }
})

// SELECTORS
export const selectList = (state) => {
    return state.list
}
export const isLoading = (state) => {
    return state.list.loading
}
export const isFailing = (state) => {
    return state.list.failed
}

// EXPORT
export default listSlice.reducer;
export const {addTopic, addQuizz, deleteTopic, deleteQuizz} = listSlice.actions;