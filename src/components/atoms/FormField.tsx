"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, className, ...props }, ref) => (
    <div className="mb-3">
      <div className="text-[11px] font-bold text-ink-700 mb-1.5 uppercase tracking-[0.06em]">
        {label}
      </div>
      <input
        ref={ref}
        className={cn(
          "w-full bg-cream-50 rounded-[10px] px-3.5 py-[11px] text-sm text-ink-900",
          "border-[1.5px] border-cream-200 outline-none",
          "focus:border-sun-300 focus:ring-2 focus:ring-sun-300/30 transition-colors",
          className
        )}
        {...props}
      />
    </div>
  )
);

FormField.displayName = "FormField";

export interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, className, ...props }, ref) => (
    <div className="mb-3">
      <div className="text-[11px] font-bold text-ink-700 mb-1.5 uppercase tracking-[0.06em]">
        {label}
      </div>
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-cream-50 rounded-[10px] px-3.5 py-[11px] text-sm text-ink-900",
          "border-[1.5px] border-cream-200 outline-none resize-y",
          "focus:border-sun-300 focus:ring-2 focus:ring-sun-300/30 transition-colors",
          className
        )}
        {...props}
      />
    </div>
  )
);

TextAreaField.displayName = "TextAreaField";

export interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, className, children, ...props }, ref) => (
    <div className="mb-3">
      <div className="text-[11px] font-bold text-ink-700 mb-1.5 uppercase tracking-[0.06em]">
        {label}
      </div>
      <select
        ref={ref}
        className={cn(
          "w-full bg-cream-50 rounded-[10px] px-3.5 py-[11px] text-sm text-ink-900",
          "border-[1.5px] border-cream-200 outline-none cursor-pointer",
          "focus:border-sun-300 focus:ring-2 focus:ring-sun-300/30 transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  )
);

SelectField.displayName = "SelectField";
