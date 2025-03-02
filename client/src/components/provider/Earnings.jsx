import { useState } from 'react';
import { Card } from '@/components/common';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Earnings = ({ earnings }) => {
  const [timeframe, setTimeframe] = useState('weekly');

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setTimeframe('weekly')}
          className={`px-4 py-2 rounded ${
            timeframe === 'weekly' ? 'bg-primary text-white' : 'bg-gray-100'
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setTimeframe('monthly')}
          className={`px-4 py-2 rounded ${
            timeframe === 'monthly' ? 'bg-primary text-white' : 'bg-gray-100'
          }`}
        >
          Monthly
        </button>
      </div>

      <Card>
        <LineChart width={600} height={300} data={earnings}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h3 className="text-lg font-medium">Total Earnings</h3>
          <p className="text-3xl font-bold">
            ${earnings.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-medium">Average per Service</h3>
          <p className="text-3xl font-bold">
            ${(earnings.reduce((sum, e) => sum + e.amount, 0) / earnings.length).toFixed(2)}
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-medium">Services Completed</h3>
          <p className="text-3xl font-bold">{earnings.length}</p>
        </Card>
      </div>
    </div>
  );
};

export default Earnings;