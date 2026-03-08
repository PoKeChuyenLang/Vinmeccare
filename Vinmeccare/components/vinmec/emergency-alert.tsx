"use client"

import { useState, useEffect } from "react"
import {
  Phone,
  X,
  MapPin,
  Heart,
  Activity,
  Clock,
  Navigation,
  AlertTriangle,
  CheckCircle2,
  Ambulance,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EmergencyAlertProps {
  onClose: () => void
  patientName?: string
}

export function EmergencyAlert({ onClose, patientName = "Bà Trần Thị Lan" }: EmergencyAlertProps) {
  const [stage, setStage] = useState<"countdown" | "calling" | "dispatched" | "arriving">("countdown")
  const [countdown, setCountdown] = useState(10)
  const [ambulanceEta, setAmbulanceEta] = useState(8)

  // Play emergency sound
  const playEmergencySound = () => {
    try {
      // Create oscillator for alarm sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 800 // Frequency in Hz
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    } catch (error) {
      console.log("[v0] Audio context not supported or blocked")
    }
  }

  // Countdown timer with sound effects
  useEffect(() => {
    if (stage === "countdown" && countdown > 0) {
      // Play sound every second during countdown
      if (countdown <= 5) {
        playEmergencySound()
      }
      
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (stage === "countdown" && countdown === 0) {
      // Play longer alarm when calling
      playEmergencySound()
      setStage("calling")
      setTimeout(() => setStage("dispatched"), 3000)
    }
  }, [countdown, stage])

  // Ambulance ETA countdown
  useEffect(() => {
    if (stage === "dispatched" || stage === "arriving") {
      const timer = setInterval(() => {
        setAmbulanceEta(prev => {
          if (prev <= 1) {
            setStage("arriving")
            return 1
          }
          return prev - 1
        })
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [stage])

  const handleCallNow = () => {
    setStage("calling")
    setTimeout(() => setStage("dispatched"), 3000)
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Countdown Stage - Red Alert */}
      {stage === "countdown" && (
        <div className="flex min-h-screen flex-col bg-red-600 text-white">
          {/* Pulsing Background Effect */}
          <div className="absolute inset-0 animate-pulse bg-red-500/50" />
          
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-6">
            {/* Alert Icon */}
            <div className="mb-4 flex h-20 w-20 animate-bounce items-center justify-center rounded-full bg-white/20">
              <AlertTriangle className="h-10 w-10" />
            </div>

            {/* Alert Title */}
            <h1 className="mb-2 text-center text-2xl font-bold">CẢNH BÁO KHẨN CẤP</h1>
            <p className="mb-8 text-center text-white/90">Phát hiện bất thường nghiêm trọng</p>

            {/* Patient Info */}
            <Card className="mb-6 w-full max-w-sm border-0 bg-white/10">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">{patientName}</p>
                  <p className="text-sm text-white/80">78 tuổi - 123 Nguyễn Huệ, Q.1</p>
                </div>
              </CardContent>
            </Card>

            {/* Vital Signs Alert */}
            <div className="mb-8 grid w-full max-w-sm grid-cols-2 gap-3">
              <Card className="border-0 bg-white/10">
                <CardContent className="flex items-center gap-2 p-3">
                  <Heart className="h-5 w-5" fill="currentColor" />
                  <div>
                    <p className="text-xs text-white/70">Nhịp tim</p>
                    <p className="text-xl font-bold">142 bpm</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 bg-white/10">
                <CardContent className="flex items-center gap-2 p-3">
                  <Activity className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-white/70">Huyết áp</p>
                    <p className="text-xl font-bold">180/110</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Countdown */}
            <div className="mb-8 text-center">
              <p className="mb-2 text-white/80">Tự động gọi 115 sau</p>
              <div className={`flex h-24 w-24 items-center justify-center rounded-full border-4 transition-all ${
                countdown <= 5 
                  ? "border-white bg-white/20 animate-pulse" 
                  : "border-white/30 bg-white/10"
              }`}>
                <span className={`text-4xl font-bold ${countdown <= 5 ? "text-white" : "text-white"}`}>
                  {countdown}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/70">
                {countdown <= 5 ? `còn ${countdown}s` : "giây"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-sm space-y-3">
              <Button 
                className="h-14 w-full gap-2 bg-white text-lg font-bold text-red-600 hover:bg-white/90"
                onClick={handleCallNow}
              >
                <Phone className="h-6 w-6" />
                GỌI 115 NGAY
              </Button>
              <Button 
                variant="outline" 
                className="h-12 w-full border-white/30 bg-transparent text-white hover:bg-white/10"
                onClick={handleCancel}
              >
                <X className="mr-2 h-5 w-5" />
                Hủy - Tôi ổn
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Calling Stage */}
      {stage === "calling" && (
        <div className="flex min-h-screen flex-col items-center justify-center bg-red-600 p-6 text-white">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/20">
            <Phone className="h-12 w-12 animate-pulse" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">ĐANG GỌI 115...</h1>
          <p className="text-white/80">Vui lòng chờ trong giây lát</p>
          
          <div className="mt-8 flex items-center gap-2">
            <div className="h-3 w-3 animate-bounce rounded-full bg-white" style={{ animationDelay: "0ms" }} />
            <div className="h-3 w-3 animate-bounce rounded-full bg-white" style={{ animationDelay: "150ms" }} />
            <div className="h-3 w-3 animate-bounce rounded-full bg-white" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      )}

      {/* Dispatched Stage - GPS Tracking */}
      {(stage === "dispatched" || stage === "arriving") && (
        <div className="flex min-h-screen flex-col bg-background">
          {/* Header */}
          <div className="bg-primary px-4 py-4 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold">Điều phối cấp cứu</h1>
                <p className="text-sm text-primary-foreground/80">Xe cứu thương đang đến</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative flex-1 bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Navigation className="mx-auto mb-2 h-12 w-12 text-primary animate-pulse" />
                <p className="text-sm text-muted-foreground">Bản đồ GPS thời gian thực</p>
              </div>
            </div>

            {/* Ambulance Marker */}
            <div className="absolute left-1/3 top-1/3 flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-red-500 shadow-lg">
              <Ambulance className="h-6 w-6 text-white" />
            </div>

            {/* Patient Marker */}
            <div className="absolute bottom-1/3 right-1/3 flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>

            {/* Route Line */}
            <svg className="absolute inset-0 h-full w-full">
              <line 
                x1="33%" 
                y1="33%" 
                x2="66%" 
                y2="66%" 
                stroke="#0d9488" 
                strokeWidth="3" 
                strokeDasharray="10,5"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Info Panel */}
          <div className="border-t bg-card p-4">
            {/* ETA Card */}
            <Card className={`mb-4 border-0 ${stage === "arriving" ? "bg-green-50" : "bg-primary/5"}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      stage === "arriving" ? "bg-green-100" : "bg-primary/10"
                    }`}>
                      <Clock className={`h-6 w-6 ${stage === "arriving" ? "text-green-600" : "text-primary"}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {stage === "arriving" ? "Sắp đến nơi!" : "Thời gian đến dự kiến"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Xe cứu thương BKS 51A-12345
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-bold ${stage === "arriving" ? "text-green-600" : "text-primary"}`}>
                      {ambulanceEta}
                    </span>
                    <span className="text-sm text-muted-foreground"> phút</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patient Status */}
            <Card className="mb-4 border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{patientName}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-red-50 p-2">
                    <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
                    <div>
                      <p className="text-xs text-red-600">Nhịp tim</p>
                      <p className="text-sm font-bold text-red-700">128 bpm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-2">
                    <Activity className="h-4 w-4 text-amber-500" />
                    <div>
                      <p className="text-xs text-amber-600">Huyết áp</p>
                      <p className="text-sm font-bold text-amber-700">165/100</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2">
                <Phone className="h-4 w-4" />
                Gọi lại 115
              </Button>
              <Button className="flex-1 gap-2" onClick={onClose}>
                <CheckCircle2 className="h-4 w-4" />
                Kết thúc
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
