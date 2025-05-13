import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuthStore } from "../storeApi/useAuth.js"; // Ensure addPassword is properly imported
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Navbar = () => {
    const navigate = useNavigate(); 
    const { logout, authcheck } = useAuthStore(); // Assuming you're using a custom auth store

    const handleLogout = async () => {
        try {
            // Check if the user is authenticated
            if (!authcheck) {
                await logout(); // Log out the user
                // Redirect to login page after successful logout
                navigate('/login'); // Use navigate() from useNavigate hook
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex sm:justify-evenly justify-between items-center px-4 py-5 h-14">
                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span><span className='text-green-500'>/OP&gt;</span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                    {/* Portfolio Link
                    <a
                        href="https://your-portfolio-link.com" // Replace this with your actual portfolio URL
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-green-500">
                        Portfolio
                    </a> */}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center w-8 h-8 rounded-md bg-red-500 text-white hover:bg-red-600">
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
