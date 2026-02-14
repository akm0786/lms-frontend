import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice"
import { Link, useNavigate } from "react-router-dom"
import HomeLayout from "../../Layouts/HomeLayout"
import { BsPersonCircle } from "react-icons/bs"

function Editprofile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data, setData] = useState({
        previewImage: '',
        fullName: '',
        avatar: undefined,
        userId: useSelector((state) => state?.auth?.data?._id)
    })

    function handleImageUpload(e) {
        const uploadedImage = e.target.files[0]
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener('load', function () {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage
                })
            })
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!data.fullName || !data.avatar) {
            toast.error("All fields are mandatory");
            return
        }
        if (data.fullName.length < 4) {
            toast.error("Name must be at least 4 characters long");
            return
        }
        const formData = new FormData()
        formData.append('fullName', data.fullName)
        formData.append('avatar', data.avatar)

        await dispatch(updateProfile(formData))
        await dispatch(getUserData())

        navigate('/user/profile')
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh] px-4 py-10 transition-colors duration-300 bg-white dark:bg-transparent">
                <form
                    onSubmit={onFormSubmit}
                    noValidate
                    className="flex flex-col justify-center items-center gap-6 rounded-lg p-8 text-slate-800 dark:text-white w-full max-w-[22rem] min-h-[26rem] shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_black] border border-gray-100 dark:border-none bg-white dark:bg-slate-800"
                >
                    <h1 className="text-3xl text-center font-bold mb-2">Edit Profile</h1>
                    
                    {/* Avatar Upload Container */}
                    <label className="cursor-pointer relative group" htmlFor="image_upload">
                        {data.previewImage ? (
                            <img
                                src={data.previewImage}
                                alt="preview"
                                className="w-32 h-32 rounded-full m-auto object-cover border-2 border-yellow-500 shadow-md transition-transform duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <BsPersonCircle className="w-32 h-32 rounded-full m-auto text-gray-400 dark:text-gray-200" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-bold uppercase">Change</span>
                        </div>
                    </label>
                    
                    <input
                        type="file"
                        name="image_upload"
                        id="image_upload"
                        className="hidden"
                        onChange={handleImageUpload}
                        accept=".jpg, .jpeg, .png"
                    />

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="fullName" className="text-lg font-semibold">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Enter new name"
                            className="bg-transparent border border-gray-400 dark:border-gray-600 px-3 py-2 rounded-md focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                            value={data.fullName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col gap-3 w-full mt-2">
                        <button 
                            type="submit" 
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 rounded-md font-bold text-lg shadow-md transition-all active:scale-95"
                        >
                            Update Profile
                        </button>
                        
                        <Link to='/user/profile' className="w-full">
                            <button 
                                type="button" 
                                className="w-full border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-2.5 rounded-md font-semibold transition-all"
                            >
                                Cancel & Go Back
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Editprofile;