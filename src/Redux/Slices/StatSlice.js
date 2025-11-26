import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    allUsersCount: 0,
    subscribedUsersCount: 0,
    monthlySalesRecord: []
}

export const getStatsData = createAsyncThunk('stats/monthlySalesData/get', async () => {

    try {
        const response = axiosInstance.get('/admin/stats/users')
        toast.promise(response, {
            loading: 'Loading stats...',
            success: (data) => data?.data?.message,
            error: 'Failed to load stats'
        })
        return (await response).data

    } catch (e) {
        toast.error(e?.response?.data?.message);
    }

})

export const getUsersCount = createAsyncThunk('/subscribedUsers/count', async () => {

    try {
        const response = axiosInstance.get('/admin/stats/users/subscribedUsersCount')
        toast.promise(response, {
            loading: 'Loading subscribed users...',
            success: 'Subscribed users loaded successfully',
            error: 'Failed to load subscribed users'
        })
        return (await response).data
    }
    catch (e) {
        toast.error(e?.response?.data?.message);
    }
})

const statSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStatsData.fulfilled, (state, action) => {
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord
            })
            .addCase(getUsersCount.fulfilled, (state, action) => {
                // console.log(action);
                
                state.subscribedUsersCount = action?.payload?.subscribedUsersCount
                state.allUsersCount = action?.payload?.allUsersCount
            })
    }
})

export default statSlice.reducer