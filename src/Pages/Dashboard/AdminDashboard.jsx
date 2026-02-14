import { Chart as ChartJS, ArcElement, CategoryScale, BarElement, Legend, LinearScale, Title, Tooltip } from "chart.js"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getStatsData, getUsersCount } from "../../Redux/Slices/StatSlice"
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice"
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice"
import HomeLayout from "../../Layouts/HomeLayout"
import { Bar, Pie } from "react-chartjs-2"
import { FaUsers } from "react-icons/fa"
import { FcSalesPerformance } from "react-icons/fc"
import { GiMoneyStack } from "react-icons/gi"
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs"

ChartJS.register(ArcElement, CategoryScale, BarElement, Legend, LinearScale, Title, Tooltip)

function AdminDashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { allUsersCount, subscribedUsersCount, monthlySalesRecord } = useSelector((state) => state.stat)
    const { allPayments } = useSelector((state) => state.razorpay)
    const myCourses = useSelector((state) => state?.course?.courseData)

    const userData = {
        labels: ["Registered User", "Enrolled User"],
        datasets: [
            {
                label: "User Details",
                data: [allUsersCount, subscribedUsersCount],
                backgroundColor: ['#E11D48', '#2563EB'], // More vibrant solid colors
                borderWidth: 0
            }
        ]
    }

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Sales / Month",
                data: monthlySalesRecord,
                backgroundColor: ['#F59E0B'],
                borderColor: ['#D97706'],
                borderWidth: 2
            }
        ]
    }

    async function onCourseDelete(id) {
        if (window.confirm("Are you sure you want to delete this course?")) {
            const response = await dispatch(deleteCourse(id))
            if (response?.payload?.success) {
                await dispatch(getAllCourses())
            }
        }
    }

    useEffect(() => {
        (async () => {
            await dispatch(getStatsData())
            await dispatch(getUsersCount())
            await dispatch(getPaymentRecord())
            await dispatch(getAllCourses())
        })()
    }, [])

    return (
        <HomeLayout>
            <div className="min-h-[90vh] py-8 px-4 md:px-10 flex flex-col gap-10 text-slate-800 dark:text-white transition-all duration-300">
                <h1 className="text-center text-3xl md:text-5xl font-bold text-yellow-500">
                    Admin Dashboard
                </h1>

                {/* Charts & Stat Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto w-full">
                    
                    {/* User Stats Card */}
                    <div className="flex flex-col items-center gap-6 p-6 shadow-xl rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-none">
                        <div className="w-full h-72 flex justify-center">
                            <Pie data={userData} options={{ maintainAspectRatio: false }} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            <div className="flex items-center justify-between p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium opacity-70">Registered Users</p>
                                    <h3 className="text-3xl font-bold">{allUsersCount}</h3>
                                </div>
                                <FaUsers className="text-yellow-500 text-4xl" />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium opacity-70">Subscribed Users</p>
                                    <h3 className="text-3xl font-bold">{subscribedUsersCount}</h3>
                                </div>
                                <FaUsers className="text-green-500 text-4xl" />
                            </div>
                        </div>
                    </div>

                    {/* Sales Stats Card */}
                    <div className="flex flex-col items-center gap-6 p-6 shadow-xl rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-none">
                        <div className="w-full h-72 flex justify-center">
                            <Bar data={salesData} options={{ maintainAspectRatio: false }} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            <div className="flex items-center justify-between p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium opacity-70">Subscriptions</p>
                                    <h3 className="text-3xl font-bold">{Number(allPayments) || 0}</h3>
                                </div>
                                <FcSalesPerformance className="text-4xl" />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium opacity-70">Total Revenue</p>
                                    <h3 className="text-3xl font-bold">₹{Number(allPayments) * 499 || 0}</h3>
                                </div>
                                <GiMoneyStack className="text-green-500 text-4xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses Table Section */}
                <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 mb-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold">Courses Overview</h2>
                        <button
                            onClick={() => navigate("/course/create")}
                            className="w-full md:w-fit bg-yellow-500 hover:bg-yellow-600 text-white transition-all py-2 px-6 rounded-md font-bold text-lg shadow-md active:scale-95"
                        >
                            Create New Course
                        </button>
                    </div>

                    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100 dark:border-none">
                        <table className="w-full text-left bg-white dark:bg-slate-800 transition-colors">
                            <thead className="bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
                                <tr>
                                    <th className="px-4 py-4 font-bold">S.No</th>
                                    <th className="px-4 py-4 font-bold">Title</th>
                                    <th className="px-4 py-4 font-bold">Category</th>
                                    <th className="px-4 py-4 font-bold">Instructor</th>
                                    <th className="px-4 py-4 font-bold">Lectures</th>
                                    <th className="px-4 py-4 font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                                {myCourses?.map((course, idx) => (
                                    <tr key={course._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-4">{idx + 1}</td>
                                        <td className="px-4 py-4">
                                            <p className="font-semibold line-clamp-1 w-40">{course?.title}</p>
                                        </td>
                                        <td className="px-4 py-4">{course?.category}</td>
                                        <td className="px-4 py-4">{course?.createdBy}</td>
                                        <td className="px-4 py-4 text-center">{course?.numberOfLectures}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex gap-3">
                                                <button
                                                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-all active:scale-90"
                                                    onClick={() => navigate("/course/displaylectures", { state: { ...course } })}
                                                    title="View Course"
                                                >
                                                    <BsCollectionPlayFill size={20}/>
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-all active:scale-90"
                                                    onClick={() => onCourseDelete(course?._id)}
                                                    title="Delete Course"
                                                >
                                                    <BsTrash size={20}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AdminDashboard