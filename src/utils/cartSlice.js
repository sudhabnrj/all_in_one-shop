
import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        isAdded: false,
    },
    reducers: {
        addItem: (state, action)=> {
            const newItem = {...action.payload, quantity: 1};
            state.items.push(newItem);
        },
        setItemAdded: (state, action)=> {
            state.isAdded = action.payload;
        },
        removeItem: (state, action)=> {
            state.items = state.items.filter((item)=> item.id !== action.payload);
        },
        clearCart: (state, action)=> {
            state.items.length = 0;
        },
        updateQuantity: (state, action)=> {
            const { id, quantity } = action.payload;
            const item = state.items.find((item)=> item.id === id);
            if(item){
                item.quantity = quantity;
            }
            // console.log(item)
        }
        
    }
});

export const { addItem, setItemAdded, removeItem, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;