import React from 'react'
import FloatingElement from './FloatingElement'
import TeacherCard from './TeacherCard'
import AnimatedButton from './AnimatedButton'

export default function TeachersSection() {
    return (
        <section className="relative py-20 bg-gradient-to-b from-blue-50 to-indigo-50 overflow-hidden">
            {/* Background elements similar to Hero */}
            <div className="absolute inset-0">
                <FloatingElement delay={0} amplitude={20}>
                    <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
                </FloatingElement>

                <FloatingElement delay={1500} amplitude={15}>
                    <div className="absolute bottom-32 right-1/4 w-56 h-56 bg-purple-200/20 rounded-full blur-3xl"></div>
                </FloatingElement>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-white/90 rounded-full px-6 py-2 mb-6 shadow-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-blue-900/90 font-medium">Meet Our Educators</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Our Expert Teachers
                        </span>
                    </h2>

                    <p className="text-xl text-blue-900/80 max-w-3xl mx-auto leading-relaxed">
                        {`Learn from the best minds in education. Our tutors are not just qualified - they're passionate mentors dedicated to your success.`}
                    </p>
                </div>

                {/* Teacher cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TeacherCard
                        name="Ravi Kauldhar"
                        qualification="M.Sc. (Hons.) Physics, M.Sc. Mathematics, B.Ed."
                        experience="10+ Years Teaching Experience"
                        imageSrc="/images/teacher-1.jpg"
                    />
                    <TeacherCard
                        name="Paramjit Singh"
                        qualification="M.Sc. (Hons.) Chemistry"
                        experience="8+ Years Teaching Experience"
                        imageSrc="/images/teacher-2.jpg"
                    />
                    <TeacherCard
                        name="Nitika Sharma"
                        qualification="M.Sc. Zoology, B.Ed."
                        experience="16+ Years Teaching Experience"
                        imageSrc="/images/teacher-3.jpg"
                    />
                </div>

                {/* CTA at bottom */}
                {/* <div className="text-center mt-16">
                    <AnimatedButton variant="primary">
                        👨‍🏫 Meet All Our Teachers
                    </AnimatedButton>
                </div> */}
            </div>

            {/* Bottom wave */}
            {/* <div className="absolute bottom-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
                    <path
                        d="M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 L1440,120 L0,120 Z"
                        fill="white"
                    ></path>
                </svg>
            </div> */}
        </section>
    )
}
