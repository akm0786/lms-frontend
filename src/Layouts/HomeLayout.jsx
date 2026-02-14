import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../Components/Footer';
import { logout } from '../Redux/Slices/AuthSlice';

function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }

    async function handleLogout(e) {
        e.preventDefault();
        const res = await dispatch(logout());
        if (res?.payload?.success) {
            navigate("/");
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* NEW TOP HEADER */}
            <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-slate-800 sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    {/* Drawer Trigger - Now part of the header */}
                    <label htmlFor="my-drawer" className="cursor-pointer">
                        <FiMenu
                            onClick={changeWidth}
                            size={"28px"}
                            className="font-bold text-slate-800 dark:text-white"
                        />
                    </label>

                    {/* App Logo Text */}
                    <Link to="/" className="text-2xl font-bold tracking-wider">
                        <span className="text-yellow-500">Coursify</span>
                        <span className="text-slate-800 dark:text-white"> App</span>
                    </Link>
                </div>

                {/* Optional: Desktop Quick Links or User Profile Icon */}
                <div className="hidden sm:block">
                    {isLoggedIn && (
                        <Link to="/user/profile" className="text-sm font-medium hover:text-yellow-500 transition-all dark:text-white">
                            Welcome, {role}
                        </Link>
                    )}
                </div>
            </header>

            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                
                {/* drawer-content is empty because we moved the FiMenu to the Header above */}
                <div className="drawer-content"></div>

                <div className="drawer-side w-0 transition-all duration-300">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 h-full sm:w-80 bg-white dark:bg-slate-800 text-slate-800 dark:text-white relative border-r border-gray-200 dark:border-none">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer} className="text-slate-800 dark:text-white hover:text-red-500">
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        
                        <li className="mt-8 font-medium">
                            <Link to="/" onClick={hideDrawer}>Home</Link>
                        </li>

                        {isLoggedIn && role === "ADMIN" && (
                            <>
                                <li><Link to="/admin/dashboard" onClick={hideDrawer}>Admin Dashboard</Link></li>
                                <li><Link to="/course/create" onClick={hideDrawer}>Create new course</Link></li>
                            </>
                        )}

                        <li><Link to="/courses" onClick={hideDrawer}>All Courses</Link></li>
                        <li><Link to="/contact" onClick={hideDrawer}>Contact Us</Link></li>
                        <li><Link to="/about" onClick={hideDrawer}>About Us</Link></li>

                        <li className='absolute bottom-4 w-[90%] left-1/2 -translate-x-1/2'>
                            <div className='w-full flex items-center justify-between gap-2'>
                                {!isLoggedIn ? (
                                    <>
                                        <Link to="/login" className="w-full" onClick={hideDrawer}>
                                            <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold rounded-md w-full transition-all'>
                                                Login
                                            </button>
                                        </Link>
                                        <Link to="/signup" className="w-full" onClick={hideDrawer}>
                                            <button className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 font-semibold rounded-md w-full transition-all'>
                                                Signup
                                            </button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/user/profile" className="w-full" onClick={hideDrawer}>
                                            <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold rounded-md w-full transition-all'>
                                                Profile
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={(e) => { handleLogout(e); hideDrawer(); }}
                                            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 font-semibold rounded-md w-full transition-all'
                                        >
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="min-h-[90vh]">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default HomeLayout;