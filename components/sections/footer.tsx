import Image from "next/image";
import { IMAGES } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-7 px-5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Image
          src={IMAGES.logo}
          alt="Al-Karim Medical Complex"
          width={658}
          height={235}
          unoptimized
          className="h-6 w-auto opacity-40"
        />
        <span className="text-white/60 text-xs text-center">
          © {new Date().getFullYear()} Al-Karim Medical Complex, Minchinabad ·
          All rights reserved.
        </span>
      </div>
    </footer>
  );
}
