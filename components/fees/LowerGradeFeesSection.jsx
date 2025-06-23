const LowerGradeFeesSection = () => {
  const gradeGroups = [
    {
      title: 'Nursery to 5th Class',
      fee: '₹6,000/month',
      subjects: 'All subjects',
      duration: '2 hours (alternate days)',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      title: '6th to 8th Class',
      fee: '₹7,000/month',
      subjects: 'All subjects',
      duration: '1½ hours (alternate days)',
      gradient: 'from-teal-500 to-cyan-600',
      bgGradient: 'from-teal-500/10 to-cyan-500/10'
    },
    {
      title: '9th Class',
      fee: 'Starting from ₹6,000/month',
      subjects: 'Multiple options available',
      duration: 'Flexible timing',
      gradient: 'from-indigo-500 to-purple-600',
      bgGradient: 'from-indigo-500/10 to-purple-500/10',
      extraOptions: [
        'Maths & Science: ₹6,000/month (1½ hours)',
        'Maths, Science & SST: ₹9,000/month (1½ hours)'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Fees for Classes Nursery to 8th
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Foundation building programs for young learners
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {gradeGroups.map((grade, index) => (
            <div key={index} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${grade.bgGradient} rounded-2xl blur opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
                <div className="flex items-center mb-6">
                  <div className={`w-10 h-10 bg-gradient-to-r ${grade.gradient} rounded-xl flex items-center justify-center mr-3`}>
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{grade.title}</h3>
                </div>
                
                <div className="mb-6">
                  <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                    {grade.fee}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start group/item">
                    <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{grade.subjects}</p>
                  </div>
                  
                  <div className="flex items-start group/item">
                    <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{grade.duration}</p>
                  </div>
                  
                  {grade.extraOptions && grade.extraOptions.map((option, idx) => (
                    <div key={idx} className="flex items-start group/item">
                      <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-3 mt-1">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-sm">{option}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LowerGradeFeesSection;