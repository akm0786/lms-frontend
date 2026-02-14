import { Link } from "react-router-dom";
import HomePageImage from "../Assets/Images/homePageMainImage.png";
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
    return (
        <HomeLayout>
            {/* Adjusted: Added flex-col-reverse for mobile, changed text-white to text-slate-800 for light mode, and removed fixed h-[90vh] for mobile growth */}
            <div className="pt-10 text-slate-800 dark:text-white flex flex-col-reverse md:flex-row items-center justify-center gap-10 mx-6 md:mx-16 min-h-[90vh]">
                
                {/* Text Content: Full width on mobile, half on desktop */}
                <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                        Find out best{" "}
                        <span className="text-yellow-500 font-bold">
                            Online Courses
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-200">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>

                    {/* Buttons: Stacked on small screens, side-by-side on desktop */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link to="/courses">
                            <button className="w-full sm:w-auto bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Explore courses
                            </button>
                        </Link>

                        <Link to="/contact">
                            <button className="w-full sm:w-auto border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 dark:hover:bg-yellow-600 hover:bg-yellow-50 transition-all ease-in-out duration-300">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Image: Hidden or resized on very small screens, responsive width */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <img 
                        alt="homepage image" 
                        src={HomePageImage} 
                        className="w-3/4 md:w-full max-w-md md:max-w-full"
                    />
                </div>

            </div>
        </HomeLayout>
    );
}

export default HomePage;