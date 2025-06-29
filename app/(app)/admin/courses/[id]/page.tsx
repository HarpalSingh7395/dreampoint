import CourseView from "@/components/admin/course/CourseView";

export default async function ViewCoursePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    return <CourseView id={id} />
}