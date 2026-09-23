import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent } from "@/lib/mock-data-vars";

export default function Enrollent() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <RegisterDialog />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <CourseCard key={course.courseId} course={course} student={currentStudent}enrolledAt={course.courseId}/> //fix here
        ))}
      </div>
    </div>
  );
}
