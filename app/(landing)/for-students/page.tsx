// app/for-students/page.js
import React from 'react';
import Link from 'next/link';

export default function ForStudentsPage() {
  const services = [
    {
      title: "Home Tuition",
      description: "One-on-one personalized teaching at your home by qualified teachers.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21l4-4 4 4" />
        </svg>
      ),
      gradient: "from-blue-500 to-purple-600",
      benefits: [
        "Customized learning experience",
        "Flexible timing as per your schedule",
        "Individual attention to address specific academic needs",
        "Regular progress tracking and feedback"
      ],
      levels: [
        "Nursery to 5th Class",
        "6th to 8th Class",
        "9th and 10th Class",
        "11th and 12th Class (Medical, Non-Medical, Commerce)"
      ]
    },
    {
      title: "Group Tuition",
      description: "Small batch teaching for collaborative learning environment.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-600",
      benefits: [
        "Cost-effective learning solution",
        "Peer learning opportunities",
        "Competitive environment to enhance performance",
        "Structured curriculum and teaching approach"
      ],
      levels: [
        "9th and 10th Class",
        "11th and 12th Class (Medical, Non-Medical, Commerce)"
      ]
    },
    {
      title: "Competitive Exam Preparation",
      description: "Specialized coaching for entrance exams and competitive tests.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: "from-emerald-500 to-teal-600",
      benefits: [
        "Expert guidance from experienced teachers",
        "Focus on conceptual clarity and application",
        "Regular mock tests and performance analysis",
        "Tips and tricks to crack tough exams"
      ],
      exams: [
        "NEET Preparation",
        "IIT-JEE (Mains & Advanced)",
        "Banking Exams (PO, Clerk)",
        "SSC Exams",
        "NDA & NA Exams"
      ]
    },
    {
      title: "Crash Courses",
      description: "Intensive short-term preparation for board and competitive exams.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: "from-orange-500 to-red-600",
      benefits: [
        "Quick revision of complete syllabus",
        "Focus on important topics and question patterns",
        "Last-minute doubt clearing sessions",
        "Practice with previous years' question papers"
      ],
      courses: [
        "Board Exam Crash Course (2 months)",
        "NEET/IIT-JEE Crash Course (2 months)"
      ]
    }
  ];

  const subjects = [
    {
      title: "Science Subjects",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-600",
      subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"]
    },
    {
      title: "Humanities & Commerce",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: "from-purple-500 to-indigo-600",
      subjects: ["English", "Social Studies", "History", "Geography", "Economics", "Accountancy", "Business Studies"]
    },
    {
      title: "Primary Level",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      gradient: "from-emerald-500 to-green-600",
      subjects: ["All subjects for Nursery to 5th", "All subjects for 6th to 8th", "Mathematics & Science for 9th", "English & Hindi Language"]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl"></div>
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-200/15 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Services for Students
          </h1>
          <div className="max-w-4xl mx-auto">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50">
                <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
                  At My Pathshaala, we are committed to providing the highest quality educational services to help students achieve 
                  academic excellence. Whether you need personalized home tuition, group coaching, or preparation for competitive exams, 
                  we have the right solutions tailored to your specific needs.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our team of experienced and qualified teachers is dedicated to helping you understand complex subjects, 
                  improve your grades, and build a strong foundation for your future academic endeavors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive educational solutions designed for your success
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300`}></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mr-4`}>
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3 text-lg">Benefits:</h4>
                    <div className="space-y-3">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start group/item">
                          <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors duration-200">
                            {benefit}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {service.levels && (
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-800 mb-3 text-lg">Available for:</h4>
                      <div className="space-y-2">
                        {service.levels.map((level, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3"></div>
                            <p className="text-gray-700">{level}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {service.exams && (
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-800 mb-3 text-lg">Exam Coverage:</h4>
                      <div className="space-y-2">
                        {service.exams.map((exam, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mr-3"></div>
                            <p className="text-gray-700">{exam}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {service.courses && (
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3 text-lg">Available Courses:</h4>
                      <div className="space-y-2">
                        {service.courses.map((course, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-3"></div>
                            <p className="text-gray-700">{course}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Subjects Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Subjects We Cover
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive coverage across all academic levels and streams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subjects.map((subject, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${subject.gradient} rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300`}></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${subject.gradient} rounded-xl flex items-center justify-center mr-4`}>
                      {subject.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{subject.title}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {subject.subjects.map((sub, idx) => (
                      <div key={idx} className="flex items-start group/item">
                        <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors duration-200">
                          {sub}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Process */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Registration Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to start your learning journey with us
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-white/50">
                <div className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "Contact us",
                      description: "Reach out through our contact form, phone, or email to express your interest."
                    },
                    {
                      step: "02", 
                      title: "Needs assessment",
                      description: "We'll discuss your academic requirements, preferred subjects, and learning goals."
                    },
                    {
                      step: "03",
                      title: "Teacher matching", 
                      description: "We'll match you with the most suitable teacher based on your requirements."
                    },
                    {
                      step: "04",
                      title: "Demo session",
                      description: "Experience a free demonstration session with the assigned teacher."
                    },
                    {
                      step: "05",
                      title: "Registration and payment",
                      description: "Complete the registration process and fee payment to start regular classes."
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start group/step">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-6">
                        <span className="text-white font-bold text-lg">{item.step}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover/step:text-blue-600 transition-colors duration-200">
                          {item.title}
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-12 text-white text-center shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Register now to begin your journey towards academic excellence with My Pathshaala.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact" className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Contact Us
                </Link>
                <Link href="/fees" className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-blue-600 transform hover:-translate-y-1 transition-all duration-300">
                  View Fees
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}