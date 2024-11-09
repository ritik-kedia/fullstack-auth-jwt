import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';

function Dashboard() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = token.split('.')[1];
            const decode = JSON.parse(atob(payload));
            setUsername(decode.username);
        }
    }, []);

    const handleOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const lineChartData = [
        { name: 'Jan', uv: 400, pv: 2400 },
        { name: 'Feb', uv: 300, pv: 2210 },
        { name: 'Mar', uv: 200, pv: 2290 },
        { name: 'Apr', uv: 278, pv: 2000 },
        { name: 'May', uv: 189, pv: 2181 },
    ];

    const barChartData = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    ];

    const pieChartData = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <>
            <div className="flex justify-between text-2xl shadow-2xl p-4 font-bold items-center">
                <h1 className="text-green-500 md:text-3xl">Welcome {username}</h1>
                <button
                    onClick={handleOut}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                >
                    Log Out
                </button>
            </div>

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                        {/* Line Chart */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Monthly User Activity</h2>
                            <div className="w-full overflow-x-auto">
                                <LineChart width={400} height={250} data={lineChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </div>
                        </div>

                        {/* Bar Chart */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Page Performance</h2>
                            <div className="w-full overflow-x-auto">
                                <BarChart width={400} height={250} data={barChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="pv" fill="#8884d8" />
                                </BarChart>
                            </div>
                        </div>
                    </div>

                    {/* Second Row - Pie Chart */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
                            <div className="w-full flex justify-center">
                                <PieChart width={window.innerWidth < 768 ? 280 : 420} height={window.innerWidth < 768 ? 280 : 300}>
                                    <Pie
                                        data={pieChartData}
                                        cx={window.innerWidth < 768 ? 140 : 210}
                                        cy={window.innerWidth < 768 ? 100 : 120}
                                        labelLine={true}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={window.innerWidth < 768 ? 30 : 90}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </div>
                        </div>


                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Details</h2>
                            <p className="mb-2">Total Users: <strong>1,234</strong></p>
                            <p className="mb-2">Active Users: <strong>567</strong></p>
                            <p className="mb-2">New Registrations: <strong>123</strong></p>
                            <p className="mb-2">Monthly Revenue: <strong>$10,000</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
