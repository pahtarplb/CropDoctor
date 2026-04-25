import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  Shield,
  Beaker,
  Repeat,
  Syringe,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { scanResults } from "@/data/dummy"
import { cn } from "@/lib/utils"

export default function IssueDetail() {
  const { scanId, issueId } = useParams()
  const navigate = useNavigate()

  const scan = scanResults[scanId as keyof typeof scanResults]
  const issue = scan?.issues.find((i) => i.id === issueId)

  if (!issue) {
    return (
      <div className="mobile-container min-h-screen flex items-center justify-center">
        <p>Issue not found</p>
      </div>
    )
  }

  return (
    <div className="mobile-container min-h-screen bg-muted">
      {/* Header */}
      <div
        className={cn(
          "pt-12 pb-6 px-4",
          issue.severity === "high"
            ? "bg-gradient-to-br from-red-500 to-red-600"
            : issue.severity === "medium"
            ? "bg-gradient-to-br from-yellow-500 to-yellow-600"
            : "bg-gradient-to-br from-green-500 to-green-600"
        )}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-white">{issue.name}</h1>
            <p className="text-white/80 text-sm">
              {issue.affectedArea}% area affected
            </p>
          </div>
          <Badge
            variant={
              issue.severity === "high"
                ? "danger"
                : issue.severity === "medium"
                ? "warning"
                : "success"
            }
            className="bg-white/20 text-white border-0"
          >
            {issue.severity} severity
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {/* Issue Image */}
        {(issue as any).image && (
          <Card className="overflow-hidden">
            <img
              src={(issue as any).image}
              alt={issue.name}
              className="w-full h-48 object-cover"
            />
          </Card>
        )}

        {/* Description */}
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              About This Issue
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {issue.description}
            </p>
          </CardContent>
        </Card>

        {/* Impact */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <h2 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              If Left Untreated
            </h2>
            <p className="text-sm text-yellow-700">{issue.impact}</p>
          </CardContent>
        </Card>

        {/* Recovery Time */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <h2 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Expected Recovery
            </h2>
            <p className="text-sm text-green-700">{issue.recoveryTime}</p>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Recommended Actions
          </h2>

          <div className="space-y-3">
            {issue.recommendations.map((rec, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground pt-1">
                      {rec.action}
                    </h3>
                  </div>

                  <div className="space-y-3 pl-11">
                    {rec.dosage !== "N/A" && (
                      <div className="flex items-start gap-2">
                        <Beaker className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Dosage</p>
                          <p className="text-sm font-medium">{rec.dosage}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2">
                      <Syringe className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Method</p>
                        <p className="text-sm font-medium">{rec.method}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Repeat className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Frequency</p>
                        <p className="text-sm font-medium">{rec.frequency}</p>
                      </div>
                    </div>

                    {rec.safety !== "N/A" && (
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Safety Precaution
                          </p>
                          <p className="text-sm font-medium text-yellow-700">
                            {rec.safety}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
