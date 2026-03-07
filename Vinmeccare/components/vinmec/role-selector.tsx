"use client"

import { Users, User, ArrowRight, Shield, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type UserRole = "guardian" | "carrier"

interface RoleSelectorProps {
  onSelectRole: (role: UserRole) => void
  onBack?: () => void
}

export function RoleSelector({ onSelectRole, onBack }: RoleSelectorProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background px-6 py-8">
      {/* Back Button */}
      {onBack && (
        <div className="mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-3 flex items-center gap-3">
          {/* Shield Icon with Heartbeat */}
          <svg
            width="52"
            height="58"
            viewBox="0 0 64 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shield Shape */}
            <path
              d="M32 0L4 12V33.6C4 52.08 15.68 69.12 32 72C48.32 69.12 60 52.08 60 33.6V12L32 0Z"
              fill="#1a365d"
            />
            {/* Heartbeat Line */}
            <path
              d="M12 38H20L24 30L30 46L36 34L40 42H52"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
          {/* Brand Text */}
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold tracking-tight text-[#1a365d]">
                Vinmec CARE
              </span>
              <span className="text-2xl font-bold text-[#f97316]">+</span>
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Chọn vai trò của bạn để tiếp tục
        </p>
      </div>

      {/* Role Cards */}
      <div className="flex flex-1 flex-col gap-4">
        {/* Guardian Role */}
        <Card
          className="cursor-pointer border-2 border-transparent transition-all hover:border-primary hover:shadow-lg active:scale-[0.98]"
          onClick={() => onSelectRole("guardian")}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  Người giám hộ
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Con ruột, người thân theo dõi sức khỏe cha mẹ / người cao tuổi mang chip
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    <Shield className="h-3 w-3" />
                    Giám sát realtime
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    Cảnh báo SOS
                  </span>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Carrier Role */}
        <Card
          className="cursor-pointer border-2 border-transparent transition-all hover:border-primary hover:shadow-lg active:scale-[0.98]"
          onClick={() => onSelectRole("carrier")}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/20">
                <User className="h-7 w-7 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  Người mang chip
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Người cao tuổi xem chỉ số sức khỏe và thực hiện xác thực e-Consent
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    Xem chỉ số
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    e-Consent
                  </span>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          Bằng việc tiếp tục, bạn đồng ý với{" "}
          <Button variant="link" className="h-auto p-0 text-xs text-primary">
            Điều khoản dịch vụ
          </Button>{" "}
          và{" "}
          <Button variant="link" className="h-auto p-0 text-xs text-primary">
            Chính sách bảo mật
          </Button>
        </p>
      </div>
    </div>
  )
}
