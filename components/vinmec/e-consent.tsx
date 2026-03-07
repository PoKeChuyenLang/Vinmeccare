"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  Fingerprint,
  FileCheck,
  Eye,
  Heart,
  Activity,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface EConsentProps {
  onBack: () => void
  onComplete: () => void
}

export function EConsent({ onBack, onComplete }: EConsentProps) {
  const [step, setStep] = useState<"consent" | "biometric" | "success">("consent")
  const [agreements, setAgreements] = useState({
    healthData: false,
    emergency: false,
    terms: false,
  })

  const allAgreed = agreements.healthData && agreements.emergency && agreements.terms

  const handleBiometricVerify = () => {
    setStep("biometric")
    setTimeout(() => {
      setStep("success")
    }, 2000)
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
            Đồng ý điện tử (e-Consent)
          </h1>
          <p className="text-xs text-muted-foreground">
            Xác nhận quyền truy cập dữ liệu
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 py-4">
        {step === "consent" && (
          <>
            {/* Info Banner */}
            <Card className="mb-6 border-amber-200 bg-amber-50">
              <CardContent className="flex items-start gap-3 py-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-amber-900">
                    Yêu cầu sự đồng ý của người mang chip
                  </p>
                  <p className="mt-1 text-xs text-amber-700">
                    Người cao tuổi cần xác nhận bằng sinh trắc học để cho phép người thân truy cập dữ liệu sức khỏe.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Consent Items */}
            <div className="mb-6 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                Quyền truy cập được yêu cầu:
              </h3>

              <Card
                className={`cursor-pointer transition-all ${
                  agreements.healthData
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
                onClick={() =>
                  setAgreements({ ...agreements, healthData: !agreements.healthData })
                }
              >
                <CardContent className="flex items-start gap-3 py-4">
                  <Checkbox
                    checked={agreements.healthData}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Dữ liệu sức khỏe
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Cho phép xem nhịp tim, huyết áp, SpO2 và các chỉ số sinh tồn
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${
                  agreements.emergency
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
                onClick={() =>
                  setAgreements({ ...agreements, emergency: !agreements.emergency })
                }
              >
                <CardContent className="flex items-start gap-3 py-4">
                  <Checkbox
                    checked={agreements.emergency}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium text-foreground">
                        Cảnh báo khẩn cấp
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Cho phép nhận thông báo SOS và gọi cấp cứu khi cần thiết
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${
                  agreements.terms
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
                onClick={() =>
                  setAgreements({ ...agreements, terms: !agreements.terms })
                }
              >
                <CardContent className="flex items-start gap-3 py-4">
                  <Checkbox
                    checked={agreements.terms}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Điều khoản sử dụng
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Đồng ý với điều khoản dịch vụ và chính sách bảo mật Vinmec Care+
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Privacy Note */}
            <div className="mb-6 flex items-start gap-2 rounded-lg bg-muted p-3">
              <Eye className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                Dữ liệu của bạn được bảo mật theo tiêu chuẩn HIPAA và chỉ được chia sẻ với những người được ủy quyền.
              </p>
            </div>

            <div className="mt-auto">
              <Button
                className="h-12 w-full text-base font-medium"
                disabled={!allAgreed}
                onClick={handleBiometricVerify}
              >
                <Fingerprint className="mr-2 h-5 w-5" />
                Xác nhận bằng sinh trắc học
              </Button>
            </div>
          </>
        )}

        {step === "biometric" && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
                <Fingerprint className="h-16 w-16 text-primary" />
              </div>
              <div
                className="absolute inset-0 animate-ping rounded-full bg-primary/20"
                style={{ animationDuration: "1s" }}
              />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Đang xác thực...
            </h3>
            <p className="text-center text-sm text-muted-foreground">
              Vui lòng đặt ngón tay lên cảm biến
              <br />
              để xác nhận danh tính
            </p>
            <Loader2 className="mt-4 h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Đồng ý thành công!
            </h3>
            <p className="mb-8 text-center text-sm text-muted-foreground">
              Người thân của bạn giờ có thể theo dõi
              <br />
              các chỉ số sức khỏe và nhận cảnh báo khẩn cấp.
            </p>

            <Card className="mb-8 w-full border-green-200 bg-green-50">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-foreground">
                      Quyền truy cập đã được cấp
                    </span>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Button
              className="h-12 w-full text-base font-medium"
              onClick={onComplete}
            >
              Hoàn tất thiết lập
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
