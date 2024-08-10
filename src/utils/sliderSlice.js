import { createSlice } from '@reduxjs/toolkit'
const sliderSlice = createSlice({
    name: 'homeSlider',
    initialState: {
        sliderData: []
    },
    reducers: {
        addHomeSlider: (state, action)=> {
            state.sliderData = action.payload
        },
    }
});

export const { addHomeSlider } = sliderSlice.actions;
export default sliderSlice.reducer;