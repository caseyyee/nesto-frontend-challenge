"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import clsx from "clsx";
import { Text } from "./Text";

const localeLabels = {
  en: "EN",
  fr: "FR",
} as const;

const srLabels = {
  en: "English",
  fr: "French",
};

const getSrLabel = (loc: string, isCurrent: boolean) =>
  isCurrent
    ? `Current language: ${srLabels[loc]}`
    : `Switch to ${srLabels[loc]}`;

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-2 rounded-full overflow-hidden">
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={clsx(
            "px-3 py-1 transition-colors",
            locale === loc
              ? "bg-navy-blue text-white"
              : "bg-white text-navy-blue hover:bg-navy-blue hover:text-white",
          )}
        >
          <span className="sr-only">{getSrLabel(loc, locale === loc)}</span>
          <Text>{localeLabels[loc]}</Text>
        </Link>
      ))}
    </div>
  );
}
