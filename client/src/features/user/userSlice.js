import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.user = action.payload.id
        },

        setToken: (state, action) => {
            state.token = action.payload.token
        },
        setPurge: (state, action) => {
            state.token = null
            state.user = null
        }
    }
})

export const { setId, setToken, setPurge } = userSlice.actions

export default userSlice.reducer
