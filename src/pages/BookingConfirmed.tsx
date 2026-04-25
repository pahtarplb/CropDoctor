import { useLocation, useNavigate } from "react-router-dom"
import { CheckCircle, Calendar, Clock, MapPin, Scan } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BookingConfirmed() {
  const navigate = useNavigate()
  const location = useLocation()
  const { bookingId, farm, scanType, date, timeSlot } = location.state || {}

  return (
    <div className="mobile-container min-h-screen bg-background flex flex-col">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 pt-16 pb-12 px-6 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h1>
        <p className="text-green-100">Your drone scan has been scheduled</p>
      </div>

      {/* Booking Details */}
      <div className="flex-1 px-4 py-6 -mt-4">
        <Card className="shadow-lg">
          <CardContent className="p-5">
            {/* Booking ID */}
            <div className="text-center pb-4 border-b border-dashed">
              <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
              <p className="text-xl font-bold text-primary font-mono">
                {bookingId || "DRN-2024-0042"}
              </p>
            </div>

            {/* Details */}
            <div className="py-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Farm</p>
                  <p className="font-medium text-foreground">
                    {farm?.name || "North Field"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {farm?.crop || "Rice"} | {farm?.area || 2.5} acres
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scan className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Scan Type</p>
                  <p className="font-medium text-foreground">
                    {scanType?.name || "Full Farm Health Assessment"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium text-foreground">
                    {date
                      ? new Date(date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "July 25, 2024"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time Slot</p>
                  <p className="font-medium text-foreground">
                    {timeSlot || "Morning (6AM - 10AM)"}
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Pending Confirmation
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Note */}
        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-sm text-blue-800">
            You will receive a confirmation SMS once a drone vendor accepts your
            booking. Typical confirmation time is 2-4 hours.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t bg-background space-y-3">
        <Button
          onClick={() => navigate("/my-scans")}
          size="lg"
          className="w-full"
        >
          View My Bookings
        </Button>
        <Button
          onClick={() => navigate("/home")}
          variant="outline"
          size="lg"
          className="w-full"
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}
