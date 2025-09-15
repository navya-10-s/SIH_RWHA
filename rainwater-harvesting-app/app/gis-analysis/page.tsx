"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthGuard } from "@/components/auth-guard"
import { MapPin, Loader2, Satellite } from "lucide-react"
import { toast } from "sonner"
import InteractiveMap from "@/components/interactive-map"

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
}

export default function GISAnalysisPage() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.")
      toast.error("Geolocation not supported")
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        })
        setLoading(false)
        toast.success("Location retrieved successfully!")
      },
      (error) => {
        let errorMessage = "Unable to retrieve location"
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable"
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out"
            break
        }
        setError(errorMessage)
        setLoading(false)
        toast.error(errorMessage)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    )
  }

  const handleSubmit = () => {
    if (!location) return

    const payload = {
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      accuracy: location.accuracy,
      timestamp: new Date().toISOString(),
    }

    console.log("Submitting payload:", payload)
    toast.success("Payload ready for submission!")
    // TODO: Connect to backend API
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                GIS-Based Rooftop Analysis
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Use satellite imagery and geolocation to analyze your rooftop's rainwater harvesting potential.
              </p>
            </div>

            <div className="space-y-8">
              {/* Location Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Your Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!location && !loading && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        We need your location to analyze your rooftop using satellite imagery.
                      </p>
                      <Button onClick={getCurrentLocation} size="lg">
                        <MapPin className="h-4 w-4 mr-2" />
                        Get My Location
                      </Button>
                    </div>
                  )}

                  {loading && (
                    <div className="text-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                      <p className="text-muted-foreground">Retrieving your location...</p>
                    </div>
                  )}

                  {error && (
                    <div className="text-center py-8">
                      <p className="text-destructive mb-4">{error}</p>
                      <Button onClick={getCurrentLocation} variant="outline">
                        Try Again
                      </Button>
                    </div>
                  )}

                  {location && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Latitude</p>
                          <p className="font-mono text-lg">{location.latitude.toFixed(6)}</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Longitude</p>
                          <p className="font-mono text-lg">{location.longitude.toFixed(6)}</p>
                        </div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Accuracy</p>
                        <p className="text-lg">±{Math.round(location.accuracy)} meters</p>
                      </div>
                      <Button onClick={handleSubmit} className="mt-4">
                        Submit for Analysis
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Satellite Map */}
              {location && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Satellite className="h-5 w-5 text-primary" />
                      Satellite View
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InteractiveMap
                      initialLat={location.latitude}
                      initialLng={location.longitude}
                      accuracy={location.accuracy}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Analysis Results Placeholder */}
              {location && (
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="bg-primary/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                        <Satellite className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4">GIS-Based Rooftop Analysis Coming Soon</h3>
                      <p className="text-muted-foreground max-w-md mx-auto text-pretty">
                        Our advanced satellite imagery analysis will automatically detect your rooftop area, calculate
                        optimal harvesting potential, and provide detailed recommendations.
                      </p>
                      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <strong>Next Steps:</strong> Integration with satellite imagery APIs, AI-powered rooftop
                          detection, and automated area calculation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  )
}