const CompetitiveExamFeesSection = () => {
  const subjects = [
    { name: 'Chemistry', yearlyGroup: '₹45,000', monthlyGroup: '₹4,000', homeMonthly: '₹10,000' },
    { name: 'Physics', yearlyGroup: '₹45,000', monthlyGroup: '₹4,000', homeMonthly: '₹10,000' },
    { name: 'Mathematics', yearlyGroup: '₹45,000', monthlyGroup: '₹4,000', homeMonthly: '₹10,000' },
    { name: 'Biology', yearlyGroup: '₹45,000', monthlyGroup: '₹4,000', homeMonthly: '₹10,000' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Competitive Exams Fees
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Specialized coaching for NEET and IIT-JEE preparation
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur opacity-50"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      <th className="py-4 px-6 text-left font-semibold">Subject</th>
                      <th className="py-4 px-6 text-left font-semibold">Group Tuition (Per Year)</th>
                      <th className="py-4 px-6 text-left font-semibold">Group Tuition (Per Month)</th>
                      <th className="py-4 px-6 text-left font-semibold">Home Tuition (Per Month)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {subjects.map((subject, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/50'} hover:bg-purple-50/50 transition-colors duration-200`}>
                        <td className="py-4 px-6 font-semibold text-gray-800">{subject.name}</td>
                        <td className="py-4 px-6 text-gray-700 font-medium">{subject.yearlyGroup}</td>
                        <td className="py-4 px-6 text-gray-700 font-medium">{subject.monthlyGroup}</td>
                        <td className="py-4 px-6 text-gray-700 font-medium">{subject.homeMonthly}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveExamFeesSection;