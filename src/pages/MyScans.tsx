import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Plane, Camera, Calendar, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { droneBookings } from "@/data/dummy"
import { cn } from "@/lib/utils"
import BottomNav from "@/components/BottomNav"

type TabType = "drone" | "leaf"

const statusColors: Record<string, "success" | "warning" | "secondary"> = {
  completed: "success",
  confirmed: "warning",
  pending: "secondary",
}

const statusLabels: Record<string, string> = {
  completed: "Completed",
  confirmed: "Confirmed",
  pending: "Pending",
  "in-progress": "In Progress",
}

// Dummy leaf scan history
const leafScans = [
  {
    id: "LS001",
    date: "2024-07-22",
    disease: "Bacterial Leaf Blight",
    crop: "Rice",
    severity: "moderate",
    confidence: 92,
  },
  {
    id: "LS002",
    date: "2024-07-18",
    disease: "Early Blight",
    crop: "Tomato",
    severity: "high",
    confidence: 94,
  },
]

export default function MyScans() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>("drone")

  const upcomingScans = droneBookings.filter(
    (b) => b.status === "pending" || b.status === "confirmed"
  )
  const completedScans = droneBookings.filter((b) => b.status === "completed")

  return (
    <div className="mobile-container min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-primary pt-12 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">My Scans</h1>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/20 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("drone")}
            className={cn(
              "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2",
              activeTab === "drone"
                ? "bg-white text-primary"
                : "text-white/80 hover:text-white"
            )}
          >
            <Plane className="w-4 h-4" />
            Drone Scans
          </button>
          <button
            onClick={() => setActiveTab("leaf")}
            className={cn(
              "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2",
              activeTab === "leaf"
                ? "bg-white text-primary"
                : "text-white/80 hover:text-white"
            )}
          >
            <Camera className="w-4 h-4" />
            Leaf Reports
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {activeTab === "drone" ? (
          <div className="space-y-6">
            {/* Upcoming */}
            {upcomingScans.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Upcoming / Pending
                </h2>
                <div className="space-y-3">
                  {upcomingScans.map((scan) => (
                    <Card
                      key={scan.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => navigate(`/scan-detail/${scan.id}`)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {scan.farmName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {scan.scanType}
                            </p>
                          </div>
                          <Badge variant={statusColors[scan.status]}>
                            {statusLabels[scan.status]}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {scan.date} | {scan.timeSlot}
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Completed */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Completed
              </h2>
              <div className="space-y-3">
                {completedScans.map((scan) => (
                  <Card
                    key={scan.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/scan-results/${scan.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {scan.farmName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {scan.scanType}
                          </p>
                        </div>
                        <Badge variant="success">View Results</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {scan.date}
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {completedScans.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Plane className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        No completed scans yet
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {leafScans.map((scan) => (
              <Card
                key={scan.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/leaf-result/${scan.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-foreground">
                          {scan.disease}
                        </h3>
                        <Badge
                          variant={
                            scan.severity === "high" ? "danger" : "warning"
                          }
                        >
                          {scan.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {scan.crop} | {scan.confidence}% match
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {scan.date}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {leafScans.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No leaf scans yet</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      <BottomNav active="scans" />
    </div>
  )
}
