import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export const createAccount = createAsyncThunk('/auth/signup',async (data) => {

    try{
        const res = axiosInstance.post('user/register', data);
        toast.promise(res,{
            loading: 'Creating account...',
            success: (data)=> data?.data?.message,
            error: 'Failed to create account'
        })
        return (await res).data;
        

    }catch(e){
        toast.error(e?.response?.data?.message);
    }

});
// export const {} = authSlice.actions;
export default authSlice.reducer;