import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { LanguageToggle } from "./LanguageToggle";

export async function PageHeader() {
  const t = await getTranslations("HomePage");

  return (
    <header className="flex items-center justify-between mx-auto max-w-7xl sm:px-6 lg:px-8">
      <nav className="p-4">
        <Link href="/">
          <Image
            src={`/logo-nesto-en.svg`}
            alt={t("logo")}
            width={121}
            height={52}
          />
        </Link>
      </nav>
      <div className="p-4">
        <LanguageToggle />
      </div>
    </header>
  );
}
