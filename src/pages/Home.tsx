import { useNavigate } from "react-router-dom"
import {
  Plane,
  Camera,
  Cloud,
  Droplets,
  Wind,
  ChevronRight,
  Leaf,
  MapPin,
  Bell,
  Award,
  TrendingUp,
  Store,
  BarChart3,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { farmer, farms, weatherData, droneBookings, carbonCredits, notifications } from "@/data/dummy"
import BottomNav from "@/components/BottomNav"

export default function Home() {
  const navigate = useNavigate()
  const recentScans = droneBookings.filter((b) => b.status === "completed").slice(0, 2)

  return (
    <div className="mobile-container min-h-screen pb-20" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <div className="pt-12 pb-6 px-4 rounded-b-3xl" style={{ background: 'linear-gradient(to bottom right, #16a34a, #15803d)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-white">
                {farmer.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">{farmer.name}</h1>
              <div className="flex items-center gap-1 text-green-100 text-sm">
                <MapPin className="w-3 h-3" />
                {farmer.village}, {farmer.district}
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/notifications")}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              {notifications.filter(n => !n.read).length}
            </span>
          </button>
        </div>

        {/* Weather Card */}
        <Card className="bg-white/10 border-0 backdrop-blur">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cloud className="w-10 h-10 text-white" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {weatherData.current.temp}°C
                  </p>
                  <p className="text-green-100 text-sm">
                    {weatherData.current.condition}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-green-100 text-sm">
                <div className="flex items-center gap-1">
                  <Droplets className="w-4 h-4" />
                  {weatherData.current.humidity}%
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="w-4 h-4" />
                  {weatherData.current.windSpeed} km/h
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-2 space-y-4">
        {/* My Farm Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-foreground">My Farm</h2>
              <Badge variant="success">{farms.length} Fields</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xl font-bold text-primary">{farmer.totalArea}</p>
                <p className="text-xs text-muted-foreground">Total Acres</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xl font-bold text-primary">
                  {farms.filter((f) => f.healthStatus === "healthy").length}
                </p>
                <p className="text-xs text-muted-foreground">Healthy</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xl font-bold text-yellow-600">
                  {farms.filter((f) => f.healthStatus !== "healthy").length}
                </p>
                <p className="text-xs text-muted-foreground">Need Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Primary Actions */}
        <div className="grid grid-cols-2 gap-3">
          {/* Book Drone Scan */}
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10"
            onClick={() => navigate("/book-scan")}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <Plane className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Book Drone Scan</h3>
              <p className="text-xs text-muted-foreground">
                Get detailed crop analysis
              </p>
            </CardContent>
          </Card>

          {/* Scan Leaf Problem */}
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow border-2 border-green-500/20 bg-gradient-to-br from-green-50 to-green-100/50"
            onClick={() => navigate("/leaf-scan")}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mb-3">
                <Camera className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Scan Leaf</h3>
              <p className="text-xs text-muted-foreground">
                Instant disease detection
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Actions - New Features */}
        <div className="grid grid-cols-2 gap-3">
          {/* Yield Prediction */}
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow border-2 border-purple-500/20 bg-gradient-to-br from-purple-50 to-purple-100/50"
            onClick={() => navigate("/yield-prediction")}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-purple-500/10 rounded-full flex items-center justify-center mb-3">
                <BarChart3 className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Yield Prediction</h3>
              <p className="text-xs text-muted-foreground">
                AI harvest forecast
              </p>
            </CardContent>
          </Card>

          {/* Marketplace */}
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow border-2 border-orange-500/20 bg-gradient-to-br from-orange-50 to-orange-100/50"
            onClick={() => navigate("/marketplace")}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center mb-3">
                <Store className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Marketplace</h3>
              <p className="text-xs text-muted-foreground">
                Buy & sell crops
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">Recent Scans</h2>
            <button
              onClick={() => navigate("/my-scans")}
              className="text-sm text-primary flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {recentScans.map((scan) => (
              <Card
                key={scan.id}
                className="cursor-pointer hover:shadow-sm transition-shadow"
                onClick={() => navigate(`/scan-results/${scan.id}`)}
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {scan.farmName}
                    </p>
                    <p className="text-xs text-muted-foreground">{scan.scanType}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="success" className="mb-1">
                      Completed
                    </Badge>
                    <p className="text-xs text-muted-foreground">{scan.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {recentScans.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <Plane className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No scans yet. Book your first drone scan!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Carbon Credits Card */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
          onClick={() => navigate("/carbon-credits")}
          style={{ background: 'linear-gradient(to right, #16a34a, #15803d)' }}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-0.5">Carbon Credits</h3>
                  <p className="text-sm" style={{ color: '#dcfce7' }}>Earn while farming sustainably</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-white" />
                  <span className="text-xl font-bold text-white">{carbonCredits.summary.totalCreditsEarned}</span>
                </div>
                <p className="text-xs" style={{ color: '#bbf7d0' }}>credits earned</p>
              </div>
            </div>
            {carbonCredits.summary.pendingCredits > 0 && (
              <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <span className="text-sm" style={{ color: '#dcfce7' }}>
                  +{carbonCredits.summary.pendingCredits} credits pending
                </span>
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <BottomNav active="home" />
    </div>
  )
}
