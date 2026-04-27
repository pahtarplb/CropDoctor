// Dummy data for CropDoctor prototype

// Helper function to get dynamic dates
const getDate = (daysOffset: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + daysOffset)
  return date.toISOString().split("T")[0]
}

const getTimestamp = (daysOffset: number, hours: number = 10, minutes: number = 0): string => {
  const date = new Date()
  date.setDate(date.getDate() + daysOffset)
  date.setHours(hours, minutes, 0, 0)
  return date.toISOString()
}

export const farmer = {
  id: "F001",
  name: "Ramesh Kumar",
  phone: "9876543210",
  village: "Kondapur",
  district: "Medak",
  state: "Telangana",
  totalArea: 5.5,
  language: "en",
}

export const farms = [
  {
    id: "FARM001",
    name: "North Field",
    area: 2.5,
    crop: "Rice",
    sowingDate: getDate(-45), // 45 days ago
    irrigationType: "Borewell",
    healthStatus: "healthy",
    lastScanDate: getDate(-5), // 5 days ago
  },
  {
    id: "FARM002",
    name: "South Field",
    area: 3.0,
    crop: "Cotton",
    sowingDate: getDate(-60), // 60 days ago
    irrigationType: "Rainfed",
    healthStatus: "moderate",
    lastScanDate: getDate(-7), // 7 days ago
  },
]

export const scanTypes = [
  {
    id: "full",
    name: "Full Farm Health Assessment",
    description: "Complete analysis of crop health, stress levels, and growth patterns",
    icon: "scan",
  },
  {
    id: "pest",
    name: "Pest & Disease Detection",
    description: "AI-powered detection of pests, diseases, and infections",
    icon: "bug",
  },
  {
    id: "water",
    name: "Water Stress Analysis",
    description: "Evaluate irrigation needs and water stress levels",
    icon: "droplet",
  },
  {
    id: "nutrient",
    name: "Nutrient Deficiency Check",
    description: "Identify nitrogen, phosphorus, and potassium deficiencies",
    icon: "leaf",
  },
]

export const droneBookings = [
  {
    id: "DRN-2024-0042",
    farmId: "FARM001",
    farmName: "North Field",
    scanType: "Full Farm Health Assessment",
    date: getDate(3), // 3 days from now
    timeSlot: "Morning",
    status: "confirmed",
    vendorName: "AgriDrone Services",
    pilotName: "Suresh Reddy",
    pilotPhone: "9988776655",
  },
  {
    id: "DRN-2024-0038",
    farmId: "FARM002",
    farmName: "South Field",
    scanType: "Pest & Disease Detection",
    date: getDate(-3), // 3 days ago
    timeSlot: "Afternoon",
    status: "completed",
    vendorName: "SkyFarm Drones",
    pilotName: "Venkat Rao",
    pilotPhone: "9123456789",
  },
  {
    id: "DRN-2024-0035",
    farmId: "FARM001",
    farmName: "North Field",
    scanType: "Water Stress Analysis",
    date: getDate(-10), // 10 days ago
    timeSlot: "Morning",
    status: "completed",
    vendorName: "AgriDrone Services",
    pilotName: "Suresh Reddy",
    pilotPhone: "9988776655",
  },
]

