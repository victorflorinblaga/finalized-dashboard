"use client";

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function UrbanFarmingLandingPage() {
  return (
    <div className="w-full h-full bg-green-100">
      <nav className="p-4 bg-white shadow">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#about" legacyBehavior passHref>
                <NavigationMenuLink>About</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#services" legacyBehavior passHref>
                <NavigationMenuLink>Services</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#contact" legacyBehavior passHref>
                <NavigationMenuLink>Contact</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      
      <div className="w-[90%] mx-auto py-12">
        <h1 className="text-4xl font-bold text-center">Urban Farming: Grow Your Own Food</h1>
        <p className="text-lg text-center mt-4">Join the urban farming movement and learn how to cultivate fresh produce in your own city space!</p>
        
        <div className="my-8">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <img src="/images/urban-farming-1.jpg" alt="Urban Garden" className="w-full h-64 object-cover" />
                <h2 className="text-xl font-semibold">Sustainable Practices</h2>
              </CarouselItem>
              <CarouselItem>
                <img src="/images/urban-farming-2.jpg" alt="Community Farming" className="w-full h-64 object-cover" />
                <h2 className="text-xl font-semibold">Community Engagement</h2>
              </CarouselItem>
              <CarouselItem>
                <img src="/images/urban-farming-3.jpg" alt="Fresh Produce" className="w-full h-64 object-cover" />
                <h2 className="text-xl font-semibold">Fresh and Healthy Food</h2>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <h2 id="about" className="text-2xl font-bold mt-12 text-center">About Urban Farming</h2>
        <p className="mt-4 text-center">Urban farming is the practice of cultivating, processing, and distributing food in or around urban areas. It makes fresh food more accessible, promotes sustainability, and connects communities.</p>
      </div>

      <footer className="bg-white p-4 text-center mt-12">
        <p>&copy; {new Date().getFullYear()} Urban Farming Initiative. All rights reserved.</p>
      </footer>
    </div>
  );
}