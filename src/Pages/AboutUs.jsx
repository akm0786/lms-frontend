import HomeLayout from "../Layouts/HomeLayout";
import { Link } from 'react-router-dom';

function AboutUs() {
    return (
        <HomeLayout>
            {/* Main Hero Section: Responsive padding and dynamic text color */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mx-6 md:mx-16 py-12 min-h-[70vh]">
                <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-semibold text-slate-800 dark:text-white transition-colors duration-300">
                        About Us
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-200 leading-relaxed">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost. 
                        Our goal is to empower learners worldwide with quality education that fits their budget.
                    </p>

                    {/* Buttons: Stacked on mobile, side-by-side on tablet+ */}
                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6">
                        <Link to="/courses" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto bg-yellow-500 px-6 py-3 rounded-md font-semibold text-lg hover:bg-yellow-600 transition-all duration-300 shadow-md">
                                Explore courses
                            </button>
                        </Link>

                        <Link to="/contact" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto border border-yellow-500 text-slate-800 dark:text-white px-6 py-3 rounded-md font-semibold text-lg hover:bg-yellow-500 hover:text-white transition-all duration-300">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Optional: You could place an image or an illustration here to balance the hero section */}
            </div>

           
        </HomeLayout>
    );
}

export default AboutUs;