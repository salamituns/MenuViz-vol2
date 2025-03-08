'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ImageIcon, Zap, ArrowRight, Star, Users, Building2 } from 'lucide-react'
import { Navigation } from "@/components/navigation"
import { motion, HTMLMotionProps } from "framer-motion"

// Replace base64 encoded images with reliable external URLs
const MENU_IMAGES = {
  garlicBread: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=200",
  mozzarellaSticks: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=200",
  spaghetti: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=200&auto=format",
  salmon: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=200&auto=format"
};

export default function Home() {
  const MotionDiv = motion.div

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <Badge variant="secondary" className="mx-auto">
                  Trusted by 1000+ Restaurants
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                  Transform Your Menu into a Visual Feast
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Elevate your restaurant's ordering experience with our innovative menu visualization platform.
                  Join the future of digital dining.
                </p>
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Link href="/login">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/#demo">
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </Link>
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 w-full max-w-md mx-auto"
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">1000+</div>
                  <div className="text-xs sm:text-sm text-gray-500">Restaurants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">50K+</div>
                  <div className="text-xs sm:text-sm text-gray-500">Menu Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">99%</div>
                  <div className="text-xs sm:text-sm text-gray-500">Satisfaction</div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Features</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-lg">
                Three simple steps to revolutionize your menu experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <MotionDiv
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="relative overflow-hidden border-none shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
                  <CardHeader>
                    <ImageIcon className="w-12 h-12 mb-4 text-primary" />
                    <CardTitle>Upload Your Menu</CardTitle>
                    <CardDescription>
                      Simply upload your existing menu. Our advanced OCR technology will do the rest.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </MotionDiv>
              <MotionDiv
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="relative overflow-hidden border-none shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
                  <CardHeader>
                    <Zap className="w-12 h-12 mb-4 text-primary" />
                    <CardTitle>Customize & Enhance</CardTitle>
                    <CardDescription>
                      Add images, descriptions, and customize the layout to match your brand.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </MotionDiv>
              <MotionDiv
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="relative overflow-hidden border-none shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
                  <CardHeader>
                    <CheckCircle2 className="w-12 h-12 mb-4 text-primary" />
                    <CardTitle>Publish & Delight</CardTitle>
                    <CardDescription>
                      Share your visual menu online or use it in-house to enhance the dining experience.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="w-full py-20 bg-gray-100 dark:bg-gray-850">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Demo</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">See the Transformation</h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-lg">
                From plain text to visual delight in seconds
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4">Before: Plain Text Menu</h3>
                  <div className="font-mono text-xs sm:text-sm p-3 sm:p-4 bg-gray-100 dark:bg-gray-900 rounded border overflow-x-auto">
                    <p>APPETIZERS</p>
                    <p>Garlic Bread - $5.99</p>
                    <p>Mozzarella Sticks - $7.99</p>
                    <p>Chicken Wings - $10.99</p>
                    <p>MAIN COURSES</p>
                    <p>Spaghetti Bolognese - $14.99</p>
                    <p>Grilled Salmon - $18.99</p>
                    <p>Beef Tenderloin - $24.99</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4">After: Visual Menu</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-primary">APPETIZERS</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        <div className="p-2 sm:p-3 border rounded-lg flex items-center space-x-2 sm:space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md flex-shrink-0 overflow-hidden shadow-sm group-hover:shadow transition-shadow">
                            <img 
                              src={MENU_IMAGES.garlicBread}
                              alt="Garlic Bread"
                              className="w-full h-full object-cover"
                              width={64}
                              height={64}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm sm:text-base">Garlic Bread</p>
                            <p className="text-xs sm:text-sm text-gray-500">$5.99</p>
                            <div className="flex items-center mt-1">
                              <span className="inline-flex items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mr-1">Vegetarian</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 sm:p-3 border rounded-lg flex items-center space-x-2 sm:space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md flex-shrink-0 overflow-hidden shadow-sm group-hover:shadow transition-shadow">
                            <img 
                              src={MENU_IMAGES.mozzarellaSticks}
                              alt="Mozzarella Sticks"
                              className="w-full h-full object-cover"
                              width={64}
                              height={64}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm sm:text-base">Mozzarella Sticks</p>
                            <p className="text-xs sm:text-sm text-gray-500">$7.99</p>
                            <div className="flex items-center mt-1">
                              <span className="inline-flex items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mr-1">Vegetarian</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary">MAIN COURSES</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        <div className="p-2 sm:p-3 border rounded-lg flex items-center space-x-2 sm:space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md flex-shrink-0 overflow-hidden shadow-sm group-hover:shadow transition-shadow">
                            <img 
                              src={MENU_IMAGES.spaghetti}
                              alt="Spaghetti Bolognese"
                              className="w-full h-full object-cover"
                              width={64}
                              height={64}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm sm:text-base">Spaghetti Bolognese</p>
                            <p className="text-xs sm:text-sm text-gray-500">$14.99</p>
                            <div className="flex items-center mt-1">
                              <span className="inline-flex items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 mr-1">Popular</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 sm:p-3 border rounded-lg flex items-center space-x-2 sm:space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md flex-shrink-0 overflow-hidden shadow-sm group-hover:shadow transition-shadow">
                            <img 
                              src={MENU_IMAGES.salmon}
                              alt="Grilled Salmon"
                              className="w-full h-full object-cover"
                              width={64}
                              height={64}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm sm:text-base">Grilled Salmon</p>
                            <p className="text-xs sm:text-sm text-gray-500">$18.99</p>
                            <div className="flex items-center mt-1">
                              <span className="inline-flex items-center rounded-full bg-yellow-50 px-1.5 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20 mr-1">Gluten-Free</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Link href="/login">
                <Button size="lg">
                  Try It Yourself
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Testimonials</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-lg">
                Join hundreds of satisfied restaurant owners
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <MotionDiv
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="relative overflow-hidden border-none shadow-lg h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-current text-yellow-500" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 dark:text-gray-300 mb-6">
                      "MenuViz transformed our restaurant's ordering experience. Our customers love the visual menus, and we've seen a 20% increase in average order value since implementation."
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        JD
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">John Anderson</p>
                        <p className="text-sm text-gray-500">Owner, The Italian Bistro</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
              <MotionDiv
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="relative overflow-hidden border-none shadow-lg h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-current text-yellow-500" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 dark:text-gray-300 mb-6">
                      "The OCR technology is incredibly accurate. We uploaded our entire menu in minutes, and the system recognized everything perfectly. The customer support team is also exceptional."
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        JS
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Jane Chen</p>
                        <p className="text-sm text-gray-500">Manager, Coastal Seafood</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
              <MotionDiv
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="relative overflow-hidden border-none shadow-lg h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-current text-yellow-500" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 dark:text-gray-300 mb-6">
                      "As a multi-location restaurant chain, MenuViz has simplified our menu management across all branches. The analytics provide valuable insights into customer preferences."
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        RJ
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Robert Ogunde</p>
                        <p className="text-sm text-gray-500">CEO, Urban Eats Group</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Pricing</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Plan</h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-lg">
                Start Basically, upgrade as you grow
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Tier */}
              <Card className="relative overflow-hidden border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Basic Tier</CardTitle>
                  <CardDescription>Perfect for small restaurants</CardDescription>
                  <div className="text-3xl font-bold mt-4">$19</div>
                  <div className="text-sm text-gray-500">per month</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                      OCR menu text extraction
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                      Basic image upload (up to 100 items)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                      Simple category organization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                      Standard QR code generation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                      Basic analytics
                    </li>
                  </ul>
                  <Link href="/login">
                    <Button className="w-full mt-6">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              {/* Professional Tier */}
              <Card className="relative overflow-hidden border-none shadow-lg bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle>Professional Tier</CardTitle>
                  <CardDescription className="text-primary-foreground/90">For growing businesses</CardDescription>
                  <div className="text-3xl font-bold mt-4">$49</div>
                  <div className="text-sm text-primary-foreground/90">per month</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Priority OCR processing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Advanced image upload (up to 500 items)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Multi-language support (up to 3 languages)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Advanced analytics dashboard
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      POS integration & custom branding
                    </li>
                  </ul>
                  <Link href="/login">
                    <Button variant="secondary" className="w-full mt-6">
                      Start Free Trial
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              {/* Enterprise Tier */}
              <Card className="relative overflow-hidden border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Enterprise Tier</CardTitle>
                  <CardDescription>For restaurant chains</CardDescription>
                  <div className="text-3xl font-bold mt-4">Custom</div>
                  <div className="text-sm text-gray-500">Contact us for pricing</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                      Unlimited OCR processing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                      Unlimited image upload
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                      Multi-location management
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                      Custom AI model training
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                      White-label options
                    </li>
                  </ul>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full mt-6">
                      Contact Sales
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 sm:py-20 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Ready to Transform Your Menu Experience?</h2>
                <p className="mt-4 text-primary-foreground/90 text-sm sm:text-base md:text-lg">
                  Join thousands of restaurants already using MenuViz to enhance their customer experience and increase sales.
                </p>
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/login">
                    <Button size="lg" variant="secondary">
                      Get Started Now
                    </Button>
                  </Link>
                  <Link href="/#demo">
                    <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                      Schedule a Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-sm">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-foreground/20 to-primary-foreground/5 rounded-lg blur"></div>
                  <div className="relative bg-primary-foreground/10 p-4 sm:p-6 rounded-lg border border-primary-foreground/20">
                    <div className="text-center mb-4">
                      <Building2 className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 text-primary-foreground/90" />
                      <h3 className="text-lg sm:text-xl font-bold">Join Our Community</h3>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-foreground/90" />
                        <span className="text-sm sm:text-base">Free onboarding support</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-foreground/90" />
                        <span className="text-sm sm:text-base">30-day money-back guarantee</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-foreground/90" />
                        <span className="text-sm sm:text-base">Access to exclusive resources</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-foreground/90" />
                        <span className="text-sm sm:text-base">Join 1000+ restaurant owners</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-white dark:bg-gray-900 border-t">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="space-y-3">
              <h4 className="text-base font-semibold">About</h4>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Transforming restaurant menus into visual experiences.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-base font-semibold">Product</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <li><Link href="/#features">Features</Link></li>
                <li><Link href="/#pricing">Pricing</Link></li>
                <li><Link href="/#demo">Demo</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-base font-semibold">Resources</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <li><Link href="#">Blog</Link></li>
                <li><Link href="#">Documentation</Link></li>
                <li><Link href="#">Support</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-base font-semibold">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <li><Link href="#">Privacy Policy</Link></li>
                <li><Link href="#">Terms of Service</Link></li>
                <li><Link href="#">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              © 2025 MenuViz. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

