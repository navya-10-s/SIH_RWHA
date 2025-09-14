"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calculator, Droplets, Home, MapPin, Users } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

interface FormData {
  rooftopArea: string
  dwellers: string
  openSpace: string
  location: string
}

interface Results {
  runoffVolume: number
  rechargeStructure: string
  dimensions: string
  costBenefit: string
}

export default function EstimatePage() {
  const [formData, setFormData] = useState<FormData>({
    rooftopArea: "",
    dwellers: "",
    openSpace: "",
    location: "",
  })
  const [results, setResults] = useState<Results | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculatePotential = async () => {
    setIsCalculating(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Placeholder calculation logic
    const rooftopArea = Number.parseFloat(formData.rooftopArea) || 0
    const dwellers = Number.parseInt(formData.dwellers) || 1
    const openSpace = Number.parseFloat(formData.openSpace) || 0

    // Simple calculation: assume 80% runoff coefficient and 800mm annual rainfall
    const runoffVolume = Math.round(rooftopArea * 0.8 * 800)

    // Determine recharge structure based on available space
    let rechargeStructure = "Recharge Pit"
    let dimensions = "2m x 2m x 3m deep"

    if (openSpace > 50) {
      rechargeStructure = "Recharge Trench"
      dimensions = "10m x 1m x 2m deep"
    } else if (openSpace > 20) {
      rechargeStructure = "Percolation Tank"
      dimensions = "3m x 3m x 2m deep"
    }

    const costBenefit = `Initial cost: ₹${Math.round(rooftopArea * 150)}, Annual savings: ₹${Math.round(runoffVolume * 0.02)}`

    setResults({
      runoffVolume,
      rechargeStructure,
      dimensions,
      costBenefit,
    })

    setIsCalculating(false)
  }

  const isFormValid = formData.rooftopArea && formData.dwellers && formData.openSpace && formData.location

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Estimate Your Rooftop Potential
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Calculate your rainwater harvesting potential and get personalized recommendations for your property.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Calculator className="h-5 w-5 text-primary" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="rooftopArea" className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" />
                    Rooftop Area (sq. meters)
                  </Label>
                  <Input
                    id="rooftopArea"
                    type="number"
                    placeholder="e.g., 150"
                    value={formData.rooftopArea}
                    onChange={(e) => handleInputChange("rooftopArea", e.target.value)}
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dwellers" className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Number of Dwellers
                  </Label>
                  <Input
                    id="dwellers"
                    type="number"
                    placeholder="e.g., 4"
                    value={formData.dwellers}
                    onChange={(e) => handleInputChange("dwellers", e.target.value)}
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="openSpace" className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-primary" />
                    Available Open Space (sq. meters)
                  </Label>
                  <Input
                    id="openSpace"
                    type="number"
                    placeholder="e.g., 30"
                    value={formData.openSpace}
                    onChange={(e) => handleInputChange("openSpace", e.target.value)}
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Location
                  </Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mumbai">Mumbai, Maharashtra</SelectItem>
                      <SelectItem value="delhi">Delhi, NCR</SelectItem>
                      <SelectItem value="bangalore">Bangalore, Karnataka</SelectItem>
                      <SelectItem value="chennai">Chennai, Tamil Nadu</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad, Telangana</SelectItem>
                      <SelectItem value="pune">Pune, Maharashtra</SelectItem>
                      <SelectItem value="kolkata">Kolkata, West Bengal</SelectItem>
                      <SelectItem value="ahmedabad">Ahmedabad, Gujarat</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={calculatePotential}
                  disabled={!isFormValid || isCalculating}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  {isCalculating ? "Calculating..." : "Calculate Potential"}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Droplets className="h-5 w-5 text-primary" />
                  Estimation Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!results ? (
                  <div className="text-center py-12">
                    <div className="bg-muted/50 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <Calculator className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Fill in your property details and click "Calculate Potential" to see your rainwater harvesting
                      estimation.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <h3 className="font-semibold text-foreground mb-2">Estimated Runoff Volume</h3>
                      <p className="text-2xl font-bold text-primary">
                        {results.runoffVolume.toLocaleString()} liters/year
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Suggested Recharge Structure</h4>
                        <p className="text-muted-foreground">{results.rechargeStructure}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Recommended Dimensions</h4>
                        <p className="text-muted-foreground">{results.dimensions}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Cost-Benefit Summary</h4>
                        <p className="text-muted-foreground">{results.costBenefit}</p>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> These are preliminary estimates based on average rainfall data. For
                        detailed planning, consult with a water harvesting expert.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
