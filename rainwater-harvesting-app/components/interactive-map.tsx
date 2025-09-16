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
  initialLat = 29.143859,
  initialLng = 77.984563,
  onRooftopDraw,
}: InteractiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<any>(null)
  const [map, setMap] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [coordinates, setCoordinates] = useState({ lat: initialLat, lng: initialLng })
  const [accuracy, setAccuracy] = useState<number | null>(null)

  useEffect(() => {
    loadGoogleMapsScript()
  }, [])

  const loadGoogleMapsScript = () => {
    if (document.getElementById("google-maps-script")) return

    const script = document.createElement("script")
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    script.id = "google-maps-script"
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&loading=async`
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    window.initMap = initializeMap
  }

  const initializeMap = () => {
    if (!mapRef.current || map) return

    try {
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: coordinates.lat, lng: coordinates.lng },
        zoom: 20,
        mapTypeId: "satellite",
        disableDefaultUI: false,
      })

      setMap(googleMap)
      setIsLoading(false)
      setError(null)

      trackLiveLocation(googleMap)
    } catch (err) {
      console.error("Google Maps init error:", err)
      setError("Failed to load map. Please refresh.")
      setIsLoading(false)
    }
  }

  const trackLiveLocation = (googleMap: any) => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.")
      return
    }

    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy: acc } = position.coords
        const userLocation = { lat: latitude, lng: longitude }
        setCoordinates(userLocation)
        setAccuracy(acc)
        setError(null)

        if (markerRef.current) {
          markerRef.current.setPosition(userLocation)
        } else {
          markerRef.current = new window.google.maps.Marker({
            position: userLocation,
            map: googleMap,
            title: "Your Live Location",
          })

          const infoWindow = new window.google.maps.InfoWindow({
            content: `Live location<br/>Accuracy: ±${Math.round(acc)} meters`,
          })

          markerRef.current.addListener("click", () => {
            infoWindow.open(googleMap, markerRef.current)
          })
        }

        googleMap.setCenter(userLocation)
      },
      (geoError) => {
        console.warn("Geolocation error:", geoError.message)
        switch (geoError.code) {
          case 1:
            setError("Location access denied. Please enable location services in your browser settings.")
            break
          case 2:
            setError("Location unavailable. Try moving to an open area or check your network.")
            break
          case 3:
            setError("Location request timed out. Please try again.")
            break
          default:
            setError("Unable to access location. Please check your browser settings.")
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    )
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
              <p className="text-sm font-medium text-destructive">Location Error</p>
              <p className="text-sm text-destructive/80 mt-1">{error}</p>
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          Location: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
        </p>
        {accuracy !== null && (
          <p className="text-xs text-muted-foreground mt-1">
            Accuracy: ±{Math.round(accuracy)} meters
          </p>
        )}
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

        {!error && <div ref={mapRef} className="w-full h-96 rounded-b-lg" />}
      </div>
    </Card>
  )
}

export default InteractiveMap