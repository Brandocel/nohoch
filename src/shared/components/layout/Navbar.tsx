import Link from "next/link";
import type { NavigationItem } from "@/shared/config/navigation";

type NavbarProps = {
  items: NavigationItem[];
};

export function Navbar({ items }: NavbarProps) {
  return (
    <nav className="flex items-center gap-8 xl:gap-12">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="relative text-[18px] font-medium leading-none text-white transition duration-300 hover:text-white/80 xl:text-[24px]"
        >
          {item.label}

          <span className="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-white transition-all duration-300 group-hover:w-full" />
        </Link>
      ))}
    </nav>
  );
}