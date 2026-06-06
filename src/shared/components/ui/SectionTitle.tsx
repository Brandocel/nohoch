import { cn } from "@/shared/lib/utils";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-black uppercase tracking-[0.35em] text-[#d8d20d]">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="text-sm leading-7 text-white/75 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}