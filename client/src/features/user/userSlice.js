import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    address: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
        },
        setAddress: (state, action) => {
            state.address = action.payload.user
        }
    }
})

export const { setUser, setAddress } = userSlice.actions

export default userSlice.reducer
