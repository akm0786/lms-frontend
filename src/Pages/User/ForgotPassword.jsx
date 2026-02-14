import { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    }

    async function handleForm(e) {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        try {
            const response = axiosInstance.post('/user/reset', { email });
            toast.promise(response, {
                loading: 'Sending reset link...',
                success: (data) => data?.data?.message || "Reset link sent!",
                error: (err) => err?.response?.data?.message || "Something went wrong"
            });
            
            const res = await response;
            if (res?.data?.success) {
                // Optional: navigate("/login") or stay here
            }
        } catch (error) {
            // Error is handled by toast.promise
        }
    }

    return (
        <HomeLayout>
            {/* Center container with responsive padding */}
            <div className="flex items-center justify-center min-h-[90vh] px-4 py-10">
                
                {/* Form: Adaptive shadow and text color for Light/Dark mode */}
                <form 
                    onSubmit={handleForm} 
                    className="flex flex-col items-center justify-center gap-6 rounded-lg p-8 w-full max-w-[22rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_black] bg-white dark:bg-transparent text-slate-800 dark:text-white border border-gray-100 dark:border-none transition-all duration-300"
                >
                    <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
                    
                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="email" className="font-semibold">Registered Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email} 
                            onChange={handleInputChange} 
                            className="bg-transparent border border-gray-400 dark:border-gray-600 px-3 py-2.5 rounded-md focus:ring-2 focus:ring-yellow-500 outline-none transition-all" 
                            placeholder="example@gmail.com" 
                        />
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <button 
                            type="submit" 
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 rounded-md font-bold text-lg shadow-md transition-all active:scale-[0.98]"
                        >
                            Send Reset Link
                        </button>

                        <Link to="/login" className="w-full">
                            <button 
                                type="button" 
                                className="w-full border border-blue-500 text-blue-600 dark:text-blue-400 py-2.5 rounded-md font-semibold hover:bg-blue-50 dark:hover:bg-slate-800 transition-all"
                            >
                                Back to Login
                            </button>
                        </Link>
                    </div>

                    <p className="text-sm text-gray-500 text-center italic">
                        A reset link will be sent to your email.
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default ForgotPassword;