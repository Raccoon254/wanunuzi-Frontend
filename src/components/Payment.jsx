import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for the Modal

const Payment = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the modal to show the amount being paid
  };

  const submitPayment = async () => {
    const amount = 1; // The payment amount is now hardcoded

    try {
      const response = await axios.post('http://localhost:3000/payment', {
        "BusinessShortCode": 174379,
        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwNjA5MTI1MTIw",
        "Timestamp": "20230609125120",
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phoneNumber,
        "PartyB": 174379,
        "PhoneNumber": phoneNumber,
        "CallBackURL": "https://mydomain.com/path",
        "AccountReference": "CompanyXLTD",
        "TransactionDesc": "Payment of X"
      }, {
        headers: {
          'Authorization': 'Basic WjFPc0h0OXY2dnpkZHFyc3hTV0dodng2VmVoQ2lBSUc6SDZ2SWNOVHVCN0ZRU0JEeA=='
        }
      });

      setResponseData(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResponseData(null);
    }

    setIsModalOpen(false); // Close the modal after payment is made
  };

  return (
      <div className="w-full flex flex-col place-items-center h-[90vh] justify-center">
        <form className="w-80 flex flex-col gap-3 justify-center place-content-center place-items-center" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-green-900">Payment</h2>
          {error && <p className="text-red-500">{error}</p>}
          {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
          <input className="input input-bordered w-full max-w-xs"
                 type="text"
                 id="phoneNumber"
                 placeholder='Enter Phone Number'
                 value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button className="btn w-full bg-customGreen text-white ring-2 ring-customGreen hover:text-gray-800" type="submit">Pay</button>
        </form>

        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Payment Confirmation Modal"
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
          <h2 className={"prose text-2xl"}>Payment Confirmation</h2>
          <p>You are about to pay 1. Please confirm your action.</p>
          <div className="flex flex-row gap-4">
            <button
                className="btn btn-circle ring-offset-1 border-2 border-warning bg-warning text-white text-2xl ring-2 ring-inset ring-white hover:bg-red-700 hover:border-red-700"
                onClick={submitPayment}
            >
              <i className="fas fa-check"></i>
            </button>
            <button
                className="btn btn-circle ring-offset-1 border-2 border-customGreen bg-customGreen text-white text-2xl ring-2 ring-inset ring-white"
                onClick={() => setIsModalOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </Modal>
      </div>
  );
};

export default Payment;
