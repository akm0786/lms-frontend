import { useNavigate } from "react-router-dom";
function Denied() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
            <h1 className="text-4xl font-bold mb-4"> 403 - Access Denied </h1>
            <p className="text-lg">You do not have permission to access this page.</p>
            <button className="btn btn-outline btn-warning mt-3" onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
}


export default Denied