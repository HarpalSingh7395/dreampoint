const RequirementsSection = () => {
  const documents = [
    "Qualification certificates",
    "CV/Resume", 
    "Experience letters (if applicable)",
    "Aadhaar Card",
    "Police Clearance Certificate (PCC)",
    "Driving license (if you have your own vehicle)"
  ];

  const formRequirements = [
    "Your qualifications and teaching experience",
    "Subjects and classes you can teach", 
    "Preference for home tuition or group tuition",
    "Preference for online classes",
    "Time availability for classes",
    "Transportation details"
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Registration Process
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Simple requirements to get started with your teaching journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Required Documents */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Required Documents</h3>
            </div>
            
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-start group/item">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed group-hover/item:text-gray-900 transition-colors duration-200">
                    {doc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Requirements */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Registration Form Details</h3>
            </div>
            
            <div className="space-y-4">
              {formRequirements.map((requirement, index) => (
                <div key={index} className="flex items-start group/item">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed group-hover/item:text-gray-900 transition-colors duration-200">
                    {requirement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default RequirementsSection;