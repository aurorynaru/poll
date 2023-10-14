import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null,
    id: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload.id
        },

        setToken: (state, action) => {
            state.token = action.payload.token
        },
        setPurge: (state, action) => {
            state.token = null
            state.id = null
        }
    }
})

export const { setId, setToken, setPurge } = userSlice.actions

export default userSlice.reducer
