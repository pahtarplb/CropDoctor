import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Scan,
  User,
  Phone,
  CheckCircle,
  Circle,
  XCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { droneBookings, farms } from "@/data/dummy"
import { cn } from "@/lib/utils"

const statusSteps = [
  { id: "requested", label: "Requested", icon: Circle },
  { id: "confirmed", label: "Confirmed", icon: CheckCircle },
  { id: "assigned", label: "Drone Assigned", icon: CheckCircle },
  { id: "in-progress", label: "In Progress", icon: CheckCircle },
  { id: "completed", label: "Completed", icon: CheckCircle },
]

export default function ScanDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const booking = droneBookings.find((b) => b.id === id)
  const farm = farms.find((f) => f.id === booking?.farmId)

  if (!booking) {
    return (
      <div className="mobile-container min-h-screen flex items-center justify-center">
        <p>Booking not found</p>
      </div>
    )
  }

  const getCurrentStep = () => {
    switch (booking.status) {
      case "pending":
        return 0
      case "confirmed":
        return 2
      case "in-progress":
        return 3
      case "completed":
        return 4
      default:
        return 0
    }
  }

  const currentStep = getCurrentStep()

  return (
    <div className="mobile-container min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-primary pt-12 pb-6 px-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-white">Booking Details</h1>
            <p className="text-green-100 text-sm font-mono">{booking.id}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {/* Status Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Status</h2>
              <Badge
                variant={
                  booking.status === "confirmed"
                    ? "warning"
                    : booking.status === "completed"
                    ? "success"
                    : "secondary"
                }
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>

            {/* Status Timeline */}
            <div className="relative">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStep
                const isCurrent = index === currentStep
                return (
                  <div key={step.id} className="flex items-start gap-3 pb-4 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          isCompleted
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </div>
                      {index < statusSteps.length - 1 && (
                        <div
                          className={cn(
                            "w-0.5 h-8 mt-1",
                            index < currentStep ? "bg-primary" : "bg-muted"
                          )}
                        />
                      )}
                    </div>
                    <div className="pt-1">
                      <p
                        className={cn(
                          "font-medium",
                          isCompleted ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-primary">Current status</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="font-semibold text-foreground">Booking Details</h2>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Farm</p>
                <p className="font-medium text-foreground">{booking.farmName}</p>
                <p className="text-sm text-muted-foreground">
                  {farm?.crop} | {farm?.area} acres
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Scan className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scan Type</p>
                <p className="font-medium text-foreground">{booking.scanType}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">{booking.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Slot</p>
                <p className="font-medium text-foreground">{booking.timeSlot}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Details */}
        {booking.status !== "pending" && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="font-semibold text-foreground">Drone Vendor</h2>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {booking.vendorName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pilot: {booking.pilotName}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${booking.pilotPhone}`}
                className="flex items-center gap-3 p-3 bg-muted rounded-lg"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-medium text-primary">
                  Call Pilot: {booking.pilotPhone}
                </span>
              </a>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        {booking.status === "pending" && (
          <Card className="border-red-100">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-3">
                You can cancel this booking before it's confirmed.
              </p>
              <Button variant="destructive" className="w-full">
                <XCircle className="w-4 h-4 mr-2" />
                Cancel Booking
              </Button>
            </CardContent>
          </Card>
        )}

        {booking.status === "completed" && (
          <Button
            onClick={() => navigate(`/scan-results/${booking.id}`)}
            size="lg"
            className="w-full"
          >
            View Scan Results
          </Button>
        )}
      </div>
    </div>
  )
}
