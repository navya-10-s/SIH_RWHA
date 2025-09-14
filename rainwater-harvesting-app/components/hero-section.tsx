"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Droplets, Leaf, Globe, MapPin } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function HeroSection() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const handleEstimateClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault()
      toast.error("Please sign in to access the estimation tool")
      router.push("/signin?redirect=/estimate")
    }
  }

  const handleGISClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault()
      toast.error("Please sign in to access GIS analysis")
      router.push("/signin?redirect=/gis-analysis")
    }
  }

  return (
    <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Harness Every Drop of <span className="text-primary">Rainwater</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Estimate your rooftop rainwater harvesting potential with precision. Our GIS-powered platform helps
            communities build sustainable water solutions for a water-secure future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/estimate" onClick={handleEstimateClick}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4">
                Estimate Your Rooftop Potential
              </Button>
            </Link>
            <Link href="/gis-analysis" onClick={handleGISClick}>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
                <MapPin className="h-4 w-4 mr-2" />
                Analyze via GIS
              </Button>
            </Link>
          </div>
        </div>

        {/* Background Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Droplets className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Water Scarcity Crisis</h3>
              <p className="text-muted-foreground text-pretty">
                Over 2 billion people lack access to safely managed drinking water. Groundwater depletion threatens
                global water security.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Groundwater Depletion</h3>
              <p className="text-muted-foreground text-pretty">
                Aquifers are being depleted faster than they can naturally recharge, creating an urgent need for
                sustainable replenishment solutions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Climate Impact</h3>
              <p className="text-muted-foreground text-pretty">
                Irregular rainfall patterns and extreme weather events make efficient water harvesting more critical
                than ever.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
