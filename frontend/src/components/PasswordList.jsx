import { useEffect, useState } from "react";
import { getPasswords, deletePassword, updatePassword } from "../storeApi/useUser.js";
import toast from "react-hot-toast";
import { Eye, EyeOff, Pencil, Trash2, Save } from "lucide-react";
import NotFoundPassword from "../sub_components/NotFoundPassword.jsx";

const PasswordList = () => {
    const [passwords, setPasswords] = useState([]);
    const [editId, setEditId] = useState(null);
    const [updatedData, setUpdatedData] = useState({ site: "", username: "", password: "" });
    const [showPasswordId, setShowPasswordId] = useState(null);

    useEffect(() => {
        const fetchPasswords = async () => {
            try {
                const fetchedPasswords = await getPasswords();
                setPasswords(fetchedPasswords);
            } catch (error) {
                toast.error("Failed to load passwords");
                console.error("Error fetching passwords:", error);
            }
        };
        fetchPasswords();
    },[fetchPasswords]);

    const handleDelete = async (id) => {
        try {
            await deletePassword(id);
            setPasswords(passwords.filter((pwd) => pwd._id !== id));
            toast.success("Password deleted successfully");
        } catch (error) {
            toast.error("Failed to delete password");
            console.error("Error deleting password:", error);
        }
    };

    const handleEditClick = (password) => {
        setEditId(password._id);
        setUpdatedData({ site: password.site, username: password.username, password: password.password });
    };

    const handleSaveClick = async () => {
        if (!editId) return;
        try {
            await updatePassword(editId, updatedData);
            setPasswords(passwords.map((pwd) =>
                pwd._id === editId ? { ...pwd, ...updatedData } : pwd
            ));
            toast.success("Password updated");
            setEditId(null);
        } catch (error) {
            toast.error("Failed to update password");
            console.error("Update error:", error);
        }
    };

    const handleInputChange = (e) => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };

    const handleBlur = async () => {
        if (!editId) return;
        await handleSaveClick();
    };

    if (passwords.length === 0) {
        return <NotFoundPassword />;
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-black mb-4">Your Password</h1>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto rounded-xl shadow-2xl m-2 border-2 border-gray-700 bg-gray-900 w-full">
                <table className="min-w-full text-white table-auto">
                    <thead className="bg-green-700 text-white uppercase text-sm">
                        <tr>
                            <th className="px-8 py-4 text-left w-1/4">Site</th>
                            <th className="px-8 py-4 text-left w-1/4">Username</th>
                            <th className="px-8 py-4 text-left w-1/4">Password</th>
                            <th className="px-8 py-4 text-center w-1/4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300 text-base divide-y divide-gray-700">
                        {passwords.map((pwd) => {
                            const isEditing = editId === pwd._id;
                            return (
                                <tr key={pwd._id} className="hover:bg-gray-800 transition duration-200">
                                    {/* SITE */}
                                    <td className="px-8 py-4">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="site"
                                                value={updatedData.site}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className="bg-gray-700 w-full px-3 py-2 rounded-md text-white"
                                            />
                                        ) : (
                                            <a href={pwd.site} target="_blank" rel="noreferrer" className="hover:underline text-blue-400">
                                                {pwd.site}
                                            </a>
                                        )}
                                    </td>

                                    {/* USERNAME */}
                                    <td className="px-8 py-4">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="username"
                                                value={updatedData.username}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className="bg-gray-700 w-full px-3 py-2 rounded-md text-white"
                                            />
                                        ) : (
                                            pwd.username
                                        )}
                                    </td>

                                    {/* PASSWORD */}
                                    <td className="px-8 py-4 flex items-center gap-3">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="password"
                                                value={updatedData.password}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className="bg-gray-700 w-full px-3 py-2 rounded-md text-white"
                                            />
                                        ) : (
                                            <>
                                                <span className="tracking-wider">{showPasswordId === pwd._id ? pwd.password : "••••••••"}</span>
                                                <button
                                                    onClick={() =>
                                                        setShowPasswordId((prev) => (prev === pwd._id ? null : pwd._id))
                                                    }
                                                    className="text-green-400 hover:text-green-300"
                                                >
                                                    {showPasswordId === pwd._id ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </>
                                        )}
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-8 py-4 text-center space-x-3">
                                        {isEditing ? (
                                            <button
                                                onClick={handleSaveClick}
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md transition"
                                            >
                                                <Save size={16} />
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleEditClick(pwd)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(pwd._id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {passwords.map((pwd) => {
                    const isEditing = editId === pwd._id;
                    return (
                        <div key={pwd._id} className="bg-gray-900 text-white p-4 rounded-xl border border-gray-700 shadow-xl">
                            {/* Site */}
                            <div className="mb-2">
                                <span className="block text-sm text-gray-400">Site</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="site"
                                        value={updatedData.site}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className="bg-gray-700 w-full px-3 py-2 rounded-md text-white"
                                    />
                                ) : (
                                    <a href={pwd.site} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                                        {pwd.site}
                                    </a>
                                )}
                            </div>

                            {/* Username */}
                            <div className="mb-2">
                                <span className="block text-sm text-gray-400">Username</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="username"
                                        value={updatedData.username}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className="bg-gray-700 w-full px-3 py-2 rounded-md text-white"
                                    />
                                ) : (
                                    pwd.username
                                )}
                            </div>

                            {/* Password */}
                            <div className="mb-2 flex items-center justify-between gap-2">
                                <div>
                                    <span className="block text-sm text-gray-400">Password</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="password"
                                            value={updatedData.password}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            className="bg-gray-700 w-full px-3 py-2 rounded-md text-white"
                                        />
                                    ) : (
                                        <span className="tracking-wider">
                                            {showPasswordId === pwd._id ? pwd.password : "••••••••"}
                                        </span>
                                    )}
                                </div>
                                {!isEditing && (
                                    <button
                                        onClick={() =>
                                            setShowPasswordId((prev) => (prev === pwd._id ? null : pwd._id))
                                        }
                                        className="text-green-400 hover:text-green-300"
                                    >
                                        {showPasswordId === pwd._id ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-2 mt-3">
                                {isEditing ? (
                                    <button
                                        onClick={handleSaveClick}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md"
                                    >
                                        <Save size={16} />
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditClick(pwd)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(pwd._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PasswordList;
