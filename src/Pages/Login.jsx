import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { login } from "../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    function handleUserInput(e) {
        // e.preventDefault();
        const { name, value } = e.target;

        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    async function onLogin(e) {
        e.preventDefault();
        if (!loginData.email && !loginData.password ) {
            toast.error("All fields are required");
            return;
        }

        const response = await dispatch(login(loginData));
        console.log(response);

        if (response?.payload?.success) {
            navigate("/");
        }


        setLoginData({
            email: '',
            password: '',
        })
    }

    return (
        <HomeLayout>
            <div className="h-screen w-full flex flex-col items-center justify-center bg-[#2d2d2d] text-center px-4">
                <form onSubmit={onLogin} noValidate className="flex flex-col gap-3 w-96 p-4 justify-center items-center shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
                    <h1 className="text-2xl ">Login Page</h1>
                   
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email" className="font-semibold text-left">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="p-2 rounded-md"
                            placeholder="Enter your Email"
                            onChange={handleUserInput}
                            value={loginData.email}

                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="password" className="font-semibold text-left">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="p-2 rounded-md"
                            placeholder="Enter your Password"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>
                    <button type="submit" className="bg-yellow-500 mt-3 px-6 py-2 w-full rounded-md font-semibold text-lg text-gray-900 cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">Create Account</button>
                    <p>Don't have an account? <span className="text-yellow-500 cursor-pointer"><Link to="/signup">Sign Up</Link></span></p>
                </form>

            </div>
        </HomeLayout>

    )
}

export default Login