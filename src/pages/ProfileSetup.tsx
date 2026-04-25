import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, MapPin, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

const districts = [
  "Medak",
  "Rangareddy",
  "Warangal",
  "Karimnagar",
  "Nizamabad",
  "Khammam",
]

const villages: Record<string, string[]> = {
  Medak: ["Kondapur", "Sangareddy", "Patancheru", "Toopran"],
  Rangareddy: ["Shamshabad", "Chevella", "Maheshwaram", "Ibrahimpatnam"],
  Warangal: ["Hanamkonda", "Kazipet", "Jangaon", "Parkal"],
  Karimnagar: ["Jagtial", "Peddapalli", "Huzurabad", "Sircilla"],
  Nizamabad: ["Bodhan", "Armoor", "Kamareddy", "Banswada"],
  Khammam: ["Kothagudem", "Bhadrachalam", "Madhira", "Sathupalli"],
}

export default function ProfileSetup() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [district, setDistrict] = useState("")
  const [village, setVillage] = useState("")
  const [area, setArea] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (name && district && village && area) {
      setLoading(true)
      setTimeout(() => {
        localStorage.setItem("profileComplete", "true")
        localStorage.setItem(
          "farmerProfile",
          JSON.stringify({ name, district, village, area })
        )
        setLoading(false)
        navigate("/home")
      }, 1000)
    }
  }

  const isValid = name && district && village && area

  return (
    <div className="mobile-container min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary pt-12 pb-6 px-6">
        <h1 className="text-xl font-bold text-white mb-1">Complete Your Profile</h1>
        <p className="text-green-100 text-sm">Tell us about yourself and your farm</p>
      </div>

      {/* Progress */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-primary rounded-full"></div>
          <div className="flex-1 h-1.5 bg-primary rounded-full"></div>
          <div className="flex-1 h-1.5 bg-muted rounded-full"></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Step 2 of 3: Profile Setup</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-6 space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            Full Name
          </label>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* District */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            District
          </label>
          <Select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value)
              setVillage("")
            }}
          >
            <option value="">Select district</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </div>

        {/* Village */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            Village
          </label>
          <Select
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            disabled={!district}
          >
            <option value="">Select village</option>
            {district &&
              villages[district]?.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
          </Select>
        </div>

        {/* Farm Area */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Ruler className="w-4 h-4 text-muted-foreground" />
            Total Farm Area
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="flex-1"
            />
            <div className="flex items-center px-4 h-11 bg-muted rounded-lg border">
              <span className="text-sm font-medium">Acres</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-4 border-t bg-background">
        <Button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          size="lg"
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            "Complete Setup"
          )}
        </Button>
      </div>
    </div>
  )
}
