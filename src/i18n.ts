import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';

// Infer the type from the locales array
type Locale = typeof locales[number]; // "en" | "ar"

export default getRequestConfig(async ({ locale }) => {
  // Type assertion to ensure `locale` matches the valid types
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
