// app/about/page.js
import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  const teachers = [
    {
      name: "RAJAN KUMAR",
      qualifications: "M.Sc. (Hons.) Physics, M.Sc. Mathematics, B.Ed.",
      experience: "10+ Year Teaching Experience",
      image: "/images/teacher-rajan.jpg"
    },
    {
      name: "HARSHDEEP",
      qualifications: "M.Sc. (Hons.) Chemistry",
      experience: "8+ Year Teaching Experience",
      image: "/images/teacher-harshdeep.jpg"
    },
    {
      name: "MANJEET KUMAR",
      qualifications: "M.Sc. Zoology B.Ed. TET 2012, 18, AWES 2012, 22",
      experience: "16+ Years Teaching Experience",
      image: "/images/teacher-manjeet.jpg"
    },
    {
      name: "PARAMJIT SINGH",
      qualifications: "M.Sc. Mathematics",
      experience: "6+ Year Teaching Experience",
      image: "/images/teacher-paramjit.jpg"
    }
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-6 text-center">About My Pathshaala</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="mb-4">
            My Pathshaala is one of the most reliable platforms for private home tutors and group tuition. We offer comprehensive academic solutions for students ranging from nursery to 12th grade, as well as preparation for competitive exams like NEET, IIT-JEE, Bank PO, SSC, NDA, and more.
          </p>
          <p className="mb-4">
            Our mission is to provide personalized educational support to students through experienced and qualified tutors. We take pride in our commitment to academic excellence and our ability to match students with the right teachers based on their specific needs.
          </p>
          <p>
            With years of experience in the education field, My Pathshaala has established itself as a trusted name in home tuition and group tuition services, helping students achieve their academic goals and excel in their studies.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Founding Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="relative h-64 w-full">
                <Image 
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{teacher.name}</h3>
                <p className="text-gray-600 mb-2">{teacher.qualifications}</p>
                <p className="text-gray-700">{teacher.experience}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose My Pathshaala?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Qualified Teachers</h3>
            <p>All our tutors are highly qualified with relevant degrees and proven teaching experience.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Personalized Approach</h3>
            <p>{`We offer customized teaching plans tailored to each student's learning style and academic needs.`}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Competitive Exam Preparation</h3>
            <p>Specialized coaching for various competitive exams with proven success rates.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
            <p>Classes scheduled according to your convenience with options for both online and in-person sessions.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Comprehensive Coverage</h3>
            <p>From nursery to 12th grade, we cover all subjects and boards.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Regular Feedback</h3>
            <p>Continuous assessment and feedback to ensure steady academic progress.</p>
          </div>
        </div>
      </section>
    </main>
  );
}