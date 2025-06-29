
export default function ServiceCard({ title, description, icon, gradient, delay = 0 }: {
  title: string,
  description: string,
  icon: React.ReactNode,
  bgColor?: string,
  gradient?: string,
  delay?: number,
}) {
  return (
    <div
      className="group relative transform transition-all duration-500 hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient background blur effect */}
      <div className={`absolute inset-0 ${gradient} rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>

      {/* Card content */}
      <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
        {/* Icon container */}
        <div className={`w-16 h-16 ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <div className="text-white">
            {icon}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
          {description}
        </p>

        {/* Hover arrow */}
        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center text-blue-600 font-medium">
            <span className="mr-2">Learn More</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}