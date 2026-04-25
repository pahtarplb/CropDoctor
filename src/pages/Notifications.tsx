import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  CloudLightning,
  CloudRain,
  Bug,
  CheckCircle,
  Thermometer,
  Leaf,
  Award,
  AlertTriangle,
  Bell,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { notifications } from "@/data/dummy"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ElementType> = {
  "cloud-lightning": CloudLightning,
  "cloud-rain": CloudRain,
  bug: Bug,
  "check-circle": CheckCircle,
  thermometer: Thermometer,
  leaf: Leaf,
  award: Award,
}

const priorityBadgeVariant: Record<string, "danger" | "warning" | "success"> = {
  high: "danger",
  medium: "warning",
  low: "success",
}

export default function Notifications() {
  const navigate = useNavigate()

  const unreadCount = notifications.filter((n) => !n.read).length

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
  }

  return (
    <div className="mobile-container min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <div className="pt-12 pb-4 px-4" style={{ background: 'linear-gradient(to bottom right, #16a34a, #15803d)' }}>
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-white">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm" style={{ color: '#dcfce7' }}>{unreadCount} unread alerts</p>
            )}
          </div>
          <button className="text-sm text-white underline">Mark all read</button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4 py-4 space-y-3">
        {notifications.map((notification) => {
          const Icon = iconMap[notification.icon] || Bell
          const isWeatherAlert = notification.type === "weather_alert"
          const isPestAlert = notification.type === "pest_alert"

          return (
            <Card
              key={notification.id}
              className={cn(
                "overflow-hidden transition-all",
                !notification.read && "border-l-4",
                !notification.read && notification.priority === "high" && "border-l-red-500",
                !notification.read && notification.priority === "medium" && "border-l-yellow-500",
                !notification.read && notification.priority === "low" && "border-l-green-500"
              )}
              style={{ backgroundColor: '#ffffff' }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                      isWeatherAlert && "bg-blue-100",
                      isPestAlert && "bg-red-100",
                      notification.type === "scan_update" && "bg-green-100",
                      notification.type === "advisory" && "bg-yellow-100",
                      notification.type === "carbon_credits" && "bg-purple-100"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5",
                        isWeatherAlert && "text-blue-600",
                        isPestAlert && "text-red-600",
                        notification.type === "scan_update" && "text-green-600",
                        notification.type === "advisory" && "text-yellow-600",
                        notification.type === "carbon_credits" && "text-purple-600"
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3
                        className={cn(
                          "font-semibold text-sm",
                          !notification.read ? "text-gray-900" : "text-gray-700"
                        )}
                        style={{ color: notification.read ? '#374151' : '#111827' }}
                      >
                        {notification.title}
                      </h3>
                      <Badge variant={priorityBadgeVariant[notification.priority]}>
                        {notification.priority}
                      </Badge>
                    </div>
                    <p className="text-sm leading-relaxed mb-2" style={{ color: '#6b7280' }}>
                      {notification.message}
                    </p>
                    <p className="text-xs" style={{ color: '#9ca3af' }}>
                      {formatTime(notification.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Action for high priority weather alerts */}
                {isWeatherAlert && notification.priority === "high" && (
                  <div className="mt-3 pt-3 border-t flex items-center gap-2" style={{ borderColor: '#e5e7eb' }}>
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-medium" style={{ color: '#dc2626' }}>
                      Take immediate precautions
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Info Card */}
      <div className="px-4 pb-6">
        <Card style={{ backgroundColor: '#eff6ff', borderColor: '#dbeafe' }}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 mt-0.5" style={{ color: '#2563eb' }} />
              <div>
                <h4 className="font-medium text-sm mb-1" style={{ color: '#1e40af' }}>
                  About Weather Alerts
                </h4>
                <p className="text-xs" style={{ color: '#3b82f6' }}>
                  Weather alerts are sourced from IMD (Indian Meteorological Department)
                  and local agricultural extension services. High priority alerts require
                  immediate action to protect your crops.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
