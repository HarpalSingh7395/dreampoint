import Link from "next/link";
import AnimatedButton from "../AnimatedButton";

const ApplicationForm = () => {
  return (
    <section className="flex justify-center items-center w-full">
      <AnimatedButton variant="secondary">
        <Link href={"/login"}>
          👨‍🏫 Teach With Us
        </Link>
      </AnimatedButton>
      {/* <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Apply Now
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Start your teaching journey with us today
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-white/50">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Full Name"
                  type="text"
                  id="name"
                  name="name"
                />
                <FormField
                  label="Email Address"
                  type="email"
                  id="email"
                  name="email"
                />
                <FormField
                  label="Phone Number"
                  type="tel"
                  id="phone"
                  name="phone"
                />
                <FormField
                  label="Highest Qualification"
                  type="text"
                  id="qualification"
                  name="qualification"
                />
                <FormField
                  label="Subjects You Can Teach"
                  type="text"
                  id="subjects"
                  name="subjects"
                />
                <FormField
                  label="Years of Teaching Experience"
                  type="number"
                  id="experience"
                  name="experience"
                />
              </div>
              
              <div>
                <label htmlFor="preferredMode" className="block text-sm font-bold text-gray-800 mb-2">
                  Preferred Teaching Mode
                </label>
                <select 
                  id="preferredMode" 
                  name="preferredMode" 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm"
                >
                  <option value="">Select an option</option>
                  <option value="home">Home Tuition</option>
                  <option value="group">Group Tuition</option>
                  <option value="online">Online Classes</option>
                  <option value="all">All of the above</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="availability" className="block text-sm font-bold text-gray-800 mb-2">
                  Time Availability
                </label>
                <textarea 
                  id="availability" 
                  name="availability" 
                  rows={4} 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm resize-none"
                  placeholder="Please describe your available time slots..."
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="resume" className="block text-sm font-bold text-gray-800 mb-2">
                  Upload Resume (PDF)
                </label>
                <div className="relative">
                  <input 
                    type="file" 
                    id="resume" 
                    name="resume" 
                    accept=".pdf" 
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="terms" 
                  name="terms" 
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="terms" className="ml-3 text-gray-700 font-medium">
                  I have read and agree with the terms and conditions
                </label>
              </div>
              
              <div className="text-center">
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </section>
  );
};

// const FormField = ({ label, type, id, name, placeholder }: { label: string, type: string, id: string, name: string, placeholder?: string }) => (
//   <div>
//     <label htmlFor={id} className="block text-sm font-bold text-gray-800 mb-2">
//       {label}
//     </label>
//     <input
//       type={type}
//       id={id}
//       name={name}
//       placeholder={placeholder}
//       className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm"
//     />
//   </div>
// );

export default ApplicationForm;