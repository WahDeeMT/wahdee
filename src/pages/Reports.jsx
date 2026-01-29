import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { GeneralReportCard, CalorieReportCard, WeightReportCard, ActivityReportCard } from '../components/ui/reports/ReportCards';

const Reports = ({ userData, stats }) => {
    const [dateRange, setDateRange] = useState('Haftalık');

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight flex items-center gap-2">
                        <span className="bg-violet-100 p-2 rounded-xl">📊</span>
                        Raporlar & Analizler
                    </h1>
                    <p className="text-gray-500 font-medium ml-1">Detaylı sağlık verileri ve gelişim grafikleri</p>
                </div>

                {/* Date Range Picker */}
                <div className="relative group/dropdown">
                    <button className="flex items-center gap-2 bg-white text-gray-700 px-4 py-3 rounded-xl font-bold shadow-sm border border-gray-200 hover:border-violet-300 transition-all w-40 justify-between">
                        <div className="flex items-center gap-2">
                            <CalendarIcon size={18} className="text-violet-600" />
                            <span>{dateRange}</span>
                        </div>
                        <ChevronDown size={16} className="text-gray-400" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden hidden group-hover/dropdown:block z-20 animate-in zoom-in-95 duration-200">
                        {['Günlük', 'Haftalık', 'Aylık'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${dateRange === range
                                        ? 'bg-violet-50 text-violet-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
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
                <CalorieReportCard stats={stats} dateRange={dateRange} userData={userData} />
                <WeightReportCard stats={stats} dateRange={dateRange} userData={userData} />
                <ActivityReportCard stats={stats} dateRange={dateRange} />
            </div>

        </div>
    );
};

export default Reports;
