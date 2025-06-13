import React, { useState, useEffect } from 'react'
import { IoIosSend } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";

function forgot() {
    const [issend, setissend] = useState(false);
    const [timer, setTimer] = useState(60);
    const [intervalId, setIntervalId] = useState(null);
    const [gmail, setgmail] = useState("")

    useEffect(() => {
        const lastSent = localStorage.getItem("code_sent_time");
        if (lastSent) {
            const secondsPassed = Math.floor((Date.now() - Number(lastSent)) / 1000);
            if (secondsPassed < 60) {
                setissend(true);
                setTimer(60 - secondsPassed);
                startCountdown(60 - secondsPassed);
            } else {
                localStorage.removeItem("code_sent_time");
            }
        }
    }, []);

    const startCountdown = (startFrom = 60) => {
        let time = startFrom;
        const id = setInterval(() => {
            time -= 1;
            setTimer(time);
            if (time <= 0) {
                clearInterval(id);
                setissend(false);
                setTimer(60);
                localStorage.removeItem("code_sent_time");
            }
        }, 1000);
        setIntervalId(id);
    };

    const generateCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handleSend = () => {
        if (issend) return;
        if (!gmail.includes("@") || !gmail.includes(".") || !gmail) {
            alert("Please enter a valid Gmail address.");
            return;
        }

        //code

        localStorage.setItem("code_sent_time", Date.now().toString());
        setissend(true);
        startCountdown();
    };


    return (
        <div className="flex justify-center items-center h-full mt-[8vh]">
            <div className="w-11/12 sm:w-2/5 bg-white px-8 py-6 sm:p-18 rounded shadow-sm border border-gray-900/10 h-full dark:bg-gray-800">
                <h1 className='text-center text-2xl font-bold mb-8 dark:text-gray-200'>Forgot your password!</h1>
                <h2 className='pl-3 text-left text-base font-bold text-gray-500 dark:text-gray-400'>send a 6-digit code to your emaill address.</h2>
                <div className='px-2 pt-0 pb-4 mb-8 border-b-2 border-gray-500/20'>
                </div>
                <div className='block'>
                    <div className='p-2 text-center relative'>
                        <MdOutlineMailOutline className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input type="gmail"
                            placeholder='Enter your gmail'
                            required
                            onChange={e => setgmail(e.target.value)}
                            className='p-4 pl-12 pr-20 w-full bg-gray-300/50 rounded dark:bg-gray-400/50 dark:text-gray-300' />
                        <div className='absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-1 cursor-pointer  dark:text-white' onClick={handleSend}>
                            <IoIosSend className='text-xl' />
                            <span>{issend ? `${timer}s` : "send"}</span>
                        </div>
                    </div>
                    <div className='p-2 text-center relative'>
                        <IoLockClosedOutline className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="text"
                            placeholder="6-Digit Code"
                            maxLength={6}
                            inputMode="numeric"
                            pattern="\d*"
                            className="p-4 pl-12 w-full bg-gray-300/50 rounded dark:bg-gray-400/50 dark:text-gray-300"
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                                e.target.value = onlyNums;
                            }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default forgot