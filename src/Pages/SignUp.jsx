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
        // e.preventDefault();
        const { name, value } = e.target;

        setSignUpData({
            ...signUpData,
            [name]: value
        })
    }

    function getImage(e) {
        // e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {

            setSignUpData({
                ...signUpData,
                avatar: uploadedImage
            })
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener('load', function () {
            setPreviewImage(this.result);
            // console.log(this.result);

        })
    }

    async function createNewAccount(e) {
        e.preventDefault();
        if (!signUpData.fullName && !signUpData.email && !signUpData.password && !signUpData.avatar) {
            toast.error("All fields are required");
            return;
        }
        if (signUpData.fullName.length < 5) {
            toast.error("Name must be at least 5 characters long");
            return;
        }
        if (!signUpData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            toast.error("Please enter a valid email address");
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

        if (!signUpData.password.match(passwordRegex)) {
            toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }
        const formData = new FormData();

        formData.append('fullName', signUpData.fullName);
        formData.append('email', signUpData.email);
        formData.append('password', signUpData.password);
        formData.append('avatar', signUpData.avatar);

        // dispatch createNewAccount action

        const response = await dispatch(createAccount(formData));
        console.log(response);

        if (response?.payload?.success) {
            navigate("/");
        }


        setSignUpData({
            fullName: '',
            email: '',
            password: '',
            avatar: ''
        })
        setPreviewImage('');
    }

    return (
        <HomeLayout>
            <div className="h-screen w-full flex flex-col items-center justify-center bg-[#2d2d2d] text-center px-4">
                <form onSubmit={createNewAccount} noValidate className="flex flex-col gap-3 w-96 p-4 justify-center items-center shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
                    <h1 className="text-2xl ">Registration Page</h1>
                    <label htmlFor="image_upload" className="cursor-pointer">
                        {previewImage ? (
                            <img src={previewImage} alt="preview" className="w-24 h-24 object-cover rounded-full" />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 object-cover rounded-full" />
                        )}
                    </label>
                    <input
                        onChange={getImage}
                        type="file"
                        id="image_upload"
                        name="image_uploads"
                        className="hidden"
                        accept=".jpg, .jpeg, .png, .svg"
                    />
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="fullName" className="font-semibold text-left"> Name</label>
                        <input
                            type="fullName"
                            id="fullName"
                            name="fullName"
                            className="p-2 rounded-md"
                            placeholder="Enter your Name"
                            onChange={handleUserInput}
                            value={signUpData.fullName}

                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email" className="font-semibold text-left">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="p-2 rounded-md"
                            placeholder="Enter your Email"
                            onChange={handleUserInput}
                            value={signUpData.email}

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
                            value={signUpData.password}
                        />
                    </div>
                    <button type="submit" className="bg-yellow-500 mt-3 px-6 py-2 w-full rounded-md font-semibold text-lg text-gray-900 cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">Create Account</button>
                    <p>Already have an account? <span className="text-yellow-500 cursor-pointer"><Link to="/login">Login</Link></span></p>
                </form>

            </div>
        </HomeLayout>

    )
}

export default SignUp