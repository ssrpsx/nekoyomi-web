import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IoLockClosedOutline } from 'react-icons/io5';
import { jwtDecode } from 'jwt-decode';

function Change() {
    const [password_old, setPassword_old] = useState("");
    const [password_1, setPassword_1] = useState("");
    const [password_2, setPassword_2] = useState("");
    const [user, setUser] = useState("");

    const handleReset = async () => {
        try {
            const token = localStorage.getItem('authtoken');

            if (!token) {
                alert("No auth token found. Please login again.");
                return;
            }

            console.log("Sending reset request for:", user);

            const res = await axios.post(
                `${import.meta.env.VITE_API}/api/change`,
                {
                    username: user,
                    password_old: password_old,
                    password_1: password_1,
                    password_2: password_2
                },
                {
                    headers: {
                        authToken: token
                    }
                }
            )
            alert(res.data);
            window.location.href = '/'
        }
        catch (err) {
            if (err.response && err.response.data) {
                alert(err.response.data);
            }
            else {
                alert("Something went wrong!");
            }
            window.location.reload();
        }
    };

    const handleForgotClick = () => {
        window.location.href = '/forgot';
    };

    const loadData = () => {
        console.log(import.meta.env.VITE_API);
        try {
            const token = localStorage.getItem('authtoken')
            if (!token) return;

            const decoded = jwtDecode(token);
            setUser(decoded.user.username)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadData();
    })

    return (
        <div className="flex justify-center items-center h-full my-[8vh]">
            <div className="w-11/12 sm:w-2/5 bg-white px-8 py-6 sm:p-18 rounded shadow-sm border border-gray-900/10 h-full dark:bg-gray-800">
                <h1 className='text-center text-2xl font-bold mb-8 dark:text-gray-200'>Reset Your Password!</h1>
                <h2 className='text-left text-base text-gray-600 font-bold dark:text-gray-200'>Set a new password to access your account : <span className='uppercase text-[#4E71FF] group-hover:text-blue-300'>{user}</span></h2>
                <div className='px-2 pt-0 pb-4 mb-8 border-b-2 border-gray-500/20'></div>

                <div className='block mb-[3.5vh]'>
                    <div className='p-2 text-center relative'>
                        <IoLockClosedOutline className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="password"
                            placeholder='Old password'
                            required
                            onChange={e => setPassword_old(e.target.value)}
                            className='p-4 pl-12 w-full bg-gray-300/50 rounded dark:bg-gray-400/50 dark:text-gray-300'
                        />
                    </div>

                    <div className='p-2 text-center relative'>
                        <IoLockClosedOutline className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="password"
                            placeholder='New password'
                            required
                            onChange={e => setPassword_1(e.target.value)}
                            className='p-4 pl-12 w-full bg-gray-300/50 rounded dark:bg-gray-400/50 dark:text-gray-300'
                        />
                    </div>
                    <div className='p-2 text-center relative'>
                        <IoLockClosedOutline className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="password"
                            placeholder='Confirm new password'
                            required
                            onChange={e => setPassword_2(e.target.value)}
                            className='p-4 pl-12 w-full bg-gray-300/50 rounded dark:bg-gray-400/50 dark:text-gray-300'
                        />
                    </div>

                    <div className='p-2 mt-1 mb-5 block sm:flex'>
                        <div>
                            <a className='text-blue-600 dark:text-blue-400 cursor-pointer' onClick={handleForgotClick}>Forgot password?</a>
                        </div>
                    </div>

                    <div className='p-2 text-center'>
                        <button className='w-full bg-[#5313c4] p-4 rounded text-white font-bold cursor-pointer' onClick={handleReset}>Reset password</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Change;
