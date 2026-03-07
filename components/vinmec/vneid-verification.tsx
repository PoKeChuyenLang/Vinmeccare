"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  Loader2,
  UserCheck,
  Fingerprint,
  Camera,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface VNeIDVerificationProps {
  onBack: () => void
  onComplete: () => void
}

export function VNeIDVerification({ onBack, onComplete }: VNeIDVerificationProps) {
  const [step, setStep] = useState<"intro" | "verifying" | "success">("intro")

  const handleVerify = () => {
    setStep("verifying")
    setTimeout(() => {
      setStep("success")
    }, 2500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            Xác thực VNeID
          </h1>
          <p className="text-xs text-muted-foreground">
            Xác minh mối quan hệ huyết thống
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 py-4">
        {step === "intro" && (
          <>
            {/* VNeID Logo */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
                <span className="text-2xl font-bold text-white">VNeID</span>
              </div>
              <h2 className="text-xl font-bold text-foreground">
                Kết nối với VNeID
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Hệ thống định danh điện tử quốc gia
              </p>
            </div>

            {/* Info Cards */}
            <div className="mb-6 space-y-3">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="flex items-start gap-3 py-4">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Bảo mật cao
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Xác thực qua hệ thống Bộ Công an Việt Nam
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="flex items-start gap-3 py-4">
                  <UserCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Xác minh quan hệ
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Chứng minh mối quan hệ huyết thống với người mang chip
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Steps */}
            <div className="mb-8 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                Quy trình xác thực:
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Camera, text: "Chụp ảnh CCCD/CMND" },
                  { icon: Fingerprint, text: "Xác thực sinh trắc học" },
                  { icon: CheckCircle2, text: "Hoàn tất xác minh" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto">
              <Button
                className="h-12 w-full text-base font-medium"
                onClick={handleVerify}
              >
                Bắt đầu xác thực VNeID
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Đảm bảo bạn đã cài đặt ứng dụng VNeID trên thiết bị
              </p>
            </div>
          </>
        )}

        {step === "verifying" && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" style={{ animationDuration: "1.5s" }} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Đang xác thực...
            </h3>
            <p className="text-center text-sm text-muted-foreground">
              Vui lòng chờ trong khi hệ thống xác minh
              <br />
              thông tin của bạn với VNeID
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Xác thực thành công!
            </h3>
            <p className="mb-8 text-center text-sm text-muted-foreground">
              Mối quan hệ huyết thống đã được xác minh.
              <br />
              Bạn có thể tiếp tục thiết lập tài khoản.
            </p>

            <Card className="mb-8 w-full border-green-200 bg-green-50">
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Nguyễn Văn A
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Quan hệ: Con ruột
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              className="h-12 w-full text-base font-medium"
              onClick={onComplete}
            >
              Tiếp tục
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
