import { buttonVariants } from '@/components/ui/button';
import Hero from '../../components/Hero';
import ServiceCard from '../../components/ServiceCard';
import TeacherCard from '../../components/TeacherCard';
import Link from 'next/link';
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