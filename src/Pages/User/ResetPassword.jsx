import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import HomeLayout from "../../Layouts/HomeLayout"
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

function ResetPassword() {

    const { resetToken } = useParams()
    const navigate = useNavigate();

    const [password, setpassword] = useState('');

    const handleInputChange = (e) => {
        setpassword(e.target.value);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        try {
            const response = axiosInstance.post(`/user/reset/${resetToken}`, { password });
            toast.promise(response, {
                loading: 'Changing password...',
                success: (data) => data?.data?.message,
                error: (err) => err?.response?.data?.message
            })
            // return (await response).data;

            navigate('/login');

        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }


    return (
        <HomeLayout>
            <div className="my-5 flex items-center justify-center h-[100vh]">
                <form onSubmit={handleFormSubmit} className="flex flex-col shadow-[0_0_10px_black] justify-center items-center gap-5 rounded-lg p-4 text-white  w-80">
                    <h1 className="font-semibold text-2xl">Reset Password</h1>
                    <label htmlFor="password" className="w-full text-left">Enter New Password</label>
                    <input type="password" name="password" onChange={handleInputChange} id="password" placeholder="New Password" className="input input-bordered w-full max-w-xs" />
                    <button type="submit" className="btn w-full btn-dash btn-warning">Reset Password</button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default ResetPassword