import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import CourseCard from "../../Components/CourseCard";

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);

    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <HomeLayout>
            {/* Removed hardcoded pl-20, added theme-aware text and responsive padding */}
            <div className="min-h-[90vh] py-12 px-6 md:px-16 flex flex-col gap-10 items-center text-slate-800 dark:text-white transition-colors duration-300">
                
                <h1 className="text-3xl md:text-5xl font-semibold text-center leading-tight">
                    Explore the courses made by 
                    <span className="text-yellow-500 font-bold block md:inline"> Industry Experts</span>
                </h1>

                {/* Grid container: Centers cards and handles gaps responsively */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full mb-10">
                    {courseData?.length > 0 ? (
                        courseData.map((course) => (
                            <CourseCard key={course._id} data={course} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center py-20 opacity-60">
                            <p className="text-xl">No courses available at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;