export const scanResults = {
  "DRN-2024-0038": {
    id: "DRN-2024-0038",
    overallScore: 68,
    date: getDate(-3),
    farmName: "South Field",
    crop: "Cotton",
    summary: {
      cropHealth: "Moderate Stress",
      pestRisk: "High",
      waterStress: "Mild Deficit",
      nutrientStatus: "Deficiency Detected",
    },
    issues: [
      {
        id: "ISS001",
        name: "Pink Bollworm Infestation",
        severity: "high",
        affectedArea: 22,
        description: "Pink bollworm larvae detected in cotton bolls. This pest can cause significant yield loss if untreated.",
        impact: "Can reduce yield by 20-30% if left untreated for 2 weeks",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        recommendations: [
          {
            action: "Apply Spinosad 45% SC",
            dosage: "0.5 ml per liter of water",
            method: "Foliar spray in evening hours",
            frequency: "Repeat after 7 days",
            safety: "Wear protective gloves and mask during application",
          },
          {
            action: "Install pheromone traps",
            dosage: "5 traps per acre",
            method: "Place at canopy height",
            frequency: "Replace lures every 3 weeks",
            safety: "Handle lures with clean hands",
          },
        ],
        recoveryTime: "2-3 weeks with proper treatment",
      },
      {
        id: "ISS002",
        name: "Nitrogen Deficiency",
        severity: "medium",
        affectedArea: 35,
        description: "Lower leaves showing yellowing pattern typical of nitrogen deficiency.",
        impact: "Reduced plant growth and boll development",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
        recommendations: [
          {
            action: "Apply Urea fertilizer",
            dosage: "25 kg per acre",
            method: "Broadcast and irrigate immediately",
            frequency: "Single application",
            safety: "Avoid application before heavy rain",
          },
        ],
        recoveryTime: "10-14 days",
      },
    ],
  },
  "DRN-2024-0035": {
    id: "DRN-2024-0035",
    overallScore: 82,
    date: getDate(-10),
    farmName: "North Field",
    crop: "Rice",
    summary: {
      cropHealth: "Good",
      pestRisk: "Low",
      waterStress: "Adequate",
      nutrientStatus: "Balanced",
    },
    issues: [
      {
        id: "ISS003",
        name: "Minor Leaf Folder Presence",
        severity: "low",
        affectedArea: 8,
        description: "Early signs of leaf folder activity detected in field margins.",
        impact: "Minimal impact if addressed early",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
        recommendations: [
          {
            action: "Monitor and scout regularly",
            dosage: "N/A",
            method: "Check field twice weekly",
            frequency: "Ongoing",
            safety: "N/A",
          },
        ],
        recoveryTime: "No treatment needed currently",
      },
    ],
  },
}

export const leafDiseases = [
  {
    id: "LD001",
    name: "Bacterial Leaf Blight",
    crop: "Rice",
    confidence: 92,
    severity: "moderate",
    image: "https://images.unsplash.com/photo-1589923188651-268a9765e432?w=400&h=300&fit=crop",
    description: "Bacterial leaf blight is caused by Xanthomonas oryzae. It appears as water-soaked lesions that turn yellow to white as they age.",
    symptoms: [
      "Yellow to white lesions along leaf margins",
      "Lesions may ooze bacterial droplets in humid conditions",
      "Leaves dry out and turn grayish",
    ],
    spread: "Spreads through wind, rain splash, and contaminated tools",
    treatments: [
      {
        action: "Apply Copper Hydroxide 77% WP",
        dosage: "2.5 grams per liter of water",
        method: "Foliar spray covering all leaves",
        frequency: "Every 7 days for 3 applications",
        safety: "Avoid contact with skin and eyes",
      },
      {
        action: "Drain excess water from field",
        dosage: "N/A",
        method: "Maintain 2-3 cm water level only",
        frequency: "Continuous management",
        safety: "N/A",
      },
    ],
    prevention: [
      "Use disease-resistant varieties",
      "Avoid excess nitrogen fertilization",
      "Ensure proper field drainage",
      "Clean tools between fields",
    ],
  },
  {
    id: "LD002",
    name: "Anthracnose",
    crop: "Cotton",
    confidence: 87,
    severity: "high",
    image: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=400&h=300&fit=crop",
    description: "Anthracnose is a fungal disease causing dark, sunken lesions on leaves, stems, and bolls.",
    symptoms: [
      "Dark brown to black spots on leaves",
      "Sunken lesions with pinkish spore masses",
      "Premature leaf drop",
    ],
    spread: "Spreads through rain splash and infected seed",
    treatments: [
      {
        action: "Apply Mancozeb 75% WP",
        dosage: "2.5 grams per liter of water",
        method: "Foliar spray at first sign of disease",
        frequency: "Every 10-14 days",
        safety: "Use protective equipment during mixing",
      },
    ],
    prevention: [
      "Use certified disease-free seeds",
      "Rotate crops annually",
      "Remove and destroy infected plant debris",
    ],
  },
  {
    id: "LD003",
    name: "Early Blight",
    crop: "Tomato",
    confidence: 94,
    severity: "moderate",
    image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400&h=300&fit=crop",
    description: "Early blight is caused by Alternaria solani, showing characteristic concentric ring patterns on leaves.",
    symptoms: [
      "Dark brown spots with concentric rings (target pattern)",
      "Yellow halo around spots",
      "Lower leaves affected first",
    ],
    spread: "Spreads through wind, rain, and contaminated soil",
    treatments: [
      {
        action: "Apply Chlorothalonil 75% WP",
        dosage: "2 grams per liter of water",
        method: "Spray on both leaf surfaces",
        frequency: "Every 7-10 days",
        safety: "Avoid inhalation of spray mist",
      },
    ],
    prevention: [
      "Mulch around plants to prevent soil splash",
      "Water at base, avoid wetting leaves",
      "Stake plants for better air circulation",
    ],
  },
]

