import FeesTable from '@/components/FeesTable';
import Link from 'next/link';

export default function FeesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Fees Structure</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Transparent and competitive pricing for all our tutoring services.
          </p>
        </div>
      </section>
      
      {/* Fees for Board Preparation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">Fees for Board Preparation</h2>
          <div className="mt-12">
            <FeesTable />
          </div>
          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Payment Notes:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <p>Yearly fees are paid annually in two installments: the first in advance at the time of registration, and the next installment after two months.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Fees for Competitive Exams */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">Fees for Competitive Exams (NEET/IIT-JEE)</h2>
          <div className="overflow-x-auto mt-12">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Subject</th>
                  <th className="py-3 px-4 text-left">Group Tuition (Per Year)</th>
                  <th className="py-3 px-4 text-left">Group Tuition (Per Month)</th>
                  <th className="py-3 px-4 text-left">Home Tuition (Per Month)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white hover:bg-blue-50">
                  <td className="py-3 px-4 font-medium">Chemistry</td>
                  <td className="py-3 px-4">₹45,000</td>
                  <td className="py-3 px-4">₹4,000</td>
                  <td className="py-3 px-4">₹10,000</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-blue-50">
                  <td className="py-3 px-4 font-medium">Physics</td>
                  <td className="py-3 px-4">₹45,000</td>
                  <td className="py-3 px-4">₹4,000</td>
                  <td className="py-3 px-4">₹10,000</td>
                </tr>
                <tr className="bg-white hover:bg-blue-50">
                  <td className="py-3 px-4 font-medium">Mathematics</td>
                  <td className="py-3 px-4">₹45,000</td>
                  <td className="py-3 px-4">₹4,000</td>
                  <td className="py-3 px-4">₹10,000</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-blue-50">
                  <td className="py-3 px-4 font-medium">Biology</td>
                  <td className="py-3 px-4">₹45,000</td>
                  <td className="py-3 px-4">₹4,000</td>
                  <td className="py-3 px-4">₹10,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Crash Course Fees */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">Crash Course Fees</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="card">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Board Exams</h3>
              <p className="text-gray-700 mb-4">
                The crash course fees for home tuition for board exams in Class 11 and 12 are Rs 25,000 per subject, with a duration of 2 months.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>Duration: 2 months</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>Fee: ₹25,000 per subject</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>For Class 11 and 12 students</p>
                </li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Competitive Exams</h3>
              <p className="text-gray-700 mb-4">
                The crash course fees for home tuition for competitive exams (NEET, IIT JEE MAINS AND ADVANCE) for class 11 and 12th are Rs 40,000 per subject, with a duration of 2 months.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>Duration: 2 months</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>Fee: ₹40,000 per subject</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>For NEET, IIT-JEE MAINS & ADVANCE aspirants</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Lower Grade Fees */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">Fees for Classes Nursery to 8th</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Nursery to 5th Class</h3>
              <p className="text-lg font-semibold text-gray-900 mb-4">
                Home Tuition: ₹6,000/month
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>All subjects</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>2 hours (alternate days)</p>
                </li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-blue-600">6th to 8th Class</h3>
              <p className="text-lg font-semibold text-gray-900 mb-4">
                Home Tuition: ₹7,000/month
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>All subjects</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>1½ hours (alternate days)</p>
                </li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-blue-600">9th Class</h3>
              <p className="text-lg font-semibold text-gray-900 mb-4">
                Home Tuition: Starting from ₹6,000/month
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>Maths & Science: ₹6,000/month (1½ hours)</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>Maths, Science & SST: ₹9,000/month (1½ hours)</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Register now and get connected with our expert tutors to achieve academic excellence.
          </p>
          <Link href="/for-students" className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
            Register as Student
          </Link>
        </div>
      </section>
    </>
  );
}