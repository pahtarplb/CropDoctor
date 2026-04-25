import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/language")
    }, 2000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="mobile-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary to-green-700">
      <div className="flex flex-col items-center">
        <div
          className="w-48 h-48 rounded-3xl flex items-center justify-center mb-6 shadow-xl p-4"
          style={{ backgroundColor: '#ffffff' }}
        >
          <img
            src="/cropDoctorLogo.png"
            alt="CropDoctor Logo"
            className="w-full h-full object-contain"
            style={{ backgroundColor: '#ffffff' }}
          />
        </div>
        <p className="text-green-100 text-sm">Smart Farming, Healthy Crops</p>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}
