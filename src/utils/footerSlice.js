
import { createSlice } from '@reduxjs/toolkit';
const footerSlice = createSlice({
    name: 'footerMenu',
    initialState: {
        menuItem: [],
    },
    reducers: {
        addFooterMenu:(state, action)=> {
            state.menuItem = action.payload;
        },
    }
});

export const { addFooterMenu } = footerSlice.actions;
export default footerSlice.reducer;