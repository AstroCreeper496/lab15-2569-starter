//libs
import { useState } from "react";

import { Clock2Icon } from "lucide-react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput,} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label";
import { Select,  SelectContent, SelectGroup,  SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


//types
import type { Student, Course, Enrollment } from "@/lib/types";

//global consts
import { courses, enrollments } from "@/lib/mock-data-vars";
import { CURRENT_STUDENT_ID, currentStudent, currentUser } from "@/lib/mock-data-vars";



export function RegisterDialog() {
  //consts and vars
  const [isOpen, setIsOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");
  const [enrollmentlist, setEnrollmentlist] = useState(enrollments)
  const [userEnrollments, setUserEnrollments] = useState(enrollmentlist.filter(u => u.studentId === CURRENT_STUDENT_ID))
  const [AvailableCourses, setAvailableCourses] = useState(courses.filter(course => !enrollments.some(enroll => enroll.studentId === CURRENT_STUDENT_ID && enroll.courseId === course.courseId)))

  

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    setCourseId(""); // เคลียร์ฟอร์ม
    setIsOpen(false); // ปิด Dialog
    setEnrollmentlist([...enrollmentlist,               ]) //save enrollments

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
            <Select defaultValue="เลือกวิชา">

            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent sideOffset={4}>
              <SelectGroup>
                {AvailableCourses.map((item) => (
                  <SelectItem key={item.courseId + " - " + item.courseTitle} value={item.courseId + " - " + item.courseTitle}>
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
              <InputGroupInput id="time-from" type="time" step="60" defaultValue="10:30" className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"/>
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
