import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'auto' | 'black' | 'white';
}

export function LogoSvg({ className, variant = 'auto' }: LogoProps) {
  // Correct mapping:
  // logo-black.png = BLACK text (for light backgrounds)
  // logo-white.png = WHITE text (for dark backgrounds)

  // For footer (white variant), we want width-based sizing
  // For header (black variant), we want height-based on mobile, width on desktop
  const isFooter = variant === 'white';

  return (
    <div className={cn("relative flex items-center", className)}>
      {/* Light Mode / Black variant: Show BLACK text logo */}
      {(variant === 'auto' || variant === 'black') && (
        <Image
          src="/logo-black.png"
          alt="Colored by Perry"
          width={292}
          height={61}
          quality={100}
          unoptimized
          className={cn(
            isFooter ? "w-full h-auto object-contain" : "h-full w-auto md:w-full md:h-auto object-contain",
            variant === 'auto' && "dark:hidden"
          )}
          priority
        />
      )}

      {/* Dark Mode / White variant: Show WHITE text logo */}
      {(variant === 'auto' || variant === 'white') && (
        <Image
          src="/logo-white.png"
          alt="Colored by Perry"
          width={292}
          height={61}
          quality={100}
          unoptimized
          className={cn(
            "w-full h-auto object-contain",
            variant === 'auto' ? "hidden dark:block" : ""
          )}
          priority
        />
      )}
    </div>
  );
}
