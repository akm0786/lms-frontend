import { useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.email || !userInput.name || !userInput.message) {
            toast.error("All fields are mandatory");
            return;
        }

        if (!isEmail(userInput.email)) {
            toast.error("Invalid email");
            return;
        }

        try {
            const response = axiosInstance.post("/contact", userInput);
            toast.promise(response, {
                loading: "Submitting your message...",
                success: "Form submitted successfully",
                error: "Failed to submit the form"
            });
            const contactResponse = await response;
            if (contactResponse?.data?.success) {
                setUserInput({
                    name: "",
                    email: "",
                    message: "",
                });
            }
        } catch (err) {
            toast.error("Operation failed....");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh] px-4 py-10">
                <form 
                    noValidate
                    onSubmit={onFormSubmit}
                    // Updated: Shadow is now subtle, text is theme-aware, and width is responsive
                    className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg text-slate-800 dark:text-white shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_black] w-full max-w-[24rem] bg-white dark:bg-transparent border dark:border-none"
                >
                    <h1 className="text-3xl font-bold mb-2">
                        Contact Form
                    </h1>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-lg font-medium">
                            Name
                        </label>
                        <input 
                            className="bg-transparent border border-gray-400 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleInputChange}
                            value={userInput.name}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-lg font-medium">
                            Email
                        </label>
                        <input 
                            className="bg-transparent border border-gray-400 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleInputChange}
                            value={userInput.email}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="message" className="text-lg font-medium">
                            Message
                        </label>
                        <textarea 
                            className="bg-transparent border border-gray-400 dark:border-gray-600 px-3 py-2 rounded-md resize-none h-32 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                            id="message"
                            name="message"
                            placeholder="Enter your message"
                            onChange={handleInputChange}
                            value={userInput.message}
                        />
                    </div>

                    <button type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 text-white transition-all ease-in-out duration-300 rounded-md py-2.5 font-bold text-lg shadow-md active:scale-[0.98]"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Contact;