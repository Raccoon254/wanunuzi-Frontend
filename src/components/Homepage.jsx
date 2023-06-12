import React, {useEffect, useState} from 'react';
import NavRight from "./SideBar.jsx";
import NavBar from "./NavBar.jsx";
import TestNav from "./testNav.jsx";
import jwt_decode from 'jwt-decode';
import {useNavigate} from "react-router-dom";

const cardData = [
    {
        icon: 'fa-wallet',
        text: 'Balance',
        moreText: '5000',
    },
    {
        icon: 'fa-circle-check',
        text: 'Loanable Amount',
        moreText: '3000',
    },
    {
        icon: 'fa-list-check',
        text: 'Manage Loans',
        moreText: 'Manage Loans here',
    },
    {
        icon: 'fa-money-bill-trend-up',
        text: 'Savings',
        moreText: '6000',
    },
    {

        icon: 'fa-landmark',
        text: 'Apply for loan',
        moreText: 'Apply for loan here',
        link: '/loan',
    },
    {
            icon: 'fa-clock-rotate-left',
            text: 'History',
            moreText: 'Transaction History',
    }
];

const Homepage = () => {
    const navigateToLoans = useNavigate();

    const handleLoans = () => {
        navigateToLoans('/loan');
    };

    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            setUser(decoded);
        }
    }, []);
    return (
        <div className="flex flex-col w-full h-full">
            <TestNav />
            <section className="h-12 items-center md:justify-start justify-center px-7 flex text-white w-full bg-red-800">
                <p>Welcome {user.name}</p>
            </section>
            {/*
            <div className="px-4 mt-36 py-2 text-lg text-red-800 font-semibold">

                <p>Email: {user.email}</p>
                <p>Phone Number: {user.phoneNumber}</p>
                <p>ID Number: {user.idNumber}</p>
                <p>User ID: {user.userId}</p>
            </div>
         */}

            {/*


            <div className="px-4 mb-6">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/2 lg:w-1/3 text-center border-r border-b pb-4">
                        <i className="fas fa-envelope text-3xl leading-none text-blue-500"></i>
                        <h1 className="text-3xl pt-3">28,00</h1>
                        <p className="text-sm mb-0">Balance</p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 text-center border-r border-b pb-4">
                        <i className="fas fa-check-circle text-3xl leading-none text-blue-300"></i>
                        <h1 className="text-3xl pt-3">1,866</h1>
                        <p className="text-sm mb-0">Loanable Amount</p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 text-center border-r border-b md:border-r-0 pb-4 pt-4">
                        <i className="fas fa-list-check text-3xl leading-none text-blue-500"></i>
                        <h1 className="text-3xl pt-3">1,366</h1>
                        <p className="text-sm mb-0">Manage Loans</p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 text-center border-r border-b md:border-b-0 pb-4 pt-4">
                        <i className="fas fa-envelope-open text-3xl leading-none text-blue-300"></i>
                        <h1 className="text-3xl pt-3">1,200</h1>
                        <p className="text-sm mb-0">Savings</p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 text-center border-r pb-4 pt-4">
                        <i className="fas fa-landmark text-3xl leading-none text-green-500"></i>
                        <h1 className="text-3xl pt-3">900</h1>
                        <p className="text-sm mb-0">Apply for a Loan</p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 text-center pb-4 pt-4">
                        <i className="fas fa-clock text-3xl leading-none text-red-500"></i>
                        <h1 className="text-3xl pt-3">500</h1>
                        <p className="text-sm mb-0">Account History</p>
                    </div>
                </div>
            </div>

            */
            }
            <div className="grid pt-7 md:pt-24 md:pl-7 md:pr-5 grid-cols-1 w-full md:grid-cols-3 gap-6 justify-items-center h-full">
                {cardData.map((card, index) => (
                    <div key={index} className="w-10/12 h-36 p-4 rounded-lg shadow-lg bg-customGreen flex flex-col justify-center items-center space-y-3">
                        <a href={card.link}>
                        <div className="text-5xl text-white">
                            <i className={`fa ${card.icon}`}></i>
                        </div>
                        </a>
                        <h2 className="text-lg text-white font-semibold">{card.text}</h2>

                        <p className="text-sm text-white">{card.moreText}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
