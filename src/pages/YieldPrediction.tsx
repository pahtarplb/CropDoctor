import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  TrendingUp,
  Droplets,
  Sun,
  Cloud,
  Leaf,
  BarChart3,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { farms, yieldPredictions } from "@/data/dummy"
import BottomNav from "@/components/BottomNav"

export default function YieldPrediction() {
  const navigate = useNavigate()
  const [selectedFarm, setSelectedFarm] = useState(farms[0])
  const prediction = yieldPredictions[selectedFarm.id]

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100"
    if (score >= 60) return "bg-yellow-100"
    return "bg-red-100"
  }

  return (
    <div className="mobile-container min-h-screen pb-20" style={{ backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <div
        className="pt-12 pb-6 px-4 rounded-b-3xl"
        style={{ background: "linear-gradient(to bottom right, #7c3aed, #6d28d9)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-white">Yield Prediction</h1>
            <p className="text-sm text-purple-200">AI-powered harvest forecast</p>
          </div>
        </div>

        {/* Farm Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {farms.map((farm) => (
            <button
              key={farm.id}
              onClick={() => setSelectedFarm(farm)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedFarm.id === farm.id
                  ? "bg-white text-purple-700 font-medium"
                  : "bg-white/20 text-white"
              }`}
            >
              {farm.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-4 space-y-4">
        {/* Prediction Summary */}
        <Card className="border-2 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Yield</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-purple-700">
                    {prediction.estimatedYield}
                  </span>
                  <span className="text-muted-foreground">quintals/acre</span>
                </div>
              </div>
              <div
                className={`w-16 h-16 rounded-full ${getScoreBg(prediction.confidence)} flex items-center justify-center`}
              >
                <span className={`text-xl font-bold ${getScoreColor(prediction.confidence)}`}>
                  {prediction.confidence}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Crop</p>
                <p className="font-semibold">{selectedFarm.crop}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Expected Harvest</p>
                <p className="font-semibold">{prediction.harvestDate}</p>
              </div>
            </div>

            <div className="mt-3 p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Market Outlook</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Expected price: <span className="font-semibold text-foreground">₹{prediction.expectedPrice}/quintal</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Potential earnings: <span className="font-semibold text-green-600">₹{(prediction.estimatedYield * selectedFarm.area * prediction.expectedPrice).toLocaleString()}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Factors Affecting Yield */}
        <div>
          <h2 className="font-semibold text-foreground mb-3">Yield Factors</h2>
          <div className="space-y-2">
            {prediction.factors.map((factor, index) => (
              <Card key={index}>
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        factor.impact === "positive"
                          ? "bg-green-100"
                          : factor.impact === "negative"
                          ? "bg-red-100"
                          : "bg-yellow-100"
                      }`}
                    >
                      {factor.icon === "sun" && (
                        <Sun
                          className={`w-5 h-5 ${
                            factor.impact === "positive" ? "text-green-600" : "text-yellow-600"
                          }`}
                        />
                      )}
                      {factor.icon === "droplets" && (
                        <Droplets
                          className={`w-5 h-5 ${
                            factor.impact === "positive" ? "text-green-600" : "text-blue-600"
                          }`}
                        />
                      )}
                      {factor.icon === "leaf" && (
                        <Leaf
                          className={`w-5 h-5 ${
                            factor.impact === "positive" ? "text-green-600" : "text-red-600"
                          }`}
                        />
                      )}
                      {factor.icon === "cloud" && (
                        <Cloud className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{factor.name}</p>
                      <p className="text-sm text-muted-foreground">{factor.description}</p>
                    </div>
                    <Badge
                      variant={
                        factor.impact === "positive"
                          ? "success"
                          : factor.impact === "negative"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {factor.impact === "positive" ? "+ve" : factor.impact === "negative" ? "-ve" : "neutral"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="font-semibold text-foreground mb-3">Recommendations</h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              {prediction.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-purple-700">{index + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Historical Comparison */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Historical Comparison</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last Season</span>
                <span className="font-medium">{prediction.historical.lastSeason} q/acre</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">3-Year Average</span>
                <span className="font-medium">{prediction.historical.average3Year} q/acre</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">District Average</span>
                <span className="font-medium">{prediction.historical.districtAvg} q/acre</span>
              </div>
              <div className="pt-2 border-t mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Your Prediction vs District</span>
                  <Badge variant="success">
                    +{((prediction.estimatedYield / prediction.historical.districtAvg - 1) * 100).toFixed(0)}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav active="home" />
    </div>
  )
}
