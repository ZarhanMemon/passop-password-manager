import { Heart } from 'lucide-react'; // Import the Heart icon from Lucide

const Footer = () => {
    return (
        <div className="bg-slate-800 text-white w-full py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8">
                {/* Logo */}
                <div className="logo font-bold text-white text-2xl mb-4 sm:mb-0">
                    <span className="text-green-500"> &lt;</span>
                    <span>Pass</span><span className="text-green-500">/OP&gt;</span>
                </div>

                {/* Created by */}
                <div className="flex items-center mb-4 sm:mb-0">
                    Created with <Heart className="w-7 mx-2 text-red-500" /> by Zarhan
                </div>

                {/* Social Media Links */}
                <div className="flex gap-4 mb-4 sm:mb-0">
                    <a href="https://github.com/ZarhanMemon" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400">
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/zarhan-memon-bb2b5435a/" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400">
                        LinkedIn
                    </a>
                </div>
            </div>

            {/* Copyright Info */}
            <div className="text-sm text-gray-400 text-center mt-4 sm:mt-0">
                &copy; 2025 PassOP. All rights reserved.
            </div>
        </div>
    );
};

export default Footer;
