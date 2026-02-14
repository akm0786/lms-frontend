import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";

function AddLecture() {
    const courseDetails = useLocation().state;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userInput, setUserInput] = useState({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    function handleVideo(e) {
        const video = e.target.files[0];
        if (!video) return;
        const source = window.URL.createObjectURL(video);

        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.lecture || !userInput.title || !userInput.description) {
            toast.error("All fields are mandatory");
            return;
        }
        const response = await dispatch(addCourseLecture(userInput));
        if (response?.payload?.success) {
            navigate(-1);
            setUserInput({
                id: courseDetails._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: "",
            });
        }
    }

    useEffect(() => {
        if (!courseDetails) {
            navigate("/courses");
        }
    }, [courseDetails, navigate]);

    return (
        <HomeLayout>
            {/* Theme-aware background and text color */}
            <div className="min-h-[90vh] text-slate-800 dark:text-white flex flex-col items-center justify-center py-10 px-4 transition-colors duration-300">
                
                {/* Responsive Card Container */}
                <div className="flex flex-col gap-5 p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_black] w-full max-w-[24rem] rounded-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-none">
                    
                    <header className="flex items-center justify-center relative">
                        <button 
                            onClick={() => navigate(-1)}
                            className="absolute left-0 text-2xl text-yellow-600 hover:text-yellow-500 transition-all"
                        >
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-xl text-yellow-500 font-bold">
                            Add New Lecture
                        </h1>
                    </header>

                    <form onSubmit={onFormSubmit} className="flex flex-col gap-4">
                        
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-sm">Title</label>
                            <input 
                                className="bg-transparent px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-500 outline-none transition-all" 
                                type="text" 
                                name="title" 
                                value={userInput.title} 
                                onChange={handleInputChange} 
                                placeholder="Lecture Title" 
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-sm">Description</label>
                            <textarea 
                                className="bg-transparent px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-500 outline-none transition-all resize-none h-28" 
                                name="description" 
                                value={userInput.description} 
                                onChange={handleInputChange} 
                                placeholder="Lecture Description" 
                            />
                        </div>

                        {/* Video Upload Logic */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-sm">Video Lecture</label>
                            {userInput.videoSrc ? (
                                <div className="space-y-2">
                                    <video
                                        muted
                                        src={userInput.videoSrc}
                                        controls
                                        controlsList="nodownload"
                                        disablePictureInPicture
                                        className="object-contain rounded-md w-full h-44 bg-black"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setUserInput({...userInput, videoSrc: "", lecture: undefined})}
                                        className="text-xs text-red-500 font-bold hover:underline"
                                    >
                                        Remove/Change Video
                                    </button>
                                </div>
                            ) : (
                                <label 
                                    htmlFor="lecture" 
                                    className="h-44 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 transition-all"
                                >
                                    <span className="font-semibold opacity-60">Click to upload video</span>
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        id="lecture" 
                                        name="lecture" 
                                        onChange={handleVideo} 
                                        accept="video/*" 
                                    />
                                </label>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 rounded-md font-bold text-lg shadow-md transition-all active:scale-[0.98] mt-2"
                        >
                            Add Lecture
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AddLecture;