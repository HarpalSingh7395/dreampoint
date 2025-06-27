import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';
import LogoIcon from './icons/LogoIcon';

export default function Footer() {
  return (
    <footer className="relative border-t bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      {/* Background floating elements (subtle) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 z-0 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + Description */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <LogoIcon variant='base' className="transition-transform duration-300 size-6 text-white" />
              <span className="text-xl font-bold text-white">My Pathshaala</span>
            </Link>
            <p className="text-blue-100 mb-4">
              The most reliable platform for private home tutors and group tuition.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons */}
              {["facebook", "instagram", "twitter"].map((icon, i) => (
                <a key={i} href="#" className="text-blue-200 hover:text-white transition">
                  {/* Add your SVGs or Icon components here */}
                  <span className="sr-only">{icon}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* Add matching path/icon */}
                    <circle cx="12" cy="12" r="10" fill="currentColor" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                ["Home", "/"],
                ["For Students", "/for-students"],
                ["For Teachers", "/for-teachers"],
                ["Fees Structure", "/fees"],
                ["About Us", "/about"],
                ["Contact", "/contact"]
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-blue-100 hover:text-white transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                "Home Tuition",
                "Group Tuition",
                "Online Classes",
                "Board Exams Preparation",
                "Competitive Exams (NEET/IIT-JEE)",
                "Crash Courses"
              ].map((service, i) => (
                <li key={i}>
                  <Link href="/for-students" className="text-blue-100 hover:text-white transition">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4 text-blue-100">
              <li className="flex items-start">
                <svg className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Office Address, City, State, PIN Code</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.684l1.498 4.493a1 1 0 01-.503 1.21l-2.257 1.13a11.042 11.042 0 005.517 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H19C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@mypathshaala.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-opacity-20 py-4">
        <div className="container mx-auto px-4 text-center text-blue-100 text-sm">
          <p>© {new Date().getFullYear()} My Pathshaala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
