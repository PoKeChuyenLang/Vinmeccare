"use client"

import { useState } from "react"
import {
  User,
  Phone,
  Mail,
  Shield,
  CreditCard,
  Bell,
  Award,
  HelpCircle,
  ChevronRight,
  Crown,
  Star,
  Users,
  LogOut,
  Video,
  Headphones,
  FileText,
  Plus,
  Trash2,
  Check,
  Edit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"

interface ProfileTabProps {
  role: "guardian" | "carrier"
  onLogout: () => void
}

export function ProfileTab({ role, onLogout }: ProfileTabProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const userInfo = {
    name: role === "guardian" ? "Nguyễn Văn Minh" : "Bà Trần Thị Lan",
    phone: "+84 912 345 678",
    email: "nguyenvanminh@gmail.com",
    membership: "Premium",
    vinidPoints: 12500,
    joinDate: "01/2025",
  }

  const accessList = [
    { id: 1, name: "Nguyễn Văn Minh", relation: "Con trai cả", role: "Quản trị", active: true },
    { id: 2, name: "Nguyễn Thị Mai", relation: "Con gái", role: "Người giám hộ", active: true },
    { id: 3, name: "BS. Nguyễn Văn An", relation: "Bác sĩ Vinmec", role: "Y tế", active: true },
  ]

  const achievements = [
    { id: 1, name: "Người thân chu đáo", icon: "heart", progress: 85, description: "Kiểm tra sức khỏe hàng ngày" },
    { id: 2, name: "Chăm sóc 30 ngày", icon: "calendar", progress: 100, description: "Theo dõi liên tục 30 ngày" },
    { id: 3, name: "Người phản hồi", icon: "star", progress: 60, description: "Trả lời khảo sát dịch vụ" },
  ]

  const [alertSettings, setAlertSettings] = useState({
    critical: true,
    warning: true,
    info: false,
    sound: true,
    vibrate: true,
  })

  return (
    <div className="flex flex-col px-4 pb-4">
      {/* Profile Card */}
      <Card className="mb-4 border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <Button 
                size="icon" 
                variant="secondary"
                className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full"
              >
                <Edit className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">{userInfo.name}</h3>
                <Badge className="gap-1 bg-amber-100 text-amber-700">
                  <Crown className="h-3 w-3" />
                  {userInfo.membership}
                </Badge>
              </div>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {userInfo.phone}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Mail className="h-3 w-3" />
                {userInfo.email}
              </div>
            </div>
          </div>

          {/* VinID Points */}
          <div className="mt-4 flex items-center justify-between rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-3">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Điểm VinID</span>
            </div>
            <span className="text-lg font-bold text-primary">{userInfo.vinidPoints.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Access Control */}
      {role === "guardian" && (
        <Card className="mb-4 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="text-sm font-semibold">Quản lý phân quyền</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-primary">
                <Plus className="h-3 w-3" />
                Thêm
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="mb-3 text-xs text-muted-foreground">
              Người có quyền truy cập dữ liệu sức khỏe của mẹ bạn
            </p>
            <div className="space-y-2">
              {accessList.map((person) => (
                <div 
                  key={person.id} 
                  className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      {person.role === "Y tế" ? (
                        <User className="h-4 w-4 text-primary" />
                      ) : (
                        <Users className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">{person.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{person.relation}</span>
                        <Badge variant="secondary" className="h-4 px-1.5 text-[9px]">
                          {person.role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subscription */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm font-semibold">Gói dịch vụ</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-500" />
                <span className="font-semibold text-foreground">Gói Premium</span>
              </div>
              <Badge className="bg-green-100 text-green-700">Đang hoạt động</Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Tự động gia hạn: 15/04/2026 - 499.000 VNĐ/tháng
            </p>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                Quản lý
              </Button>
              <Button size="sm" className="flex-1 text-xs">
                Nâng cấp
              </Button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-3 flex items-center justify-between rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#af206b]">
                <span className="text-xs font-bold text-white">M</span>
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">MoMo</span>
                <p className="text-xs text-muted-foreground">****5678</p>
              </div>
            </div>
            <Check className="h-5 w-5 text-green-600" />
          </div>
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm font-semibold">Cài đặt cảnh báo</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-foreground">Cảnh báo nguy cấp (Mức 3)</span>
              <p className="text-xs text-muted-foreground">Thông báo SOS và bất thường nghiêm trọng</p>
            </div>
            <Switch 
              checked={alertSettings.critical} 
              onCheckedChange={(v) => setAlertSettings({...alertSettings, critical: v})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-foreground">Cảnh báo (Mức 2)</span>
              <p className="text-xs text-muted-foreground">Bất thường nhẹ cần chú ý</p>
            </div>
            <Switch 
              checked={alertSettings.warning} 
              onCheckedChange={(v) => setAlertSettings({...alertSettings, warning: v})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-foreground">Thông báo chung</span>
              <p className="text-xs text-muted-foreground">Cập nhật hàng ngày và nhắc nhở</p>
            </div>
            <Switch 
              checked={alertSettings.info} 
              onCheckedChange={(v) => setAlertSettings({...alertSettings, info: v})}
            />
          </div>
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Âm thanh</span>
              <Switch 
                checked={alertSettings.sound} 
                onCheckedChange={(v) => setAlertSettings({...alertSettings, sound: v})}
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-foreground">Rung</span>
              <Switch 
                checked={alertSettings.vibrate} 
                onCheckedChange={(v) => setAlertSettings({...alertSettings, vibrate: v})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gamification */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm font-semibold">Thành tựu</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="rounded-lg bg-muted/50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{achievement.name}</span>
                {achievement.progress === 100 && (
                  <Badge className="bg-green-100 text-green-700">Hoàn thành</Badge>
                )}
              </div>
              <p className="mb-2 text-xs text-muted-foreground">{achievement.description}</p>
              <div className="flex items-center gap-2">
                <Progress value={achievement.progress} className="h-2 flex-1" />
                <span className="text-xs font-medium text-muted-foreground">{achievement.progress}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Support Center */}
      <Card className="mb-4 border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm font-semibold">Trung tâm trợ giúp</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {[
            { icon: Video, label: "Video hướng dẫn", desc: "Cách sử dụng app và Biochip" },
            { icon: Headphones, label: "Hotline kỹ thuật 24/7", desc: "1900 1234" },
            { icon: FileText, label: "Khảo sát chất lượng", desc: "Góp ý để cải thiện dịch vụ" },
          ].map((item, index) => (
            <div 
              key={index}
              className="flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50 active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Logout */}
      <Button 
        variant="outline" 
        className="h-12 w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
        onClick={onLogout}
      >
        <LogOut className="h-5 w-5" />
        Đăng xuất
      </Button>

      {/* App Version */}
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Vinmec Care+ v2.1.0 | Build 2026.03.07
      </p>
    </div>
  )
}
