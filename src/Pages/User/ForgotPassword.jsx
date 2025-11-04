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
        console.log(email);
        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        const formData = new FormData()
        formData.append('email', email)

        try {
            console.log(formData);
            const response = axiosInstance.post('/user/reset', {email})
            toast.promise(response, {
                loading: 'Sending email...',
                success: (data) => data?.data?.message,
                error: (err) => err?.response?.data?.message
            })
            // return (await response).data
            // console.log(response);

        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <HomeLayout>
            <div className="my-5 flex items-center justify-center h-[100vh]" >
                <form onSubmit={handleForm} className="flex flex-col shadow-[0_0_10px_black] justify-center items-center gap-5 rounded-lg p-4 text-white  w-80 ">
                    <h1 className="font-semibold text-2xl">Forgot Password</h1>
                    <label htmlFor="email" className="w-full text-left">Enter your Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" placeholder="Email" />
                    <button type="submit" className="btn w-full btn-dash btn-warning">Submit</button>
                    <Link to="/login" className="btn w-full btn-dash btn-info"> Go Back to Login page</Link>
                </form>
            </div>
        </HomeLayout>
    )
}
export default ForgotPassword