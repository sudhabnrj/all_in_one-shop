
import { createSlice } from '@reduxjs/toolkit';
const productSlice = createSlice({
    name: 'product',
    initialState: {
        productList: [],
        singleProduct: [],
        isGridView: false,
    },
    reducers: {
        addAllProducts: (state, action)=> {
            state.productList = action.payload;
        },
        addSingleProduct: (state, action)=> {
            state.singleProduct = action.payload;
        },
        setIsGridView: (state)=> {
            state.isGridView = !state.isGridView;
        }
    }
});

export const {addAllProducts, addSingleProduct, setIsGridView} = productSlice.actions;
export default productSlice.reducer;