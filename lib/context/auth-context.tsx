"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthError, Provider } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export interface UserPreferences {
  dietary?: string[]
  favorites?: string[]
  dark_mode?: boolean
  language?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  preferences: UserPreferences | null
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  signInWithProvider: (provider: Provider) => Promise<void>
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
      if (event === 'SIGNED_IN') router.refresh()
      if (event === 'SIGNED_OUT') router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signIn = async (email: string, password: string, rememberMe = false) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      // If remember me is checked, update the session expiry
      if (rememberMe && !error) {
        // Set a longer session
        const { data } = await supabase.auth.getSession()
        if (data.session?.refresh_token) {
          await supabase.auth.refreshSession({
            refresh_token: data.session.refresh_token,
          })
        }
      }
      
      if (error) throw error
      router.push('/dashboard')
      toast.success('Welcome back!')
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message)
      throw error
    }
  }

  const signInWithProvider = async (provider: Provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      })
      if (error) throw error
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message)
      throw error
    }
  }

  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...metadata,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard/onboarding`,
        }
      })
      if (error) throw error
      toast.success('Check your email to confirm your account')
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/')
      toast.success('Signed out successfully')
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
      toast.success('Check your email for the reset link')
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message)
      throw error
    }
  }

  const updatePreferences = async (preferences: Partial<UserPreferences>) => {
    try {
      if (!user) throw new Error('No user logged in')
      
      const { error } = await supabase.auth.updateUser({
        data: {
          dietary: preferences.dietary,
          favorites: preferences.favorites,
          dark_mode: preferences.dark_mode,
          language: preferences.language,
        },
      })
      
      if (error) throw error
      toast.success('Preferences updated successfully')
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        preferences: user?.user_metadata as UserPreferences || null,
        signIn,
        signInWithProvider,
        signUp,
        signOut,
        resetPassword,
        updatePreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 