import React from 'react';

interface NavItem {
  id: string;
  label: string;
  href?: string;
  target?: string;
  onClick?: () => void;
}

interface NavigationProps {
  items: NavItem[];
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { id: 'home', label: 'Home', onClick: () => console.info('Default Home clicked') },
  { id: 'about', label: 'About', href: '#about-section' },
  { id: 'pricing', label: 'Pricing', onClick: () => console.info('Default Pricing clicked') },
  { id: 'get-started-nav', label: 'Get Started', onClick: () => console.info('Default Nav Get Started clicked') },
];

const Navigation: React.FC<NavigationProps> = ({ 
  items = defaultNavItems, 
  className = "" 
}) => {
  return (
    <nav className={`w-full max-w-screen-md mx-auto flex flex-wrap justify-center sm:justify-between items-center px-4 sm:px-8 py-4 text-sm ${className}`}>
      {items.map((item) => {
        const commonProps = {
          key: item.id,
          className: "py-2 px-3 sm:px-4 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10 dark:hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-150 ease-in-out whitespace-nowrap",
          onClick: item.onClick,
        };
        
        if (item.href) {
          return (
            <a 
              href={item.href} 
              target={item.target} 
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined} 
              {...commonProps}
            >
              {item.label}
            </a>
          );
        }
        
        return (
          <button type="button" {...commonProps}>
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};

export { Navigation };
export type { NavItem }; 