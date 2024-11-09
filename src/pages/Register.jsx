import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Register() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                username,
                password
            });
            setUsername("");
            setPassword("");
            setMessage("User Register SuccessFully");
            // alert("user Registered")

        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                setMessage(error.response.data.msg || "User not registered.");
            } else {
                setMessage("An unexpected error occurred.");
            }
            console.log(error);
        }

    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Register</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300 ease-in-out"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300 ease-in-out"
                                required
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    {message && <p className='text-green-600 font-semibold my-2'>{message}!</p>}

                    <p className="mt-6 text-sm text-center text-gray-600">
                        Already have an account?{' '}
                        <Link to={"/login"} className="text-indigo-600 hover:underline" >Login</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register