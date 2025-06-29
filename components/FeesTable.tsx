// components/FeesTable.js
import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "./ui/card"

export default function FeesTable() {
  const boardPreparationFees = {
    subjects: ["Chemistry", "Physics", "Maths", "Biology"],
    groupTuition: {
      yearly: 25000,
      monthly: 2500,
    },
    homeTuition: {
      monthly: 7500,
    },
  }

  const competitiveExamFees = {
    subjects: ["Chemistry", "Physics", "Maths", "Biology"],
    groupTuition: {
      yearly: 45000,
      monthly: 4000,
    },
    homeTuition: {
      monthly: 10000,
    },
  }

  const lowerClassesHomeTuition = [
    {
      classes: "Nursery to 5th Class",
      subjects: "All subjects",
      duration: "2 hours (alternate days)",
      fees: 6000,
    },
    {
      classes: "6th to 8th Class",
      subjects: "All subjects",
      duration: "1½ hours (alternate days)",
      fees: 7000,
    },
    {
      classes: "9th Class",
      subjects: "Maths & Science",
      duration: "1½ hours",
      fees: 6000,
    },
    {
      classes: "9th & 10th Class",
      subjects: "Maths",
      duration: "1 hour",
      fees: 6000,
    },
    {
      classes: "9th & 10th Class",
      subjects: "Science",
      duration: "1 hour",
      fees: 6000,
    },
    {
      classes: "9th & 10th Class",
      subjects: "Maths & Science",
      duration: "1½ hours",
      fees: 9000,
    },
    {
      classes: "9th & 10th Class",
      subjects: "SST, Maths & Science",
      duration: "2 hours",
      fees: 15000,
    },
    {
      classes: "9th & 10th Class",
      subjects: "English, SST, Maths & Science",
      duration: "2 hours (alternate days)",
      fees: 15000,
    },
  ]

  const crashCourseFees = [
    {
      type: "Board Exams (Class 11 & 12)",
      feesPerSubject: 25000,
      duration: "2 months",
    },
    {
      type: "Competitive Exams (NEET, IIT JEE MAINS AND ADVANCE)",
      feesPerSubject: 40000,
      duration: "2 months",
    },
  ]

  return (
    <div className="space-y-16">
      {/* Board Preparation Fees */}
      <section>
        <Card>
          <CardContent>

            <h2 className="text-2xl font-bold mb-4">Board Preparation Fees</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-center" colSpan={2}>
                    Group Tuition
                  </TableHead>
                  <TableHead className="text-center">Home Tuition</TableHead>
                </TableRow>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead className="text-center">Yearly (₹)</TableHead>
                  <TableHead className="text-center">Monthly (₹)</TableHead>
                  <TableHead className="text-center">Monthly (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {boardPreparationFees.subjects.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell>{subject}</TableCell>
                    <TableCell className="text-center">
                      {boardPreparationFees.groupTuition.yearly.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {boardPreparationFees.groupTuition.monthly.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {boardPreparationFees.homeTuition.monthly.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="mt-2 text-sm text-muted-foreground">
              Note: Yearly fees are paid annually in two installments—first at registration, second after 2 months.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Competitive Exam Fees */}
      <section>
        <Card>
          <CardContent>

            <h2 className="text-2xl font-bold mb-4">Competitive Exam Preparation Fees (NEET/IIT-JEE)</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-center" colSpan={2}>
                    Group Tuition
                  </TableHead>
                  <TableHead className="text-center">Home Tuition</TableHead>
                </TableRow>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead className="text-center">Yearly (₹)</TableHead>
                  <TableHead className="text-center">Monthly (₹)</TableHead>
                  <TableHead className="text-center">Monthly (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitiveExamFees.subjects.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell>{subject}</TableCell>
                    <TableCell className="text-center">
                      {competitiveExamFees.groupTuition.yearly.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {competitiveExamFees.groupTuition.monthly.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {competitiveExamFees.homeTuition.monthly.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Home Tuition Fees for Lower Classes */}
      <section>
        <Card>
          <CardContent>

            <h2 className="text-2xl font-bold mb-4">Home Tuition Fees for Lower Classes (Monthly)</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Classes</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-center">Fees (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowerClassesHomeTuition.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.classes}</TableCell>
                    <TableCell>{item.subjects}</TableCell>
                    <TableCell>{item.duration}</TableCell>
                    <TableCell className="text-center">{item.fees.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Crash Course Fees */}
      <section>
        <Card>
          <CardContent>

            <h2 className="text-2xl font-bold mb-4">Crash Course Fees</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-center">Fees per Subject (₹)</TableHead>
                  <TableHead className="text-center">Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crashCourseFees.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell>{course.type}</TableCell>
                    <TableCell className="text-center">
                      {course.feesPerSubject.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">{course.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
