import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Settings, CloudRain, TrendingUp, Calculator, Upload } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: CheckCircle,
      title: "Feasibility Assessment",
      description:
        "Comprehensive analysis of your rooftop's suitability for rainwater harvesting based on structural and environmental factors.",
    },
    {
      icon: Settings,
      title: "Recharge Structure Recommendations",
      description:
        "Customized suggestions for optimal recharge structures, filtration systems, and storage solutions for your specific needs.",
    },
    {
      icon: CloudRain,
      title: "Real-time Rainfall Data",
      description:
        "Access to historical and current rainfall patterns, seasonal variations, and climate projections for accurate planning.",
    },
    {
      icon: TrendingUp,
      title: "Runoff Generation Analysis",
      description:
        "Precise calculations of water runoff potential based on rooftop area, material, slope, and local precipitation data.",
    },
    {
      icon: Calculator,
      title: "Cost-Benefit Analysis",
      description:
        "Detailed financial projections including installation costs, maintenance expenses, and long-term water savings.",
    },
    {
      icon: Upload,
      title: "Blueprint Upload",
      description:
        "Upload rooftop images or architectural blueprints for enhanced accuracy in area calculations and system design.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Comprehensive Feature Set
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Everything you need to plan, implement, and optimize your rainwater harvesting system with confidence and
            precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-card-foreground text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
