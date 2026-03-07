"use client"

import { useState } from "react"
import { SplashScreen } from "@/components/vinmec/splash-screen"
import { RoleSelector } from "@/components/vinmec/role-selector"
import { LoginForm } from "@/components/vinmec/login-form"
import { VNeIDVerification } from "@/components/vinmec/vneid-verification"
import { EConsent } from "@/components/vinmec/e-consent"
import { DashboardPreview } from "@/components/vinmec/dashboard-preview"

type Screen =
  | "splash"
  | "role-select"
  | "login"
  | "vneid"
  | "e-consent"
  | "dashboard"

type UserRole = "guardian" | "carrier"

export default function VinmecCarePlus() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash")
  const [userRole, setUserRole] = useState<UserRole | null>(null)

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role)
    setCurrentScreen("login")
  }

  const handleLoginComplete = () => {
    if (userRole === "guardian") {
      setCurrentScreen("vneid")
    } else {
      setCurrentScreen("e-consent")
    }
  }

  const handleVNeIDComplete = () => {
    setCurrentScreen("dashboard")
  }

  const handleEConsentComplete = () => {
    setCurrentScreen("dashboard")
  }

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background">
      {currentScreen === "splash" && (
        <SplashScreen onComplete={() => setCurrentScreen("role-select")} />
      )}

      {currentScreen === "role-select" && (
        <RoleSelector 
          onSelectRole={handleRoleSelect} 
          onBack={() => setCurrentScreen("splash")}
        />
      )}

      {currentScreen === "login" && userRole && (
        <LoginForm
          role={userRole}
          onBack={() => setCurrentScreen("role-select")}
          onLogin={handleLoginComplete}
        />
      )}

      {currentScreen === "vneid" && (
        <VNeIDVerification
          onBack={() => setCurrentScreen("login")}
          onComplete={handleVNeIDComplete}
        />
      )}

      {currentScreen === "e-consent" && (
        <EConsent
          onBack={() => setCurrentScreen("login")}
          onComplete={handleEConsentComplete}
        />
      )}

      {currentScreen === "dashboard" && userRole && (
        <DashboardPreview
          role={userRole}
          onLogout={() => {
            setUserRole(null)
            setCurrentScreen("role-select")
          }}
        />
      )}
    </div>
  )
}
