import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { GeneralReportCard, CalorieReportCard, WeightReportCard, ActivityReportCard, WaterReportCard } from '../components/ui/reports/ReportCards';

const Reports = ({ userData, stats, historyData }) => {
    const [dateRange, setDateRange] = useState('Haftalık');

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black tracking-tight flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                        <span className="p-2 rounded-xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>📊</span>
                        Raporlar & Analizler
                    </h1>
                    <p className="font-medium ml-1" style={{ color: 'var(--text-secondary)' }}>Detaylı sağlık verileri ve gelişim grafikleri</p>
                </div>

                {/* Date Range Picker */}
                <div className="relative group/dropdown">
                    <button
                        className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold border transition-all w-40 justify-between shadow-sm"
                        style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                    >
                        <div className="flex items-center gap-2">
                            <CalendarIcon size={18} className="text-violet-500" />
                            <span>{dateRange}</span>
                        </div>
                        <ChevronDown size={16} style={{ color: 'var(--text-secondary)' }} />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                        className="absolute top-full right-0 mt-2 w-40 rounded-xl shadow-xl border overflow-hidden hidden group-hover/dropdown:block z-20 animate-in zoom-in-95 duration-200"
                        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                    >
                        {['Günlük', 'Haftalık', 'Aylık'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${dateRange === range
                                    ? 'bg-violet-500/10 text-violet-500'
                                    : 'hover:bg-white/5'
                                    }`}
                                style={{ color: dateRange === range ? '' : 'var(--text-primary)' }}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-12 gap-6">
                <GeneralReportCard stats={stats} />
                <CalorieReportCard stats={stats} dateRange={dateRange} userData={userData} historyData={historyData} />
                <WeightReportCard stats={stats} dateRange={dateRange} userData={userData} historyData={historyData} />
                <WaterReportCard stats={stats} dateRange={dateRange} historyData={historyData} userData={userData} />
                <ActivityReportCard stats={stats} dateRange={dateRange} historyData={historyData} />
            </div>

        </div>
    );
};

export default Reports;
