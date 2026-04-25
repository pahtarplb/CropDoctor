import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { languages } from "@/data/dummy"

export default function Language() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)
  const [consent, setConsent] = useState(false)

  const handleContinue = () => {
    if (selected && consent) {
      localStorage.setItem("language", selected)
      navigate("/login")
    }
  }

  return (
    <div className="mobile-container min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-green-600 pt-12 pb-8 px-6 text-center">
        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md p-2">
          <img
            src="/cropDoctorLogo.png"
            alt="CropDoctor Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-green-100 text-sm">Choose your preferred language</p>
      </div>

      {/* Language Options */}
      <div className="flex-1 px-4 py-6">
        <div className="flex items-center gap-2 mb-4 text-muted-foreground">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">Select Language</span>
        </div>

        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
                selected === lang.code
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium text-foreground">{lang.nativeName}</span>
                <span className="text-sm text-muted-foreground">{lang.name}</span>
              </div>
              {selected === lang.code && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Consent */}
        <div className="mt-6 p-4 bg-muted rounded-xl">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              I agree to the collection and use of my farm data to provide personalized
              crop health insights and recommendations.
            </span>
          </label>
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-4 border-t bg-background">
        <Button
          onClick={handleContinue}
          disabled={!selected || !consent}
          size="lg"
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
