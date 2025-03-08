"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/context/auth-context'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface RestaurantProfile {
  name: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  logo: File | null;
}

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<RestaurantProfile>({
    name: user?.user_metadata?.restaurantName || '',
    description: '',
    address: '',
    phone: user?.user_metadata?.phoneNumber || '',
    website: '',
    logo: null,
  })

  const updateProfile = (field: keyof RestaurantProfile, value: string | File | null) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateProfile('logo', e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const supabase = createClient()
      
      // Create restaurant profile in database
      const { error: profileError } = await supabase
        .from('restaurants')
        .insert({
          name: profile.name,
          description: profile.description,
          address: profile.address,
          phone: profile.phone,
          website: profile.website,
          owner_id: user?.id,
        })
      
      if (profileError) throw profileError
      
      // Upload logo if provided
      if (profile.logo) {
        const fileExt = profile.logo.name.split('.').pop()
        const fileName = `${user?.id}-logo.${fileExt}`
        
        const { error: uploadError } = await supabase
          .storage
          .from('restaurant-logos')
          .upload(fileName, profile.logo)
        
        if (uploadError) throw uploadError
      }
      
      toast.success('Restaurant profile created successfully!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error creating restaurant profile:', error)
      toast.error('Failed to create restaurant profile')
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    setCurrentStep(prev => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to MenuViz!</h1>
        <p className="text-muted-foreground mt-2">Let's set up your restaurant profile</p>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <div className={`h-2 w-1/3 rounded-full ${currentStep >= 1 ? 'bg-primary' : 'bg-gray-200'} mr-1`}></div>
          <div className={`h-2 w-1/3 rounded-full ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'} mr-1`}></div>
          <div className={`h-2 w-1/3 rounded-full ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Step {currentStep} of 3: {
            currentStep === 1 ? 'Restaurant Details' : 
            currentStep === 2 ? 'Branding' : 
            'Confirmation'
          }
        </p>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent className="pt-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => updateProfile('name', e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your restaurant..."
                    value={profile.description}
                    onChange={(e) => updateProfile('description', e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => updateProfile('address', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => updateProfile('phone', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://yourrestaurant.com"
                      value={profile.website}
                      onChange={(e) => updateProfile('website', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="logo">Restaurant Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-md border flex items-center justify-center bg-gray-50">
                      {profile.logo ? (
                        <img
                          src={URL.createObjectURL(profile.logo)}
                          alt="Logo preview"
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <Icons.image className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended size: 512x512px. Max size: 2MB.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-gray-50">
                  <h3 className="font-medium mb-2">Branding Tips</h3>
                  <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
                    <li>Use a high-quality logo for better customer recognition</li>
                    <li>Ensure your restaurant description is clear and appealing</li>
                    <li>Keep your contact information up to date</li>
                    <li>You can update these details anytime from your dashboard</li>
                  </ul>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-4">Restaurant Profile Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2 py-2 border-b">
                      <span className="text-sm font-medium">Restaurant Name:</span>
                      <span className="text-sm col-span-2">{profile.name}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 py-2 border-b">
                      <span className="text-sm font-medium">Description:</span>
                      <span className="text-sm col-span-2">{profile.description || 'Not provided'}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 py-2 border-b">
                      <span className="text-sm font-medium">Address:</span>
                      <span className="text-sm col-span-2">{profile.address || 'Not provided'}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 py-2 border-b">
                      <span className="text-sm font-medium">Phone:</span>
                      <span className="text-sm col-span-2">{profile.phone || 'Not provided'}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 py-2 border-b">
                      <span className="text-sm font-medium">Website:</span>
                      <span className="text-sm col-span-2">{profile.website || 'Not provided'}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 py-2">
                      <span className="text-sm font-medium">Logo:</span>
                      <span className="text-sm col-span-2">{profile.logo ? 'Uploaded' : 'Not uploaded'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-primary/5 border-primary/20">
                  <h3 className="font-medium mb-2">What's Next?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    After completing your profile setup, you'll be directed to your dashboard where you can:
                  </p>
                  <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
                    <li>Create menu categories</li>
                    <li>Add menu items</li>
                    <li>Upload food images</li>
                    <li>Generate QR codes for your tables</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isLoading}
              >
                Back
              </Button>
            ) : (
              <div></div> // Empty div for spacing
            )}
            
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Complete Setup
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 