import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-900 text-center px-4">
      <h1 className="text-9xl font-extrabold text-yellow-500 tracking-widest">404</h1>
      <h2 className="text-3xl text-white mt-4">Page Not Found</h2>
      <p className="text-gray-400 mt-2">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-8 bg-yellow-500 px-6 py-3 rounded-md font-semibold text-lg text-gray-900 cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300"
      >
        Go Back
      </button>
    </div>
  );
}

export default NotFound;
