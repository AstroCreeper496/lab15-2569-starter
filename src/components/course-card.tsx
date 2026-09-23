import type { Course, Student } from "@/lib/types";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
};


//todo: add isEnrolled and trashButton
export function CourseCard({ course, student, enrolledAt }: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-base">{course.courseTitle}</CardTitle>
            <div className="ml-auto flex items-center gap-2">
              <Badge className="flex flex-row-reverse bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300">ลงทะเบียนแล้ว</Badge>
              <Badge className="flex flex-row-reverse bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">เปิดรับ</Badge>
            </div>
          </div>
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <div className="text-xs text-muted-foreground">
          <p>
            ชื่อ นศ.: {student.firstName} {student.lastName}
          </p>
          <p>โปรแกรม: {student.program}</p>
          <p>ลงทะเบียนเมื่อ: {enrolledAt}</p>
        

        </div>
      </CardContent>
    </Card>
  );
}
