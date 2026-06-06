import Link from "next/link";
import type { HomeContent } from "@/features/home/types/home.types";
import type { Locale } from "@/shared/config/locales";
import { Container } from "@/shared/components/ui/Container";

type HomeFooterProps = {
  content: HomeContent["footer"];
  locale: Locale;
};

export function HomeFooter({ content, locale }: HomeFooterProps) {
  return (
    <footer id="contacto" className="bg-[#032f35] py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Link href={`/${locale}`} className="inline-flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-sm font-black text-[#05363d]">
                NH
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-white/55">
                  Cenote
                </p>
                <p className="text-3xl font-black uppercase leading-none text-white">
                  Nohoch
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              {content.description}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {content.columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">
                  {column.title}
                </h3>

                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/60 transition hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs font-medium text-white/45">
          © {new Date().getFullYear()} Cenote Nohoch. Todos los derechos
          reservados.
        </div>
      </Container>
    </footer>
  );
}