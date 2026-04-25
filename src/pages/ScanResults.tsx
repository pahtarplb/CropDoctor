import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Leaf,
  Bug,
  Droplets,
  FlaskConical,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { scanResults } from "@/data/dummy"
import { cn } from "@/lib/utils"

const summaryIcons: Record<string, React.ElementType> = {
  cropHealth: Leaf,
  pestRisk: Bug,
  waterStress: Droplets,
  nutrientStatus: FlaskConical,
}

const summaryLabels: Record<string, string> = {
  cropHealth: "Crop Health",
  pestRisk: "Pest Risk",
  waterStress: "Water Stress",
  nutrientStatus: "Nutrient Status",
}

export default function ScanResults() {
  const { id } = useParams()
  const navigate = useNavigate()

  const result = scanResults[id as keyof typeof scanResults]

  if (!result) {
    return (
      <div className="mobile-container min-h-screen flex items-center justify-center">
        <p>Scan results not found</p>
      </div>
    )
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-600"
    if (score >= 60) return "from-yellow-500 to-yellow-600"
    return "from-red-500 to-red-600"
  }

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
            <h1 className="text-lg font-semibold text-white">Scan Results</h1>
            <p className="text-green-100 text-sm">
              {result.farmName} | {result.date}
            </p>
          </div>
        </div>
      </div>

      {/* Score Card */}
      <div className="px-4 -mt-4">
        <Card className="shadow-lg overflow-hidden">
          <div
            className={cn(
              "bg-gradient-to-r p-6 text-center text-white",
              getScoreBg(result.overallScore)
            )}
          >
            <p className="text-sm opacity-90 mb-1">Overall Health Score</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-5xl font-bold">{result.overallScore}</span>
              <span className="text-2xl opacity-80">/100</span>
            </div>
            <p className="text-sm opacity-90 mt-2">
              {result.overallScore >= 80
                ? "Your crop is healthy"
                : result.overallScore >= 60
                ? "Needs some attention"
                : "Immediate action required"}
            </p>
          </div>

          {/* Farm Map Placeholder */}
          <div className="p-4 border-b">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Field Health Map
            </p>
            <div className="h-40 bg-gradient-to-br from-green-200 via-yellow-200 to-red-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-4 left-4 w-20 h-20 bg-green-500 rounded-full blur-xl"></div>
                <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-500 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-red-500 rounded-full blur-xl"></div>
              </div>
              <p className="text-sm font-medium text-gray-700 z-10">
                {result.crop} - {result.farmName}
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Healthy</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Moderate</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Critical</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Summary
            </p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(result.summary).map(([key, value]) => {
                const Icon = summaryIcons[key] || Leaf
                const isGood =
                  value.includes("Good") ||
                  value.includes("Low") ||
                  value.includes("Adequate") ||
                  value.includes("Balanced")
                return (
                  <div
                    key={key}
                    className="p-3 bg-muted rounded-lg flex items-start gap-2"
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 mt-0.5",
                        isGood ? "text-green-500" : "text-yellow-500"
                      )}
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {summaryLabels[key]}
                      </p>
                      <p
                        className={cn(
                          "text-sm font-medium",
                          isGood ? "text-green-700" : "text-yellow-700"
                        )}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issues Detected */}
      <div className="px-4 py-4">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Issues Detected ({result.issues.length})
        </h2>

        <div className="space-y-3">
          {result.issues.map((issue) => (
            <Card
              key={issue.id}
              className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
              onClick={() =>
                navigate(`/issue-detail/${result.id}/${issue.id}`)
              }
            >
              {/* Issue Image */}
              {(issue as any).image && (
                <div className="h-32 overflow-hidden">
                  <img
                    src={(issue as any).image}
                    alt={issue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        issue.severity === "high"
                          ? "bg-red-100"
                          : issue.severity === "medium"
                          ? "bg-yellow-100"
                          : "bg-green-100"
                      )}
                    >
                      {issue.severity === "high" ? (
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      ) : issue.severity === "low" ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {issue.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {issue.affectedArea}% area affected
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      issue.severity === "high"
                        ? "danger"
                        : issue.severity === "medium"
                        ? "warning"
                        : "success"
                    }
                  >
                    {issue.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {issue.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-medium">
                    View Recommendations
                  </span>
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
