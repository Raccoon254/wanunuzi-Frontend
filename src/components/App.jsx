import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Homepage from './Homepage.jsx';
import Payment from './Payment.jsx';
import 'tailwindcss/tailwind.css';
import Loan from "./Loan.jsx";

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');

    if (token && Date.now() <= expirationTime) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}


function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<SignUp />} />                    
                <Route path="/payment" element={<Payment />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="loan" element={<ProtectedRoute><Loan /></ProtectedRoute>} />
            </Route>
        </Routes>
    );
}

export default App;
