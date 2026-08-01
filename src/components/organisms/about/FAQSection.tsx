"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import type { FaqEntry } from "@/lib/site-settings";

/**
 * Client component (Radix accordion), so the About page fetches the admin-managed
 * FAQs server-side and passes them in.
 */
export function FAQSection({ faqs }: { faqs: FaqEntry[] }) {
  if (!faqs.length) return null;

  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 md:gap-14 items-start">
          <div className="lg:sticky lg:top-32">
            <Eyebrow color="text-coral-400">parents ask</Eyebrow>
            <h2 className="text-4xl md:text-5xl mt-2 leading-tight">
              Anything on<br />your mind?
            </h2>
            <p className="text-base text-ink-700 mt-4 max-w-[320px]">
              If your question isn&apos;t here, WhatsApp us — we usually reply within an hour.
            </p>
          </div>
          <Accordion.Root type="single" collapsible defaultValue="item-0" className="flex flex-col gap-3.5">
            {faqs.map((f, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="bg-white border-[1.5px] border-cream-200 rounded-[20px] data-[state=open]:bg-cream-100 transition-colors"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group w-full text-left p-6 flex justify-between items-center gap-4">
                    <div className="font-display font-bold text-lg md:text-[19px] text-ink-900">{f.q}</div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-sun-300 text-ink-900 group-data-[state=open]:bg-ink-900 group-data-[state=open]:text-cream-50 transition-colors">
                      <Plus size={18} className="group-data-[state=open]:hidden" />
                      <Minus size={18} className="hidden group-data-[state=open]:block" />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-fade-up">
                  <p className="text-[15px] text-ink-700 leading-relaxed px-6 pb-6">{f.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </Container>
    </section>
  );
}
