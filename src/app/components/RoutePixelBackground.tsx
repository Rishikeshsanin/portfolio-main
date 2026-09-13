"use client";

import { usePathname } from "next/navigation";
import HomeBackground from "./HomeBackground";

export default function RoutePixelBackground() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <HomeBackground quality="lite" />
    </div>
  );
}
