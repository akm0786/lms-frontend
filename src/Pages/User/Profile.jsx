import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../Layouts/HomeLayout"
import { Link, useNavigate } from "react-router-dom"
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice"
import { getUserData } from "../../Redux/Slices/AuthSlice"
import toast from "react-hot-toast"

function Profile(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state)=> state?.auth?.data)

    async function handleCancelation() {
        toast("Canceling subscription...")
        await dispatch(cancelCourseBundle())
        await dispatch(getUserData())
        toast.success("Subscription cancelled successfully")
        navigate("/")
    }

    // useEffect(()=>{
    //     console.log(JSON.parse(localStorage.getItem("data")));
    // },[])
    return(
        <HomeLayout>
        <div className="min-h-[90vh] flex items-center justify-center">
            <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                <img src={userData?.avatar?.secure_url} alt="user profile" className="w-52 h-52 rounded-full mx-auto mb-4" />
             <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullName}
            </h3>  
            <div className="grid ">
                <p>Email: {userData?.email}</p>
                <p>Role: {userData?.role}</p>
                <p>Subscription: <span>{userData?.subscription?.status === "active" ? "Active" : "Inactive"}</span></p>
            </div>
            <div className="flex  flex-col gap-2">
                <button className="btn btn-dash btn-warning" ><Link to="/user/change-password">Change Password</Link></button>
                <button className="btn btn-neutral btn-outline" ><Link to="/user/editprofile">Edit Profile</Link></button>

            </div>
            {userData?.subscription?.status === "active" && (
                <button onClick={handleCancelation} className="btn btn-dash btn-info" ><Link>Cancel Subscription</Link></button>
            )}
          </div>
        </div>

        </HomeLayout>
        
    )
}

export default Profile