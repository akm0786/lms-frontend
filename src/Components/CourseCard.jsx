import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom"

function CourseCard({data}) {
    const navigate = useNavigate();

    return (
        <div 
        onClick={() => navigate("/course/description/")}
         className="text-white w-[22rem] h-[380px] p-2 shadow-lg rounded-lg coursor-pointer group overfow-hidden bg-zinc-700">
            <div className="overflow-hidden ">
                <img
                    className=" h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out duration-300 "
                    src={data?.thumbnail?.secure_url} alt="course thumbnail"
                />
                <div className="p-3 space-y-1 text-white">
                    <h2 className="text-xl font-bold line-clamp-2 text-yellow-500">{data?.title}</h2>
                    <p className="line-clamp-2">{data?.decription}</p>
                    <p className="font-semibold">
                        <span className="font-bold text-yelloe-500">Category: </span>
                        {data?.category}
                    </p>
                    <p className="font-semibold">Total Lectures: {data?.numberOfLectures}</p>
                    <p className="font-semibold">
                        <span className="font-bold text-yelloe-500">Instrcutor: </span>
                        {data?.createdBy}
                    </p>
                </div>
            </div>
        </div>
    )

}

export default CourseCard