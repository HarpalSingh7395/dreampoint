import { ReactNode } from "react";

const TermsSection = () => {
  const homeTuitionTerms = [
    "The salary will be paid after the completion of a month from the date of start of your tuitions.",
    "If you are delivering tuition more than one, the salary will be paid after the completion of the tuition period and can be made combined any date fixed by you.",
    "The salary can be paid through your account or if you take in cash then cash receipt can be taken from office only. All the payment will be collected by firm and not by you.",
    "Working hour will be given as per your choice.",
    "The first two days of your tuition will be free for your demonstration, for the judgment of your client and also for seeing the teaching style by the parents of the student. If the parents appreciate your teaching style, then you will be considered and salary will be started there-after.",
    "You will not misbehave with any client. If you do so then you are fully responsible for that. If you face any trouble regarding tuition, inform to My Pathshaala. If the firm will not able to solve then you can leave the tuition immediately.",
    "If you want to leave the job, you will inform one month prior via written application. Otherwise you will not be paid for that month.",
    "If you take the leave, that period will be adjusted by you. Otherwise salary will be deducted.",
    "Leaves will not be accepted during exam days except dire circumstances.",
    "Once you are appointed through our firm you will not deal directly with client.",
    "Experience certificate will not be given if you deal directly with the client.",
    "You will be paid 50% of your tuition salary for the first month and thereafter 90%."
  ];

  const groupTuitionTerms = [
    "The salary will be paid after the completion of a month from the date of start of your tuitions.",
    "If you are delivering tuition more than one, the salary will be paid after the completion of the tuition period and can be made combined any date fixed by you.",
    "The salary can be paid through your account or if you take in cash then cash receipt can be taken from office only. All the payment will be collected by firm and not by you.",
    "Working hour will be given as per your choice.",
    "If you want to leave the job, you will inform one month prior via written application. Otherwise you will not be paid for that month.",
    "If you take the leave, that period will be adjusted by you. Otherwise salary will be deducted.",
    "Leaves will not be accepted during exam days except dire circumstances.",
    "Once you are appointed through our firm you will not deal directly with students.",
    "Experience certificate will not be given if you deal directly with the client."
  ];

  const TermsCard = ({ title, terms, icon, gradient }: {title: string, terms: string[], icon: ReactNode, gradient: string}) => (
    <div className="group relative mb-8">
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300`}></div>
      <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50">
        <div className="flex items-center mb-6">
          <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mr-4`}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        </div>
        
        <div className="space-y-4">
          {terms.map((term, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                {term}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Terms and Conditions
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Important guidelines for different teaching modes
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <TermsCard
          title="Home Tuition & Online Classes"
          terms={homeTuitionTerms}
          gradient="from-blue-500 to-cyan-600"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21l4-4 4 4" />
            </svg>
          }
        />

        <TermsCard
          title="Group Tuition"
          terms={groupTuitionTerms}
          gradient="from-purple-500 to-pink-600"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
      </div>
    </section>
  );
};

export default TermsSection;