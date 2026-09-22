//libs
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger,  SelectValue } from "@/components/ui/select"

//types
import type { Student, Course, Enrollment } from "@/lib/types";

//global consts
import { courses } from "@/lib/mock-data";

export function RegisterDialog() {
  //consts and vars
  const [isOpen, setIsOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");

  //funcs
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    setCourseId(""); // เคลียร์ฟอร์ม
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
            <Label htmlFor="studentId">รหัสนักศึกษา</Label>
            <Input id="studentId" placeholder="เช่น 650610002" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
            <Input id="fullName" placeholder="เช่น Cillian Murphy" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseId">รหัสวิชา</Label>
            <Input id="courseId" placeholder="เช่น 261207" />
          </div>

          <DialogFooter>
            <Button type="submit">ยืนยันการลงทะเบียน</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
