"use client"

import { useState } from "react"
import {
  Video,
  Phone,
  Calendar,
  Clock,
  Pill,
  BookOpen,
  ChevronRight,
  Star,
  User,
  Bell,
  Plus,
  Play,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DoctorTabProps {
  role: "guardian" | "carrier"
}

export function DoctorTab({ role }: DoctorTabProps) {
  const [activeSection, setActiveSection] = useState<"telehealth" | "reminders" | "guides">("telehealth")

  const doctors = [
    {
      id: 1,
      name: "BS. Nguyễn Văn An",
      specialty: "Nội khoa Tổng quát",
      rating: 4.9,
      reviews: 234,
      available: true,
      avatar: null,
      nextSlot: "10:30 Hôm nay",
    },
    {
      id: 2,
      name: "BS. Trần Thị Bình",
      specialty: "Tim mạch",
      rating: 4.8,
      reviews: 189,
      available: true,
      avatar: null,
      nextSlot: "14:00 Hôm nay",
    },
    {
      id: 3,
      name: "BS. Lê Minh Cường",
      specialty: "Thần kinh",
      rating: 4.7,
      reviews: 156,
      available: false,
      avatar: null,
      nextSlot: "09:00 Ngày mai",
    },
  ]

  const reminders = [
    {
      id: 1,
      type: "medicine",
      title: "Uống thuốc huyết áp",
      time: "08:00",
      medicine: "Amlodipine 5mg",
      status: "done",
    },
    {
      id: 2,
      type: "medicine",
      title: "Uống thuốc tim",
      time: "12:00",
      medicine: "Aspirin 81mg",
      status: "pending",
    },
    {
      id: 3,
      type: "medicine",
      title: "Uống thuốc tối",
      time: "20:00",
      medicine: "Metformin 500mg",
      status: "pending",
    },
    {
      id: 4,
      type: "appointment",
      title: "Tái khám định kỳ",
      time: "09:00 - 15/04/2026",
      location: "Vinmec Times City",
      status: "upcoming",
    },
  ]

  const healthGuides = [
    {
      id: 1,
      title: "Kiểm soát huyết áp cho người cao tuổi",
      type: "video",
      duration: "8 phút",
      thumbnail: null,
      category: "Tim mạch",
    },
    {
      id: 2,
      title: "Chế độ ăn lành mạnh cho bệnh tiểu đường",
      type: "article",
      readTime: "5 phút đọc",
      thumbnail: null,
      category: "Dinh dưỡng",
    },
    {
      id: 3,
      title: "Bài tập nhẹ cho người lớn tuổi",
      type: "video",
      duration: "12 phút",
      thumbnail: null,
      category: "Vận động",
    },
    {
      id: 4,
      title: "Nhận biết dấu hiệu đột quỵ",
      type: "article",
      readTime: "3 phút đọc",
      thumbnail: null,
      category: "Cấp cứu",
    },
  ]

  return (
    <div className="flex flex-col px-4 pb-4">
      {/* Section Tabs */}
      <div className="mb-4 flex gap-2 overflow-x-auto rounded-xl bg-muted p-1">
        {[
          { id: "telehealth" as const, icon: Video, label: "Tư vấn" },
          { id: "reminders" as const, icon: Bell, label: "Nhắc lịch" },
          { id: "guides" as const, icon: BookOpen, label: "Cẩm nang" },
        ].map((section) => (
          <button
            key={section.id}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-medium transition-all ${
              activeSection === section.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            <section.icon className="h-4 w-4" />
            {section.label}
          </button>
        ))}
      </div>

      {/* Telehealth Section */}
      {activeSection === "telehealth" && (
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="cursor-pointer border-primary/20 bg-primary/5 transition-all hover:shadow-md active:scale-[0.98]">
              <CardContent className="flex flex-col items-center py-4">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">Gọi Video</span>
                <span className="text-xs text-muted-foreground">Kết nối ngay</span>
              </CardContent>
            </Card>
            <Card className="cursor-pointer border-0 transition-all hover:shadow-md active:scale-[0.98]">
              <CardContent className="flex flex-col items-center py-4">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">Đặt lịch</span>
                <span className="text-xs text-muted-foreground">Hẹn trước</span>
              </CardContent>
            </Card>
          </div>

          {/* Available Doctors */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Bác sĩ sẵn sàng</h3>
            <div className="space-y-3">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="cursor-pointer border-0 shadow-sm transition-all hover:shadow-md active:scale-[0.99]">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{doctor.name}</span>
                        {doctor.available && (
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-medium text-foreground">{doctor.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                        <span className="text-xs text-muted-foreground">|</span>
                        <span className="text-xs text-primary">{doctor.nextSlot}</span>
                      </div>
                    </div>
                    <Button size="sm" className="h-9 gap-1.5">
                      <Phone className="h-3.5 w-3.5" />
                      Gọi
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Consultation History */}
          <Card className="border-2 border-dashed border-muted-foreground/20">
            <CardContent className="flex items-center gap-3 p-4">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <span className="text-sm font-medium text-foreground">Lịch sử tư vấn</span>
                <p className="text-xs text-muted-foreground">Xem lại các buổi khám trước</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reminders Section */}
      {activeSection === "reminders" && (
        <div className="space-y-4">
          {/* Add Reminder Button */}
          <Button variant="outline" className="h-11 w-full gap-2 border-dashed">
            <Plus className="h-4 w-4" />
            Thêm nhắc lịch mới
          </Button>

          {/* Today's Schedule */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Lịch hôm nay</h3>
            <div className="space-y-2">
              {reminders.filter(r => r.type === "medicine").map((reminder) => (
                <Card 
                  key={reminder.id} 
                  className={`border-0 shadow-sm ${reminder.status === "done" ? "opacity-60" : ""}`}
                >
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      reminder.status === "done" ? "bg-green-100" : "bg-primary/10"
                    }`}>
                      {reminder.status === "done" ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Pill className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${reminder.status === "done" ? "text-muted-foreground line-through" : "text-foreground"}`}>
                          {reminder.title}
                        </span>
                        <Badge variant={reminder.status === "done" ? "secondary" : "default"} className="text-[10px]">
                          {reminder.time}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{reminder.medicine}</p>
                    </div>
                    {reminder.status !== "done" && (
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Lịch hẹn sắp tới</h3>
            {reminders.filter(r => r.type === "appointment").map((reminder) => (
              <Card key={reminder.id} className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-medium text-foreground">{reminder.title}</span>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{reminder.time}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{reminder.location}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      Đổi lịch
                    </Button>
                    <Button size="sm" className="flex-1 text-xs">
                      Xác nhận
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Health Guides Section */}
      {activeSection === "guides" && (
        <div className="space-y-4">
          {/* AI Recommendation Banner */}
          <Card className="border-0 bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Gợi ý bởi AI</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Dựa trên tình trạng sức khỏe và bệnh nền của người thân, chúng tôi đề xuất những nội dung phù hợp.
              </p>
            </CardContent>
          </Card>

          {/* Guides List */}
          <div className="space-y-3">
            {healthGuides.map((guide) => (
              <Card key={guide.id} className="cursor-pointer border-0 shadow-sm transition-all hover:shadow-md active:scale-[0.99]">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted">
                    {guide.type === "video" ? (
                      <Play className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <BookOpen className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px]">
                        {guide.category}
                      </Badge>
                      <Badge variant={guide.type === "video" ? "default" : "outline"} className="text-[10px]">
                        {guide.type === "video" ? "Video" : "Bài viết"}
                      </Badge>
                    </div>
                    <h4 className="text-sm font-medium text-foreground">{guide.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {guide.type === "video" ? guide.duration : guide.readTime}
                    </p>
                  </div>
                  <ChevronRight className="mt-4 h-5 w-5 shrink-0 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* See All */}
          <Button variant="outline" className="w-full">
            Xem tất cả nội dung
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
