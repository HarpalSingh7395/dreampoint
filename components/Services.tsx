import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
    const services = [
        {
            title: "Home Tutoring",
            description: "Personalized one-on-one tutoring in the comfort of your home with experienced educators who understand your child's unique learning style.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            gradient: "bg-gradient-to-br from-blue-500 to-cyan-600"
        },
        {
            title: "Small Group Classes",
            description: "Interactive small group sessions that foster collaborative learning while maintaining individual attention from expert instructors.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            gradient: "bg-gradient-to-br from-purple-500 to-pink-600"
        },
        {
            title: "Live Online Classes",
            description: "Engaging virtual classrooms with interactive whiteboards, real-time doubt clearing, and recorded sessions for revision.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            gradient: "bg-gradient-to-br from-emerald-500 to-teal-600"
        },
        {
            title: "Board Exam Mastery",
            description: "Strategic preparation for CBSE, ICSE, and State boards with focus on exam patterns, time management, and scoring techniques.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            gradient: "bg-gradient-to-br from-orange-500 to-red-500"
        },
        {
            title: "NEET & JEE Coaching",
            description: "Comprehensive coaching for medical and engineering entrance exams with specialized faculty and proven success methodology.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
            gradient: "bg-gradient-to-br from-violet-500 to-purple-600"
        },
        {
            title: "Intensive Crash Courses",
            description: "Fast-track revision programs designed for quick concept reinforcement and last-minute exam preparation with maximum efficiency.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            gradient: "bg-gradient-to-br from-yellow-500 to-orange-500"
        },
        {
            title: "Mock Tests & Analysis",
            description: "Comprehensive test series with detailed performance analytics, weakness identification, and improvement strategies.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            ),
            gradient: "bg-gradient-to-br from-indigo-500 to-blue-600"
        },
        {
            title: "Study Resources Hub",
            description: "Curated study materials, practice worksheets, video lectures, and reference guides for comprehensive learning support.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            gradient: "bg-gradient-to-br from-teal-500 to-cyan-600"
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl"></div>
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <p className="text-blue-600 font-semibold mb-3 text-lg tracking-wide uppercase">
                        Our Services
                    </p>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                        Comprehensive Learning Solutions
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover our range of specialized educational services designed to unlock your potential and achieve academic excellence through personalized learning experiences.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            gradient={service.gradient}
                            delay={index * 100}
                        />
                    ))}
                </div>

                {/* Enhanced CTA Section */}
                <div className="w-full flex justify-center">
                    <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-gray-50">
                        View Fee Structure
                    </button>
                </div>
            </div>
        </section>
    );
}