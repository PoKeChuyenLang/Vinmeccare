"use client"

import { useEffect, useState } from "react"

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 300)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#f5f5f0]">
      {/* Logo Container */}
      <div className="mb-8 flex items-center gap-4">
        {/* Shield Icon with Heartbeat */}
        <div className="relative">
          <svg
            width="64"
            height="72"
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
          
          {/* Pulse Animation */}
          <div 
            className="absolute inset-0 animate-ping opacity-30"
            style={{ animationDuration: "2s" }}
          >
            <svg
              width="64"
              height="72"
              viewBox="0 0 64 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 0L4 12V33.6C4 52.08 15.68 69.12 32 72C48.32 69.12 60 52.08 60 33.6V12L32 0Z"
                fill="#1a365d"
              />
            </svg>
          </div>
        </div>

        {/* Brand Text */}
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold tracking-tight text-[#1a365d]">
              Vinmec CARE
            </span>
            <span className="text-3xl font-bold text-[#f97316]">+</span>
          </div>
          <p className="text-sm font-medium tracking-wide text-[#64748b]">
            Lifetime Care, Enduring Health
          </p>
        </div>
      </div>

      {/* Loading Bar */}
      <div className="w-56 overflow-hidden rounded-full bg-[#1a365d]/10">
        <div
          className="h-1.5 rounded-full bg-[#1a365d] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-sm text-[#64748b]">
        Đang khởi động...
      </p>
    </div>
  )
}
