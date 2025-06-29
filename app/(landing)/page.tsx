import Hero from '../../components/Hero';
import ServicesSection from '@/components/Services';
import WhyChooseUsSection from '@/components/WhyChooseUs';
import TeachersSection from '@/components/TeachersSection';
import CallToActions from '@/components/CallToActions';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />

      <WhyChooseUsSection />

      <TeachersSection />

      <CallToActions />
    </>
  );
}