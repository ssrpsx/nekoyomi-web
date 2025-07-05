import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';

function ForgotPassword() {
    const [gmail, setGmail] = useState('');
    const [issend, setIssend] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const start = localStorage.getItem('send_timer_start');
        if (start) {
            const elapsed = Math.floor((Date.now() - parseInt(start)) / 1000);
            const remaining = Math.max(60 - elapsed, 0);
            setTimer(remaining);
            if (remaining > 0) {
                setIssend(true);
            }
        }
    }, []);

    useEffect(() => {
        if (!issend) return;
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIssend(false);
                    localStorage.removeItem('send_timer_start');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [issend]);

    const handleSend = () => {
        if (issend || !gmail) return;

        try {

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

        setIssend(true);
        setTimer(60);
        localStorage.setItem('send_timer_start', Date.now().toString());
    };

    const isCooldownOver = !issend && timer === 0;

    return (
        <div className="flex justify-center items-center h-full my-[8vh]">
            <div className="w-11/12 sm:w-2/5 bg-white px-8 py-6 sm:p-18 rounded shadow-sm border border-gray-900/10 h-full dark:bg-gray-800">
                <h1 className='text-center text-2xl font-bold mb-8 dark:text-gray-200'>Forgot your password!</h1>
                <h2 className='pl-3 text-left text-base font-bold text-gray-500 dark:text-gray-400'>
                    Send a link to your gmail address.
                </h2>
                <div className='px-2 pt-0 pb-4 mb-8 border-b-2 border-gray-500/20' />
                <div className='block'>
                    <div className='p-2 text-center relative'>
                        <MdOutlineMailOutline className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="email"
                            placeholder='Enter your gmail'
                            required
                            onChange={e => setGmail(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') handleSend();
                            }}
                            className='p-4 pl-12 pr-20 w-full bg-gray-300/50 rounded dark:bg-gray-400/50 dark:text-gray-300'
                        />
                        <div
                            className={`absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-1 cursor-pointer dark:text-white ${issend ? 'opacity-60 pointer-events-none' : ''}`}
                            onClick={handleSend}
                            disabled={!isCooldownOver || !gmail.trim()}
                        >
                            <IoIosSend className='text-xl' />
                            <span>{issend ? `${timer}s` : "send"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;