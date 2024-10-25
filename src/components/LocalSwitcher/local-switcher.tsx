'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTransition, useState } from 'react';

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const currentLocale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleLocale = () => {
    setIsAnimating(true); // Start animation
    const nextLocale = currentLocale === 'ar' ? 'en' : 'ar';

    startTransition(() => {
      const segments = pathname.split('/').filter(Boolean);
      if (segments[0] === currentLocale) {
        segments.shift(); // Remove the current locale prefix
      }

      // Construct the new pathname with the next locale
      const newPathname = `/${nextLocale}/${segments.join('/')}`;
      const queryString = searchParams.toString();
      const newUrl = queryString ? `${newPathname}?${queryString}` : newPathname;

      // Simulate loading duration
      setTimeout(() => {
        router.replace(newUrl);
        setIsAnimating(false); // End animation
      }, 600); // Adjust duration as needed
    });
  };

  const buttonLabel = currentLocale === 'ar' ? 'EN' : 'AR';

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className={`locale-toggle-button relative text-white p-1 text-[11px] rounded-md text-xs transition-transform duration-600 ease-in-out 
          ${currentLocale === 'en' ? 'bg-[#F6AA02] font-medium' : 'bg-blue-800'}
          ${isAnimating ? 'opacity-75 transform scale-105 rotate-3' : 'opacity-100 transform scale-100 rotate-0'}
        `}
        onClick={toggleLocale}
        aria-pressed={isPending}
        disabled={isPending}
        aria-label="Toggle language"
      >
        {buttonLabel}
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin border-2 border-t-transparent border-white rounded-full h-4 w-4"></div>
          </div>
        )}
      </button>
    </div>
  );
}
