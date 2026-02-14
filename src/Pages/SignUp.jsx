import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = useState('');
    const [signUpData, setSignUpData] = useState({
        fullName: '',
        email: '',
        password: '',
        avatar: ''
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        });
    }

    function getImage(e) {
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            setSignUpData({
                ...signUpData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', function () {
                setPreviewImage(this.result);
            });
        }
    }

    async function createNewAccount(e) {
        e.preventDefault();
        if (!signUpData.fullName || !signUpData.email || !signUpData.password || !signUpData.avatar) {
            toast.error("All fields are required");
            return;
        }
        if (signUpData.fullName.length < 5) {
            toast.error("Name must be at least 5 characters long");
            return;
        }
        
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!signUpData.email.match(emailRegex)) {
            toast.error("Please enter a valid email address");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if (!signUpData.password.match(passwordRegex)) {
            toast.error("Password is too weak. Requirements: 8-16 chars, Uppercase, Lowercase, Number, and Special character.");
            return;
        }

        const formData = new FormData();
        formData.append('fullName', signUpData.fullName);
        formData.append('email', signUpData.email);
        formData.append('password', signUpData.password);
        formData.append('avatar', signUpData.avatar);

        const response = await dispatch(createAccount(formData));

        if (response?.payload?.success) {
            navigate("/");
            setSignUpData({ fullName: '', email: '', password: '', avatar: '' });
            setPreviewImage('');
        }
    }

    return (
        <HomeLayout>
            {/* Removed hardcoded dark bg, added theme support */}
            <div className="min-h-[90vh] w-full flex flex-col items-center justify-center bg-white dark:bg-transparent text-slate-800 dark:text-white px-4 py-10 transition-colors duration-300">
                
                <form 
                    onSubmit={createNewAccount} 
                    noValidate 
                    className="flex flex-col gap-4 w-full max-w-[24rem] p-6 justify-center items-center shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_black] rounded-lg bg-white dark:bg-transparent border border-gray-100 dark:border-none"
                >
                    <h1 className="text-3xl font-bold mb-2">Registration</h1>

                    {/* Image Upload UI */}
                    <label htmlFor="image_upload" className="cursor-pointer relative group">
                        {previewImage ? (
                            <img src={previewImage} alt="preview" className="w-28 h-28 object-cover rounded-full border-2 border-yellow-500 shadow-md" />
                        ) : (
                            <BsPersonCircle className="w-28 h-28 text-gray-400 dark:text-gray-200" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-bold uppercase">Upload</span>
                        </div>
                    </label>

                    <input
                        onChange={getImage}
                        type="file"
                        id="image_upload"
                        name="image_uploads"
                        className="hidden"
                        accept=".jpg, .jpeg, .png, .svg"
                    />

                    {/* Inputs - Added borders and contrast for light mode */}
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="fullName" className="font-semibold text-left">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            className="p-2.5 rounded-md bg-transparent border border-gray-400 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                            placeholder="Enter your name"
                            onChange={handleUserInput}
                            value={signUpData.fullName}
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="email" className="font-semibold text-left">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="p-2.5 rounded-md bg-transparent border border-gray-400 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                            placeholder="Enter your email"
                            onChange={handleUserInput}
                            value={signUpData.email}
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
                            value={signUpData.password}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="bg-yellow-500 mt-4 px-6 py-2.5 w-full rounded-md font-bold text-lg text-white hover:bg-yellow-600 transition-all shadow-md active:scale-[0.98]"
                    >
                        Create Account
                    </button>

                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Already have an account?{" "}
                        <Link to="/login" className="text-yellow-600 dark:text-yellow-500 hover:underline font-semibold">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default SignUp;