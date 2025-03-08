"use client"

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import Link from 'next/link'
import { CheckCircle2, XCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

// Client component that uses useSearchParams
function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Get the token from the URL
        const token = searchParams.get('token')
        const type = searchParams.get('type')
        
        if (!token || type !== 'signup') {
          setVerificationStatus('error')
          setError('Invalid verification link')
          return
        }

        const supabase = createClient()
        
        // Check if the user is already verified
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          // User is already verified and logged in
          setVerificationStatus('success')
          return
        }

        // Verify the user's email
        // Note: Supabase handles the verification automatically when the user clicks the link
        // We just need to check if the verification was successful
        
        // Wait a moment to ensure Supabase has processed the verification
        setTimeout(async () => {
          const { data: { session } } = await supabase.auth.getSession()
          
          if (session) {
            setVerificationStatus('success')
          } else {
            setVerificationStatus('error')
            setError('Email verification failed. Please try again or contact support.')
          }
        }, 1000)
      } catch (error) {
        console.error('Verification error:', error)
        setVerificationStatus('error')
        setError('An unexpected error occurred during verification')
      }
    }

    verifyUser()
  }, [searchParams, router])

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          {verificationStatus === 'loading' && (
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Icons.spinner className="h-8 w-8 text-primary animate-spin" />
            </div>
          )}
          {verificationStatus === 'success' && (
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          )}
          {verificationStatus === 'error' && (
            <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          )}
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          {verificationStatus === 'loading' && 'Verifying Your Email...'}
          {verificationStatus === 'success' && 'Email Verified Successfully!'}
          {verificationStatus === 'error' && 'Verification Failed'}
        </CardTitle>
        <CardDescription className="text-center">
          {verificationStatus === 'loading' && 'Please wait while we verify your email address.'}
          {verificationStatus === 'success' && 'Your account has been verified. You can now access your dashboard.'}
          {verificationStatus === 'error' && error}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {verificationStatus === 'success' && (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-md border border-green-100">
              <h3 className="font-medium text-green-800 mb-2">What's Next?</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-green-700">
                <li>Complete your restaurant profile</li>
                <li>Set up your menu categories</li>
                <li>Add your first menu items</li>
                <li>Customize your visual menu</li>
              </ol>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {verificationStatus === 'loading' && (
          <p className="text-center text-sm text-muted-foreground">
            This may take a few moments...
          </p>
        )}
        {verificationStatus === 'success' && (
          <Link href="/dashboard/onboarding" className="w-full">
            <Button className="w-full">
              Continue to Setup
            </Button>
          </Link>
        )}
        {verificationStatus === 'error' && (
          <div className="flex flex-col space-y-2 w-full">
            <Link href="/signup" className="w-full">
              <Button variant="outline" className="w-full">
                Back to Sign Up
              </Button>
            </Link>
            <Button className="w-full" onClick={() => setVerificationStatus('loading')}>
              Try Again
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

// Loading fallback component
function VerifyLoading() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Icons.spinner className="h-8 w-8 text-primary animate-spin" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Loading Verification...
        </CardTitle>
        <CardDescription className="text-center">
          Please wait while we prepare the verification page.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

// Main page component with Suspense boundary
export default function VerifyPage() {
  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-10">
      <Suspense fallback={<VerifyLoading />}>
        <VerifyContent />
      </Suspense>
    </div>
  )
} 