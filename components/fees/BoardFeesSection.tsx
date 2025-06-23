import React from 'react';
import FeesTable from '@/components/FeesTable';

const BoardFeesSection = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Board Preparation Fees
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Comprehensive board exam preparation with expert guidance
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="group relative mb-12">
                        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur opacity-50"></div> */}
                        <FeesTable />
                    </div>

                    {/* Payment Notes */}
                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl blur opacity-50"></div>
                        <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Payment Information</h3>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-4 mt-1">
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Yearly fees are paid annually in two installments: the first in advance at the time of registration, and the next installment after two months.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BoardFeesSection;