export const weatherData = {
  current: {
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 72,
    windSpeed: 12,
  },
  forecast: [
    { day: "Today", high: 32, low: 24, condition: "Partly Cloudy", rain: 20 },
    { day: "Tomorrow", high: 31, low: 23, condition: "Sunny", rain: 10 },
    { day: "Wed", high: 30, low: 24, condition: "Rainy", rain: 80 },
    { day: "Thu", high: 29, low: 23, condition: "Rainy", rain: 70 },
    { day: "Fri", high: 31, low: 24, condition: "Cloudy", rain: 30 },
  ],
}

export const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
]

// Notifications data
export const notifications = [
  {
    id: "NOT001",
    type: "weather_alert",
    priority: "high",
    title: "Heavy Rain Warning",
    message: "Heavy rainfall (80-100mm) predicted for your district in next 48 hours. Secure loose items and ensure proper field drainage.",
    timestamp: getTimestamp(0, 8, 30), // Today
    read: false,
    icon: "cloud-lightning",
  },
  {
    id: "NOT002",
    type: "weather_alert",
    priority: "medium",
    title: "Rain Advisory",
    message: "IMD predicts moderate rainfall for the next 3 days in your region. Consider postponing pesticide application. Ensure proper field drainage.",
    timestamp: getTimestamp(-1, 14, 0), // Yesterday
    read: false,
    icon: "cloud-rain",
  },
  {
    id: "NOT003",
    type: "pest_alert",
    priority: "high",
    title: "Pink Bollworm Outbreak Alert",
    message: "High pest activity reported in neighboring villages. Monitor your cotton fields closely. Early detection is crucial.",
    timestamp: getTimestamp(-2, 10, 15), // 2 days ago
    read: true,
    icon: "bug",
  },
  {
    id: "NOT004",
    type: "scan_update",
    priority: "low",
    title: "Drone Scan Completed",
    message: "Your drone scan for South Field has been completed. View the detailed report in My Scans.",
    timestamp: getTimestamp(-3, 16, 45), // 3 days ago
    read: true,
    icon: "check-circle",
  },
  {
    id: "NOT005",
    type: "weather_alert",
    priority: "medium",
    title: "Heat Wave Warning",
    message: "Temperatures expected to exceed 42°C this week. Increase irrigation frequency and consider shade nets for sensitive crops.",
    timestamp: getTimestamp(-4, 9, 0), // 4 days ago
    read: true,
    icon: "thermometer",
  },
  {
    id: "NOT006",
    type: "advisory",
    priority: "low",
    title: "Fertilizer Application Reminder",
    message: "Based on your crop stage, it's time for the second dose of nitrogen fertilizer. Check advisory for dosage details.",
    timestamp: getTimestamp(-5, 7, 30), // 5 days ago
    read: true,
    icon: "leaf",
  },
  {
    id: "NOT007",
    type: "carbon_credits",
    priority: "medium",
    title: "Carbon Credits Verified",
    message: "Your recent carbon credits have been verified. 2.4 credits will be issued within 7 days.",
    timestamp: getTimestamp(-8, 11, 0), // 8 days ago
    read: true,
    icon: "award",
  },
]

