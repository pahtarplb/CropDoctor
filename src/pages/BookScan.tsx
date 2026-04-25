import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Scan,
  Bug,
  Droplets,
  Leaf,
  Calendar,
  Clock,
  Check,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { farms, scanTypes } from "@/data/dummy"
import { cn } from "@/lib/utils"

const timeSlots = ["Morning (6AM - 10AM)", "Afternoon (2PM - 6PM)"]

const scanIcons: Record<string, React.ElementType> = {
  full: Scan,
  pest: Bug,
  water: Droplets,
  nutrient: Leaf,
}

export default function BookScan() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedFarm, setSelectedFarm] = useState<string | null>(null)
  const [selectedScanType, setSelectedScanType] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)

  // Generate next 7 days (always future dates)
  const today = new Date()
  const bookedDates = [2, 4, 6] // Indices of dates that are booked (2nd, 4th, 6th day from tomorrow)

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i + 1)
    return {
      value: date.toISOString().split("T")[0],
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      isBooked: bookedDates.includes(i),
    }
  })

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate("/booking-confirmed", {
        state: {
          bookingId: `DRN-2024-${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(4, "0")}`,
          farm: farms.find((f) => f.id === selectedFarm),
          scanType: scanTypes.find((s) => s.id === selectedScanType),
          date: selectedDate,
          timeSlot: selectedTime,
        },
      })
    }, 1500)
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedFarm
      case 2:
        return selectedScanType
      case 3:
        return selectedDate && selectedTime
      default:
        return false
    }
  }

  return (
    <div className="mobile-container min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary pt-12 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-white">Book Drone Scan</h1>
            <p className="text-green-100 text-sm">Step {step} of 3</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "flex-1 h-1.5 rounded-full transition-colors",
                s <= step ? "bg-white" : "bg-white/30"
              )}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 overflow-auto">
        {/* Step 1: Select Farm */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">
              Select Farm
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Choose the farm you want to scan
            </p>

            <div className="space-y-3">
              {farms.map((farm) => (
                <Card
                  key={farm.id}
                  className={cn(
                    "cursor-pointer transition-all",
                    selectedFarm === farm.id
                      ? "border-2 border-primary bg-primary/5"
                      : "hover:border-primary/50"
                  )}
                  onClick={() => setSelectedFarm(farm.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {farm.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {farm.crop} | {farm.area} acres
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Last scan: {farm.lastScanDate}
                          </p>
                        </div>
                      </div>
                      {selectedFarm === farm.id && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Scan Type */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">
              Select Scan Type
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              What would you like to analyze?
            </p>

            <div className="space-y-3">
              {scanTypes.map((scan) => {
                const Icon = scanIcons[scan.id] || Scan
                return (
                  <Card
                    key={scan.id}
                    className={cn(
                      "cursor-pointer transition-all",
                      selectedScanType === scan.id
                        ? "border-2 border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    )}
                    onClick={() => setSelectedScanType(scan.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {scan.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {scan.description}
                            </p>
                          </div>
                        </div>
                        {selectedScanType === scan.id && (
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 3: Select Date & Time */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">
              Select Date & Time
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Choose your preferred schedule
            </p>

            {/* Date Selection */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Preferred Date</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dates.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => !d.isBooked && setSelectedDate(d.value)}
                    disabled={d.isBooked}
                    className={cn(
                      "flex flex-col items-center p-3 rounded-xl min-w-[70px] border-2 transition-all relative",
                      d.isBooked
                        ? "border-border bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                        : selectedDate === d.value
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-card hover:border-primary/50"
                    )}
                  >
                    <span className="text-xs font-medium opacity-80">{d.day}</span>
                    <span className="text-xl font-bold">{d.date}</span>
                    <span className="text-xs opacity-80">{d.month}</span>
                    {d.isBooked && (
                      <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap">
                        No slots
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Preferred Time Slot</span>
              </div>
              <div className="space-y-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between",
                      selectedTime === slot
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                    )}
                  >
                    <span className="font-medium">{slot}</span>
                    {selectedTime === slot && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Special Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific areas to focus on..."
                className="w-full p-3 rounded-xl border border-border bg-card text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="p-4 border-t bg-background">
        <Button
          onClick={() => (step < 3 ? setStep(step + 1) : handleSubmit())}
          disabled={!canProceed() || loading}
          size="lg"
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Booking...
            </span>
          ) : step < 3 ? (
            "Continue"
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </div>
    </div>
  )
}
