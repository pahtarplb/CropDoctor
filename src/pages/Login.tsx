import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Login() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", ""])
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setLoading(true)
      // Simulate OTP sending
      setTimeout(() => {
        setLoading(false)
        setStep("otp")
      }, 1000)
    }
  }

  const handleVerifyOtp = () => {
    if (otp.every((digit) => digit !== "")) {
      setLoading(true)
      // Simulate verification
      setTimeout(() => {
        setLoading(false)
        const isExistingUser = localStorage.getItem("profileComplete")
        if (isExistingUser) {
          navigate("/home")
        } else {
          navigate("/profile-setup")
        }
      }, 1000)
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4)
    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)
    if (pastedData.length > 0) {
      inputRefs.current[Math.min(pastedData.length, 3)]?.focus()
    }
  }

  return (
    <div className="mobile-container min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-green-600 pt-12 pb-10 px-6 text-center rounded-b-3xl">
        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md p-2">
          <img
            src="/cropDoctorLogo.png"
            alt="CropDoctor Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-green-100 text-sm">Sign in to continue</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-8">
        {step === "phone" ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Enter your phone number</h2>
              <p className="text-sm text-muted-foreground">We'll send you a verification code</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Mobile Number</label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 h-11 bg-muted rounded-lg border">
                  <span className="text-sm font-medium">+91</span>
                </div>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="Enter 10 digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleSendOtp}
              disabled={phone.length !== 10 || loading}
              size="lg"
              className="w-full"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Get OTP
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Verify OTP</h2>
              <p className="text-sm text-muted-foreground">
                Enter the 4-digit code sent to +91 {phone}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">OTP Code</label>
              <div className="flex gap-3 justify-center" onPaste={handleOtpPaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 border-border bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    maxLength={1}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Enter the 4-digit code sent via SMS
              </p>
            </div>

            <Button
              onClick={handleVerifyOtp}
              disabled={!otp.every((digit) => digit !== "") || loading}
              size="lg"
              className="w-full"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Verify & Continue"
              )}
            </Button>

            <button
              onClick={() => setStep("phone")}
              className="w-full text-sm text-primary hover:underline"
            >
              Change phone number
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
