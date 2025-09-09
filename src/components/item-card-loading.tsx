import React from "react";

const ItemCardLoading: React.FC = () => (
    <div className="rounded-lg shadow-md bg-white p-4 w-full max-w-sm animate-pulse">
        <div className="h-40 bg-gray-200 rounded-md mb-4" />
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="flex space-x-2">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-8 bg-gray-200 rounded w-1/3" />
        </div>
    </div>
);

export default ItemCardLoading;