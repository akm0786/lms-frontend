import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {}
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('data', JSON.stringify(action?.payload?.user));
                localStorage.setItem('role', action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.role = action?.payload?.user?.role;
                state.data = action?.payload?.user;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear()
                state.isLoggedIn = false;
                state.role = "";
                state.data = {};
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('data', JSON.stringify(action?.payload?.user));
                localStorage.setItem('role', action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.role = action?.payload?.user?.role;
                state.data = action?.payload?.user;
                console.log(action?.payload);
                console.log(state?.data);
                
            })

    }
});

export const createAccount = createAsyncThunk('/auth/signup', async (data) => {

    try {
        const res = axiosInstance.post('user/register', data);
        toast.promise(res, {
            loading: 'Creating account...',
            success: (data) => data?.data?.message,
            error: 'Failed to create account'
        })
        return (await res).data;


    } catch (e) {
        toast.error(e?.response?.data?.message);
    }

});
export const login = createAsyncThunk('/auth/login', async (data) => {

    try {
        const res = axiosInstance.post('user/login', data);
        toast.promise(res, {
            loading: 'wait! Logging in account...',
            success: (data) => data?.data?.message,
            error: 'Failed to create account'
        })
        return (await res).data;


    } catch (e) {
        toast.error(e?.response?.data?.message);
    }

});

export const logout = createAsyncThunk('/auth/logout', async () => {

    try {
        const res = axiosInstance.get('user/logout')
        toast.promise(res, {
            loading: 'wait! Logging out account...',
            success: (data) => data?.data?.message,
            error: 'Failed to logout'
        })

        return (await res).data;

    } catch (e) {
        toast.error(e?.response?.data?.message);
    }

})
export const updateProfile = createAsyncThunk('/user/update/profile', async (data) => {

    try {
        const res = axiosInstance.put('/user/update', data)
        toast.promise(res, {
            loading: 'wait! Updating profile...',
            success: (data) => data?.data?.message,
            error: 'Failed to update profile'
        })

        return (await res).data;

    } catch (e) {
        toast.error(e?.response?.data?.message);
    }

})

export const getUserData = createAsyncThunk('/user/details', async () => {

    try {
        const res = axiosInstance.get('/user/me')
        return (await res).data;

    } catch (e) {
        toast.error(e.message);
    }
})

export const getchangePassword = createAsyncThunk('/user/update/change-password', async (data) => {
    try {
        const response = axiosInstance.post('/change-password', data);
        toast.promise(response, {
            loading: 'Changing password...',
            success: 'Password changed successfully',
            error: 'Failed to change password'
        })
        return (await response).data
        
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    
}) 

// export const {} = authSlice.actions;
export default authSlice.reducer;