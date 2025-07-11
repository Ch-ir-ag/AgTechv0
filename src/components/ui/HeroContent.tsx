import React, { forwardRef } from 'react';

interface HeroContentProps {
  heading?: string;
  tagline?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const HeroContent = forwardRef<HTMLButtonElement, HeroContentProps>(
  ({ 
    heading = "Something you really want",
    tagline = "You can't live without this product. I'm sure of it.",
    buttonText = "Get Started",
    onButtonClick,
    className = ""
  }, ref) => {
    return (
      <main className={`flex-grow flex flex-col items-center justify-center ${className}`}>
        <div className="mt-12 sm:mt-16 lg:mt-24 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-center px-4">
            {heading}
          </h1>
          <p className="mt-3 block text-muted-foreground text-center text-base sm:text-lg px-4 max-w-xl">
            {tagline}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            ref={ref}
            onClick={onButtonClick}
            className="py-2 px-4 rounded-xl border border-foreground/50 hover:border-foreground/80 text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {buttonText}
          </button>
        </div>
      </main>
    );
  }
);

HeroContent.displayName = 'HeroContent';

export { HeroContent }; 