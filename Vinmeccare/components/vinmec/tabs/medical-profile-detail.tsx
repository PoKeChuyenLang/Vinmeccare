"use client"

import {
  ChevronDown,
  Clock,
  FileText,
  Stethoscope,
  Heart,
  Pill,
  Download,
  MessageCircle,
  Phone,
  MessageSquare,
  X,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

interface MedicalProfileDetailProps {
  onClose: () => void
}

export function MedicalProfileDetail({ onClose }: MedicalProfileDetailProps) {
  const [expandedSection, setExpandedSection] = useState<string | undefined>(undefined)

  const patientInfo = {
    name: "Bà Trần Thị Lan",
    age: 72,
    gender: "Nữ",
    bloodType: "O+",
    height: "160 cm",
    weight: "58 kg",
    lastCheckup: "15/03/2026",
  }

  const medicalHistory = [
    {
      id: 1,
      date: "15/03/2026",
      doctor: "BS. Nguyễn Văn An",
      diagnosis: "Tái khám định kỳ - Huyết áp cao",
      status: "Hoàn thành",
    },
    {
      id: 2,
      date: "28/02/2026",
      doctor: "BS. Trần Thị Bình",
      diagnosis: "Kiểm tra tim mạch định kỳ",
      status: "Hoàn thành",
    },
    {
      id: 3,
      date: "10/02/2026",
      doctor: "BS. Lê Minh Cường",
      diagnosis: "Tư vấn về đau đầu",
      status: "Hoàn thành",
    },
  ]

  const orderedServices = [
    {
      id: 1,
      date: "15/03/2026",
      service: "Kiểm tra huyết áp",
      status: "Hoàn thành",
      result: "140/90 mmHg",
      note: "Cao hơn bình thường",
    },
    {
      id: 2,
      date: "15/03/2026",
      service: "Xét nghiệm máu định kỳ",
      status: "Chưa có kết quả",
      result: "-",
      note: "Đang xử lý",
    },
    {
      id: 3,
      date: "28/02/2026",
      service: "ECG Tim",
      status: "Hoàn thành",
      result: "Bình thường",
      note: "Không phát hiện bất thường",
    },
  ]

  const diagnosticImages = [
    {
      id: 1,
      date: "28/02/2026",
      type: "Siêu âm tim",
      fileName: "echocardiogram_28022026.pdf",
      status: "Sẵn sàng tải",
    },
    {
      id: 2,
      date: "10/02/2026",
      type: "X-quang ngực",
      fileName: "chest_xray_10022026.pdf",
      status: "Sẵn sàng tải",
    },
  ]

  const vitalSigns = [
    {
      label: "Huyết áp",
      value: "140/90",
      unit: "mmHg",
      status: "Cao",
      date: "15/03/2026",
    },
    {
      label: "Nhịp tim",
      value: "78",
      unit: "bpm",
      status: "Bình thường",
      date: "15/03/2026",
    },
    {
      label: "Đường huyết",
      value: "118",
      unit: "mg/dL",
      status: "Bình thường",
      date: "15/03/2026",
    },
    {
      label: "Nhiệt độ",
      value: "36.5",
      unit: "°C",
      status: "Bình thường",
      date: "15/03/2026",
    },
  ]

  const doctorNotes = {
    diagnosis: "Cao huyết áp giai đoạn 2 (Grade 2 Hypertension)",
    treatment:
      "Tiếp tục sử dụng Amlodipine 5mg và Lisinopril 10mg hàng ngày. Tăng cường theo dõi huyết áp hàng ngày.",
    recommendations:
      "Giảm tiêu thụ muối, tăng hoạt động thể chất nhẹ 30 phút mỗi ngày, kiểm soát stress. Tái khám sau 2 tuần.",
    nextCheckup: "29/03/2026",
  }

  return (
    <div className="flex flex-col px-4 pb-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Hồ sơ sức khỏe chi tiết</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Patient Info Card */}
      <Card className="mb-4 border-0 bg-gradient-to-br from-primary/5 to-accent/5 shadow-sm">
        <CardContent className="p-4">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {patientInfo.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {patientInfo.age} tuổi - {patientInfo.gender}
              </p>
            </div>
            <Badge variant="secondary" className="text-[10px]">
              Cập nhật {patientInfo.lastCheckup}
            </Badge>
          </div>
          <Separator className="my-3 bg-border/50" />
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Nhóm máu", value: patientInfo.bloodType },
              { label: "Chiều cao", value: patientInfo.height },
              { label: "Cân nặng", value: patientInfo.weight },
              { label: "BMI", value: "22.7 (Bình thường)" },
            ].map((item, idx) => (
              <div key={idx}>
                <p className="text-[10px] text-muted-foreground">{item.label}</p>
                <p className="text-xs font-medium text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Examination History */}
      <div className="mb-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Lịch sử khám bệnh</h3>
        <div className="space-y-2">
          {medicalHistory.map((visit) => (
            <Card key={visit.id} className="border-0 shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Stethoscope className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-medium text-foreground">
                        {visit.diagnosis}
                      </p>
                      <Badge
                        variant="secondary"
                        className="shrink-0 text-[10px]"
                      >
                        {visit.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {visit.doctor} • {visit.date}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Accordion Sections */}
      <Accordion
        type="single"
        collapsible
        value={expandedSection}
        onValueChange={setExpandedSection}
        className="w-full space-y-2"
      >
        {/* Ordered Services */}
        <AccordionItem
          value="services"
          className="rounded-lg border border-border shadow-sm"
        >
          <AccordionTrigger className="flex items-center gap-2 px-4 py-3 hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Dịch vụ được đặt ({orderedServices.length})
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-0 pt-2">
            <div className="space-y-2 px-4 pb-4">
              {orderedServices.map((service) => (
                <div key={service.id} className="rounded-lg bg-muted/30 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-foreground">
                        {service.service}
                      </p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {service.date}
                      </p>
                    </div>
                    <Badge
                      variant={
                        service.status === "Hoàn thành" ? "secondary" : "outline"
                      }
                      className="shrink-0 text-[10px]"
                    >
                      {service.status}
                    </Badge>
                  </div>
                  {service.result !== "-" && (
                    <div className="mt-2 border-t border-border/50 pt-2">
                      <p className="text-[10px] text-muted-foreground">
                        Kết quả: <span className="font-medium text-foreground">{service.result}</span>
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {service.note}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Diagnostic Images */}
        <AccordionItem
          value="images"
          className="rounded-lg border border-border shadow-sm"
        >
          <AccordionTrigger className="flex items-center gap-2 px-4 py-3 hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                <Download className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Hình ảnh chẩn đoán ({diagnosticImages.length})
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-0 pt-2">
            <div className="space-y-2 px-4 pb-4">
              {diagnosticImages.map((image) => (
                <div
                  key={image.id}
                  className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground">
                      {image.type}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {image.date} • {image.fileName}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 shrink-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Vital Signs */}
        <AccordionItem
          value="vitals"
          className="rounded-lg border border-border shadow-sm"
        >
          <AccordionTrigger className="flex items-center gap-2 px-4 py-3 hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                <Heart className="h-4 w-4 text-red-600" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Chỉ số sức khỏe ({vitalSigns.length})
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-0 pt-2">
            <div className="grid grid-cols-2 gap-2 px-4 pb-4">
              {vitalSigns.map((vital, idx) => (
                <div key={idx} className="rounded-lg bg-muted/30 p-3">
                  <p className="text-[10px] text-muted-foreground">
                    {vital.label}
                  </p>
                  <div className="mt-1 flex items-baseline gap-1">
                    <p className="text-sm font-semibold text-foreground">
                      {vital.value}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {vital.unit}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`mt-1.5 text-[10px] ${
                      vital.status === "Bình thường"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-yellow-200 bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {vital.status}
                  </Badge>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Doctor Notes & Recommendations */}
        <AccordionItem
          value="notes"
          className="rounded-lg border border-border shadow-sm"
        >
          <AccordionTrigger className="flex items-center gap-2 px-4 py-3 hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <MessageSquare className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Kết luận và hướng dẫn bác sĩ
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-0 pt-2">
            <div className="space-y-4 px-4 pb-4">
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2">
                  Chẩn đoán
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {doctorNotes.diagnosis}
                </p>
              </div>
              <Separator className="bg-border/50" />
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2">
                  Hướng dẫn điều trị
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {doctorNotes.treatment}
                </p>
              </div>
              <Separator className="bg-border/50" />
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2">
                  Khuyến nghị
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {doctorNotes.recommendations}
                </p>
              </div>
              <div className="rounded-lg bg-primary/5 p-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      Tái khám
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {doctorNotes.nextCheckup}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Bottom Action Buttons */}
      <div className="mt-6 flex gap-2">
        <Button
          variant="outline"
          className="flex-1 gap-2"
          onClick={onClose}
        >
          <MessageCircle className="h-4 w-4" />
          Tư vấn bác sĩ
        </Button>
        <Button className="flex-1 gap-2">
          <Phone className="h-4 w-4" />
          Đặt lịch tái khám
        </Button>
      </div>
    </div>
  )
}
