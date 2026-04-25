import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Camera, Image, X, Leaf, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LeafScan() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const handleCapture = () => {
    // In a real app, this would open the camera
    // For demo, we'll use file input
    fileInputRef.current?.click()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = () => {
    setAnalyzing(true)
    // Simulate analysis delay
    setTimeout(() => {
      navigate("/leaf-result/LD001", { state: { image: capturedImage } })
    }, 2500)
  }

  const handleRetake = () => {
    setCapturedImage(null)
  }

  if (analyzing) {
    return (
      <div className="mobile-container min-h-screen bg-gradient-to-b from-primary to-green-700 flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Leaf className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Analyzing Leaf...</h2>
        <p className="text-green-100 text-sm text-center mb-8">
          Our AI is examining the leaf for signs of disease
        </p>
        <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full animate-[progress_2s_ease-in-out]"
               style={{ animation: "progress 2.5s ease-in-out forwards" }}></div>
        </div>
        <style>{`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="mobile-container min-h-screen bg-black flex flex-col">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelect}
      />

      {capturedImage ? (
        // Preview Mode
        <>
          <div className="absolute top-0 left-0 right-0 z-10 pt-12 px-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleRetake}
                className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <span className="text-white font-medium">Preview</span>
              <div className="w-10"></div>
            </div>
          </div>

          {/* Image Preview */}
          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={capturedImage}
              alt="Captured leaf"
              className="max-w-full max-h-[60vh] rounded-2xl object-contain"
            />
          </div>

          {/* Actions */}
          <div className="p-4 space-y-3">
            <Button
              onClick={handleAnalyze}
              size="lg"
              className="w-full bg-green-500 hover:bg-green-600"
            >
              <Zap className="w-5 h-5 mr-2" />
              Analyze Leaf
            </Button>
            <Button
              onClick={handleRetake}
              variant="outline"
              size="lg"
              className="w-full border-white text-white hover:bg-white/10"
            >
              Retake Photo
            </Button>
          </div>
        </>
      ) : (
        // Camera Mode
        <>
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 pt-12 px-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-white">Scan Leaf</h1>
                <p className="text-white/70 text-sm">Take a photo of the affected leaf</p>
              </div>
            </div>
          </div>

          {/* Camera Viewfinder Placeholder */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-900 to-black">
            {/* Viewfinder Frame */}
            <div className="relative w-64 h-64 mb-8">
              <div className="absolute inset-0 border-2 border-white/30 rounded-2xl"></div>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-2xl"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="w-16 h-16 text-white/20" />
              </div>
            </div>

            {/* Tips */}
            <div className="text-center space-y-2 mb-8">
              <p className="text-white/80 text-sm">Position the affected leaf in the frame</p>
              <p className="text-white/50 text-xs">Ensure good lighting for best results</p>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="p-6 bg-black">
            <div className="flex items-center justify-center gap-8">
              {/* Gallery Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"
              >
                <Image className="w-6 h-6 text-white" />
              </button>

              {/* Capture Button */}
              <button
                onClick={handleCapture}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-green-400"
              >
                <Camera className="w-8 h-8 text-gray-800" />
              </button>

              {/* Placeholder for symmetry */}
              <div className="w-12 h-12"></div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
