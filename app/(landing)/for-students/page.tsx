// app/for-students/page.js
import React from 'react';
import Link from 'next/link';

export default function ForStudentsPage() {
  const services = [
    {
      title: "Home Tuition",
      description: "One-on-one personalized teaching at your home by qualified teachers.",
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

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Services for Students</h1>
      
      <section className="mb-12">
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="mb-4">
            At Dream Point, we are committed to providing the highest quality educational services to help students achieve 
            academic excellence. Whether you need personalized home tuition, group coaching, or preparation for competitive exams, 
            we have the right solutions tailored to your specific needs.
          </p>
          <p>
            Our team of experienced and qualified teachers is dedicated to helping you understand complex subjects, 
            improve your grades, and build a strong foundation for your future academic endeavors.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="mb-4 text-gray-700">{service.description}</p>
              
              <h4 className="font-semibold mb-2">Benefits:</h4>
              <ul className="list-disc pl-6 mb-4">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="mb-1">{benefit}</li>
                ))}
              </ul>
              
              {service.levels && (
                <>
                  <h4 className="font-semibold mb-2">Available for:</h4>
                  <ul className="list-disc pl-6 mb-4">
                    {service.levels.map((level, idx) => (
                      <li key={idx} className="mb-1">{level}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {service.exams && (
                <>
                  <h4 className="font-semibold mb-2">Exam Coverage:</h4>
                  <ul className="list-disc pl-6 mb-4">
                    {service.exams.map((exam, idx) => (
                      <li key={idx} className="mb-1">{exam}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {service.courses && (
                <>
                  <h4 className="font-semibold mb-2">Available Courses:</h4>
                  <ul className="list-disc pl-6 mb-4">
                    {service.courses.map((course, idx) => (
                      <li key={idx} className="mb-1">{course}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Subjects We Cover</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Science Subjects</h3>
            <ul className="list-disc pl-6">
              <li className="mb-1">Physics</li>
              <li className="mb-1">Chemistry</li>
              <li className="mb-1">Biology</li>
              <li className="mb-1">Mathematics</li>
              <li className="mb-1">Computer Science</li>
            </ul>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Humanities & Commerce</h3>
            <ul className="list-disc pl-6">
              <li className="mb-1">English</li>
              <li className="mb-1">Social Studies</li>
              <li className="mb-1">History</li>
              <li className="mb-1">Geography</li>
              <li className="mb-1">Economics</li>
              <li className="mb-1">Accountancy</li>
              <li className="mb-1">Business Studies</li>
            </ul>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Primary Level</h3>
            <ul className="list-disc pl-6">
              <li className="mb-1">All subjects for Nursery to 5th</li>
              <li className="mb-1">All subjects for 6th to 8th</li>
              <li className="mb-1">Mathematics & Science for 9th</li>
              <li className="mb-1">English & Hindi Language</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Registration Process</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <ol className="list-decimal pl-6">
            <li className="mb-3">
              <span className="font-semibold">Contact us:</span> Reach out through our contact form, phone, or email to express your interest.
            </li>
            <li className="mb-3">
              <span className="font-semibold">Needs assessment:</span> {`We'll discuss your academic requirements, preferred subjects, and learning goals.`}
            </li>
            <li className="mb-3">
              <span className="font-semibold">Teacher matching:</span> {`We'll match you with the most suitable teacher based on your requirements.`}
            </li>
            <li className="mb-3">
              <span className="font-semibold">Demo session:</span> Experience a free demonstration session with the assigned teacher.
            </li>
            <li className="mb-3">
              <span className="font-semibold">Registration and payment:</span> Complete the registration process and fee payment to start regular classes.
            </li>
          </ol>
        </div>
      </section>

      <section>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6">Register now to begin your journey towards academic excellence with Dream Point.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/contact" className="bg-white text-blue-600 font-medium py-2 px-6 rounded-md hover:bg-gray-100">
              Contact Us
            </Link>
            <Link href="/fees" className="bg-transparent border-2 border-white text-white font-medium py-2 px-6 rounded-md hover:bg-white hover:text-blue-600">
              View Fees
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}