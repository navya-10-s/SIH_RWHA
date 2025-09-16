"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Satellite, AlertCircle } from "lucide-react"

interface InteractiveMapProps {
  initialLat?: number
  initialLng?: number
  accuracy?: number
  onRooftopDraw?: (polygon: number[][]) => void
}

declare global {
  interface Window {
    google: typeof google
    initMap: () => void
  }
}

const InteractiveMap = ({
  initialLat = 28.597082,
  initialLng = 77.793120,
  onRooftopDraw,
}: InteractiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [coordinates, setCoordinates] = useState({ lat: initialLat, lng: initialLng })

  useEffect(() => {
    loadGoogleMapsScript()
  }, [])

  const loadGoogleMapsScript = () => {
    if (document.getElementById("google-maps-script")) return

    const script = document.createElement("script")
    script.id = "google-maps-script"
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAoQLRKz13FBEirZBqZ04c1pPtmCnLh9P8&callback=initMap`
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    window.initMap = initializeMap
  }

  const initializeMap = () => {
    if (!mapRef.current || map) return

    try {
      const defaultCenter = { lat: coordinates.lat, lng: coordinates.lng }

      const googleMap = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 20,
        mapTypeId: "satellite",
        disableDefaultUI: false,
      })

      setMap(googleMap)
      setIsLoading(false)
      setError(null)

      // Detect user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            const userLocation = { lat: latitude, lng: longitude }
            setCoordinates(userLocation)

            const marker = new window.google.maps.Marker({
              position: userLocation,
              map: googleMap,
              title: "Your Location",
            })

            const infoWindow = new window.google.maps.InfoWindow({
              content: "You are here",
            })

            marker.addListener("click", () => {
              infoWindow.open(googleMap, marker)
            })

            googleMap.setCenter(userLocation)
          },
          (geoError) => {
            console.warn("Geolocation error:", geoError.message)
          }
        )
      }
    } catch (err) {
      console.error("Google Maps init error:", err)
      setError("Failed to load map. Please refresh.")
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Satellite className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Google Satellite Rooftop View</h3>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-destructive">Map Error</p>
              <p className="text-sm text-destructive/80 mt-1">{error}</p>
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          Location: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Your current location is marked on the map
        </p>
      </div>

      <div className="relative">
        {isLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10 rounded-b-lg">
            <div className="text-center">
              <Satellite className="h-12 w-12 text-primary mx-auto mb-2 animate-pulse" />
              <p className="text-lg font-medium">Loading Map...</p>
              <p className="text-sm text-muted-foreground">
                Location: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="w-full h-96 bg-muted rounded-b-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Satellite className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Map Unavailable</p>
              <p className="text-sm">Please check your internet and try again.</p>
            </div>
          </div>
        )}

        {!error && <div ref={mapRef} className="w-full h-96 rounded-b-lg" />}
      </div>
    </Card>
  )
}

export default InteractiveMap