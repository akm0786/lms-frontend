import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import toast from "react-hot-toast";

function CreateCourse() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userInput, setUserInput] = useState({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null,
        previewImage: "",
    });

    function handleImageUpload(e) {
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage
                });
            });
        }
    }

    function handleUserInput(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.title || !userInput.description || !userInput.category || !userInput.createdBy || !userInput.thumbnail) {
            toast.error("All fields including thumbnail are mandatory");
            return;
        }

        const response = await dispatch(createNewCourse(userInput));
        if (response?.payload?.success) {
            setUserInput({
                title: "",
                description: "",
                category: "",
                createdBy: "",
                thumbnail: null,
                previewImage: "",
            });
            navigate("/courses");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh] px-4 py-10 transition-colors duration-300 bg-white dark:bg-transparent">
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-6 rounded-lg p-6 md:p-10 text-slate-800 dark:text-white w-full max-w-[700px] shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_black] relative bg-white dark:bg-slate-800 border border-gray-100 dark:border-none"
                >
                    {/* Back Button */}
                    <Link 
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 md:top-8 md:left-8 text-2xl text-yellow-600 dark:text-accent cursor-pointer hover:scale-110 transition-all"
                    >
                        <AiOutlineArrowLeft />
                    </Link>

                    <h1 className="text-center text-3xl font-bold mb-4">
                        Create New Course
                    </h1>

                    <main className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                        {/* Left Column: Thumbnail */}
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="image_uploads" className="cursor-pointer">
                                    {userInput.previewImage ? (
                                        <img 
                                            className="w-full h-44 object-contain m-auto border border-gray-300 dark:border-gray-600 rounded-md"
                                            src={userInput.previewImage}
                                            alt="preview"
                                        />
                                    ): (
                                        <div className="w-full h-44 m-auto flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md hover:border-yellow-500 transition-all">
                                            <h1 className="font-bold text-lg opacity-60 text-center px-2">Upload course thumbnail</h1>
                                        </div>
                                    )}
                                </label>
                                <input 
                                    className="hidden"
                                    type="file"
                                    id="image_uploads"
                                    accept=".jpg, .jpeg, .png"
                                    name="image_uploads"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="title">Course Title</label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="e.g. Full Stack Web Development"
                                    className="bg-transparent px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>

                        {/* Right Column: Meta Info */}
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="createdBy">Instructor</label>
                                <input
                                    required
                                    type="text"
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Instructor Name"
                                    className="bg-transparent px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="category">Category</label>
                                <input
                                    required
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="e.g. Programming, Design..."
                                    className="bg-transparent px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                                    value={userInput.category}
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="description">Description</label>
                                <textarea
                                    required
                                    name="description"
                                    id="description"
                                    placeholder="Enter course description"
                                    className="bg-transparent px-3 py-2 h-24 overflow-y-auto resize-none border border-gray-400 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>
                    </main>

                    <button type="submit" className="w-full py-3 mt-4 rounded-md font-bold text-xl cursor-pointer bg-yellow-600 hover:bg-yellow-500 text-white shadow-md transition-all active:scale-[0.98]">
                        Create Course
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default CreateCourse;