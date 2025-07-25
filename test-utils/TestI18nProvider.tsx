import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import messages from '../messages/en.json';

interface TestI18nProviderProps {
  children: ReactNode;
  locale?: string;
}

export function TestI18nProvider({ 
  children, 
  locale = 'en' 
}: TestI18nProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}