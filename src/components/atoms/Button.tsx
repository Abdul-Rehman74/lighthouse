import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Variant = "primary" | "sun" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  sun: "btn btn-sun",
  whatsapp: "btn btn-whatsapp",
  ghost: "btn btn-ghost",
};

const sizeClass: Record<Size, string> = {
  sm: "!text-[13px] !px-[18px] !py-[10px]",
  md: "",
  lg: "!text-[15px] !px-[26px] !py-[16px]",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(variantClass[variant], sizeClass[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
