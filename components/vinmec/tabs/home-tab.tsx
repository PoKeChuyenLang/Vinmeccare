"use client"

import { useState, useEffect } from "react"
import {
  Heart,
  Activity,
  Droplets,
  Thermometer,
  Phone,
  Bell,
  User,
  MapPin,
  Wifi,
  ChevronRight,
  Stethoscope,
  History,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface HomeTabProps {
  role: "guardian" | "carrier"
  onSOS: () => void
}

export function HomeTab({ role, onSOS }: HomeTabProps) {
  const [vitals, setVitals] = useState({
    heartRate: 72,
    spo2: 98,
    bloodPressureSys: 120,
    bloodPressureDia: 80,
    temperature: 36.5,
  })
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "weak" | "disconnected">("connected")

  // Simulate real-time vital updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        heartRate: prev.heartRate + Math.floor(Math.random() * 5) - 2,
        spo2: Math.min(100, Math.max(95, prev.spo2 + Math.floor(Math.random() * 3) - 1)),
        bloodPressureSys: prev.bloodPressureSys + Math.floor(Math.random() * 5) - 2,
        bloodPressureDia: prev.bloodPressureDia + Math.floor(Math.random() * 3) - 1,
        temperature: Number((prev.temperature + (Math.random() * 0.2 - 0.1)).toFixed(1)),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getVitalStatus = (type: string, value: number) => {
    switch (type) {
      case "heartRate":
        if (value < 60 || value > 100) return { status: "warning", label: "Bất thường" }
        return { status: "normal", label: "Bình thường" }
      case "spo2":
        if (value < 95) return { status: "warning", label: "Thấp" }
        return { status: "normal", label: "Tốt" }
      case "bloodPressure":
        if (value > 140 || value < 90) return { status: "warning", label: "Bất thường" }
        return { status: "normal", label: "Bình thường" }
      case "temperature":
        if (value > 37.5 || value < 36) return { status: "warning", label: "Bất thường" }
        return { status: "normal", label: "Bình thường" }
      default:
        return { status: "normal", label: "Bình thường" }
    }
  }

  return (
    <div className="flex flex-col pb-4">
      {/* Patient Card (for Guardian) */}
      {role === "guardian" && (
        <div className="-mt-4 mb-6 px-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Bà Trần Thị Lan</h3>
                  <p className="text-xs text-muted-foreground">78 tuổi - Mẹ</p>
                </div>
                <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 ${
                  connectionStatus === "connected" 
                    ? "bg-green-100" 
                    : connectionStatus === "weak" 
                    ? "bg-amber-100" 
                    : "bg-red-100"
                }`}>
                  <div className={`h-2 w-2 animate-pulse rounded-full ${
                    connectionStatus === "connected" 
                      ? "bg-green-500" 
                      : connectionStatus === "weak" 
                      ? "bg-amber-500" 
                      : "bg-red-500"
                  }`} />
                  <span className={`text-xs font-medium ${
                    connectionStatus === "connected" 
                      ? "text-green-700" 
                      : connectionStatus === "weak" 
                      ? "text-amber-700" 
                      : "text-red-700"
                  }`}>
                    {connectionStatus === "connected" ? "Ổn định" : connectionStatus === "weak" ? "Yếu" : "Mất kết nối"}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>123 Nguyễn Huệ, Q.1, TP.HCM</span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>Cập nhật: {new Date().toLocaleTimeString("vi-VN")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Self View Header for Carrier */}
      {role === "carrier" && (
        <div className="mb-4 px-4">
          <Card className="border-0 bg-primary/5">
            <CardContent className="flex items-center gap-3 p-4">
              <Wifi className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Biochip đang hoạt động</p>
                <p className="text-xs text-muted-foreground">Dữ liệu được cập nhật liên tục</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Vital Signs */}
      <div className="px-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          Chỉ số sinh tồn
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {/* Heart Rate */}
          <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                  <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
                </div>
                <span className="text-xs text-red-700">Nhịp tim</span>
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-red-600">{vitals.heartRate}</span>
                <span className="text-sm text-red-500">bpm</span>
              </div>
              <p className={`mt-1 text-xs ${
                getVitalStatus("heartRate", vitals.heartRate).status === "normal" 
                  ? "text-red-600/70" 
                  : "text-amber-600 font-medium"
              }`}>
                {getVitalStatus("heartRate", vitals.heartRate).label}
              </p>
            </CardContent>
          </Card>

          {/* SpO2 */}
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                  <Droplets className="h-4 w-4 text-blue-500" />
                </div>
                <span className="text-xs text-blue-700">SpO2</span>
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-blue-600">{vitals.spo2}</span>
                <span className="text-sm text-blue-500">%</span>
              </div>
              <p className={`mt-1 text-xs ${
                getVitalStatus("spo2", vitals.spo2).status === "normal" 
                  ? "text-blue-600/70" 
                  : "text-amber-600 font-medium"
              }`}>
                {getVitalStatus("spo2", vitals.spo2).label}
              </p>
            </CardContent>
          </Card>

          {/* Blood Pressure */}
          <Card className="border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Activity className="h-4 w-4 text-emerald-500" />
                </div>
                <span className="text-xs text-emerald-700">Huyết áp</span>
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-emerald-600">{vitals.bloodPressureSys}</span>
                <span className="text-sm text-emerald-500">/{vitals.bloodPressureDia}</span>
              </div>
              <p className={`mt-1 text-xs ${
                getVitalStatus("bloodPressure", vitals.bloodPressureSys).status === "normal" 
                  ? "text-emerald-600/70" 
                  : "text-amber-600 font-medium"
              }`}>
                {getVitalStatus("bloodPressure", vitals.bloodPressureSys).label}
              </p>
            </CardContent>
          </Card>

          {/* Temperature */}
          <Card className="border-0 bg-gradient-to-br from-amber-50 to-amber-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                  <Thermometer className="h-4 w-4 text-amber-500" />
                </div>
                <span className="text-xs text-amber-700">Nhiệt độ</span>
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-amber-600">{vitals.temperature}</span>
                <span className="text-sm text-amber-500">°C</span>
              </div>
              <p className={`mt-1 text-xs ${
                getVitalStatus("temperature", vitals.temperature).status === "normal" 
                  ? "text-amber-600/70" 
                  : "text-red-600 font-medium"
              }`}>
                {getVitalStatus("temperature", vitals.temperature).label}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SOS Button */}
      <div className="mt-6 px-4">
        <Button
          className="h-16 w-full gap-3 bg-destructive text-lg font-bold text-destructive-foreground shadow-lg hover:bg-destructive/90"
          size="lg"
          onClick={onSOS}
        >
          <Phone className="h-7 w-7" />
          GỌI CẤP CỨU SOS
        </Button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Nhấn giữ để gọi cấp cứu 115 ngay lập tức
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 px-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          Thao tác nhanh
        </h2>
        <div className="space-y-2">
          {[
            { icon: Stethoscope, label: "Tư vấn bác sĩ từ xa", color: "text-primary", desc: "Kết nối video với bác sĩ Vinmec" },
            { icon: History, label: "Xem lịch sử sức khỏe", color: "text-blue-500", desc: "Biểu đồ và xu hướng sức khỏe" },
            { icon: Bell, label: "Cài đặt cảnh báo", color: "text-amber-500", desc: "Tùy chỉnh ngưỡng thông báo" },
          ].map((action, index) => (
            <Card key={index} className="cursor-pointer border-0 shadow-sm transition-all hover:shadow-md active:scale-[0.98]">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                    <action.icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">
                      {action.label}
                    </span>
                    <p className="text-xs text-muted-foreground">{action.desc}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
