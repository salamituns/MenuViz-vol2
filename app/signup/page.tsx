"use client"

import { useState } from 'react'
import { useAuth } from '@/lib/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, Mail } from 'lucide-react'

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  restaurantName: string;
  role: string;
  subscriptionTier: string;
  acceptTerms: boolean;
  phoneNumber: string;
}

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    restaurantName: '',
    role: 'owner',
    subscriptionTier: 'basic',
    acceptTerms: false,
    phoneNumber: '',
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const { signUp } = useAuth()

  const updateFormData = (field: keyof SignupFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      return
    }
    setIsLoading(true)
    try {
      // Pass additional metadata to the signUp function
      await signUp(
        formData.email, 
        formData.password, 
        {
          restaurantName: formData.restaurantName,
          role: formData.role,
          subscriptionTier: formData.subscriptionTier,
          phoneNumber: formData.phoneNumber
        }
      )
      setRegistrationComplete(true)
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate first step
      if (!formData.email || !formData.password || formData.password !== formData.confirmPassword) {
        return
      }
    }
    setCurrentStep(prev => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const isNextDisabled = () => {
    if (currentStep === 1) {
      return !formData.email || !formData.password || formData.password !== formData.confirmPassword
    }
    if (currentStep === 2) {
      return !formData.restaurantName || !formData.phoneNumber
    }
    return false
  }

  const isSubmitDisabled = () => {
    return !formData.acceptTerms || isLoading
  }

  // If registration is complete, show verification message
  if (registrationComplete) {
    return (
      <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-10">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Check Your Email</CardTitle>
            <CardDescription className="text-center">
              We've sent a verification link to <span className="font-medium">{formData.email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-primary/5 border-primary/20">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertTitle>Registration Successful</AlertTitle>
              <AlertDescription>
                Please verify your email to complete the registration process.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-medium">What happens next?</h3>
              <ol className="space-y-3 list-decimal list-inside text-sm">
                <li>Click the verification link in your email</li>
                <li>Complete your restaurant profile setup</li>
                <li>Start adding your menu items</li>
                <li>Customize your visual menu</li>
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row w-full gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setRegistrationComplete(false)}
              >
                Back to Sign Up
              </Button>
              <Link href="/login" className="w-full">
                <Button className="w-full">
                  Go to Login
                </Button>
              </Link>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Didn't receive the email?{' '}
              <Button variant="link" className="p-0 h-auto" onClick={() => {}}>
                Resend verification email
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-10">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create your MenuViz account</CardTitle>
          <CardDescription>
            Get started with your restaurant's visual menu experience
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <div className={`h-2 w-1/3 rounded-full ${currentStep >= 1 ? 'bg-primary' : 'bg-gray-200'} mr-1`}></div>
                <div className={`h-2 w-1/3 rounded-full ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'} mr-1`}></div>
                <div className={`h-2 w-1/3 rounded-full ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Step {currentStep} of 3: {currentStep === 1 ? 'Account Details' : currentStep === 2 ? 'Restaurant Information' : 'Subscription'}
              </p>
            </div>

            {currentStep === 1 && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long and include a number and special character
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="restaurant-name">Restaurant Name</Label>
                  <Input
                    id="restaurant-name"
                    type="text"
                    placeholder="Your Restaurant"
                    value={formData.restaurantName}
                    onChange={(e) => updateFormData('restaurantName', e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input
                    id="phone-number"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Your Role</Label>
                  <RadioGroup 
                    value={formData.role} 
                    onValueChange={(value) => updateFormData('role', value)}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="owner" id="role-owner" />
                      <Label htmlFor="role-owner">Owner</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manager" id="role-manager" />
                      <Label htmlFor="role-manager">Manager</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="staff" id="role-staff" />
                      <Label htmlFor="role-staff">Staff</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label>Select Subscription Tier</Label>
                  <RadioGroup 
                    value={formData.subscriptionTier} 
                    onValueChange={(value) => updateFormData('subscriptionTier', value)}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-start space-x-3 border p-3 rounded-md">
                      <RadioGroupItem value="basic" id="tier-basic" className="mt-1" />
                      <div>
                        <Label htmlFor="tier-basic" className="font-medium">Basic Tier - $19/month</Label>
                        <p className="text-sm text-muted-foreground">OCR menu text extraction, up to 100 items, standard QR codes</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 border p-3 rounded-md bg-primary/5">
                      <RadioGroupItem value="professional" id="tier-professional" className="mt-1" />
                      <div>
                        <Label htmlFor="tier-professional" className="font-medium">Professional Tier - $49/month</Label>
                        <p className="text-sm text-muted-foreground">Priority OCR, up to 500 items, multi-language support, analytics</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 border p-3 rounded-md">
                      <RadioGroupItem value="enterprise" id="tier-enterprise" className="mt-1" />
                      <div>
                        <Label htmlFor="tier-enterprise" className="font-medium">Enterprise Tier - Custom</Label>
                        <p className="text-sm text-muted-foreground">Unlimited items, multi-location management, custom AI training</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => updateFormData('acceptTerms', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </label>
                    <p className="text-xs text-muted-foreground">
                      By checking this box, you agree to our{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex w-full gap-2">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="w-full"
                  disabled={isLoading}
                >
                  Back
                </Button>
              )}
              {currentStep < 3 ? (
                <Button
                  type="button"
                  className="w-full"
                  onClick={nextStep}
                  disabled={isNextDisabled() || isLoading}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitDisabled()}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create Account
                </Button>
              )}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 