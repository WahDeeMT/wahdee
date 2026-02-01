import React from 'react';

const StatCard = ({ label, value }) => {
  return (
    <div className="p-6 rounded-xl shadow-md flex flex-col items-center justify-center border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
      <div className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</div>
      <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
};

export default StatCard;