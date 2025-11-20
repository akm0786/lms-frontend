import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture() {

    const courseDetails = useLocation().state

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userInput, setUserInput] = useState({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
    })

    function handleInputChange(e) {
        const { name, value } = e.target;

        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    function handleVideo(e) {
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);

        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.lecture || !userInput.title || !userInput.description) {
            toast.error("All fields are mandatory");
            return;
        }
        const response = await dispatch(addCourseLecture(userInput));
        if (response?.payload?.success) {
            setUserInput({
                id: courseDetails._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: "",
            })

        }
    }

    useEffect(() => {
        // if (!courseDetails) {
        //     navigate("/courses");
        // }
    }, [])

    return (
        <HomeLayout>
            <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button onClick={() => navigate(-1)}
                            className="absolute left-2 text-xl text-green-500"
                        >
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add new Lecture
                        </h1>
                    </header>
                    <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
                        <input className="bg-transparent px-3 py-1 border" type="text" name="title" value={userInput.title} onChange={handleInputChange} placeholder="Enter the Title of the Lecture" />
                        <textarea className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36" type="text" name="description" value={userInput.description} onChange={handleInputChange} placeholder="Enter the description of the lecture" />
                        {userInput.videoSrc ? (

                            <video
                                muted
                                src={userInput.videoSrc}
                                controls
                                controlsList="nodownload nofullscreen"
                                disablePictureInPicture
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            >

                            </video>

                        ) : (
                            <div className="h-48 border flex items-center justify-center cursor-pointer">
                                <label htmlFor="lecture" className="font-semibold text-cl cursor-pointer">Choose your Video</label>
                                <input type="file" className="hidden" id="lecture" name="lecture" onChange={handleVideo} accept="video/mp4 video/x-mp4 video/*" />
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary font-semibold text-lg">Add new Lecture</button>

                    </form>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AddLecture