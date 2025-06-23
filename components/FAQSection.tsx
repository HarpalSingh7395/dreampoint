// components/FAQSection.tsx
'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQSection() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>

      <div className="max-w-full mx-auto bg-white rounded-xl shadow-lg p-6">
        <Accordion type="multiple" className="w-full space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I register for tuition?</AccordionTrigger>
            <AccordionContent>
              You can register by filling out the contact form above, calling us directly, or visiting our center in person. Our team will guide you through the registration process.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What are your operating hours?</AccordionTrigger>
            <AccordionContent>
              Our office is open Monday through Saturday from 9:00 AM to 7:00 PM. We are closed on Sundays and public holidays.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Do you offer online tuition?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer online tuition services for students who prefer remote learning or cannot attend in-person sessions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>How are the fees structured?</AccordionTrigger>
            <AccordionContent>
              Our fees vary based on the grade level, subjects, and type of tuition (home/group). Please visit our fees page for detailed information or contact us directly.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Can I request a specific teacher?</AccordionTrigger>
            <AccordionContent>
              Yes, you can request a specific teacher based on your preference. However, availability will depend on the teacher's schedule and workload.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
