"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { AuthModal } from "@/components/auth-modal"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, X, Droplets, LogOut, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">("signin")
  const { user, isAuthenticated, signOut } = useAuth()
  const router = useRouter()

  const handleAuthClick = (tab: "signin" | "signup") => {
    setAuthModalTab(tab)
    setIsAuthModalOpen(true)
  }

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/estimate")
    } else {
      router.push("/signup")
    }
    setIsMenuOpen(false)
  }

  const handleSignOut = () => {
    signOut()
    setIsMenuOpen(false)
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary rounded-lg p-2">
                <Droplets className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">AquaHarvest</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#solution" className="text-foreground hover:text-primary transition-colors">
                Solution
              </a>
              <a href="#features" className="text-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#impact" className="text-foreground hover:text-primary transition-colors">
                Impact
              </a>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                      <BarChart3 className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {getUserInitials(user?.name || "U")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden lg:block">
                        <p className="text-sm font-medium">{user?.name}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" onClick={() => handleAuthClick("signin")}>
                    Sign In
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={handleGetStarted}
                    aria-label="Get started with rooftop estimation"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-foreground hover:text-primary transition-colors">
                  Home
                </a>
                <a href="#solution" className="text-foreground hover:text-primary transition-colors">
                  Solution
                </a>
                <a href="#features" className="text-foreground hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#impact" className="text-foreground hover:text-primary transition-colors">
                  Impact
                </a>

                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2 pt-2 border-t border-border">
                    <div className="flex items-center gap-2 px-2 py-1">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getUserInitials(user?.name || "U")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <Link href="/dashboard">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2 bg-transparent"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <BarChart3 className="h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-2 border-t border-border">
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        handleAuthClick("signin")
                        setIsMenuOpen(false)
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                      onClick={handleGetStarted}
                      aria-label="Get started with rooftop estimation"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} defaultTab={authModalTab} />
    </>
  )
}
