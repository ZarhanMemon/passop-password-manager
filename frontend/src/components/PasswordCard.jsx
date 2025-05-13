import { useState } from "react";
import { Eye, EyeOff, Trash2, Pencil } from "lucide-react";

const PasswordCard = ({ data, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        site: data.site, 
        username: data.username, 
        password: data.password, 
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => {
            const updated = { ...prev, [name]: value };
            onEdit(data._id, updated); // Save data automatically when a change happens
            return updated;
        });
    };

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-lg transition duration-200 min-h-[200px]">
            {/* Site */}
            <div className="w-full md:w-1/5">
                <label className="text-xs text-gray-500">Site</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="site"
                        value={updatedData.site}
                        onChange={handleChange}
                        className="bg-gray-800 text-white px-3 py-2 mt-1 rounded-md w-full focus:ring-2 focus:ring-green-500 outline-none h-10"
                    />
                ) : (
                    <p className="text-white mt-1 truncate">{data.site}</p>
                )}
            </div>

            {/* Username */}
            <div className="w-full md:w-1/5">
                <label className="text-xs text-gray-500">Username</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="username"
                        value={updatedData.username}
                        onChange={handleChange}
                        className="bg-gray-800 text-white px-3 py-2 mt-1 rounded-md w-full focus:ring-2 focus:ring-green-500 outline-none h-10"
                    />
                ) : (
                    <p className="text-gray-300 mt-1 truncate">{data.username}</p>
                )}
            </div>

            {/* Password */}
            <div className="w-full md:w-1/5">
                <label className="text-xs text-gray-500">Password</label>
                <div className="flex items-center mt-1">
                    {isEditing ? (
                        <input
                            type="text"
                            name="password"
                            value={updatedData.password}
                            onChange={handleChange}
                            className="bg-gray-800 text-white px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-green-500 outline-none h-10"
                        />
                    ) : (
                        <>
                            <p className="text-gray-400 truncate mr-2">
                                {showPassword ? data.password : "••••••••"}
                            </p>
                            <button
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="text-green-400 hover:text-green-300"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 ml-auto">
                {isEditing ? (
                    <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-sm"
                    >
                        Cancel
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm"
                    >
                        <Pencil size={16} />
                    </button>
                )}
                <button
                    onClick={() => onDelete(data._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default PasswordCard;
