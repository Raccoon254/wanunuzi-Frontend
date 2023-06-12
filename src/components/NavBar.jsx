import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Determine if the user is logged in
  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
      <div className="navbar bg-red-800 justify-center fixed top-0 w-full">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <div className="text-3xl font-bold text-white">Wanunuzi sacco</div>
        </div>
        {isLoggedIn && (
            <div className="navbar-end">
              <button className="btn text-white btn-ghost btn-circle text-2xl">
                <i className="fa-solid fa-circle-user"></i>
              </button>
              <button className="btn text-white btn-ghost btn-circle">
                <div className="indicator text-2xl">
                  <i className="fa-solid fa-bell"></i>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
              <button className="btn text-white btn-ghost btn-circle text-2xl" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
        )}
      </div>
  );
}

export default NavBar;
