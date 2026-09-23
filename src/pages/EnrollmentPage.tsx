import { useState } from "react";

import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent, enrollments } from "@/lib/mock-data-vars";
import type { Enrollment } from "@/lib/types";

export default function Enrollent() {
  const [enrollmentList, setEnrollmentList] = useState<Enrollment[]>(enrollments);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <RegisterDialog
            enrollments={enrollmentList}
            onEnrollmentCreated={(enrollment) => setEnrollmentList((current) => [...current, enrollment])}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollment = enrollmentList.find(
            (item) => item.studentId === currentStudent.studentId && item.courseId === course.courseId
          );

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              enrolledAt={enrollment?.enrolledAt}
              onUnenroll={(courseId) => setEnrollmentList((current) => current.filter(
                (item) => !(item.studentId === currentStudent.studentId && item.courseId === courseId)
              ))}
            />
          );
        })}
      </div>
    </div>
  );
}
