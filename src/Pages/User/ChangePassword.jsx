import { useState } from "react"
import HomeLayout from "../../Layouts/HomeLayout"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { getchangePassword } from "../../Redux/Slices/AuthSlice"
import { Link, useNavigate } from "react-router-dom"

function ChangePassword() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userData = useSelector((state)=>state.auth.data)

    const [data, setData] = useState({
        oldPassword: '',
        newPassword: ''
    })

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        if (!data.oldPassword || !data.newPassword) {
            toast.error('All fields are required')
            return
        }
        if (data.oldPassword.length < 6) {
            toast.error('Old password must be at least 6 characters long')
            return
        }
        if (data.newPassword.length < 6) {
            toast.error('New password must be at least 6 characters long')
            return
        }

        const formData = new FormData()
        formData.append('oldPassword', data.oldPassword)
        formData.append('newPassword', data.newPassword)

        await dispatch(getchangePassword(formData))

        setData({
            oldPassword: '',
            newPassword: ''
        })
        navigate('/user/profile')


    }

    return (
        <HomeLayout>
            <div className=" my-5 flex items-center justify-center h-[100vh]">

                <form onSubmit={handleFormSubmit} className="flex flex-col shadow-[0_0_10px_black] justify-center items-center gap-5 rounded-lg p-4 text-white  w-80 min-h-[26rem]">
                    <img src={userData?.avatar?.secure_url} alt="user profile" className="w-24 h-24 rounded-full mx-auto mb-4" />

                    <h1 className="font-semibold text-2xl">Change Password</h1>
                    <label htmlFor="oldPassword" className="w-full text-left">Enter your Old password</label>
                    <input type="passoword" name="oldPassword" id="oldPassword" onChange={handleInputChange} className="input input-bordered w-full max-w-xs" placeholder="Old Password" />

                    <label htmlFor="newPassword" className="w-full text-left">Enter your New password</label>
                    <input type="passoword" name="newPassword" id="newPassword" onChange={handleInputChange} className="input input-bordered w-full max-w-xs" placeholder="New Password" />

                    <button type="submit" className="btn w-full btn-dash btn-warning">Change Password</button>
                    <Link to='/user/profile' className="btn btn-dash btn-error w-full">Go Back to Profile</Link>

                </form>
            </div>
        </HomeLayout>
    )
}

export default ChangePassword