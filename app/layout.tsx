import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Dream Point - Professional Home Tutoring & Group Tuition',
  description: 'The most reliable platform for private home tutors and group tuition for board exams and competitive exams (NEET, IIT-JEE).',
}

export default function RootLayout({ children }: { children: React.ReactNode  }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}