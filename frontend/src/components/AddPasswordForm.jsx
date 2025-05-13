import { useState } from "react";
import { addPassword } from "../storeApi/useUser"; // Ensure addPassword is properly imported
import { Eye, EyeOff } from "lucide-react";

const AddPasswordForm = ({ onPasswordAdded }) => {
    const [formData, setFormData] = useState({
        site: "",
        username: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.site || !formData.username || !formData.password) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            await addPassword(formData);
            onPasswordAdded(); // Notify parent
            setFormData({ site: "", username: "", password: "" });
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-8 mb-10 rounded-xl shadow-2xl w-full max-w-xl mx-auto border border-gray-700 space-y-6"
        >
            <h2 className="text-2xl font-semibold text-white text-center">Add New Password</h2>

            {/* Site Input */}
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Site</label>
                <input
                    type="text"
                    name="site"
                    value={formData.site}
                    onChange={handleChange}
                    placeholder="github.com"
                    className="w-full px-4 py-3 rounded-md bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Username + Password Row */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Username */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="John Doe"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Password */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="******"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 pr-10 rounded-md bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-400 hover:text-green-300"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold tracking-wide transition duration-200"
            >
                Add Password
            </button>
        </form>
    );

};

export default AddPasswordForm;
