'use client'
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/logo.svg" alt="Dream Point Logo" width={50} height={50} />
          <span className="text-2xl font-bold text-blue-600">Dream Point</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="font-medium hover:text-blue-600 transition">Home</Link>
          <Link href="/for-students" className="font-medium hover:text-blue-600 transition">For Students</Link>
          <Link href="/for-teachers" className="font-medium hover:text-blue-600 transition">For Teachers</Link>
          <Link href="/fees" className="font-medium hover:text-blue-600 transition">Fees Structure</Link>
          <Link href="/about" className="font-medium hover:text-blue-600 transition">About Us</Link>
          <Link href="/contact" className="font-medium hover:text-blue-600 transition">Contact</Link>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-500 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white px-4 pt-2 pb-4 shadow-inner">
          <div className="flex flex-col space-y-3">
            <Link href="/" className="font-medium hover:text-blue-600 transition py-2">Home</Link>
            <Link href="/for-students" className="font-medium hover:text-blue-600 transition py-2">For Students</Link>
            <Link href="/for-teachers" className="font-medium hover:text-blue-600 transition py-2">For Teachers</Link>
            <Link href="/fees" className="font-medium hover:text-blue-600 transition py-2">Fees Structure</Link>
            <Link href="/about" className="font-medium hover:text-blue-600 transition py-2">About Us</Link>
            <Link href="/contact" className="font-medium hover:text-blue-600 transition py-2">Contact</Link>
          </div>
        </nav>
      )}
    </header>
  );
}