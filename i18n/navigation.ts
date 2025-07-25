import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Lightweight wrapper around Next.js' navigation
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
