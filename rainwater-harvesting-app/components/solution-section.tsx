import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Smartphone, BarChart3 } from "lucide-react"

export function SolutionSection() {
  return (
    <section id="solution" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Smart Water Harvesting Solution
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Our innovative web and mobile application combines GIS technology with user inputs to provide accurate
            rainwater harvesting estimates and actionable insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">How It Works</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary rounded-full p-2 mt-1">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">GIS Integration</h4>
                  <p className="text-muted-foreground">
                    Advanced Geographic Information System technology analyzes your location's rainfall patterns,
                    topography, and environmental factors.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary rounded-full p-2 mt-1">
                  <Smartphone className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">User Input Collection</h4>
                  <p className="text-muted-foreground">
                    Simple interface for entering rooftop dimensions, material types, and local conditions to
                    personalize your harvesting potential.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary rounded-full p-2 mt-1">
                  <BarChart3 className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Intelligent Analysis</h4>
                  <p className="text-muted-foreground">
                    AI-powered calculations provide precise estimates, cost-benefit analysis, and customized
                    recommendations for your specific situation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Platform Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Real-time rainfall data integration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Satellite imagery analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Multi-language support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Mobile-responsive design</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Community sharing features</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Expert consultation network</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
