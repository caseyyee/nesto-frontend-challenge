import { Background } from "@/components/Background";
import { PageHeader } from "@/components/PageHeader";
import clsx from "clsx";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body
      className={clsx(
        montserrat.variable,
        "font-montserrat text-navy-blue",
        "min-h-screen flex flex-col",
      )}
    >
      <div className={clsx("flex-1 relative")}>
        <div className="absolute inset-0 bg-baby-blue overflow-hidden">
          <Background />
        </div>

        <div className="relative mb-12">
          <PageHeader />
          {children}
        </div>
      </div>
    </body>
  );
};
