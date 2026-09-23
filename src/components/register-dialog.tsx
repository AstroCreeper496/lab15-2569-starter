//libs
import { useState, type FormEvent } from "react";

import { Clock2Icon } from "lucide-react"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput,} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label";
import { Select,  SelectContent, SelectGroup,  SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


//types
import type { Enrollment } from "@/lib/types";

//global consts
import { courses } from "@/lib/mock-data-vars";
import { CURRENT_STUDENT_ID, currentStudent } from "@/lib/mock-data-vars";

type RegisterDialogProps = {
  enrollments: Enrollment[];
  onEnrollmentCreated: (enrollment: Enrollment) => void;
};

export function RegisterDialog({ enrollments, onEnrollmentCreated }: RegisterDialogProps) {
  //consts and vars
  const [isOpen, setIsOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");
  const [time, setTime] = useState("00:00");
  const availableCourses = courses.filter((course) => !enrollments.some((enrollment) => enrollment.studentId === CURRENT_STUDENT_ID && enrollment.courseId === course.courseId));

  

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    if (!courseId) return;

    const enrollment: Enrollment = {
      studentId: CURRENT_STUDENT_ID,
      courseId,
      enrolledAt: `${new Date().toISOString().slice(0, 10)}T${time}:00`,
    };
    onEnrollmentCreated(enrollment);
    setCourseId(""); // เคลียร์ฟอร์ม
    setTime("00:00");
    setIsOpen(false); // ปิด Dialog
    
  }




  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger>
        <Button>ลงทะเบียน</Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>กรอกข้อมูลเพื่อลงทะเบียน</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="courses">เลือกวิชา</Label>
            <Select value={courseId} onValueChange={(value) => setCourseId(value ?? "")}>

            <SelectTrigger className="w-full">
              <SelectValue placeholder="เลือกวิชา" className="min-w-0" />
            </SelectTrigger>

            <SelectContent sideOffset={4}>
              <SelectGroup>
                {availableCourses.map((item) => (
                  <SelectItem key={item.courseId} value={item.courseId}>
                    {item.courseId + " - " + item.courseTitle}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
            
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentId">เวลา</Label>
            <InputGroup>
              <InputGroupInput id="time-from" type="time" step="60" value={time} onChange={(event) => setTime(event.target.value)} className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"/>
                <InputGroupAddon>
                  <Clock2Icon className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อนักศึกษา</Label>
            <Input id="fullName" defaultValue={currentStudent.firstName + " " + currentStudent.lastName} readOnly/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseId">โปรแกรม</Label>
            <Input id="studentId" defaultValue={currentStudent.program} readOnly/>
          </div>

          <DialogFooter>
            <Button type="submit">ยืนยันการลงทะเบียน</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
