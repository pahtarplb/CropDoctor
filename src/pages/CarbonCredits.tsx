import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Leaf,
  Calendar,
  CheckCircle,
  Clock,
  IndianRupee,
  Award,
  Info,
  Sprout,
  Droplets,
  Tractor,
  Wallet,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { carbonCredits } from "@/data/dummy"
import { cn } from "@/lib/utils"

const practiceIcons: Record<string, React.ElementType> = {
  "No-Till Farming": Tractor,
  "Cover Cropping": Sprout,
  "Efficient Water Management": Droplets,
}

export default function CarbonCredits() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"overview" | "practices" | "timeline">("overview")
  const [showInfo, setShowInfo] = useState(false)

  const { summary, enrolledPractices, timeline } = carbonCredits

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getNextMonthDate = () => {
    const now = new Date()
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 5)
    return nextMonth.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    })
  }

  return (
    <div className="mobile-container min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <div className="pt-12 pb-6 px-4" style={{ background: 'linear-gradient(to bottom right, #16a34a, #15803d)' }}>
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-white">Carbon Credits</h1>
            <p className="text-sm" style={{ color: '#dcfce7' }}>Earn while farming sustainably</p>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <Info className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-3 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
            <Leaf className="w-6 h-6 text-white mx-auto mb-1" />
            <p className="text-2xl font-bold text-white">{summary.totalCreditsEarned}</p>
            <p className="text-xs" style={{ color: '#dcfce7' }}>Credits Earned</p>
            <p className="text-xs" style={{ color: '#bbf7d0' }}>tCO2e</p>
          </div>
          <div className="rounded-xl p-3 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
            <IndianRupee className="w-6 h-6 text-white mx-auto mb-1" />
            <p className="text-2xl font-bold text-white">{formatCurrency(summary.totalEarnings)}</p>
            <p className="text-xs" style={{ color: '#dcfce7' }}>Total Earnings</p>
            <button
              className="mt-2 w-full text-xs font-semibold py-1.5 px-3 rounded-md flex items-center justify-center gap-1"
              style={{
                backgroundColor: '#ffffff',
                color: '#16a34a',
                border: '2px solid #22c55e',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onClick={() => alert('Withdraw feature coming soon!')}
            >
              <Wallet className="w-3 h-3" />
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="px-4 py-3" style={{ backgroundColor: '#eff6ff' }}>
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#2563eb' }} />
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: '#1e40af' }}>What are Carbon Credits?</p>
              <p className="text-xs leading-relaxed" style={{ color: '#3b82f6' }}>
                Carbon credits reward farmers for practices that reduce greenhouse gases or store carbon in soil.
                1 credit = 1 metric ton of CO2 equivalent removed from the atmosphere.
                You earn by adopting sustainable practices like no-till farming and cover cropping.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pending Credits Banner */}
      {summary.pendingCredits > 0 && (
        <div className="mx-4 mt-4">
          <Card style={{ backgroundColor: '#fef9c3', borderColor: '#fef08a' }}>
            <CardContent className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fef08a' }}>
                <Clock className="w-5 h-5" style={{ color: '#a16207' }} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ color: '#854d0e' }}>
                  {summary.pendingCredits} Credits Pending
                </p>
                <p className="text-xs" style={{ color: '#a16207' }}>
                  Expected payment: {formatCurrency(summary.pendingPayment)} by {getNextMonthDate()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <div className="px-4 pt-4">
        <div className="flex rounded-lg p-1" style={{ backgroundColor: '#e5e7eb' }}>
          {[
            { id: "overview", label: "Overview" },
            { id: "practices", label: "Practices" },
            { id: "timeline", label: "Timeline" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              )}
              style={activeTab === tab.id ? { backgroundColor: '#ffffff', color: '#111827' } : { color: '#4b5563' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-4">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <Card style={{ backgroundColor: '#ffffff' }}>
                <CardContent className="p-3">
                  <p className="text-xs mb-1" style={{ color: '#6b7280' }}>Price per Credit</p>
                  <p className="text-lg font-bold" style={{ color: '#16a34a' }}>
                    {formatCurrency(summary.pricePerCredit)}
                  </p>
                  <p className="text-xs" style={{ color: '#9ca3af' }}>per tCO2e</p>
                </CardContent>
              </Card>
              <Card style={{ backgroundColor: '#ffffff' }}>
                <CardContent className="p-3">
                  <p className="text-xs mb-1" style={{ color: '#6b7280' }}>Enrolled Since</p>
                  <p className="text-lg font-bold" style={{ color: '#111827' }}>
                    {formatDate(summary.enrollmentDate)}
                  </p>
                  <p className="text-xs" style={{ color: '#9ca3af' }}>13 months ago</p>
                </CardContent>
              </Card>
            </div>

            {/* Next Verification */}
            <Card style={{ backgroundColor: '#ffffff' }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold" style={{ color: '#111827' }}>Next Verification</h3>
                  <Badge variant="warning">Upcoming</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f0fdf4' }}>
                    <Calendar className="w-6 h-6" style={{ color: '#16a34a' }} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#111827' }}>{formatDate(summary.nextVerificationDate)}</p>
                    <p className="text-sm" style={{ color: '#6b7280' }}>Satellite + Soil sampling verification</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How it Works */}
            <Card style={{ backgroundColor: '#ffffff' }}>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3" style={{ color: '#111827' }}>How Carbon Credits Work</h3>
                <div className="space-y-3">
                  {[
                    { step: 1, title: "Adopt Practices", desc: "Implement sustainable farming methods" },
                    { step: 2, title: "Monitoring", desc: "Satellite & drone verification of practices" },
                    { step: 3, title: "Verification", desc: "Third-party audits soil carbon levels" },
                    { step: 4, title: "Credit Issuance", desc: "Credits issued based on CO2 sequestered" },
                    { step: 5, title: "Payment", desc: "Receive payment when credits are sold" },
                  ].map((item, index) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                        style={{ backgroundColor: '#16a34a' }}
                      >
                        {item.step}
                      </div>
                      <div className={cn(index < 4 && "border-l-2 pb-3 pl-4 ml-3")} style={{ borderColor: '#d1d5db', marginLeft: index < 4 ? '-2px' : 0 }}>
                        <p className="font-medium text-sm" style={{ color: '#111827' }}>{item.title}</p>
                        <p className="text-xs" style={{ color: '#6b7280' }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Practices Tab */}
        {activeTab === "practices" && (
          <div className="space-y-3">
            <p className="text-sm mb-2" style={{ color: '#6b7280' }}>
              You are enrolled in {enrolledPractices.length} carbon-positive practices
            </p>

            {enrolledPractices.map((practice) => {
              const Icon = practiceIcons[practice.name] || Leaf
              return (
                <Card key={practice.id} style={{ backgroundColor: '#ffffff' }}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0fdf4' }}>
                        <Icon className="w-6 h-6" style={{ color: '#16a34a' }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold" style={{ color: '#111827' }}>{practice.name}</h3>
                          <Badge variant="success">Active</Badge>
                        </div>
                        <p className="text-sm mb-2" style={{ color: '#6b7280' }}>{practice.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2 rounded" style={{ backgroundColor: '#f5f5f5' }}>
                            <p style={{ color: '#9ca3af' }}>Est. Credits/Acre/Year</p>
                            <p className="font-semibold" style={{ color: '#16a34a' }}>{practice.estimatedCredits} tCO2e</p>
                          </div>
                          <div className="p-2 rounded" style={{ backgroundColor: '#f5f5f5' }}>
                            <p style={{ color: '#9ca3af' }}>Area Enrolled</p>
                            <p className="font-semibold" style={{ color: '#111827' }}>{practice.areaEnrolled} acres</p>
                          </div>
                        </div>
                        <p className="text-xs mt-2" style={{ color: '#9ca3af' }}>
                          Enrolled since {formatDate(practice.startDate)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* Add Practice Button */}
            <Button variant="outline" className="w-full mt-2">
              <Sprout className="w-4 h-4 mr-2" />
              Explore More Practices
            </Button>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === "timeline" && (
          <div className="space-y-1">
            {timeline.map((event, index) => (
              <div key={event.id} className="flex gap-3">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      event.status === "completed" && "bg-green-100",
                      event.status === "pending" && "bg-yellow-100",
                      event.status === "upcoming" && "bg-gray-100"
                    )}
                    style={{
                      backgroundColor: event.status === "completed" ? '#dcfce7' : event.status === "pending" ? '#fef9c3' : '#f3f4f6'
                    }}
                  >
                    {event.status === "completed" ? (
                      <CheckCircle className="w-4 h-4" style={{ color: '#16a34a' }} />
                    ) : event.status === "pending" ? (
                      <Clock className="w-4 h-4" style={{ color: '#ca8a04' }} />
                    ) : (
                      <Calendar className="w-4 h-4" style={{ color: '#6b7280' }} />
                    )}
                  </div>
                  {index < timeline.length - 1 && (
                    <div
                      className="w-0.5 flex-1 my-1"
                      style={{ backgroundColor: event.status === "completed" ? '#16a34a' : '#d1d5db' }}
                    />
                  )}
                </div>

                {/* Event Content */}
                <Card className="flex-1 mb-3" style={{ backgroundColor: '#ffffff' }}>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-sm" style={{ color: '#111827' }}>{event.event}</h4>
                      <span className="text-xs" style={{ color: '#9ca3af' }}>{formatDate(event.date)}</span>
                    </div>
                    <p className="text-xs mb-2" style={{ color: '#6b7280' }}>{event.description}</p>
                    {(event.credits || event.amount) && (
                      <div className="flex gap-3 text-xs">
                        {event.credits && (
                          <span className="px-2 py-1 rounded" style={{ backgroundColor: '#f0fdf4', color: '#166534' }}>
                            {event.credits} credits
                          </span>
                        )}
                        {event.amount && (
                          <span className="px-2 py-1 rounded" style={{ backgroundColor: '#fef9c3', color: '#854d0e' }}>
                            {formatCurrency(event.amount)}
                          </span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="px-4 pb-6">
        <Card style={{ background: 'linear-gradient(to right, #16a34a, #15803d)', border: 'none' }}>
          <CardContent className="p-4 text-center">
            <Award className="w-10 h-10 text-white mx-auto mb-2" />
            <h3 className="font-bold text-white mb-1">Maximize Your Earnings</h3>
            <p className="text-sm mb-3" style={{ color: '#dcfce7' }}>
              Add more sustainable practices to increase your carbon credit potential
            </p>
            <Button
              variant="secondary"
              className="w-full"
              style={{ backgroundColor: '#ffffff', color: '#16a34a' }}
            >
              Learn About New Practices
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
