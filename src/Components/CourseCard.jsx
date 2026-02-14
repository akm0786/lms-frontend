import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/course/description/", { state: { ...data } })}
            className="text-slate-800 dark:text-white w-full sm:w-[22rem] h-[450px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-white dark:bg-zinc-700 border border-gray-100 dark:border-none transition-all duration-300 hover:shadow-2xl"
        >
            {/* Image Container: Added a dark background so 'contain' looks professional */}
            <div className="overflow-hidden h-48 w-full bg-slate-900 flex items-center justify-center">
                <img
                    className="h-full w-full object-contain group-hover:scale-105 transition-all ease-in-out duration-300"
                    src={data?.thumbnail?.secure_url}
                    onError={(e) => {
                        e.target.onError = null;
                        e.target.src = "https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk=";
                    }}
                    alt="course thumbnail"
                />
            </div>

            <div className="p-4 space-y-2">
                <h2 className="text-xl font-bold line-clamp-2 text-yellow-600 dark:text-yellow-500">
                    {data?.title}
                </h2>
                <p className="line-clamp-2 text-gray-600 dark:text-gray-300 text-sm">
                    {data?.description}
                </p>
                
                <div className="pt-2 space-y-1">
                    <p className="font-semibold text-sm">
                        <span className="text-yellow-600 dark:text-yellow-500 font-bold">Category: </span>
                        {data?.category}
                    </p>
                    <p className="font-semibold text-sm">
                        <span className="text-yellow-600 dark:text-yellow-500 font-bold">Total Lectures: </span>
                        {data?.numberOfLectures}
                    </p>
                    <p className="font-semibold text-sm">
                        <span className="text-yellow-600 dark:text-yellow-500 font-bold">Instructor: </span>
                        {data?.createdBy}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;