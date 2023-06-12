import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const SignUp = () => {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formStep, setFormStep] = useState(1); // Initialize formStep to 1
    const [confirmEmail, setConfirmEmail] = useState(""); // Add confirmEmail state
    // Function to verify the email token
    const [emailToken, setEmailToken] = useState("");
    // Add a new state variable for the modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const verifyEmail = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/verify-email', {
                email,
                token: emailToken
            });

            if (res.status === 200 && res.data.message === 'Email verified successfully') {
                navigate('/payment');
            } else {
                setResponse(res.data.message);
            }
        } catch (error) {
            setResponse(error.response.data.message);
        }
    };

    const submitForm = async () => {
        try {
            const res = await axios.post("http://localhost:3000/signup", {
                fullName,
                password,
                email,
                phoneNumber,
                idNumber,
            });
            setFormStep(2);
        } catch (error) {
            setResponse(error.response.data.message);
        }
    };

    const handleSubmit = (event) => {

        //if password is not the same as confirm password, return
        if (!confirmPasswordValidity(password, confirmPassword)) {
            return;
        }
        //if email is not the same as confirm email, return
        if (!confirmEmailValidity(email, confirmEmail)) {
            return;
        }

        event.preventDefault();
        setIsModalOpen(true);
    };


    function confirmPasswordValidity(password, confirmPassword) {
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    }

    function confirmEmailValidity(email, confirmEmail) {
        if (email !== confirmEmail) {
            setResponse("Emails do not match");
            return false;
        } else {
            setResponse("");
            return true;
        }
    }

    return (
        <div className="w-full flex flex-col place-items-center mt-10 h-fit md:h-[90vh] justify-center">

            {formStep === 1 && (
            <form className="w-80 md:w-1/2 flex flex-col gap-3 justify-center place-content-center place-items-center" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold text-green-900 mb-4">Join Us</h2>
                <div className="flex md:flex-row flex-col gap-2 w-full">

                    <div className="flex w-full md:w-1/2  flex-col gap-2">

                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                            <input className="input input-bordered input-success w-full max-w-xs"
                                   type="text"
                                   required={true}
                                   placeholder="Full Name"
                                   value={fullName}
                                   onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your
                                email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                    </svg>
                                </div>
                                <input className="pl-[40px] input input-bordered input-success w-full max-w-xs "
                                       type="email"
                                       id="email-address-icon"
                                       required={true}
                                       placeholder="email@example.com"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Confirm
                                email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                    </svg>
                                </div>
                                <input className="pl-[40px] input input-bordered input-success w-full max-w-xs "
                                       type="email"
                                       id="email-address-icon"
                                       required={true}
                                       placeholder="email@example.com"
                                       value={confirmEmail}
                                       onChange={(e) => setConfirmEmail(e.target.value)}
                                       onBlur={() => confirmEmailValidity(email, confirmEmail)}
                                />
                            </div>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                            <input className="input input-bordered input-success w-full max-w-xs"
                                   type="tel"
                                   required={true}
                                   placeholder="07********"
                                   value={phoneNumber}
                                   onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>



                    </div>


                    <div className="flex w-full md:w-1/2 flex-col gap-2">
                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">ID Number</label>
                            <input className="input input-bordered input-success w-full max-w-xs"
                                   type="text"
                                   required={true}
                                   placeholder="*********"
                                   value={idNumber}
                                   onChange={(e) => setIdNumber(e.target.value)}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input className="input input-bordered input-success w-full max-w-xs "
                                   type="password"
                                   required={true}
                                   placeholder="Password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                            <input className="input input-bordered input-success w-full max-w-xs"
                                   type="password"
                                   required={true}
                                   placeholder="Confirm Password"
                                   value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                                   onBlur={() => confirmPasswordValidity(password, confirmPassword)}
                            />
                            <p className="error text-red-400 accent-accent">{passwordError}</p>
                        </div>
                    </div>


                </div>
                <button className="btn w-full md:w-1/2 mt-3 bg-green-400 ring-red-500 ring-offset-2 ring-2" type="submit">Register</button>
                <p className="text-red-800">{response}</p>
                <p>Already have an account? <a className="hover:text-green-900 hover:font-bold" href="/login">Sign In</a></p>
            </form>

            )}
            {formStep === 2 && (
                <form className={"flex flex-col items-center justify-center gap-4"} onSubmit={verifyEmail}>
                    <label htmlFor="emailToken">Email Verification Code</label>
                    <input
                        className="input input-bordered input-success w-full max-w-xs"
                        id="emailToken"
                        type="text"
                        required={true}
                        placeholder="Enter your verification code"
                        value={emailToken}
                        onChange={(e) => setEmailToken(e.target.value)}
                    />
                    <button className={"btn w-full bg-customGreen text-white ring-2 ring-customGreen hover:text-gray-800"} type="submit">Verify Email</button>
                    {response && <p className="text-red-500">{response}</p>}
                </form>
            )}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Email Verification Modal"
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
                <h2 className={"prose text-2xl"}>Hello, {fullName}</h2>
                <p>Please verify that you have access to {email} <br /> as it will be used for verification.</p>
                <div className="flex flex-row gap-4">
                    <button className="btn btn-circle ring-offset-1 border-2 border-warning bg-warning text-white text-2xl ring-2 ring-inset ring-white hover:bg-red-700 hover:border-red-700"
                        onClick={() => {
                        setIsModalOpen(false);
                        submitForm();
                    }}
                        >
                        <i className="fas fa-check"></i>
                    </button>
                    <button className="btn btn-circle ring-offset-1 border-2 border-customGreen bg-customGreen text-white text-2xl ring-2 ring-inset ring-white" onClick={() => setIsModalOpen(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default SignUp;
