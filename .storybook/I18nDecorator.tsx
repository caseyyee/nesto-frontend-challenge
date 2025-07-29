import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../messages/en.json';

interface I18nDecoratorProps {
  children: React.ReactNode;
}

export function I18nDecorator({ children }: I18nDecoratorProps) {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}