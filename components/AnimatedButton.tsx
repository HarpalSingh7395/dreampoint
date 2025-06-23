import { HTMLAttributes, ReactNode } from "react";

const AnimatedButton = ({ children, variant = 'primary', href = '#', ...props }: { children: ReactNode, variant?: "primary" | "secondary", href?: string } & HTMLAttributes<HTMLButtonElement>) => {
  const baseClasses = "relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl overflow-hidden group";
  
  const variants = {
    primary: "bg-white text-blue-600 hover:bg-gray-50 shadow-lg",
    secondary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg"
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    </button>
  );
};

export default AnimatedButton;