import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture);
    const { role } = useSelector((state) => state.auth);

    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureId) {
        if(window.confirm("Are you sure you want to delete this lecture?")) {
            await dispatch(deleteCourseLecture({ courseId, lectureId }));
            await dispatch(getCourseLectures(state._id));
        }
    }

    useEffect(() => {
        if (!state) {
            navigate("/courses");
        } else {
            dispatch(getCourseLectures(state._id));
        }
    }, []);

    return (
        <HomeLayout>
            {/* Theme-aware background and text */}
            <div className="flex flex-col gap-8 items-center justify-center min-h-[90vh] py-10 px-4 md:px-8 text-slate-800 dark:text-white transition-all duration-300">
                
                <div className="text-center text-2xl md:text-3xl font-bold text-yellow-500 break-words max-w-4xl">
                    Course: {state?.title}
                </div>

                {(lectures && lectures.length > 0) ? (
                    // Responsive Grid: Stacks on mobile/tablet, side-by-side on desktop
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">
                        
                        {/* LEFT SECTION: Video Player and Details */}
                        <div className="flex flex-col gap-4 p-4 rounded-xl shadow-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-none">
                            <video
                                key={lectures[currentVideo]?.lecture?.secure_url}
                                src={lectures[currentVideo]?.lecture?.secure_url}
                                className="object-contain rounded-lg w-full max-h-[400px] bg-black shadow-md"
                                controls
                                disablePictureInPicture
                                controlsList="nodownload"
                            />
                            <div className="space-y-3 mt-2">
                                <h1 className="text-xl font-bold">
                                    <span className="text-yellow-600 dark:text-yellow-500">Title: </span>
                                    {lectures[currentVideo]?.title}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    <span className="text-yellow-600 dark:text-yellow-500 font-semibold">Description: </span>
                                    {lectures[currentVideo]?.description}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT SECTION: Lectures List */}
                        <div className="flex flex-col gap-4 p-4 rounded-xl shadow-lg bg-white dark:bg-slate-800 border border-gray-100 dark:border-none max-h-[600px] overflow-y-auto">
                            <div className="font-bold text-xl text-yellow-600 dark:text-yellow-500 flex items-center justify-between border-b pb-3 dark:border-gray-700">
                                <span>Lectures ({lectures.length})</span>
                                {role === "ADMIN" && (
                                    <button 
                                        onClick={() => navigate("/course/addlecture", { state: { ...state } })} 
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-semibold text-sm transition-all"
                                    >
                                        Add New
                                    </button>
                                )}
                            </div>
                            
                            <ul className="space-y-3">
                                {lectures.map((lecture, idx) => (
                                    <li key={lecture._id} className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                        <div 
                                            className={`cursor-pointer font-medium flex gap-2 ${currentVideo === idx ? 'text-yellow-600 dark:text-yellow-500' : ''}`}
                                            onClick={() => setCurrentVideo(idx)}
                                        >
                                            <span className="opacity-60">#{idx + 1}</span>
                                            {lecture?.title}
                                        </div>
                                        {role === "ADMIN" && (
                                            <button 
                                                onClick={() => onLectureDelete(state?._id, lecture?._id)} 
                                                className="mt-2 text-red-500 hover:text-red-600 text-xs font-bold uppercase tracking-wider"
                                            >
                                                Delete Lecture
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 py-20">
                        <p className="text-xl opacity-70">No lectures uploaded yet.</p>
                        {role === "ADMIN" && (
                            <button 
                                onClick={() => navigate("/course/addlecture", { state: { ...state } })} 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-bold text-lg"
                            >
                                Add Your First Lecture
                            </button>
                        )}
                    </div>
                )}
            </div>
        </HomeLayout>
    );
}

export default DisplayLectures;