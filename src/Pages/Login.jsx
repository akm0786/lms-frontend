import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    async function onLogin(e) {
        e.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error("All fields are required");
            return;
        }

        const response = await dispatch(login(loginData));
        if (response?.payload?.success) {
            navigate("/");
        }

        setLoginData({
            email: '',
            password: '',
        });
    }

    return (
        <HomeLayout>
            {/* Theme-aware background and text color */}
            <div className="min-h-[90vh] w-full flex flex-col items-center justify-center bg-white dark:bg-transparent text-slate-800 dark:text-white px-4 py-10 transition-colors duration-300">
                
                {/* Responsive card with adaptive shadows */}
                <form 
                    onSubmit={onLogin} 
                    noValidate 
                    className="flex flex-col gap-4 w-full max-w-[24rem] p-8 justify-center items-center shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_black] rounded-lg bg-white dark:bg-transparent border border-gray-100 dark:border-none"
                >
                    <h1 className="text-3xl font-bold mb-2">Login Page</h1>
                   
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="email" className="font-semibold text-left">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="p-2.5 rounded-md bg-transparent border border-gray-400 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                            placeholder="Enter your email"
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="password" className="font-semibold text-left">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="p-2.5 rounded-md bg-transparent border border-gray-400 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                            placeholder="Enter your password"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="bg-yellow-500 mt-4 px-6 py-2.5 w-full rounded-md font-bold text-lg text-white hover:bg-yellow-600 transition-all shadow-md active:scale-[0.98]"
                    >
                        Login
                    </button>

                    <div className="mt-2 space-y-2 text-center">
                        <p className="text-gray-600 dark:text-gray-300">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-yellow-600 dark:text-yellow-500 hover:underline font-semibold transition-all">
                                Sign Up
                            </Link>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            Forgot Password?{" "}
                            <Link to="/user/forgot-password" dir="ltr" className="text-yellow-600 dark:text-yellow-500 hover:underline font-semibold transition-all">
                                Reset Password
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Login;