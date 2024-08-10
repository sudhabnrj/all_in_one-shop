import { createSlice } from '@reduxjs/toolkit';
const cateoryListSlice = createSlice({
    name: 'categoryList',
    initialState: {
        categoryListData: [],
        productByCategory: [],
    },
    reducers: {
        setCategoryListData:(state, action)=> {
            state.categoryListData = action.payload;
        },
        setProductByCategory:(state, action)=>{
            state.productByCategory = action.payload;
        },
    }
});

export const { setCategoryListData, setProductByCategory } = cateoryListSlice.actions;
export default cateoryListSlice.reducer;