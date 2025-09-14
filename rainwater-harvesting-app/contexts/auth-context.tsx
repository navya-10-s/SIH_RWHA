"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate checking for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("auth-user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Placeholder authentication logic
    if (email && password) {
      const mockUser = {
        id: "1",
        email,
        name: email.split("@")[0],
      }
      setUser(mockUser)
      localStorage.setItem("auth-user", JSON.stringify(mockUser))
    } else {
      throw new Error("Invalid credentials")
    }

    setIsLoading(false)
  }

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Placeholder registration logic
    if (email && password && name) {
      const mockUser = {
        id: Date.now().toString(),
        email,
        name,
      }
      setUser(mockUser)
      localStorage.setItem("auth-user", JSON.stringify(mockUser))
    } else {
      throw new Error("All fields are required")
    }

    setIsLoading(false)
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("auth-user")
  }

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
