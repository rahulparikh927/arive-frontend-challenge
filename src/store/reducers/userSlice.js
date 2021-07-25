import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../../userApis';

const initialState = {
    users: [],
    status: 'idle',
};

// create async for data loading
export const getUsersFromServer = createAsyncThunk(
    'user/fetchUsers',
    async (amount) => {
        const response = await fetchUser(amount);
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload)
        },
        addUserHobbies: (state, action) => {
            state.users[action.payload.user_id].hobbies.push(action.payload.hobbies)
        },
        delUserHobbie: (state, action) => {
            state.users[action.payload.user_id].hobbies = action.payload.newHobbies
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersFromServer.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getUsersFromServer.fulfilled, (state, action) => {
                state.status = 'idle';
                state.users = action.payload;
            });
    },
});

export const { addUser, addUserHobbies, delUserHobbie } = userSlice.actions;

export const selectUser = (state) => state.userStore.users;


export default userSlice.reducer;
