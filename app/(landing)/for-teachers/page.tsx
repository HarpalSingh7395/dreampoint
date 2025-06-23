// app/for-teachers/page.js
import ApplicationForm from '@/components/teachers/ApplicationForm';
import HeroSection from '@/components/teachers/Hero';
import RequirementsSection from '@/components/teachers/RequirementsSection';
import TermsSection from '@/components/teachers/TermsSection';
import React from 'react';

export default function ForTeachersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl"></div>
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-200/15 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <HeroSection />
        <RequirementsSection />
        <TermsSection />
        <ApplicationForm />
      </div>
    </main>
  );
}