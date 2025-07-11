import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Logo({ className = '', size = 'medium' }: LogoProps) {
  // Define size configurations
  const sizeConfig = {
    small: { width: '80px', height: 'h-6' },    // ~24px height - for very compact layouts
    medium: { width: '100px', height: 'h-8' },  // ~32px height - default for navbar
    large: { width: '200px', height: 'h-16' }   // ~64px height - for hero sections
  };

  const { width, height } = sizeConfig[size];

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      {/* Logo image - this will be replaced by uploading a new image to /public/logo.png */}
      <div className={`relative ${height} mr-2`} style={{ width }}>
        <Image 
          src="/logo.png" 
          alt="Daisy AI Logo" 
          fill
          sizes={`(max-width: 768px) ${parseInt(width) * 0.8}px, ${width}`}
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </Link>
  );
}   