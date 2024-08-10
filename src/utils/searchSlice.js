import { createSlice } from '@reduxjs/toolkit';
const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchQuery: '',
        searchResult: [],
        showSearchSuggestion: false,

    },
    reducers:{
        setSearchQuery: (state, action)=> {
            state.searchQuery = action.payload;
        },
        addSerachResult: (state, action)=> {
            state.searchResult = action.payload;
        },
        setShowSearchSuggestion: (state, action)=> {
            state.showSearchSuggestion = action.payload;
        }
    }
});

export const { setSearchQuery, addSerachResult, setShowSearchSuggestion } = searchSlice.actions;
export default searchSlice.reducer;