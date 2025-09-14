import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Leaf, Globe, Languages } from "lucide-react"
import Link from "next/link"

export function ImpactSection() {
  const impacts = [
    {
      icon: Users,
      title: "Community Empowerment",
      description:
        "Enable communities to take control of their water security through accessible technology and education.",
      stats: "10,000+ communities served",
    },
    {
      icon: Leaf,
      title: "Environmental Sustainability",
      description: "Reduce groundwater depletion and promote sustainable water management practices at scale.",
      stats: "50M+ liters conserved annually",
    },
    {
      icon: Globe,
      title: "Global Water Security",
      description:
        "Contribute to UN Sustainable Development Goals by improving water access and conservation worldwide.",
      stats: "25+ countries supported",
    },
    {
      icon: Languages,
      title: "Regional Language Support",
      description: "Break down language barriers with multi-language support for truly inclusive water solutions.",
      stats: "15+ languages available",
    },
  ]

  return (
    <section id="impact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">Creating Lasting Impact</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Our platform doesn't just estimate potential—it transforms communities and contributes to global water
            sustainability goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <Card key={index} className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <impact.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-card-foreground text-xl">{impact.title}</CardTitle>
                    <p className="text-primary font-semibold text-sm">{impact.stats}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty">{impact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-primary/5 rounded-2xl p-12 border border-primary/20">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Make a Difference?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of communities already using our platform to build sustainable water solutions. Start your
            rainwater harvesting journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/estimate">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
                Estimate Your Rooftop Potential
              </button>
            </Link>
            <button className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
