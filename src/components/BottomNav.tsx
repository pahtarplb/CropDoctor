import { useNavigate } from "react-router-dom"
import { Home, ClipboardList, HelpCircle, Store } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  active: "home" | "scans" | "marketplace" | "help"
}

export default function BottomNav({ active }: BottomNavProps) {
  const navigate = useNavigate()

  const items = [
    { id: "home", label: "Home", icon: Home, path: "/home" },
    { id: "scans", label: "My Scans", icon: ClipboardList, path: "/my-scans" },
    { id: "marketplace", label: "Market", icon: Store, path: "/marketplace" },
    { id: "help", label: "Help", icon: HelpCircle, path: "/help" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-[430px] mx-auto">
        <nav className="bg-white border-t shadow-lg" style={{ backgroundColor: '#ffffff' }}>
          <div className="flex items-center justify-around py-2">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = active === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2 px-6 rounded-lg transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className={cn("w-6 h-6", isActive && "fill-primary/20")} />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
