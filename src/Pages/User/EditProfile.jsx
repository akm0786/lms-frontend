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
        e.preventDefault()
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
        if (data.fullName < 4) {
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
            <div className="flex items-center justify-center h-[100vh]">
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col shadow-[0_0_10px_black] justify-center items-center gap-5 rounded-lg p-4 text-white  w-80 min-h-[26rem]"
                >
                    <h1 className="text-2xl text-center font-semibold">Edit Profile</h1>
                    <label className="cursor-pointer" htmlFor="image_upload">
                        {data.previewImage ? (
                            <img
                                src={data.previewImage}
                                alt="preview"
                                className="w-28 h-28 rounded-full m-auto"
                            />
                        ) : (
                            <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
                        )}
                    </label>
                    <input
                        type="file"
                        name="image_upload"
                        id="image_upload"
                        className="hidden"
                        onChange={handleImageUpload}
                        accept=".jpg, .jpeg, .png"
                    />

                    <label htmlFor="fullName" className="text-left w-full">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Full Name"
                        className="input input-bordered w-full max-w-xs"
                        value={data.fullName}
                        onChange={handleInputChange}
                    />
                        <button type="submit" className="btn btn-dash btn-info w-full">Update Profile</button>
                        <Link to='/user/profile' className="btn btn-dash btn-error w-full">Go Back to Profile</Link>
                </form>
            </div>
        </HomeLayout>
    )
}
export default Editprofile  