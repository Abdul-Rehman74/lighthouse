import { Container } from "@/components/atoms/Container";
import { WhatsAppLink } from "@/components/atoms/WhatsAppLink";

export function LearningLoungeContact() {
  return (
    <section id="contact" className="py-20">
      <Container>
        <div className="bg-cream-100 rounded-[28px] md:rounded-[32px] p-7 md:px-16 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <div className="hand text-[22px] leading-none text-coral-400">
              contact us to learn more
            </div>
            <h2 className="text-3xl md:text-[40px] mt-2 leading-tight">
              Let&apos;s talk about
              <br />
              your child.
            </h2>
            <p className="text-[17px] text-ink-700 mt-4 leading-relaxed max-w-[400px]">
              Reach out for a calm, no-pressure conversation about how Learning Lounge can help — we
              usually reply within an hour.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <WhatsAppLink href="https://wa.me/923335566862" className="btn btn-whatsapp !text-[15px]">
                💬 WhatsApp us
              </WhatsAppLink>
              <a href="tel:03335566862" className="btn btn-sun !text-[15px]">
                Call 0333-5566862
              </a>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-7 md:p-8 border-[1.5px] border-cream-200 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div
                className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-2xl shrink-0"
                style={{ background: "#FFE27A" }}
              >
                👩
              </div>
              <div>
                <div className="font-display font-bold text-lg leading-tight">Amira Malik</div>
                <div className="text-[13px] text-ink-500 mt-1">Principal</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-2xl shrink-0"
                style={{ background: "#C8EBD7" }}
              >
                📞
              </div>
              <div>
                <div className="font-display font-bold text-lg leading-tight">0333-5566862</div>
                <div className="text-[13px] text-ink-500 mt-1">Mon–Sat · 7am–6pm</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div
                className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-2xl shrink-0"
                style={{ background: "#C9E7FF" }}
              >
                📍
              </div>
              <div>
                <div className="font-display font-bold text-lg leading-tight">Lighthouse Daycare</div>
                <div className="text-[13px] text-ink-700 mt-1 leading-relaxed">
                  House No. 164, Street 8, Main Double Road,
                  <br />
                  Chaklala Scheme III, Rawalpindi
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
