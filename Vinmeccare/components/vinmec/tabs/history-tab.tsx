"use client"

import { useState } from "react"
import {
  Heart,
  Activity,
  AlertTriangle,
  AlertCircle,
  Download,
  Calendar,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

type TimeRange = "day" | "week" | "month"

interface HistoryTabProps {
  role: "guardian" | "carrier"
}

export function HistoryTab({ role }: HistoryTabProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("day")
  const [selectedMetric, setSelectedMetric] = useState<"heartRate" | "bloodPressure">("heartRate")

  const heartRateData = {
    day: [
      { time: "00:00", value: 68 },
      { time: "04:00", value: 62 },
      { time: "08:00", value: 75 },
      { time: "12:00", value: 82 },
      { time: "16:00", value: 78 },
      { time: "20:00", value: 71 },
      { time: "24:00", value: 69 },
    ],
    week: [
      { time: "T2", value: 72 },
      { time: "T3", value: 75 },
      { time: "T4", value: 70 },
      { time: "T5", value: 78 },
      { time: "T6", value: 74 },
      { time: "T7", value: 69 },
      { time: "CN", value: 71 },
    ],
    month: [
      { time: "Tuần 1", value: 73 },
      { time: "Tuần 2", value: 71 },
      { time: "Tuần 3", value: 75 },
      { time: "Tuần 4", value: 72 },
    ],
  }

  const bloodPressureData = {
    day: [
      { time: "00:00", sys: 118, dia: 78 },
      { time: "04:00", sys: 115, dia: 75 },
      { time: "08:00", sys: 125, dia: 82 },
      { time: "12:00", sys: 130, dia: 85 },
      { time: "16:00", sys: 122, dia: 80 },
      { time: "20:00", sys: 120, dia: 78 },
      { time: "24:00", sys: 118, dia: 76 },
    ],
    week: [
      { time: "T2", sys: 120, dia: 80 },
      { time: "T3", sys: 125, dia: 82 },
      { time: "T4", sys: 118, dia: 78 },
      { time: "T5", sys: 128, dia: 84 },
      { time: "T6", sys: 122, dia: 80 },
      { time: "T7", sys: 119, dia: 79 },
      { time: "CN", sys: 121, dia: 80 },
    ],
    month: [
      { time: "Tuần 1", sys: 122, dia: 80 },
      { time: "Tuần 2", sys: 120, dia: 79 },
      { time: "Tuần 3", sys: 124, dia: 82 },
      { time: "Tuần 4", sys: 121, dia: 80 },
    ],
  }

  const alerts = [
    {
      id: 1,
      level: 3,
      title: "Nhịp tim tăng đột ngột",
      description: "Nhịp tim đạt 125 bpm trong 5 phút",
      time: "Hôm nay, 14:32",
      resolved: true,
    },
    {
      id: 2,
      level: 2,
      title: "SpO2 giảm nhẹ",
      description: "SpO2 giảm xuống 94% trong 10 phút",
      time: "Hôm qua, 22:15",
      resolved: true,
    },
    {
      id: 3,
      level: 2,
      title: "Huyết áp cao",
      description: "Huyết áp đạt 145/95 mmHg",
      time: "2 ngày trước, 08:45",
      resolved: true,
    },
    {
      id: 4,
      level: 3,
      title: "Phát hiện té ngã",
      description: "Có thể phát hiện té ngã, đã xác nhận an toàn",
      time: "3 ngày trước, 16:20",
      resolved: true,
    },
  ]

  const getTrend = (metric: string) => {
    const random = Math.random()
    if (random > 0.6) return { direction: "up", value: "+3%" }
    if (random > 0.3) return { direction: "down", value: "-2%" }
    return { direction: "stable", value: "0%" }
  }

  const trend = getTrend(selectedMetric)

  return (
    <div className="flex flex-col px-4 pb-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Y bạ điện tử</h2>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="h-4 w-4" />
          Xuất PDF
        </Button>
      </div>

      {/* Time Range Selector */}
      <div className="mb-4 flex gap-2 rounded-xl bg-muted p-1">
        {[
          { id: "day" as const, label: "Ngày" },
          { id: "week" as const, label: "Tuần" },
          { id: "month" as const, label: "Tháng" },
        ].map((range) => (
          <button
            key={range.id}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
              timeRange === range.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
            onClick={() => setTimeRange(range.id)}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Metric Selector */}
      <div className="mb-4 flex gap-2">
        <button
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border p-3 transition-all ${
            selectedMetric === "heartRate"
              ? "border-red-300 bg-red-50"
              : "border-border bg-card"
          }`}
          onClick={() => setSelectedMetric("heartRate")}
        >
          <Heart className={`h-4 w-4 ${selectedMetric === "heartRate" ? "text-red-500" : "text-muted-foreground"}`} fill={selectedMetric === "heartRate" ? "currentColor" : "none"} />
          <span className={`text-sm font-medium ${selectedMetric === "heartRate" ? "text-red-700" : "text-muted-foreground"}`}>
            Nhịp tim
          </span>
        </button>
        <button
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border p-3 transition-all ${
            selectedMetric === "bloodPressure"
              ? "border-emerald-300 bg-emerald-50"
              : "border-border bg-card"
          }`}
          onClick={() => setSelectedMetric("bloodPressure")}
        >
          <Activity className={`h-4 w-4 ${selectedMetric === "bloodPressure" ? "text-emerald-500" : "text-muted-foreground"}`} />
          <span className={`text-sm font-medium ${selectedMetric === "bloodPressure" ? "text-emerald-700" : "text-muted-foreground"}`}>
            Huyết áp
          </span>
        </button>
      </div>

      {/* Chart */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              {selectedMetric === "heartRate" ? "Biểu đồ Nhịp tim" : "Biểu đồ Huyết áp"}
            </CardTitle>
            <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              trend.direction === "up" 
                ? "bg-amber-100 text-amber-700" 
                : trend.direction === "down" 
                ? "bg-green-100 text-green-700" 
                : "bg-muted text-muted-foreground"
            }`}>
              {trend.direction === "up" && <TrendingUp className="h-3 w-3" />}
              {trend.direction === "down" && <TrendingDown className="h-3 w-3" />}
              {trend.direction === "stable" && <Minus className="h-3 w-3" />}
              {trend.value}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              {selectedMetric === "heartRate" ? (
                <LineChart data={heartRateData[timeRange]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#888" />
                  <YAxis domain={[50, 100]} tick={{ fontSize: 10 }} stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "white", 
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={{ fill: "#ef4444", strokeWidth: 0, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              ) : (
                <LineChart data={bloodPressureData[timeRange]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#888" />
                  <YAxis domain={[60, 150]} tick={{ fontSize: 10 }} stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "white", 
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sys" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: "#10b981", strokeWidth: 0, r: 3 }}
                    name="Tâm thu"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="dia" 
                    stroke="#06b6d4" 
                    strokeWidth={2}
                    dot={{ fill: "#06b6d4", strokeWidth: 0, r: 3 }}
                    name="Tâm trương"
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Alert History */}
      <div className="mb-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Nhật ký cảnh báo</h3>
          <Button variant="ghost" size="sm" className="h-8 text-xs text-primary">
            Xem tất cả
            <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <Card key={alert.id} className="border-0 shadow-sm">
              <CardContent className="flex items-start gap-3 p-3">
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  alert.level === 3 
                    ? "bg-red-100" 
                    : "bg-amber-100"
                }`}>
                  {alert.level === 3 ? (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {alert.title}
                    </span>
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                      alert.level === 3 
                        ? "bg-red-100 text-red-700" 
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      Mức {alert.level}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {alert.description}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                    {alert.resolved && (
                      <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
                        Đã xử lý
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Download Report */}
      <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Download className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground">Báo cáo sức khỏe PDF</h4>
            <p className="text-xs text-muted-foreground">Tải báo cáo tổng hợp để gửi bác sĩ</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </CardContent>
      </Card>
    </div>
  )
}
