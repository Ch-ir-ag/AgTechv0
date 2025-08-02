import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// A simple SVG Play Icon
const PlayIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5V19L19 12L8 5Z" />
  </svg>
);

interface MediaDisplayProps {
  imageUrl?: string;
  videoUrl?: string;
  className?: string;
  placeholderText?: string;
}

const MediaDisplay: React.FC<MediaDisplayProps> = ({ 
  imageUrl, 
  videoUrl, 
  className = "",
  placeholderText = "Card Content Area"
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && videoUrl) {
      const handleVideoEnd = () => {
        setShowVideo(false);
        videoElement.currentTime = 0;
      };

      if (showVideo) {
        videoElement.play().catch(error => {
          console.error("MediaDisplay: Error playing video:", error);
          setShowVideo(false);
        });
        videoElement.addEventListener('ended', handleVideoEnd);
      } else {
        videoElement.pause();
      }

      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [showVideo, videoUrl]);

  const handlePlayButtonClick = () => {
    if (videoUrl) {
      setShowVideo(true);
    }
  };

  return (
    <div className={`mt-12 lg:mt-16 w-full max-w-screen-sm mx-auto overflow-hidden px-4 sm:px-2 ${className}`}>
      <div className="bg-border rounded-[2rem] p-[0.25rem]">
        <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-[1.75rem] bg-card flex items-center justify-center overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              className={`object-cover transition-opacity duration-300 ${
                showVideo ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            />
          )}
          {videoUrl && (
            <video
              ref={videoRef}
              src={videoUrl}
              muted
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                showVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          )}
          {!showVideo && videoUrl && imageUrl && (
            <button
              onClick={handlePlayButtonClick}
              className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 p-2 sm:p-3 bg-accent/30 hover:bg-accent/50 text-accent-foreground backdrop-blur-sm rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Play video"
            >
              <PlayIcon className="w-4 h-4 sm:w-5 sm:h-6" />
            </button>
          )}
          {!imageUrl && !videoUrl && (
            <div className="text-muted-foreground italic">{placeholderText}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export { MediaDisplay }; 