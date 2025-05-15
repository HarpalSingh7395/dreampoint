// app/for-teachers/page.js
import React from 'react';

export default function ForTeachersPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Join Dream Point as a Teacher</h1>
      
      <section className="mb-12">
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="mb-4">
            Dream Point is always looking for qualified and passionate teachers to join our network. 
            If you have the expertise and dedication to help students excel in their academics, 
            we would love to have you on board.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Registration Process</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Required Documents:</h3>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Qualification certificates</li>
            <li className="mb-2">CV/Resume</li>
            <li className="mb-2">Experience letters (if applicable)</li>
            <li className="mb-2">Aadhaar Card</li>
            <li className="mb-2">Police Clearance Certificate (PCC)</li>
            <li className="mb-2">Driving license (if you have your own vehicle)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4">Fill out our registration form with:</h3>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Your qualifications and teaching experience</li>
            <li className="mb-2">Subjects and classes you can teach</li>
            <li className="mb-2">Preference for home tuition or group tuition</li>
            <li className="mb-2">Preference for online classes</li>
            <li className="mb-2">Time availability for classes</li>
            <li className="mb-2">Transportation details</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Terms and Conditions</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">For Home Tuition/Online Classes:</h3>
          <div className="bg-white shadow-md rounded-lg p-6">
            <ol className="list-decimal pl-6">
              <li className="mb-2">The salary will be paid after the completion of a month from the date of start of your tuitions.</li>
              <li className="mb-2">If you are delivering tuition more than one, the salary will be paid after the completion of the tuition period and can be made combined any date fixed by you.</li>
              <li className="mb-2">The salary can be paid through your account or if you take in cash then cash receipt can be taken from office only. All the payment will be collected by firm and not by you.</li>
              <li className="mb-2">Working hour will be given as per your choice.</li>
              <li className="mb-2">The first two days of your tuition will be free for your demonstration, for the judgment of your client and also for seeing the teaching style by the parents of the student. If the parents appreciate your teaching style, then you will be considered and salary will be started there-after.</li>
              <li className="mb-2">You will not misbehave with any client. If you do so then you are fully responsible for that. If you face any trouble regarding tuition, inform to Dream Point. If the firm will not able to solve then you can leave the tuition immediately.</li>
              <li className="mb-2">If you want to leave the job, you will inform one month prior via written application. Otherwise you will not be paid for that month.</li>
              <li className="mb-2">If you take the leave, that period will be adjusted by you. Otherwise salary will be deducted.</li>
              <li className="mb-2">Leaves will not be accepted during exam days except dire circumstances.</li>
              <li className="mb-2">Once you are appointed through our firm you will not deal directly with client.</li>
              <li className="mb-2">Experience certificate will not be given if you deal directly with the client.</li>
              <li className="mb-2">You will be paid 50% of your tuition salary for the first month and thereafter 90%.</li>
            </ol>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4">For Group Tuition:</h3>
          <div className="bg-white shadow-md rounded-lg p-6">
            <ol className="list-decimal pl-6">
              <li className="mb-2">The salary will be paid after the completion of a month from the date of start of your tuitions.</li>
              <li className="mb-2">If you are delivering tuition more than one, the salary will be paid after the completion of the tuition period and can be made combined any date fixed by you.</li>
              <li className="mb-2">The salary can be paid through your account or if you take in cash then cash receipt can be taken from office only. All the payment will be collected by firm and not by you.</li>
              <li className="mb-2">Working hour will be given as per your choice.</li>
              <li className="mb-2">If you want to leave the job, you will inform one month prior via written application. Otherwise you will not be paid for that month.</li>
              <li className="mb-2">If you take the leave, that period will be adjusted by you. Otherwise salary will be deducted.</li>
              <li className="mb-2">Leaves will not be accepted during exam days except dire circumstances.</li>
              <li className="mb-2">Once you are appointed through our firm you will not deal directly with students.</li>
              <li className="mb-2">Experience certificate will not be given if you deal directly with the client.</li>
            </ol>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Apply Now</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" id="name" name="name" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" id="phone" name="phone" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification</label>
                <input type="text" id="qualification" name="qualification" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-1">Subjects You Can Teach</label>
                <input type="text" id="subjects" name="subjects" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Teaching Experience</label>
                <input type="number" id="experience" name="experience" className="w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
            </div>
            
            <div>
              <label htmlFor="preferredMode" className="block text-sm font-medium text-gray-700 mb-1">Preferred Teaching Mode</label>
              <select id="preferredMode" name="preferredMode" className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="">Select an option</option>
                <option value="home">Home Tuition</option>
                <option value="group">Group Tuition</option>
                <option value="online">Online Classes</option>
                <option value="all">All of the above</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Time Availability</label>
              <textarea id="availability" name="availability" rows="3" className="w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
            </div>
            
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF)</label>
              <input type="file" id="resume" name="resume" accept=".pdf" className="w-full" />
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="terms" name="terms" className="h-4 w-4 text-blue-600" />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I have read and agree with the terms and conditions
              </label>
            </div>
            
            <div>
              <button type="submit" className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}