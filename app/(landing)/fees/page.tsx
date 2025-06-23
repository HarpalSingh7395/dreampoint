import BoardFeesSection from "@/components/fees/BoardFeesSection";
import CompetitiveExamFeesSection from "@/components/fees/CompetitiveExamFeesSection";
import FeesHero from "@/components/fees/FeesHero"
import CrashCourseSection from "@/components/fees/CrashCourseSection"
import LowerGradeFeesSection from "@/components/fees/LowerGradeFeesSection"
import FeesCallToAction from "@/components/fees/FeesCallToAction"

export default function FeesPage() {
  return (
    <>
      <FeesHero />
      <BoardFeesSection />
      <CompetitiveExamFeesSection />
      <CrashCourseSection />
      <LowerGradeFeesSection />
      <FeesCallToAction />
    </>
  );
}