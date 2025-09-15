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

const InteractiveMap = ({
  initialLat = 28.597082,
  initialLng = 77.793120,
  onRooftopDraw,
}: InteractiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const isMapInitialized = useRef(false)
  const [map, setMap] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [coordinates, setCoordinates] = useState({ lat: initialLat, lng: initialLng })

  useEffect(() => {
    loadLeafletAssets()
  }, [])

  const loadLeafletAssets = () => {
    const leafletCSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    const leafletJS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    const drawCSS = "https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.css"
    const drawJS = "https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.js"

    const injectCSS = (href: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = href
        document.head.appendChild(link)
      }
    }

    const injectJS = (src: string, onload?: () => void) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement("script")
        script.src = src
        script.onload = onload || null
        document.head.appendChild(script)
      }
    }

    injectCSS(leafletCSS)
    injectCSS(drawCSS)

    injectJS(leafletJS, () => {
      injectJS(drawJS, () => {
        if (window.L && mapRef.current) {
          initializeMap()
        }
      })
    })
  }

  const initializeMap = () => {
    if (isMapInitialized.current || !mapRef.current || !window.L) return

    try {
      const leafletMap = window.L.map(mapRef.current, {
        zoomSnap: 1,
        zoomDelta: 1,
        maxZoom: 21, // 🔼 Increased zoom level
      }).setView([coordinates.lat, coordinates.lng], 20) // 🔼 Start closer in

      const tileLayer = window.L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics",
          maxZoom: 21,         // 🔼 Allow deeper zoom
          maxNativeZoom: 19,   // 🔁 Esri serves up to Z19
        }
      )
      tileLayer.addTo(leafletMap)

      const drawnItems = new window.L.FeatureGroup()
      leafletMap.addLayer(drawnItems)

      const drawControl = new window.L.Control.Draw({
        draw: {
          polygon: {
            allowIntersection: false,
            showArea: true,
            shapeOptions: {
              color: "#00bcd4",
              weight: 2,
              fillOpacity: 0.3,
            },
          },
          polyline: false,
          rectangle: false,
          circle: false,
          marker: false,
          circlemarker: false,
        },
        edit: {
          featureGroup: drawnItems,
          edit: false,
          remove: false,
        },
      })
      leafletMap.addControl(drawControl)

      leafletMap.on("draw:created", (e: any) => {
        const layer = e.layer
        const latlngs = layer.getLatLngs()[0].map((pt: any) => [pt.lat, pt.lng])
        onRooftopDraw?.(latlngs)
        drawnItems.addLayer(layer)
      })

      setMap(leafletMap)
      setIsLoading(false)
      setError(null)
      isMapInitialized.current = true
    } catch (err) {
      console.error("Map init error:", err)
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
            <h3 className="text-lg font-semibold">Satellite Rooftop View</h3>
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
          Draw your rooftop boundary to begin analysis
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