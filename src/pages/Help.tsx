import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  ChevronDown,
  Plane,
  Camera,
  FileText,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { helpFaqs } from "@/data/dummy"
import { cn } from "@/lib/utils"
import BottomNav from "@/components/BottomNav"

export default function Help() {
  const navigate = useNavigate()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const guides = [
    {
      icon: Plane,
      title: "How to Book Drone Scan",
      steps: [
        "Tap 'Book Drone Scan' on home screen",
        "Select your farm from the list",
        "Choose the type of scan you need",
        "Pick a date and time slot",
        "Confirm your booking",
      ],
    },
    {
      icon: Camera,
      title: "How to Scan Leaf Problems",
      steps: [
        "Tap 'Scan Leaf' on home screen",
        "Point camera at the affected leaf",
        "Ensure good lighting and focus",
        "Capture the photo",
        "Wait for AI analysis results",
      ],
    },
    {
      icon: FileText,
      title: "Understanding Scan Results",
      steps: [
        "Health Score: 0-100 overall rating",
        "Green zones are healthy areas",
        "Yellow zones need attention",
        "Red zones require immediate action",
        "Follow recommendations for treatment",
      ],
    },
  ]

  return (
    <div className="mobile-container min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-primary pt-12 pb-6 px-4">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">Help & Support</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-6">
        {/* Quick Guides */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            How to Use
          </h2>
          <div className="space-y-3">
            {guides.map((guide, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <guide.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground pt-2">
                      {guide.title}
                    </h3>
                  </div>
                  <ol className="space-y-2 pl-13">
                    {guide.steps.map((step, stepIndex) => (
                      <li
                        key={stepIndex}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium text-primary">
                          {stepIndex + 1}
                        </span>
                        <span className="text-muted-foreground pt-0.5">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Frequently Asked Questions
          </h2>
          <Card>
            <CardContent className="p-0 divide-y">
              {helpFaqs.map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full p-4 flex items-center justify-between text-left"
                  >
                    <span className="font-medium text-foreground pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform",
                        expandedFaq === index && "rotate-180"
                      )}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Contact Support
          </h2>
          <Card>
            <CardContent className="p-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Can't find what you're looking for? Our support team is here to
                help.
              </p>

              <div className="space-y-3">
                <a
                  href="tel:+911800123456"
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Helpline</p>
                    <p className="text-sm text-muted-foreground">
                      1800-123-456 (Toll Free)
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:support@cropdoctor.in"
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">
                      support@cropdoctor.in
                    </p>
                  </div>
                </a>
              </div>

              <Button variant="outline" className="w-full mt-2">
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Chat Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav active="help" />
    </div>
  )
}
