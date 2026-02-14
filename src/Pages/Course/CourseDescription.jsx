import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";

function CourseDescription() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const { role, data } = useSelector((state) => state.auth);

    useEffect(() => {
        // Redirect if no state is passed to prevent crashes
        if (!state) {
            navigate("/courses");
        }
    }, [state, navigate]);

    return (
        <HomeLayout>
            {/* Theme-aware text and responsive padding */}
            <div className="min-h-[90vh] pt-12 px-6 md:px-20 flex flex-col items-center justify-center text-slate-800 dark:text-white transition-colors duration-300">
                
                {/* Responsive Grid: Stacks on mobile, side-by-side on large screens */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10 relative w-full max-w-6xl">
                    
                    {/* Left Section: Thumbnail and CTA */}
                    <div className="space-y-5 flex flex-col items-center">
                        <div className="w-full h-64 md:h-80 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden shadow-xl">
                            <img 
                                className="w-full h-full object-contain transition-all duration-300 hover:scale-105"
                                alt="thumbnail"
                                src={state?.thumbnail?.secure_url}
                                onError={(e) => {
                                    e.target.onError = null;
                                    e.target.src = "https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk=";
                                }}
                            />
                        </div>

                        <div className="space-y-4 w-full text-center lg:text-left">
                            <div className="flex flex-col gap-1 text-xl">
                                <p className="font-semibold">
                                    <span className="text-yellow-600 dark:text-yellow-500 font-bold">
                                        Total lectures : {" "}
                                    </span>
                                    {state?.numberOfLectures}
                                </p>

                                <p className="font-semibold">
                                    <span className="text-yellow-600 dark:text-yellow-500 font-bold">
                                        Instructor : {" "}
                                    </span>
                                    {state?.createdBy}
                                </p>
                            </div>

                            {/* Responsive Button: full width on mobile, w-80 on desktop */}
                            {role === "ADMIN" || data?.subscription?.status === "active" ? (
                                <button 
                                    onClick={() => navigate('/course/displaylectures', { state: { ...state } })} 
                                    className="bg-yellow-600 text-white text-xl rounded-md font-bold px-5 py-3 w-full sm:w-80 block mx-auto lg:mx-0 hover:bg-yellow-500 transition-all ease-in-out duration-300 shadow-md active:scale-95"
                                >
                                    Watch lectures
                                </button>
                            ) : (
                                <button 
                                    onClick={() => navigate("/checkout")} 
                                    className="bg-yellow-600 text-white text-xl rounded-md font-bold px-5 py-3 w-full sm:w-80 block mx-auto lg:mx-0 hover:bg-yellow-500 transition-all ease-in-out duration-300 shadow-md active:scale-95"
                                >
                                    Subscribe to Course
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Section: Title and Description */}
                    <div className="space-y-4 text-xl">
                        <h1 className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-500 mb-4">
                            {state?.title}
                        </h1>

                        <div className="space-y-2">
                            <p className="text-yellow-600 dark:text-yellow-500 font-bold underline decoration-2 underline-offset-4">
                                Course description:
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                                {state?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseDescription;