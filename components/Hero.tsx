import React from 'react';
import FloatingElement from './FloatingElement';
import AnimatedButton from './AnimatedButton';

export default function Hero() {
  return (
    <section className="relative lg:min-h-[80vh] flex items-center justify-center overflow-hidden py-14">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Large floating orbs */}
        <FloatingElement delay={0} amplitude={30}>
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        </FloatingElement>
        
        <FloatingElement delay={1000} amplitude={25}>
          <div className="absolute top-40 right-32 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
        </FloatingElement>
        
        <FloatingElement delay={2000} amplitude={35}>
          <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl"></div>
        </FloatingElement>
        
        {/* Small floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <FloatingElement key={i} delay={i * 200} amplitude={Math.random() * 15 + 5}>
              <div 
                className="absolute w-2 h-2 bg-white/30 rounded-full blur-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              ></div>
            </FloatingElement>
          ))}
        </div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-white/90 font-medium">Trusted by 10,000+ Students</span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Transform Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Academic Journey
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
              Experience personalized tutoring that adapts to your learning style. From board exams to competitive tests like NEET and JEE, we make learning engaging and results-driven.
            </p>
            
            {/* Statistics */}
            <div className="flex sm:flex-row items-center justify-center lg:justify-start space-x-8 sm:space-y-0 sm:space-x-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-blue-200 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-blue-200 text-sm">Expert Tutors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-blue-200 text-sm">Support</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <AnimatedButton variant="primary">
                🎯 Find Your Perfect Tutor
              </AnimatedButton>
              <AnimatedButton variant="secondary">
                🚀 Join as a Tutor
              </AnimatedButton>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-6">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <span className="text-white/80 text-sm">Join thousands of successful students</span>
              </div>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main illustration container */}
              <FloatingElement amplitude={20}>
                <div className="relative w-64 h-64 lg:w-[500px] lg:h-[500px]">
                  {/* Central glowing orb */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-60"></div>
                  <div className="absolute inset-4 bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400 rounded-full blur-lg opacity-80"></div>
                  <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    {/* Book/Education icon */}
                    <svg className="w-16 h-16 lg:w-32 lg:h-32 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  
                  {/* Floating subject icons */}
                  <FloatingElement delay={500} amplitude={15}>
                    <div className="absolute -top-4 left-8 bg-white rounded-full p-3 shadow-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </FloatingElement>
                  
                  <FloatingElement delay={1500} amplitude={20}>
                    <div className="absolute top-8 -right-4 bg-white rounded-full p-3 shadow-lg">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                  </FloatingElement>
                  
                  <FloatingElement delay={2500} amplitude={18}>
                    <div className="absolute bottom-8 -left-4 bg-white rounded-full p-3 shadow-lg">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </FloatingElement>
                </div>
              </FloatingElement>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="20%" stopColor="#f5f9ff" stopOpacity="0.9"/>
              <stop offset="50%" stopColor="#f5f9ff" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#f5f9ff" stopOpacity="1"/>
            </linearGradient>
          </defs>
          <path 
            d="M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 L1440,120 L0,120 Z" 
            fill="#f5f9ff"
          ></path>
        </svg>
      </div>
    </section>
  );
}