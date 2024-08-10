
import { createSlice } from '@reduxjs/toolkit';
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        allOrder: [],
    },
    reducers: {
        addOrder: (state, action)=> {
            state.allOrder.push(action.payload);
        }
    }
});

export const {addOrder} = orderSlice.actions;
export default orderSlice.reducer;