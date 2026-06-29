"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";

const faqs = [
  {
    q: "What ages do you accept?",
    a: "We welcome children from 2 months onwards. Our rooms are organized by age — infants, toddlers, and pre-K — so each child gets care tuned to their stage.",
  },
  {
    q: "What are your timings?",
    a: "We are open Monday to Saturday, 7:00 AM to 6:00 PM. We are closed on Sundays and gazetted holidays.",
  },
  {
    q: "How do you handle hygiene and sanitization?",
    a: "Sanitization is on a strict daily checklist — linen, toys, surfaces, bottles, and meal areas. Our health & hygiene lead supervises all protocols, and meals are prepared and served under supervision.",
  },
  {
    q: "How many teachers and nannies are on staff?",
    a: "We have 22 trained teachers and 5 professional nannies — a teacher-to-child ratio that means real eyes on every little one, all day.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes — bring your child in for a half-day visit, free of charge. Walk through, meet the teachers, see the rooms. WhatsApp us or fill the form on the Contact page.",
  },
  {
    q: "How do you communicate with parents?",
    a: "Most communication is through WhatsApp — instant updates, photos and quick check-ins. We also share photos and updates on our Instagram and Facebook pages.",
  },
  {
    q: "What is your Montessori approach?",
    a: "Self-directed play with carefully chosen hands-on materials, calibrated to your child's developmental stage. We blend structured circle time with open exploration.",
  },
  {
    q: "Where are you located?",
    a: "We have two branches in Rawalpindi. See the Contact page for addresses and a map.",
  },
];

export function FAQSection() {
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
