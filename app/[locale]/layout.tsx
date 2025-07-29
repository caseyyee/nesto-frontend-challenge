import { PageLayout } from "@/components/PageLayout";
import { routing } from "@/i18n/routing";
import { QueryProvider } from "@/providers/QueryProvider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import "../globals.css";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <QueryProvider>
        <NextIntlClientProvider>
          <PageLayout>{children}</PageLayout>
        </NextIntlClientProvider>
      </QueryProvider>
    </html>
  );
}
