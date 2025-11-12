import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast";
import { act } from "react";

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
}

export const getRazorpayId = createAsyncThunk('/razorpay/getId', async () => {
    try {
        const response = await axiosInstance.get('/payments/razorpay-key')
        return (await response).data

    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const purchaseCourseBundle = createAsyncThunk('/purchaseCourse', async () => {
    try {
        const response = await axiosInstance.post('/payments/subscribe')
        return response.data

    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const verifyUserPayment = createAsyncThunk('/payments/verify', async (data) => {
    try {
        const response = await axiosInstance.post('/payments/verify', {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        })
        return (await response).data

    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
})


export const getPaymentRecord = createAsyncThunk('/Payments/Record', async () => {
    try {
        const response = axiosInstance.get('/payments?count=100')
        toast.promise(response, {
            loading: 'Loading payments...',
            success: (data) => data?.data?.message,
            error: 'Failed to load payments'
        })
        return (await response).data
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
})


export const cancelCourseBundle = createAsyncThunk('/payments/cancel', async () => {
    try {
        const response = axiosInstance.post('/payments/unsubscribe')
        toast.promise(response, {
            loading: 'Canceling subscription...',
            success: (data) => data?.data?.message,
            error: 'Failed to cancel subscription'
        })
    } catch (error) {

    }
})

const razorpaySlice = createSlice({
    name: 'razorpay',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRazorpayId.fulfilled, (state, action) => {
                state.key = action?.payload?.key
            })
            .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
                state.subscription_id = action?.payload?.subscription_id
            })
            // .addCase(purchaseCourseBundle.rejected, (state, action) => {
            //     toast.error(action?.payload?.message);
            // })
            .addCase(verifyUserPayment.fulfilled, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success
            })
            .addCase(verifyUserPayment.rejected, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success
            })
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                state.allPayments = action?.payload?.allPayments
                state.finalMonths = action?.payload?.finalMonths
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord
            })
    }
})

export default razorpaySlice.reducer