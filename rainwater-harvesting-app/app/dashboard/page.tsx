"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Droplets, Home, Calculator, TrendingUp, MapPin, Calendar, Plus, Eye, Edit3 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface RooftopEstimate {
  id: string
  name: string
  area: number
  location: string
  annualRainfall: number
  estimatedHarvest: number
  potentialSavings: number
  createdAt: string
  status: "draft" | "completed" | "in-progress"
}

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [estimates, setEstimates] = useState<RooftopEstimate[]>([])

  // Mock data for saved estimates
  useEffect(() => {
    if (isAuthenticated) {
      // Simulate loading saved estimates
      const mockEstimates: RooftopEstimate[] = [
        {
          id: "1",
          name: "Main House Rooftop",
          area: 1200,
          location: "Bangalore, Karnataka",
          annualRainfall: 924,
          estimatedHarvest: 832,
          potentialSavings: 12480,
          createdAt: "2024-01-15",
          status: "completed",
        },
        {
          id: "2",
          name: "Garage Rooftop",
          area: 400,
          location: "Bangalore, Karnataka",
          annualRainfall: 924,
          estimatedHarvest: 277,
          potentialSavings: 4155,
          createdAt: "2024-01-10",
          status: "in-progress",
        },
      ]
      setEstimates(mockEstimates)
    }
  }, [isAuthenticated])

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Droplets className="h-8 w-8 animate-pulse text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const totalHarvest = estimates.reduce((sum, est) => sum + est.estimatedHarvest, 0)
  const totalSavings = estimates.reduce((sum, est) => sum + est.potentialSavings, 0)
  const completedEstimates = estimates.filter((est) => est.status === "completed").length

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Track and manage your rainwater harvesting estimates</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Estimates</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estimates.length}</div>
              <p className="text-xs text-muted-foreground">{completedEstimates} completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annual Harvest Potential</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHarvest.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">liters per year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalSavings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">per year</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Estimate
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <MapPin className="h-4 w-4" />
              Find Contractors
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Calendar className="h-4 w-4" />
              Schedule Consultation
            </Button>
          </div>
        </div>

        {/* Saved Estimates */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Rooftop Estimates</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          {estimates.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Home className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No estimates yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Start by creating your first rooftop rainwater harvesting estimate
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Estimate
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {estimates.map((estimate) => (
                <Card key={estimate.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{estimate.name}</CardTitle>
                      <Badge
                        variant={
                          estimate.status === "completed"
                            ? "default"
                            : estimate.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {estimate.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {estimate.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Rooftop Area</p>
                        <p className="font-medium">{estimate.area} sq ft</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Annual Rainfall</p>
                        <p className="font-medium">{estimate.annualRainfall} mm</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Harvest Potential</span>
                        <span className="font-medium">{estimate.estimatedHarvest.toLocaleString()} L/year</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Potential Savings</p>
                        <p className="font-semibold text-primary">₹{estimate.potentialSavings.toLocaleString()}/year</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit3 className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
