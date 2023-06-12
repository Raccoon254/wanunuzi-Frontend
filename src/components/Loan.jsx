import React, {useEffect, useState} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import moment from 'moment';
import Modal from 'react-modal';
import TestNav from "./testNav.jsx";

function navigateToLogin() {
    window.location.href = '/login';
}

Modal.setAppElement('#root'); // Replace '#root' with the id of the root element of your application

const CreateLoanForm = () => {
    const [amount, setAmount] = useState('');
    const [interestRate] = useState(10); // Given interest rate is 10%
    const [dueDate, setDueDate] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [serverResponse, setServerResponse] = useState('');
    const [user, setUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.userId) {
            // redirect to /login
            navigateToLogin();
            return;
        }

        // Check if the due date is valid
        const currentDate = moment().startOf('day');
        const selectedDate = moment(dueDate).startOf('day');
        const minDate = moment().add(1, 'month').startOf('day');

        if (selectedDate.isBefore(currentDate)) {
            setServerResponse('Due date cannot be in the past.');
            return;
        }

        if (selectedDate.isBefore(minDate)) {
            setServerResponse('Due date must be at least one month from now.');
            return;
        }

        setIsModalOpen(true);
    };


    const createLoan = async () => {
        try {
            const response = await axios.post('http://localhost:3000/createLoan', { userId: user.userId, amount, interestRate, dueDate });
            setServerResponse(response.data.message);
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
            setServerResponse('An error occurred while creating the loan.');
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            setUser(decoded);
        }
    }, []);

    useEffect(() => {
        if(amount && dueDate){
            const months = moment(dueDate).diff(moment(), 'months');
            const interest = (amount * (interestRate/100)) * months;
            setTotalAmount(parseFloat(amount) + interest);
        }
    }, [amount, dueDate, interestRate]);

    return (
        <div className="">
            <TestNav />
            <div className={"flex flex-col justify-center items-center"}>
            <form className="w-full justify-center h-full pt-28 items-center flex flex-col gap-2" onSubmit={handleSubmit}>
                <input className="input input-bordered w-full max-w-xs" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" required />
                <input className="input input-bordered w-full max-w-xs" type="text" value={`${interestRate}%`} disabled />
                <input className="input input-bordered w-full max-w-xs" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} placeholder="Due Date" required />
                {totalAmount && <p className="mt-4 text-green-500">Total amount to be paid: {totalAmount}</p>}
                <button className="btn max-w-xs w-full bg-customGreen text-white ring-2 ring-customGreen hover:text-gray-800" type="submit">Create Loan</button>
            </form>
            {serverResponse && <div className="mt-4 text-green-500">{serverResponse}</div>}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Loan Confirmation Modal"
                className="w-fit h-fit bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4 justify-center items-center text-center"
                style={{
                    overlay: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    content: {
                        position: 'relative',
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                    }
                }}
            >
                <h2>Confirm Loan</h2>
                <p>You will pay a total amount of {totalAmount}. Do you want to proceed?</p>
                <p className="text-red-500">This action cannot be undone.</p>
                <div className="flex flex-row gap-4">
                    <button className="btn btn-circle ring-offset-1 border-2 border-warning bg-warning text-white text-2xl ring-2 ring-inset ring-white hover:bg-red-700 hover:border-red-700" onClick={createLoan}>
                        <i className="fas fa-check"></i>
                    </button>
                    <button className="btn btn-circle ring-offset-1 border-2 border-customGreen bg-customGreen text-white text-2xl ring-2 ring-inset ring-white" onClick={() => setIsModalOpen(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </Modal>

            </div>
        </div>
    );
};

export default CreateLoanForm;
