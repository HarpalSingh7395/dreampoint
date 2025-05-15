import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import TeacherCard from '../components/TeacherCard';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <ServiceCard 
              title="Home Tuition" 
              description="Personalized one-on-one tutoring at the comfort of your home by experienced tutors."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              }
            />
            <ServiceCard 
              title="Group Tuition" 
              description="Learn collaboratively with peers in small groups led by expert teachers."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
              bgColor="bg-green-50"
            />
            <ServiceCard 
              title="Online Classes" 
              description="Access quality education from anywhere with our interactive online classes."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              bgColor="bg-purple-50"
            />
            <ServiceCard 
              title="Board Exam Preparation" 
              description="Comprehensive preparation for all board exams with focus on scoring high marks."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              bgColor="bg-yellow-50"
            />
            <ServiceCard 
              title="NEET/IIT-JEE Coaching" 
              description="Specialized coaching for competitive exams with proven success strategies."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              }
              bgColor="bg-red-50"
            />
            <ServiceCard 
              title="Crash Courses" 
              description="Intensive short-term courses for quick revision and last-minute preparation."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              bgColor="bg-orange-50"
            />
          </div>
          <div className="text-center mt-12">
            <Link href="/fees" className="btn-primary">
              View Fees Structure
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">Why Choose Dream Point</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-blue-600">Our Approach</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">Experienced and qualified tutors with proven teaching expertise</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">Personalized learning plans tailored to individual student needs</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">Regular assessments and progress tracking</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">Focus on conceptual clarity and practical application</p>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-blue-600">Our Results</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">Consistent top performers in board examinations</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">Excellent track record in competitive exams (NEET, IIT-JEE)</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">Trusted by thousands of parents and students</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">High student satisfaction and retention rate</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Teachers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">Our Expert Teachers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <TeacherCard 
              name="Rajan Kumar"
              qualification="M.Sc. (Hons.) Physics, M.Sc. Mathematics, B.Ed."
              experience="10+ Years Teaching Experience"
              imageSrc="/images/teacher-1.jpg"
            />
            <TeacherCard 
              name="Harshdeep"
              qualification="M.Sc. (Hons.) Chemistry"
              experience="8+ Years Teaching Experience"
              imageSrc="/images/teacher-2.jpg"
            />
            <TeacherCard 
              name="Manjeet Kumar"
              qualification="M.Sc. Zoology, B.Ed."
              experience="16+ Years Teaching Experience"
              imageSrc="/images/teacher-3.jpg"
            />
            <TeacherCard 
              name="Paramjit Singh"
              qualification="M.Sc. Mathematics"
              experience="6+ Years Teaching Experience"
              imageSrc="/images/teacher-4.jpg"
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Excel in Your Studies?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
            Join Dream Point today and experience the difference our expert tutors can make in your academic journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/for-students" className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
              Register as Student
            </Link>
            <Link href="/for-teachers" className="bg-transparent border-2 border-white text-white hover:bg-blue-700 font-bold py-3 px-8 rounded-lg transition duration-300">
              Join as Teacher
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}