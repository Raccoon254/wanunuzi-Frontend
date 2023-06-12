
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavRight({ onClose }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
            <div className="navbar bg-red-800 pt-1 w-[170px] h-screen flex flex-col items-start text-black">
                <button onClick={onClose} className="self-end p-2 mb-2 bg-white rounded-full">
                    Close
                </button>

                <a className="flex items-center my-1 gap-2 w-full p-2 rounded-full hover:bg-customGreen">

                    <button className="p-2 inline-flex items-center justify-center rounded-full border text-white ring-2 ring-customGreen">
                        <i className="fa-solid fa-building-columns"></i>
                    </button>

                    <p className="text-white">Deposit</p>
                </a>

                <a className="flex items-center my-1 gap-2  w-full p-2 rounded-full hover:bg-customGreen">
                    <button className="p-2 inline-flex items-center justify-center rounded-full border text-white ring-2 ring-customGreen">
                        <i className="fa-solid fa-money-check-dollar"></i>
                    </button>
                    <p className="text-white">Withdraw</p>
                </a>

                <a className="flex items-center my-1 gap-2  w-full p-2 rounded-full hover:bg-customGreen">
                    <button className="p-2 inline-flex items-center justify-center rounded-full border text-white ring-2 ring-customGreen">
                        <i className="fa-solid fa-circle-info"></i>
                    </button>
                    <p className="text-white">About</p>
                </a>
            </div>
    );
}

export default function ParentComponent() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex">
            {isSidebarOpen && <NavRight onClose={() => setIsSidebarOpen(false)} />}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 btn btn-circle fixed top-0">
                <i className="fa-solid fa-bars"></i>
            </button>
            {/* Your other content here */}
        </div>
    );
}
