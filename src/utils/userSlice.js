import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        allUsers: [],
        currentUser: null,
        loggedInUser: null,
        isDropdown: false
    },
    reducers: {
        addAllUser: (state, action) => {
            state.allUsers.push(action.payload);
        },
        addCurrentUser: (state, action)=> {
            state.currentUser = action.payload;
        },
        setLoggedInUser: (state, action)=> {
            state.loggedInUser = action.payload;
        },
        updateUserInAllUsers: (state, action) => {
            const updatedUser = action.payload;
            const index = state.allUsers.findIndex((user)=> user.user.userId === updatedUser.user.userId);
            if(index > -1){
                state.allUsers[index] = updatedUser;
            }
        },
        setIsDropdown: (state, action) => {
            state.isDropdown = action.payload;
        }
        
    }
});

export const { addAllUser, addCurrentUser, setLoggedInUser, setIsDropdown, updateUserInAllUsers } = userSlice.actions;
export default userSlice.reducer;
