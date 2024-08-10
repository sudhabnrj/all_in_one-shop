import { createSlice } from '@reduxjs/toolkit';

const newsSlice = createSlice({
    name: 'blog',
    initialState:{
        list: [],
    
    },
    reducers: {
        addNewsList : (state, action) => {
            state.list = action.payload;
        },
    }
});

export const { addNewsList } = newsSlice.actions;

export default newsSlice.reducer;