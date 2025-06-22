import './globals.css';

export const metadata = {
  title: 'My Pathshaala - Professional Home Tutoring & Group Tuition',
  description: 'The most reliable platform for private home tutors and group tuition for board exams and competitive exams (NEET, IIT-JEE).',
}

export default function RootLayout({ children }: { children: React.ReactNode  }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="grow">
          {children}
        </main>
      </body>
    </html>
  )
}