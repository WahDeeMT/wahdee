import React from 'react';

const StatCard = ({ label, value }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center">
      <div className="text-4xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
};

export default StatCard;