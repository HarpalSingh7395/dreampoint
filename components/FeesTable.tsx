// components/FeesTable.js
import React from 'react';

export default function FeesTable() {
  const boardPreparationFees = {
    subjects: ["Chemistry", "Physics", "Maths", "Biology"],
    groupTuition: {
      yearly: 25000,
      monthly: 2500
    },
    homeTuition: {
      monthly: 7500
    }
  };

  const competitiveExamFees = {
    subjects: ["Chemistry", "Physics", "Maths", "Biology"],
    groupTuition: {
      yearly: 45000,
      monthly: 4000
    },
    homeTuition: {
      monthly: 10000
    }
  };

  const lowerClassesHomeTuition = [
    {
      classes: "Nursery to 5th Class",
      subjects: "All subjects",
      duration: "2 hours (alternate days)",
      fees: 6000
    },
    {
      classes: "6th to 8th Class",
      subjects: "All subjects",
      duration: "1½ hours (alternate days)",
      fees: 7000
    },
    {
      classes: "9th Class",
      subjects: "Maths & Science",
      duration: "1½ hours",
      fees: 6000
    },
    {
      classes: "9th & 10th Class",
      subjects: "Maths",
      duration: "1 hour",
      fees: 6000
    },
    {
      classes: "9th & 10th Class",
      subjects: "Science",
      duration: "1 hour",
      fees: 6000
    },
    {
      classes: "9th & 10th Class",
      subjects: "Maths & Science",
      duration: "1½ hours",
      fees: 9000
    },
    {
      classes: "9th & 10th Class",
      subjects: "SST, Maths & Science",
      duration: "2 hours",
      fees: 15000
    },
    {
      classes: "9th & 10th Class",
      subjects: "English, SST, Maths & Science",
      duration: "2 hours (alternate days)",
      fees: 15000
    }
  ];

  const crashCourseFees = [
    {
      type: "Board Exams (Class 11 & 12)",
      feesPerSubject: 25000,
      duration: "2 months"
    },
    {
      type: "Competitive Exams (NEET, IIT JEE MAINS AND ADVANCE)",
      feesPerSubject: 40000,
      duration: "2 months"
    }
  ];

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">Board Preparation Fees</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left">Subject</th>
                <th className="py-3 px-4 border-b text-center" colSpan={2}>Group Tuition</th>
                <th className="py-3 px-4 border-b text-center">Home Tuition</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 border-b"></th>
                <th className="py-2 px-4 border-b text-center">Per Year (Rs.)</th>
                <th className="py-2 px-4 border-b text-center">Per Month (Rs.)</th>
                <th className="py-2 px-4 border-b text-center">Per Month (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {boardPreparationFees.subjects.map((subject, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 border-b">{subject}</td>
                  <td className="py-3 px-4 border-b text-center">{boardPreparationFees.groupTuition.yearly.toLocaleString()}</td>
                  <td className="py-3 px-4 border-b text-center">{boardPreparationFees.groupTuition.monthly.toLocaleString()}</td>
                  <td className="py-3 px-4 border-b text-center">{boardPreparationFees.homeTuition.monthly.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Note: Yearly fees are paid annually in two installments: the first in advance at the time of registration, and the next installment after two months.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Competitive Exam Preparation Fees (NEET/IIT-JEE)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left">Subject</th>
                <th className="py-3 px-4 border-b text-center" colSpan={2}>Group Tuition</th>
                <th className="py-3 px-4 border-b text-center">Home Tuition</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 border-b"></th>
                <th className="py-2 px-4 border-b text-center">Per Year (Rs.)</th>
                <th className="py-2 px-4 border-b text-center">Per Month (Rs.)</th>
                <th className="py-2 px-4 border-b text-center">Per Month (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {competitiveExamFees.subjects.map((subject, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 border-b">{subject}</td>
                  <td className="py-3 px-4 border-b text-center">{competitiveExamFees.groupTuition.yearly.toLocaleString()}</td>
                  <td className="py-3 px-4 border-b text-center">{competitiveExamFees.groupTuition.monthly.toLocaleString()}</td>
                  <td className="py-3 px-4 border-b text-center">{competitiveExamFees.homeTuition.monthly.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Home Tuition Fees for Lower Classes (Monthly)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left">Classes</th>
                <th className="py-3 px-4 border-b text-left">Subjects</th>
                <th className="py-3 px-4 border-b text-left">Duration</th>
                <th className="py-3 px-4 border-b text-center">Monthly Fees (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {lowerClassesHomeTuition.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 border-b">{item.classes}</td>
                  <td className="py-3 px-4 border-b">{item.subjects}</td>
                  <td className="py-3 px-4 border-b">{item.duration}</td>
                  <td className="py-3 px-4 border-b text-center">{item.fees.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Crash Course Fees</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left">Type</th>
                <th className="py-3 px-4 border-b text-center">Fees per Subject (Rs.)</th>
                <th className="py-3 px-4 border-b text-center">Duration</th>
              </tr>
            </thead>
            <tbody>
              {crashCourseFees.map((course, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 border-b">{course.type}</td>
                  <td className="py-3 px-4 border-b text-center">{course.feesPerSubject.toLocaleString()}</td>
                  <td className="py-3 px-4 border-b text-center">{course.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}