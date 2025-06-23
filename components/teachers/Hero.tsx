const HeroSection = () => {
  return (
    <div className="text-center mb-20">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
        Join My Pathshaala
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
        Become a Teacher
      </h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Shape the Future</h3>
            </div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              My Pathshaala is always looking for qualified and passionate teachers to join our network. 
              If you have the expertise and dedication to help students excel in their academics, 
              we would love to have you on board.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;