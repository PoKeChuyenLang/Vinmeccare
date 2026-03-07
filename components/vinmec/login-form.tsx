"use client"

import { useState } from "react"
import {
  Phone,
  ArrowLeft,
  ChevronRight,
  Fingerprint,
  Shield,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

type LoginMethod = "phone" | "vinid"

interface LoginFormProps {
  role: "guardian" | "carrier"
  onBack: () => void
  onLogin: () => void
}

export function LoginForm({ role, onBack, onLogin }: LoginFormProps) {
  const [method, setMethod] = useState<LoginMethod>("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"input" | "otp">("input")

  const roleLabel = role === "guardian" ? "Người giám hộ" : "Người mang chip"

  const handleSendOTP = () => {
    if (phoneNumber.length >= 10) {
      setStep("otp")
    }
  }

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      onLogin()
    }
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
          <h1 className="text-lg font-semibold text-foreground">Đăng nhập</h1>
          <p className="text-xs text-muted-foreground">{roleLabel}</p>
        </div>
      </div>

      <div className="flex-1 px-6 py-4">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Heart className="h-8 w-8 text-primary" fill="currentColor" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Vinmec Care+</h2>
        </div>

        {step === "input" ? (
          <>
            {/* Login Method Tabs */}
            <div className="mb-6 flex gap-2 rounded-xl bg-muted p-1">
              <button
                className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
                  method === "phone"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
                onClick={() => setMethod("phone")}
              >
                Số điện thoại
              </button>
              <button
                className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
                  method === "vinid"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
                onClick={() => setMethod("vinid")}
              >
                Tài khoản VinID
              </button>
            </div>

            {method === "phone" ? (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5 text-muted-foreground">
                      <span className="text-sm font-medium">+84</span>
                      <div className="h-4 w-px bg-border" />
                    </div>
                    <Input
                      type="tel"
                      placeholder="912 345 678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-12 pl-16 text-base"
                    />
                    <Phone className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                <Button
                  className="h-12 w-full text-base font-medium"
                  onClick={handleSendOTP}
                  disabled={phoneNumber.length < 10}
                >
                  Nhận mã OTP
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
                <CardContent className="flex flex-col items-center py-8">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <img
                      src="https://cdn.haitrieu.com/wp-content/uploads/2022/03/Logo-VinID-V.png"
                      alt="VinID"
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <p className="mb-4 text-center text-sm text-muted-foreground">
                    Đăng nhập nhanh với tài khoản VinID của bạn
                  </p>
                  <Button className="h-11 w-full" onClick={onLogin}>
                    Đăng nhập với VinID
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">hoặc</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Biometric Login */}
            <Button
              variant="outline"
              className="h-12 w-full gap-2 text-base"
              onClick={onLogin}
            >
              <Fingerprint className="h-5 w-5 text-primary" />
              Đăng nhập bằng sinh trắc học
            </Button>
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Nhập mã xác thực
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Mã OTP đã được gửi đến số +84 {phoneNumber}
              </p>
            </div>

            {/* OTP Input */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="h-12 w-12 text-center text-xl font-semibold"
                  value={otp[index] || ""}
                  onChange={(e) => {
                    const newOtp = otp.split("")
                    newOtp[index] = e.target.value
                    setOtp(newOtp.join(""))
                    if (e.target.value && index < 5) {
                      const nextInput = document.querySelector(
                        `input:nth-child(${index + 2})`
                      ) as HTMLInputElement
                      nextInput?.focus()
                    }
                  }}
                />
              ))}
            </div>

            <Button
              className="h-12 w-full text-base font-medium"
              onClick={handleVerifyOTP}
              disabled={otp.length < 6}
            >
              Xác nhận
            </Button>

            <div className="text-center">
              <Button variant="link" className="text-sm text-primary">
                Gửi lại mã OTP (59s)
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Security Badge */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-center gap-2 rounded-lg bg-muted/50 py-3">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground">
            Bảo mật bởi Vinmec & VNeID
          </span>
        </div>
      </div>
    </div>
  )
}
