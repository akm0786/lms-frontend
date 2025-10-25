import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import CourseCard from "../../Components/CourseCard";

function CourseList() {

    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);

    async function loadCourses() {
        await dispatch(getAllCourses())
    }

    useEffect(() => {
        loadCourses();
    }, [])

    return (
        <HomeLayout>
            <div className="min-h-[90vh] p-12 pl-20 flex gap-10 items-center justify-center flex-col text-white">
            <h1 className="text-5xl font-semibold">Explore the courses made by 
                <span className="text-yellow-500 font-bold">    Industry Experts</span>
            </h1>
            <div className="flex flex-wrap gap-14 mb-10">
                {courseData?.map((course) => <CourseCard key={course._id} data={course} />)}
            </div>
            </div>
        </HomeLayout>
    )
}

export default CourseList