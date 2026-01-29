import React from 'react';

const WeightChartModal = ({ isOpen, onClose, chartData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-purple-200 to-pink-200 p-8 rounded-xl shadow-lg w-full max-w-lg mx-auto transform transition-all sm:my-8 sm:w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Weekly Weight Tracking</h2>
        <div className="bg-white p-4 rounded-lg flex items-end justify-around h-64">
          {chartData.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-8 bg-purple-500 rounded-t-lg transition-all duration-300 ease-in-out"
                style={{ height: `${(data.weight - 70) * 10 + 20}px` }}
              ></div>
              <span className="text-xs text-gray-600 mt-2">{data.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeightChartModal;