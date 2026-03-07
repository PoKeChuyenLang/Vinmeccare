"use client"

import { useState } from "react"
import {
  Home,
  Lightbulb,
  DoorOpen,
  Camera,
  Wifi,
  Power,
  Settings,
  ChevronRight,
  Shield,
  AlertCircle,
  Smartphone,
  Thermometer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface UtilitiesTabProps {
  role: "guardian" | "carrier"
}

export function UtilitiesTab({ role }: UtilitiesTabProps) {
  const [devices, setDevices] = useState([
    {
      id: "light-living",
      name: "Đèn phòng khách",
      type: "light",
      icon: Lightbulb,
      status: true,
      room: "Phòng khách",
      emergencyLinked: true,
    },
    {
      id: "light-bedroom",
      name: "Đèn phòng ngủ",
      type: "light",
      icon: Lightbulb,
      status: false,
      room: "Phòng ngủ",
      emergencyLinked: true,
    },
    {
      id: "door-main",
      name: "Cửa chính",
      type: "door",
      icon: DoorOpen,
      status: true,
      room: "Lối vào",
      emergencyLinked: true,
    },
    {
      id: "camera-living",
      name: "Camera phòng khách",
      type: "camera",
      icon: Camera,
      status: true,
      room: "Phòng khách",
      emergencyLinked: false,
    },
    {
      id: "camera-door",
      name: "Camera cửa",
      type: "camera",
      icon: Camera,
      status: true,
      room: "Lối vào",
      emergencyLinked: false,
    },
    {
      id: "ac-living",
      name: "Điều hòa phòng khách",
      type: "ac",
      icon: Thermometer,
      status: false,
      room: "Phòng khách",
      emergencyLinked: false,
      temperature: 26,
    },
  ])

  const [emergencyMode, setEmergencyMode] = useState(false)
  const [biochipLinked, setBiochipLinked] = useState(true)

  const toggleDevice = (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId ? { ...device, status: !device.status } : device
    ))
  }

  const linkedDevices = devices.filter(d => d.emergencyLinked)
  const cameraDevices = devices.filter(d => d.type === "camera")

  return (
    <div className="flex flex-col px-4 pb-4">
      {/* Smart Home Status */}
      <Card className="mb-4 border-0 bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Nhà an toàn</h3>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground">
                    {devices.filter(d => d.status).length}/{devices.length} thiết bị hoạt động
                  </span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Biochip Link Status */}
      <Card className={`mb-4 border-0 ${biochipLinked ? "bg-green-50" : "bg-amber-50"}`}>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              biochipLinked ? "bg-green-100" : "bg-amber-100"
            }`}>
              <Wifi className={`h-5 w-5 ${biochipLinked ? "text-green-600" : "text-amber-600"}`} />
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">Liên kết Biochip</span>
              <p className="text-xs text-muted-foreground">
                {biochipLinked ? "Đã kết nối với hệ thống Smart Home" : "Chưa kết nối"}
              </p>
            </div>
          </div>
          <Switch 
            checked={biochipLinked} 
            onCheckedChange={setBiochipLinked}
          />
        </CardContent>
      </Card>

      {/* Emergency Automation */}
      <Card className={`mb-4 border-2 ${emergencyMode ? "border-red-300 bg-red-50" : "border-dashed border-muted-foreground/20"}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className={`h-5 w-5 ${emergencyMode ? "text-red-600" : "text-muted-foreground"}`} />
              <CardTitle className="text-sm font-semibold">Chế độ khẩn cấp</CardTitle>
            </div>
            <Switch 
              checked={emergencyMode} 
              onCheckedChange={setEmergencyMode}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="mb-3 text-xs text-muted-foreground">
            Khi có cảnh báo khẩn cấp, hệ thống sẽ tự động kích hoạt các thiết bị sau:
          </p>
          <div className="flex flex-wrap gap-2">
            {linkedDevices.map((device) => (
              <Badge 
                key={device.id} 
                variant="secondary" 
                className={`gap-1 ${emergencyMode ? "bg-red-100 text-red-700" : ""}`}
              >
                <device.icon className="h-3 w-3" />
                {device.name}
              </Badge>
            ))}
          </div>
          {emergencyMode && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-100 p-2 text-xs text-red-700">
              <AlertCircle className="h-4 w-4" />
              Chế độ khẩn cấp đang bật - Thiết bị sẽ tự động kích hoạt khi phát hiện bất thường
            </div>
          )}
        </CardContent>
      </Card>

      {/* Camera Section */}
      <div className="mb-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Camera giám sát</h3>
        <div className="grid grid-cols-2 gap-3">
          {cameraDevices.map((camera) => (
            <Card 
              key={camera.id} 
              className="cursor-pointer border-0 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
            >
              <CardContent className="p-3">
                <div className="mb-2 flex aspect-video items-center justify-center rounded-lg bg-muted">
                  <Camera className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-foreground">{camera.name}</p>
                    <p className="text-[10px] text-muted-foreground">{camera.room}</p>
                  </div>
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    camera.status ? "bg-green-100" : "bg-muted"
                  }`}>
                    {camera.status ? (
                      <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                    ) : (
                      <Power className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Other Devices */}
      <div className="mb-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Thiết bị khác</h3>
        <div className="space-y-2">
          {devices.map((device) => (
            <Card key={device.id} className="border-0 shadow-sm">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    device.status ? "bg-primary/10" : "bg-muted"
                  }`}>
                    <device.icon className={`h-5 w-5 ${
                      device.status ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{device.name}</span>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">{device.room}</p>
                      {device.emergencyLinked && (
                        <Badge variant="outline" className="h-4 px-1 text-[9px]">
                          <Shield className="mr-0.5 h-2 w-2" />
                          SOS
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {device.type === "door" && (
                    <span className={`text-xs font-medium ${device.status ? "text-green-600" : "text-red-600"}`}>
                      {device.status ? "Khóa" : "Mở"}
                    </span>
                  )}
                  {device.type === "ac" && device.status && (
                    <span className="text-xs font-medium text-primary">
                      {(device as typeof device & { temperature?: number }).temperature}°C
                    </span>
                  )}
                  <Switch 
                    checked={device.status} 
                    onCheckedChange={() => toggleDevice(device.id)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Device */}
      <Card className="cursor-pointer border-2 border-dashed border-muted-foreground/20 transition-all hover:border-primary/30 active:scale-[0.99]">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <Smartphone className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <span className="text-sm font-medium text-foreground">Thêm thiết bị</span>
            <p className="text-xs text-muted-foreground">Kết nối thiết bị Smart Home mới</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </CardContent>
      </Card>
    </div>
  )
}
