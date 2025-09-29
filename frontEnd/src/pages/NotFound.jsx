import React from "react";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50">
            <img src="404_NotFound.png"
                 alt="404_NotFound" 
                 className="max-w-full mb-6 w-96" 
            />

            <p className="text-xl font-semibold">
                you are going fobidden area😱
            </p>

            <a href="/" className="inline-block px-6 py-3 mt-6 font-medium text-white transition shadow-md rounded-2xl bg-primary hover:bg-primary-dark">
                return home page
            </a>
        </div>
    );
};

export default NotFound;