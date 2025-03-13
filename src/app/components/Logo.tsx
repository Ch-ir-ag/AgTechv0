import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export default function Logo({ className = '', showTagline = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      {/* Logo image - this will be replaced by uploading a new image to /public/logo.png */}
      <div className="relative h-8 w-32 mr-2">
        <Image 
          src="/logo.png" 
          alt="Daisy AI Logo" 
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      
     
    </Link>
  );
} 