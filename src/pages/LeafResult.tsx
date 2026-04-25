import { useParams, useNavigate, useLocation } from "react-router-dom"
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Bookmark,
  Share2,
  Beaker,
  Syringe,
  Repeat,
  Shield,
  Plane,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { leafDiseases } from "@/data/dummy"
import { cn } from "@/lib/utils"

export default function LeafResult() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const capturedImage = location.state?.image

  const disease = leafDiseases.find((d) => d.id === id) || leafDiseases[0]

  const severityColor = {
    low: "bg-green-500",
    moderate: "bg-yellow-500",
    high: "bg-red-500",
  }

  return (
    <div className="mobile-container min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-primary pt-12 pb-4 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/home")}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-lg font-semibold text-white">Analysis Result</h1>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {/* Image & Detection */}
        <Card>
          <CardContent className="p-4">
            {/* Captured Image */}
            <div className="relative mb-4">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-xl overflow-hidden flex items-center justify-center">
                {capturedImage ? (
                  <img
                    src={capturedImage}
                    alt="Analyzed leaf"
                    className="w-full h-full object-cover"
                  />
                ) : (disease as any).image ? (
                  <img
                    src={(disease as any).image}
                    alt={disease.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-green-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <AlertTriangle className="w-8 h-8 text-green-700" />
                    </div>
                    <p className="text-sm text-green-700">Sample leaf image</p>
                  </div>
                )}
              </div>
              {/* Detection overlay indicator */}
              <div className="absolute top-2 right-2">
                <Badge
                  className={cn(
                    "text-white border-0",
                    severityColor[disease.severity as keyof typeof severityColor]
                  )}
                >
                  {disease.severity} severity
                </Badge>
              </div>
            </div>

            {/* Detection Result */}
            <div className="text-center pb-4 border-b">
              <h2 className="text-xl font-bold text-foreground mb-1">
                {disease.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-2">
                Detected in {disease.crop}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {disease.confidence}% Confidence
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="pt-4">
              <h3 className="font-semibold text-foreground mb-2">
                About This Disease
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {disease.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Symptoms */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              Symptoms
            </h3>
            <ul className="space-y-2">
              {disease.symptoms.map((symptom, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">{symptom}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* How it Spreads */}
        <Card className="border-red-100 bg-red-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-red-800 mb-2">How It Spreads</h3>
            <p className="text-sm text-red-700">{disease.spread}</p>
          </CardContent>
        </Card>

        {/* Treatment */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Recommended Treatment
          </h2>

          <div className="space-y-3">
            {disease.treatments.map((treatment, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground pt-1">
                      {treatment.action}
                    </h3>
                  </div>

                  <div className="space-y-3 pl-11">
                    {treatment.dosage !== "N/A" && (
                      <div className="flex items-start gap-2">
                        <Beaker className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Dosage</p>
                          <p className="text-sm font-medium">{treatment.dosage}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2">
                      <Syringe className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Method</p>
                        <p className="text-sm font-medium">{treatment.method}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Repeat className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Frequency</p>
                        <p className="text-sm font-medium">{treatment.frequency}</p>
                      </div>
                    </div>

                    {treatment.safety !== "N/A" && (
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Safety</p>
                          <p className="text-sm font-medium text-yellow-700">
                            {treatment.safety}
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

        {/* Prevention */}
        <Card className="border-green-100 bg-green-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Prevention Tips
            </h3>
            <ul className="space-y-2">
              {disease.prevention.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-green-700">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Drone Scan Suggestion - shown for high severity */}
        {disease.severity === "high" && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    Get a Complete Assessment
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Book a drone scan to check the full extent of this issue across
                    your field.
                  </p>
                  <Button
                    onClick={() => navigate("/book-scan")}
                    size="sm"
                    className="w-full"
                  >
                    Book Drone Scan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Fixed Bottom CTA */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-background border-t shadow-lg">
        <Button
          onClick={() => navigate("/book-scan")}
          size="lg"
          className="w-full"
        >
          <Plane className="w-5 h-5 mr-2" />
          Take Action - Book Drone Scan
        </Button>
      </div>
    </div>
  )
}
