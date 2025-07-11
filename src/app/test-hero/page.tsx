"use client";

import { DemoOne } from "@/components/ui/demo";
import { HeroSection } from "@/components/ui/dynamic-hero";

export default function TestHeroPage() {
  return (
    <div className="min-h-screen">
      {/* Demo with predefined content */}
      <DemoOne />
      
      {/* Custom hero section */}
      <div className="min-h-screen">
        <HeroSection
          heading="Test Your New Hero Component"
          tagline="Move your mouse around to see the interactive canvas arrow pointing to the button. Click the play button to test video functionality."
          buttonText="Try Me!"
          imageUrl="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
          videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
          navItems={[
            { id: 'home', label: 'Home', onClick: () => alert('Home clicked!') },
            { id: 'about', label: 'About', href: '#about-section' },
            { id: 'contact', label: 'Contact', onClick: () => alert('Contact clicked!') },
          ]}
        />
      </div>
    </div>
  );
} 