import { Trash2 } from "lucide-react";
import type { Course, Student } from "@/lib/types";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  onUnenroll: (courseId: string) => void;
};


//todo: add isEnrolled and trashButton
export function CourseCard({ course, student, enrolledAt, onUnenroll }: CourseCardProps) {
  

  return (
    <Card>
      <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-base">{course.courseTitle}</CardTitle>
            <div className="ml-auto flex items-center gap-2">
              {enrolledAt ? <Badge className="flex flex-row-reverse bg-amber-50 text-amber-700 dark:bg-purple-950 dark:text-purple-300">ลงทะเบียนแล้ว</Badge>
                          : <Badge className="flex flex-row-reverse bg-purple-50 text-purple-700 dark:bg-amber-950 dark:text-amber-300">เปิดรับ</Badge>}
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
          {enrolledAt && <p>ลงทะเบียนเมื่อ: {enrolledAt}</p>}
          {enrolledAt && (
            <Button type="button" variant="ghost" size="icon" onClick={() => onUnenroll(course.courseId)}>
              <Trash2 className="h-[1.2rem] w-[1.2rem] stroke-red-500 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            </Button>
          )}
        </div>
        
      </CardContent>
    </Card>
  );
}
