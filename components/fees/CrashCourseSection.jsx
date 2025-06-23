const CrashCourseSection = () => {
  const courses = [
    {
      title: 'Board Exams',
      description: 'Intensive crash course for Class 11 and 12 board exam preparation with focused curriculum coverage.',
      duration: '2 months',
      fee: '₹25,000 per subject',
      target: 'Class 11 and 12 students',
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      title: 'Competitive Exams',
      description: 'Comprehensive crash course for NEET, IIT-JEE MAINS and ADVANCE preparation with exam-focused strategies.',
      duration: '2 months',
      fee: '₹40,000 per subject',
      target: 'NEET, IIT-JEE MAINS & ADVANCE aspirants',
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-500/10 to-red-500/10'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Crash Course Fees
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Intensive short-term courses for quick exam preparation
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <div key={index} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${course.bgGradient} rounded-2xl blur opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${course.gradient} rounded-xl flex items-center justify-center mr-4`}>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{course.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {course.description}
                </p>
                
                <div className="space-y-4">
                  {[
                    { label: 'Duration', value: course.duration },
                    { label: 'Fee', value: course.fee },
                    { label: 'Target', value: course.target }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start group/item">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">{item.label}: </span>
                        <span className="text-gray-700">{item.value}</span>
                      </div>
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

export default CrashCourseSection;