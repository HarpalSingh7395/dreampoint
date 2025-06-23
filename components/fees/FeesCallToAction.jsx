import Link from 'next/link';

const FeesCallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
          Register now and get connected with our expert tutors to achieve academic excellence. 
          Join thousands of successful students who have transformed their academic journey with us.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/for-students" className="group relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Register as Student
            </div>
          </Link>
          
          <Link href="/contact" className="group relative">
            <div className="absolute inset-0 bg-white/10 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300">
              Contact Us
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeesCallToAction;