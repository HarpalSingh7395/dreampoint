// app/contact/page.js
import ContactUsForm from '@/components/ContactUsForm';
import FAQSection from '@/components/FAQSection';
import React from 'react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 py-16 pt-24 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="group [perspective:400px] [transform-style:preserve-3d]">
              <div className="h-20 w-20 p-[4px] rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 mx-auto relative origin-center group-hover:scale-110 transition-transform duration-300"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-[12px] h-full w-full relative z-20 flex justify-center items-center overflow-hidden border border-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="tabler-icon tabler-icon-mail-filled h-8 w-8 text-white">
                    <path d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z">
                    </path>
                    <path d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z">
                    </path>
                  </svg>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-px w-[80%] mx-auto">
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-transparent via-purple-600 blur-sm to-transparent h-[12px] w-[80%] mx-auto">
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {`We're here to help! Fill out the form or use our contact details below to reach out to us.`}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {/* Contact Information Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
              </div>
              
              <div className="space-y-8">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    label: "Email",
                    value: "contact@mypathshaala.com",
                    gradient: "from-emerald-400 to-green-500"
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                    label: "Phone",
                    value: "+91 (123) 123 XX21",
                    gradient: "from-blue-400 to-indigo-500"
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ),
                    label: "Support",
                    value: "support@mypathshaala.com",
                    gradient: "from-purple-400 to-pink-500"
                  }
                ].map((contact, index) => (
                  <div key={index} className="group/item">
                    <div className="flex items-center space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r ${contact.gradient} rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200`}>
                        {contact.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 mb-1">{contact.label}</p>
                        <p className="text-gray-600 group-hover/item:text-gray-800 transition-colors duration-200">{contact.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional decorative element */}
              <div className="mt-10 pt-8 border-t border-gray-200/50">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                  <p className="text-sm text-gray-500 font-medium">We typically respond within 24 hours</p>
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
              <div className="p-10">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">Send Us a Message</h2>
                </div>
                
                <ContactUsForm />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section with updated styling */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50 p-8">
            <FAQSection />
          </div>
        </div>
      </div>
    </main>
  );
}