import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import HomeLayout from "../../Layouts/HomeLayout"
import { getUserData } from "../../Redux/Slices/AuthSlice"
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice"

function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state) => state?.auth?.data)

    async function handleCancelation() {
        if (window.confirm("Are you sure you want to cancel your subscription?")) {
            toast("Canceling subscription...")
            await dispatch(cancelCourseBundle())
            await dispatch(getUserData())
            toast.success("Subscription cancelled successfully")
            navigate("/")
        }
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center px-4 py-10 transition-colors duration-300 bg-white dark:bg-transparent">
                {/* Responsive Card with adaptive colors */}
                <div className="flex flex-col gap-6 rounded-lg p-8 w-full max-w-[24rem] shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_black] bg-white dark:bg-slate-800 border border-gray-100 dark:border-none">
                    
                    <div className="flex flex-col items-center">
                        <img 
                            src={userData?.avatar?.secure_url} 
                            alt="user profile" 
                            className="w-40 h-40 rounded-full border-4 border-yellow-500 shadow-md object-cover transition-transform hover:scale-105 duration-300" 
                        />
                        <h3 className="mt-4 text-2xl font-bold text-slate-800 dark:text-yellow-500 capitalize">
                            {userData?.fullName}
                        </h3>
                    </div>

                    <div className="space-y-3 text-lg font-medium text-slate-700 dark:text-gray-200">
                        <p className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                            <span className="text-yellow-600 dark:text-yellow-500 font-bold">Email:</span> 
                            <span className="text-sm truncate ml-2">{userData?.email}</span>
                        </p>
                        <p className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                            <span className="text-yellow-600 dark:text-yellow-500 font-bold">Role:</span> 
                            <span>{userData?.role}</span>
                        </p>
                        <p className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                            <span className="text-yellow-600 dark:text-yellow-500 font-bold">Subscription:</span> 
                            <span className={userData?.subscription?.status === "active" ? "text-green-500" : "text-red-500"}>
                                {userData?.subscription?.status === "active" ? "Active" : "Inactive"}
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 mt-2">
                        <Link to="/user/change-password" title="Change Password">
                            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2.5 rounded-md transition-all active:scale-95 shadow-sm">
                                Change Password
                            </button>
                        </Link>
                        
                        <Link to="/user/editprofile" title="Edit Profile">
                            <button className="w-full border-2 border-yellow-500 text-yellow-600 dark:text-yellow-500 font-bold py-2.5 rounded-md hover:bg-yellow-50 dark:hover:bg-slate-700 transition-all active:scale-95">
                                Edit Profile
                            </button>
                        </Link>

                        {userData?.subscription?.status === "active" && (
                            <button 
                                onClick={handleCancelation} 
                                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-md transition-all active:scale-95 mt-2"
                            >
                                Cancel Subscription
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Profile