import React from 'react'
import Image from 'next/image'

export default function AboutPage() {
  const founders = [
    {
      name: "Harpal Singh",
      title: "Co-Founder & CEO",
      role: "Product & Tech",
      image: "/images/teacher-rajan.jpg"
    },
    {
      name: "Ravi Kauldhar",
      title: "Co-Founder & COO",
      role: "Operations & Outreach",
      image: "/images/teacher-harshdeep.jpg"
    }
  ]

  return (
    <main className="bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            About My Pathshaala
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            A leading tutoring platform dedicated to personalized education and academic excellence for students from Nursery to 12th grade, as well as competitive exam preparation.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60">
        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>
            My Pathshaala is one of the most reliable platforms for private home tutors and group tuition. We offer comprehensive academic solutions for students ranging from nursery to 12th grade, as well as preparation for competitive exams like NEET, IIT-JEE, Bank PO, SSC, NDA, and more.
          </p>
          <p>
            Our mission is to provide personalized educational support through experienced and qualified mentors. We take pride in our commitment to academic excellence and our ability to match students with the right educators.
          </p>
          <p>
            With years of experience, we’ve built a reputation as a trusted name in education—helping students reach their potential with flexible, results-driven, and supportive tutoring.
          </p>
        </div>
      </section>

      {/* Founding Team Section */}
      <section className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Meet Our Founders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto px-6">
          {founders.map((founder, index) => (
            <div key={index} className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-white/60 transition-all duration-300">
              <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{founder.name}</h3>
              <p className="text-indigo-600 font-semibold">{founder.title}</p>
              <p className="text-gray-600 mt-1">{founder.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Why Choose My Pathshaala
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Excellence in education with proven results and personalized approach
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Our Approach */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </span>
                  Our Approach
                </h3>
                <ul className="space-y-4">
                  {[
                    "Experienced and qualified tutors with proven teaching expertise",
                    "Personalized learning plans tailored to individual student needs",
                    "Regular assessments and progress tracking",
                    "Focus on conceptual clarity and practical application"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-lg text-gray-700">
                      <span className="w-6 h-6 flex items-center justify-center bg-gradient-to-r from-emerald-400 to-green-500 rounded-full text-white mr-3 mt-1">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Our Results */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Our Results
                </h3>
                <ul className="space-y-4">
                  {[
                    "Consistent top performers in board examinations",
                    "Excellent track record in competitive exams (NEET, IIT-JEE)",
                    "Trusted by thousands of parents and students",
                    "High student satisfaction and retention rate"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-lg text-gray-700">
                      <span className="w-6 h-6 flex items-center justify-center bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white mr-3 mt-1">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
