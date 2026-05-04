import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main";
}) {
  return (
    <Tag className={cn("max-w-[1440px] mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-16", className)}>
      {children}
    </Tag>
  );
}
