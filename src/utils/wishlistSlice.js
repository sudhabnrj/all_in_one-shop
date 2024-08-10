import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
    },
    reducers: {
        addWishlistItem: (state, action) => {
            const newWishlistItem = {...action.payload, quantity: 1, isAdded: true}
            state.items.push(newWishlistItem);
        },
        removeWishlistItem: (state, action) => {
            state.items = state.items.filter((item)=> item.id !== action.payload);
        },
        // setAddedToWishlist: (state, action) => {
        //     state.addedToWishlist = action.payload;
        // }
    }
});

export const {addWishlistItem, removeWishlistItem} = wishlistSlice.actions; 
export default wishlistSlice.reducer;