// Carbon Credits data
export const carbonCredits = {
  summary: {
    totalCreditsEarned: 8.6,
    pendingCredits: 2.4,
    totalEarnings: 12850, // in INR
    pendingPayment: 3600,
    pricePerCredit: 1500, // INR per tCO2e
    enrollmentDate: getDate(-400), // About 13 months ago
    nextVerificationDate: getDate(60), // 60 days from now
  },
  enrolledPractices: [
    {
      id: "CP001",
      name: "No-Till Farming",
      description: "Reduced tillage to minimize soil disturbance",
      status: "active",
      startDate: getDate(-400), // 13 months ago
      estimatedCredits: 1.2, // per year per acre
      areaEnrolled: 2.5, // acres
    },
    {
      id: "CP002",
      name: "Cover Cropping",
      description: "Growing legumes between main crop seasons",
      status: "active",
      startDate: getDate(-320), // About 10 months ago
      estimatedCredits: 0.8,
      areaEnrolled: 3.0,
    },
    {
      id: "CP003",
      name: "Efficient Water Management",
      description: "Drip irrigation and alternate wetting-drying in rice",
      status: "active",
      startDate: getDate(-200), // About 6 months ago
      estimatedCredits: 0.5,
      areaEnrolled: 2.5,
    },
  ],
  timeline: [
    {
      id: "TL001",
      event: "Credits Issued",
      description: "Q4 carbon credits issued",
      date: getDate(-75), // About 2.5 months ago
      credits: 3.2,
      amount: 4800,
      status: "completed",
    },
    {
      id: "TL002",
      event: "Payment Received",
      description: "Payment for Q4 credits",
      date: getDate(-65), // About 2 months ago
      credits: 3.2,
      amount: 4800,
      status: "completed",
    },
    {
      id: "TL003",
      event: "Verification Complete",
      description: "Q1 practices verified via satellite",
      date: getDate(-15), // 15 days ago
      credits: 2.4,
      amount: null,
      status: "completed",
    },
    {
      id: "TL004",
      event: "Credits Pending Issuance",
      description: "Q1 credits awaiting issuance",
      date: getDate(-5), // 5 days ago
      credits: 2.4,
      amount: 3600,
      status: "pending",
    },
    {
      id: "TL005",
      event: "Expected Payment",
      description: "Estimated payment for Q1 credits",
      date: getDate(10), // 10 days from now
      credits: 2.4,
      amount: 3600,
      status: "upcoming",
    },
    {
      id: "TL006",
      event: "Next Verification",
      description: "Q2 satellite verification scheduled",
      date: getDate(60), // 60 days from now
      credits: null,
      amount: null,
      status: "upcoming",
    },
  ],
  verificationHistory: [
    {
      id: "VH001",
      quarter: "Q1",
      method: "Satellite + Soil Sampling",
      date: getDate(-15),
      result: "Passed",
      creditsVerified: 3.2,
      notes: "All practices confirmed. Soil organic carbon increased by 0.3%",
    },
    {
      id: "VH002",
      quarter: "Q4 (Previous)",
      method: "Satellite Monitoring",
      date: getDate(-105),
      result: "Passed",
      creditsVerified: 3.0,
      notes: "Cover crop establishment confirmed via NDVI analysis",
    },
  ],
}

export const helpFaqs = [
  {
    question: "How do I book a drone scan?",
    answer: "Go to the home screen and tap 'Book Drone Scan'. Select your farm, choose the scan type, pick a date and time slot, then confirm your booking.",
  },
  {
    question: "How long does a drone scan take?",
    answer: "A typical drone scan takes 15-30 minutes depending on farm size. Results are usually available within 24 hours.",
  },
  {
    question: "How do I use the leaf scanner?",
    answer: "Tap 'Scan Leaf Problem' on the home screen. Point your camera at the affected leaf, ensure good lighting, and take a clear photo. Our AI will analyze it instantly.",
  },
  {
    question: "Are the recommendations safe to follow?",
    answer: "Yes, all recommendations follow agricultural best practices. Always read safety instructions and use protective equipment when handling chemicals.",
  },
  {
    question: "Can I cancel a drone booking?",
    answer: "Yes, you can cancel up to 24 hours before the scheduled scan from the My Scans section.",
  },
]

// Leaf scan sample images for realistic display
export const leafScanImages = [
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1589923188651-268a9765e432?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400&h=300&fit=crop",
]

