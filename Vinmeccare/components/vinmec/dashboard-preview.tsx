"use client"

import { useState } from "react"
import {
  Home,
  History,
  Stethoscope,
  Activity,
  User,
  Bell,
  Wifi,
  Battery,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { HomeTab } from "./tabs/home-tab"
import { HistoryTab } from "./tabs/history-tab"
import { DoctorTab } from "./tabs/doctor-tab"
import { UtilitiesTab } from "./tabs/utilities-tab"
import { ProfileTab } from "./tabs/profile-tab"
import { EmergencyAlert } from "./emergency-alert"

interface DashboardPreviewProps {
  role: "guardian" | "carrier"
  onLogout: () => void
}

export function DashboardPreview({ role, onLogout }: DashboardPreviewProps) {
  const [activeTab, setActiveTab] = useState<"home" | "history" | "doctor" | "utilities" | "profile">("home")
  const [showEmergency, setShowEmergency] = useState(false)
  const [notifications, setNotifications] = useState(3)

  const tabs = [
    { id: "home" as const, icon: Home, label: "Trang chủ" },
    { id: "history" as const, icon: History, label: "Lịch sử" },
    { id: "doctor" as const, icon: Stethoscope, label: "Bác sĩ" },
    { id: "utilities" as const, icon: Activity, label: "Tiện ích" },
    { id: "profile" as const, icon: User, label: "Tài khoản" },
  ]

  const handleSOS = () => {
    setShowEmergency(true)
  }

  if (showEmergency) {
    return <EmergencyAlert onClose={() => setShowEmergency(false)} />
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Status Bar */}
      <div className="flex items-center justify-between bg-primary px-4 py-2 text-primary-foreground">
        <span className="text-xs">9:41</span>
        <div className="flex items-center gap-2">
          <Wifi className="h-3.5 w-3.5" />
          <Battery className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-primary px-4 pb-6 pt-2">
        <div className="mb-4 flex items-center gap-2.5">
          {/* Shield Icon with Heartbeat */}
          <svg
            width="40"
            height="45"
            viewBox="0 0 64 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shield Shape */}
            <path
              d="M32 0L4 12V33.6C4 52.08 15.68 69.12 32 72C48.32 69.12 60 52.08 60 33.6V12L32 0Z"
              fill="white"
            />
            {/* Heartbeat Line */}
            <path
              d="M12 38H20L24 30L30 46L36 34L40 42H52"
              stroke="#1a365d"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
          {/* Brand Text */}
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-lg font-bold tracking-tight text-primary-foreground">
                Vinmec CARE
              </span>
              <span className="text-lg font-bold text-[#f97316]">+</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={onLogout}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <p className="text-xs text-primary-foreground/70">Xin chào,</p>
              <h1 className="text-lg font-semibold text-primary-foreground">
                {role === "guardian" ? "Nguyễn Văn Minh" : "Bà Trần Thị Lan"}
              </h1>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {notifications}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1">
        {activeTab === "home" && (
          <HomeTab role={role} onSOS={handleSOS} />
        )}
        {activeTab === "history" && (
          <HistoryTab role={role} />
        )}
        {activeTab === "doctor" && (
          <DoctorTab role={role} />
        )}
        {activeTab === "utilities" && (
          <UtilitiesTab role={role} />
        )}
        {activeTab === "profile" && (
          <ProfileTab role={role} onLogout={onLogout} />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 border-t border-border bg-card px-2 py-2 shadow-lg">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-colors ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="relative">
                <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? "text-primary" : ""}`} />
                {tab.id === "doctor" && (
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-green-500" />
                )}
              </div>
              <span className={`text-[10px] font-medium ${activeTab === tab.id ? "text-primary" : ""}`}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <div className="absolute -bottom-2 h-1 w-8 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
