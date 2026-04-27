import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Plus,
  Search,
  Phone,
  MapPin,
  Wheat,
  Package,
  IndianRupee,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { marketplaceListings, farmer } from "@/data/dummy"
import BottomNav from "@/components/BottomNav"

export default function Marketplace() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddListing, setShowAddListing] = useState(false)
  const [newListing, setNewListing] = useState({
    crop: "",
    quantity: "",
    price: "",
    description: "",
  })

  const filteredListings = marketplaceListings.filter(
    (listing) =>
      listing.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.sellerLocation.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const myListings = marketplaceListings.filter(
    (listing) => listing.sellerId === farmer.id
  )

  const handleCreateListing = () => {
    // In a real app, this would make an API call
    setShowAddListing(false)
    setNewListing({ crop: "", quantity: "", price: "", description: "" })
  }

  return (
    <div className="mobile-container min-h-screen pb-20" style={{ backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Marketplace</h1>
            <p className="text-sm text-muted-foreground">Buy & sell your harvest</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search crops or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("buy")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === "buy"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Buy Crops
          </button>
          <button
            onClick={() => setActiveTab("sell")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === "sell"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            My Listings
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-3">
        {activeTab === "buy" ? (
          <>
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <img
                        src={listing.image}
                        alt={listing.crop}
                        className="w-28 h-28 object-cover"
                      />
                      <div className="flex-1 p-3">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-foreground">{listing.crop}</h3>
                          <Badge
                            variant={listing.status === "available" ? "success" : "secondary"}
                          >
                            {listing.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          {listing.sellerLocation}
                        </div>
                        <div className="flex items-center gap-3 text-sm mb-2">
                          <div className="flex items-center gap-1">
                            <Package className="w-3 h-3 text-primary" />
                            <span>{listing.quantity}</span>
                          </div>
                          <div className="flex items-center gap-1 font-semibold text-primary">
                            <IndianRupee className="w-3 h-3" />
                            <span>{listing.pricePerQuintal}/quintal</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => window.open(`tel:${listing.sellerPhone}`)}
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Contact Seller
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Wheat className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No listings found</p>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <>
            {/* Add Listing Button */}
            <Button
              className="w-full mb-3"
              onClick={() => setShowAddListing(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Listing
            </Button>

            {myListings.length > 0 ? (
              myListings.map((listing) => (
                <Card key={listing.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{listing.crop}</h3>
                      <Badge variant={listing.status === "available" ? "success" : "warning"}>
                        {listing.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{listing.quantity}</span>
                      <span className="font-semibold text-primary">
                        ₹{listing.pricePerQuintal}/quintal
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-2">No listings yet</p>
                  <p className="text-sm text-muted-foreground">
                    Start selling your harvest today
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      {/* Add Listing Modal */}
      {showAddListing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full max-w-[430px] mx-auto rounded-t-2xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Add New Listing</h2>
              <button
                onClick={() => setShowAddListing(false)}
                className="text-muted-foreground"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Crop Type</label>
                <Input
                  placeholder="e.g., Rice, Cotton, Wheat"
                  value={newListing.crop}
                  onChange={(e) => setNewListing({ ...newListing, crop: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Quantity (quintals)</label>
                <Input
                  type="number"
                  placeholder="e.g., 50"
                  value={newListing.quantity}
                  onChange={(e) => setNewListing({ ...newListing, quantity: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Price per Quintal (₹)</label>
                <Input
                  type="number"
                  placeholder="e.g., 2200"
                  value={newListing.price}
                  onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description (optional)</label>
                <Input
                  placeholder="Quality grade, variety, etc."
                  value={newListing.description}
                  onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                />
              </div>
            </div>
            <Button className="w-full" onClick={handleCreateListing}>
              Create Listing
            </Button>
          </div>
        </div>
      )}

      <BottomNav active="marketplace" />
    </div>
  )
}
