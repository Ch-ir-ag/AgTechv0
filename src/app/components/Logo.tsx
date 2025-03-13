import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      {/* Logo image - this will be replaced by uploading a new image to /public/logo.png */}
      <div className="relative h-8 w-32 mr-2">
        <Image 
          src="/logo.png" 
          alt="Daisy AI Logo" 
          fill
          sizes="(max-width: 768px) 100px, 128px"
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </Link>
  );
} 