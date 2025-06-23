import React from 'react'
import FloatingElement from './FloatingElement'
import AnimatedButton from './AnimatedButton'

export default function CallToActions() {
    return (
        <section className="relative py-24 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden" >
            {/* Dynamic background elements */}
            < div className="absolute inset-0" >
                {/* Large floating orbs */}
                <FloatingElement delay={0} amplitude={30} >
                    <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
                </FloatingElement >

                <FloatingElement delay={1000} amplitude={25}>
                    <div className="absolute bottom-32 left-32 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
                </FloatingElement>

                {/* Small floating particles */}
                <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                        <FloatingElement key={i} delay={i * 200} amplitude={Math.random() * 15 + 5}>
                            <div
                                className="absolute w-2 h-2 bg-white/20 rounded-full blur-sm"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                            ></div>
                        </FloatingElement>
                    ))}
                </div>
            </div >

            {/* Grid pattern overlay */}
            < div className="absolute inset-0 opacity-10" >
                <div className="w-full h-full" style={{
                    backgroundImage: `
        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
      `,
                    backgroundSize: '50px 50px'
                }}></div>
            </div >

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Animated Badge */}
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-white/90 font-medium">Join 10,000+ Active Learners</span>
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                            Ready to
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-amber-400 bg-clip-text text-transparent">
                            Excel in Your Studies?
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                        Transform your academic journey with personalized tutoring from expert educators.
                        <span className="text-white font-medium"> Start learning smarter, not harder.</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <AnimatedButton variant="primary">
                            🎯 Start Learning Now
                        </AnimatedButton>
                        <AnimatedButton variant="secondary">
                            👨‍🏫 Teach With Us
                        </AnimatedButton>
                    </div>

                    
                </div>
            </div>
        </section >
    )
}
