import React from 'react';

const NotFoundPassword = () => {
    return (<>
        <h1 className="text-3xl font-bold text-black">
            Your Password:
        </h1>
        <div className="text-center py-6">
            <h2 className="text-2xl font-bold text-gray-700">No Passwords Found</h2>
            <p className="text-gray-500">You don't have any saved passwords yet.</p>
        </div>
    </>
    );
};

export default NotFoundPassword;
