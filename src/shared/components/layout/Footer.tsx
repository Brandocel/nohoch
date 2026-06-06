import Link from "next/link";
import type { Locale } from "@/shared/config/locales";
import { footerConfig } from "@/shared/config/footer";
import { Container } from "@/shared/components/ui/Container";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const { columns } = footerConfig[locale];

  return (
    <footer id="contacto" className="bg-[#004E5A] py-14">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="group inline-flex items-center shrink-0">
            <img
              src="/logo.svg"
              alt="Cenote Nohoch"
              className="h-auto w-[160px] transition duration-300 group-hover:scale-[1.03] sm:w-[190px]"
            />
          </Link>

          {/* Columnas */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16">
            {columns.map((column) => (
              <div key={column.title}>
                <h3
                  className="mb-4 font-['Poppins',Arial,sans-serif] text-[18px] font-bold leading-[106%] tracking-[-0.01em] text-white"
                >
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="font-['Poppins',Arial,sans-serif] text-[16px] font-normal leading-[106%] tracking-[-0.01em] text-white/80 transition duration-200 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
