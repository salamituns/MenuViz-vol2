'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Utensils, Menu, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { ThemeToggle } from './theme-toggle'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const isLoginPage = pathname === '/login'

  useEffect(() => {
    checkUser()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch (error) {
      console.error('Error checking user:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const NavLinks = () => (
    <>
      <Link 
        className="text-sm font-medium hover:underline underline-offset-4" 
        href="/#features"
      >
        Features
      </Link>
      <Link 
        className="text-sm font-medium hover:underline underline-offset-4" 
        href="/#demo"
      >
        Demo
      </Link>
      <Link 
        className="text-sm font-medium hover:underline underline-offset-4" 
        href="/#testimonials"
      >
        Testimonials
      </Link>
      <Link 
        className="text-sm font-medium hover:underline underline-offset-4" 
        href="/#pricing"
      >
        Pricing
      </Link>
    </>
  )

  const AuthButtons = () => (
    <>
      {user ? (
        <>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            Sign Out
          </Button>
        </>
      ) : !isLoginPage && (
        <Link href="/login">
          <Button variant="outline" size="sm">
            Login
          </Button>
        </Link>
      )}
    </>
  )

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <Utensils className="h-6 w-6 mr-2" />
        <span className="font-bold">MenuViz</span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
        <NavLinks />
        <ThemeToggle />
        <AuthButtons />
      </nav>

      {/* Mobile Navigation */}
      <div className="ml-auto md:hidden flex items-center gap-2">
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b py-4">
                <Link className="flex items-center gap-2 font-semibold" href="/">
                  <Utensils className="h-5 w-5" />
                  MenuViz
                </Link>
              </div>
              <nav className="flex flex-col gap-4 py-6">
                <NavLinks />
              </nav>
              <div className="mt-auto flex flex-col gap-4 py-6 border-t">
                <AuthButtons />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
} 