// Marketplace data
export const marketplaceListings = [
  {
    id: "MKT001",
    crop: "Premium Basmati Rice",
    quantity: "50 quintals",
    pricePerQuintal: 2800,
    sellerId: "F002",
    sellerName: "Venkat Reddy",
    sellerPhone: "9876512340",
    sellerLocation: "Warangal, Telangana",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    status: "available",
    postedDate: getDate(-2),
  },
  {
    id: "MKT002",
    crop: "Organic Cotton",
    quantity: "30 quintals",
    pricePerQuintal: 6500,
    sellerId: "F003",
    sellerName: "Lakshmi Devi",
    sellerPhone: "9988776650",
    sellerLocation: "Adilabad, Telangana",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=300&fit=crop",
    status: "available",
    postedDate: getDate(-1),
  },
  {
    id: "MKT003",
    crop: "Sona Masoori Rice",
    quantity: "100 quintals",
    pricePerQuintal: 2200,
    sellerId: "F004",
    sellerName: "Raju Naidu",
    sellerPhone: "9123456700",
    sellerLocation: "Nizamabad, Telangana",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop",
    status: "available",
    postedDate: getDate(-3),
  },
  {
    id: "MKT004",
    crop: "Red Chillies (Dried)",
    quantity: "20 quintals",
    pricePerQuintal: 12000,
    sellerId: "F005",
    sellerName: "Prasad Kumar",
    sellerPhone: "9876543200",
    sellerLocation: "Guntur, Andhra Pradesh",
    image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&h=300&fit=crop",
    status: "available",
    postedDate: getDate(-1),
  },
  {
    id: "MKT005",
    crop: "Turmeric (Fingers)",
    quantity: "15 quintals",
    pricePerQuintal: 8500,
    sellerId: "F001",
    sellerName: "Ramesh Kumar",
    sellerPhone: "9876543210",
    sellerLocation: "Kondapur, Medak",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=300&fit=crop",
    status: "available",
    postedDate: getDate(-4),
  },
]

// Yield Prediction data
export const yieldPredictions: Record<string, {
  estimatedYield: number
  confidence: number
  harvestDate: string
  expectedPrice: number
  factors: Array<{
    name: string
    description: string
    impact: "positive" | "negative" | "neutral"
    icon: string
  }>
  recommendations: string[]
  historical: {
    lastSeason: number
    average3Year: number
    districtAvg: number
  }
}> = {
  FARM001: {
    estimatedYield: 28.5,
    confidence: 85,
    harvestDate: getDate(45).split("-").reverse().join("/"),
    expectedPrice: 2200,
    factors: [
      {
        name: "Soil Health",
        description: "Good organic matter content detected",
        impact: "positive",
        icon: "leaf",
      },
      {
        name: "Water Availability",
        description: "Adequate irrigation from borewell",
        impact: "positive",
        icon: "droplets",
      },
      {
        name: "Weather Forecast",
        description: "Moderate rainfall expected, favorable conditions",
        impact: "positive",
        icon: "cloud",
      },
      {
        name: "Sunlight",
        description: "Optimal sunshine hours for rice growth",
        impact: "positive",
        icon: "sun",
      },
    ],
    recommendations: [
      "Apply potash fertilizer in the next 10 days for better grain filling",
      "Maintain water level at 5cm during grain development stage",
      "Monitor for stem borer activity and apply treatment if needed",
      "Plan harvest when 80% of grains turn golden yellow",
    ],
    historical: {
      lastSeason: 26.2,
      average3Year: 25.8,
      districtAvg: 24.0,
    },
  },
  FARM002: {
    estimatedYield: 12.8,
    confidence: 72,
    harvestDate: getDate(60).split("-").reverse().join("/"),
    expectedPrice: 6200,
    factors: [
      {
        name: "Pest Pressure",
        description: "Pink bollworm activity affecting yield",
        impact: "negative",
        icon: "leaf",
      },
      {
        name: "Water Stress",
        description: "Rainfed field, dependent on monsoon",
        impact: "neutral",
        icon: "droplets",
      },
      {
        name: "Soil Nutrients",
        description: "Nitrogen deficiency detected",
        impact: "negative",
        icon: "leaf",
      },
      {
        name: "Weather Outlook",
        description: "Rain expected next week, beneficial for crop",
        impact: "positive",
        icon: "cloud",
      },
    ],
    recommendations: [
      "Address pink bollworm infestation immediately with recommended pesticides",
      "Apply urea fertilizer to correct nitrogen deficiency",
      "Consider installing drip irrigation for next season",
      "Harvest picking should be done in multiple rounds as bolls mature",
    ],
    historical: {
      lastSeason: 14.5,
      average3Year: 13.8,
      districtAvg: 12.0,
    },
  },
}
