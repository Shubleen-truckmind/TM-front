import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type FeatureItem = {
  title: string;
  description: string;
};

type Plan = {
  name: string;
  price: string;
  description: string;
  badge?: string;
  cta: string;
  features: string[];
};

type Audience = {
  title: string;
  description: string;
};

const IMAGE_PATHS = {
  hero: "/images/fmcsa-intelligence.webp",
  fleet: "/images/truck-fleet-night.webp",
};

const subscriptionFeatures = [
  "Company Name",
  "Owner Information",
  "Verified Phone Numbers",
  "Verified Email Addresses",
  "MC & DOT Numbers",
  "Fleet Information",
  "State & Location Data",
  "Advanced Search Filters",
  "Built-In CRM Access",
  "Unlimited Searches",
];

const audiences: Audience[] = [
  {
    title: "Insurance Agencies",
    description: "Find active trucking companies, verify carrier risk, and support underwriting conversations.",
  },
  {
    title: "Permit Companies",
    description: "Reach carriers that need operational support, authority assistance, and permit services.",
  },
  {
    title: "Freight Brokers",
    description: "Evaluate carrier legitimacy, operating status, and safety signals before outreach or onboarding.",
  },
  {
    title: "Compliance Consultants",
    description: "Target carriers that need compliance guidance, risk review, and safety improvement support.",
  },
  {
    title: "Factoring Companies",
    description: "Build stronger prospect lists using verified trucking company and carrier intelligence data.",
  },
  {
    title: "Dispatch Providers",
    description: "Connect with carriers that can benefit from dispatch support and operational growth services.",
  },
  {
    title: "Fuel Card Companies",
    description: "Identify fleets by location, size, authority age, and operating status for targeted outreach.",
  },
  {
    title: "Transportation Technology Providers",
    description: "Sell software and operational solutions to trucking companies with better qualification data.",
  },
];

const searchFilters = [
  "State",
  "Fleet Size",
  "Authority Age",
  "MC Number",
  "DOT Number",
  "Operating Status",
  "Location",
  "Carrier Type",
];

const differenceItems: FeatureItem[] = [
  {
    title: "Authority Verification",
    description:
      "Confirm whether a carrier is active, operating, and worth contacting before your team spends time on outreach.",
  },
  {
    title: "Carrier Profiles",
    description:
      "See company, fleet, authority, location, and carrier intelligence details in one clean profile.",
  },
  {
    title: "Fleet Visibility",
    description:
      "Prioritize companies by fleet size and operational fit instead of calling every generic lead on a list.",
  },
  {
    title: "Operational Status",
    description:
      "Understand carrier status and activity so sales teams can focus on real opportunities.",
  },
  {
    title: "Compliance Indicators",
    description:
      "Use compliance and safety signals to qualify prospects with more context before the first call.",
  },
  {
    title: "Growth Intelligence",
    description:
      "Identify carriers with signals that indicate expansion, buying intent, or stronger service demand.",
  },
];

const safetyReportFeatures = [
  "FMCSA Safety Ratings",
  "CSA Score Analysis",
  "Inspection History",
  "Out-of-Service Rates",
  "Compliance Review",
  "Authority Verification",
  "Carrier Risk Indicators",
  "Fraud & Double Brokering Signals",
  "Carrier Safety Summary",
  "Risk Mitigation Recommendations",
];

const safetyUseCases = [
  "Insurance Underwriting",
  "Carrier Vetting",
  "Compliance Reviews",
  "Risk Assessments",
  "Broker Due Diligence",
];

const growthOpportunities: FeatureItem[] = [
  {
    title: "Generate More Leads",
    description: "Build a larger trucking prospect pipeline with verified company and decision-maker data.",
  },
  {
    title: "Prioritize Better Prospects",
    description: "Focus on trucking companies most likely to buy your insurance, permits, compliance, software, or operations service.",
  },
  {
    title: "Access Carrier Intelligence",
    description: "Understand who you are contacting before outreach with MC, DOT, fleet, status, and compliance context.",
  },
  {
    title: "Purchase Safety Reports On Demand",
    description: "Gain deeper safety and risk insights whenever additional due diligence is required.",
  },
];

const roiBullets = [
  "Reach More Trucking Companies",
  "Connect With Decision-Makers",
  "Improve Sales Productivity",
  "Build A Predictable Pipeline",
  "Increase Revenue Opportunities",
];

const plans: Plan[] = [
  {
    name: "Growth Plan",
    price: "$499/Month",
    badge: "Best for growing teams",
    description:
      "Designed for growing sales teams that need larger outreach capabilities and verified trucking prospect data.",
    cta: "Book Demo",
    features: [
      "Verified Trucking Company Database",
      "Phone Numbers",
      "Email Addresses",
      "MC & DOT Information",
      "Fleet Information",
      "Unlimited Searches",
      "CRM Access",
      "Advanced Search Filters",
      "Ongoing Data Updates",
      "Additional User Seats",
      "Advanced Search Capabilities",
      "Priority Support",
      "Expanded Data Access",
      "Enhanced CRM Features",
      "Lead Export Options",
    ],
  },
  {
    name: "Carrier Intelligence Plan",
    price: "Custom Pricing",
    badge: "Advanced intelligence",
    description:
      "For organizations requiring advanced carrier intelligence, safety analysis, and large-scale outreach.",
    cta: "Get A Quote",
    features: [
      "Everything In Growth",
      "Detailed Carrier Safety Reports",
      "FMCSA Safety Intelligence",
      "CSA Score Analysis",
      "Compliance Intelligence",
      "Carrier Risk Assessments",
      "Fraud & Double Brokering Insights",
      "Bulk Email Campaign Capability",
      "Dedicated Account Manager",
      "Custom Data Requirements",
      "Team Training & Onboarding",
    ],
  },
];

const faqs = [
  {
    question: "Who is TruckMind built for?",
    answer:
      "TruckMind is built for insurance agencies, permit companies, freight brokers, compliance consultants, factoring companies, dispatch providers, fuel card companies, and transportation technology providers selling into the trucking industry.",
  },
  {
    question: "What data is included in the subscription?",
    answer:
      "The subscription includes verified trucking company data such as company names, owner information, phone numbers, email addresses, MC and DOT numbers, fleet information, location data, search filters, built-in CRM access, and unlimited searches.",
  },
  {
    question: "How is TruckMind different from a basic lead list?",
    answer:
      "Most lead providers only provide contact information. TruckMind adds carrier intelligence, authority verification, fleet visibility, operational status, compliance indicators, and growth intelligence so your team understands who they are contacting before outreach.",
  },
  {
    question: "Can I purchase detailed safety reports?",
    answer:
      "Yes. TruckMind supports on-demand carrier safety reports with FMCSA ratings, CSA score analysis, inspection history, out-of-service rates, authority verification, carrier risk indicators, fraud and double-brokering signals, safety summaries, and risk mitigation recommendations.",
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M8.1 14.7 3.8 10.4l1.4-1.4 2.9 2.9 6.7-6.7 1.4 1.4-8.1 8.1Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.5 5 20.5 12l-7 7-1.4-1.45L16.65 13H3.5v-2h13.15L12.1 6.45 13.5 5Z" />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19h3V9H4v10Zm6 0h3V5h-3v14Zm6 0h3v-7h-3v7Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 4.5 5.2v6.7c0 4.8 3.2 9.2 7.5 10.1 4.3-.9 7.5-5.3 7.5-10.1V5.2L12 2Zm0 2.2 5.5 2.35v5.35c0 3.75-2.25 7.1-5.5 8.05-3.25-.95-5.5-4.3-5.5-8.05V6.55L12 4.2Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m20.5 19.1-4.7-4.7a7.2 7.2 0 1 0-1.4 1.4l4.7 4.7 1.4-1.4ZM5 10.2a5.2 5.2 0 1 1 10.4 0 5.2 5.2 0 0 1-10.4 0Z" />
    </svg>
  );
}

function App() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const softwareSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "TruckMind",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "TruckMind is a trucking growth intelligence platform for verified trucking prospects, safety intelligence, compliance data, carrier profiles, and on-demand carrier safety reports.",
      offers: [
        {
          "@type": "Offer",
          name: "Growth Plan",
          price: "499",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Carrier Intelligence Plan",
          price: "Custom",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      ],
      audience: {
        "@type": "Audience",
        audienceType:
          "Insurance agencies, permit companies, freight brokers, compliance consultants, factoring companies, dispatch providers, fuel card companies, and transportation technology providers",
      },
    }),
    []
  );

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    }),
    []
  );

  useEffect(() => {
    document.title = "TruckMind | Verified Trucking Prospects, FMCSA Safety Intelligence & Compliance Data";

    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMeta(
      "description",
      "TruckMind helps insurance agencies, freight brokers, permit companies, compliance consultants, factoring companies, dispatch providers, fuel card companies, and transportation tech providers access verified trucking prospects, FMCSA safety intelligence, compliance data, carrier profiles, and on-demand safety reports."
    );
    setMeta(
      "keywords",
      "trucking leads, verified carrier contacts, FMCSA safety intelligence, trucking company database, carrier safety reports, DOT number lookup, MC number data, trucking CRM, carrier compliance data, trucking prospecting platform"
    );
    setMeta("robots", "index, follow");
    setMeta("og:title", "TruckMind | Verified Trucking Prospects + Safety Intelligence", "property");
    setMeta(
      "og:description",
      "Find verified trucking companies, connect with decision-makers, access carrier intelligence, and purchase detailed carrier safety reports on demand.",
      "property"
    );
    setMeta("og:type", "website", "property");
    setMeta("og:image", "/images/fmcsa-intelligence.webp", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "TruckMind | Trucking Growth Intelligence Platform");
    setMeta(
      "twitter:description",
      "Verified trucking prospects, FMCSA safety intelligence, compliance data, built-in CRM access, and detailed carrier safety reports.",
    );
    setMeta("twitter:image", "/images/fmcsa-intelligence.webp");

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".nav-shell", {
        y: -24,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
      });

      gsap.from(".hero-copy > *", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        stagger: 0.11,
        ease: "power3.out",
      });

      gsap.from(".hero-visual", {
        x: 50,
        opacity: 0,
        duration: 1.05,
        ease: "power3.out",
      });

      gsap.to(".hero-glow", {
        scale: 1.18,
        opacity: 0.72,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 42,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 84%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".stagger-scope").forEach((scope) => {
        gsap.from(scope.querySelectorAll(".stagger-item"), {
          y: 28,
          opacity: 0,
          duration: 0.65,
          stagger: 0.075,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scope,
            start: "top 82%",
          },
        });
      });

      gsap.to(".floating-card", {
        y: -14,
        duration: 2.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".fleet-image", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".fleet-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="truckmind-page" ref={rootRef}>
      <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <style>{`
        :root {
          --bg: #050914;
          --bg-2: #07111f;
          --surface: rgba(10, 19, 34, 0.78);
          --surface-solid: #0b1728;
          --surface-2: #101f35;
          --card: rgba(13, 24, 42, 0.72);
          --card-2: rgba(19, 35, 58, 0.72);
          --line: rgba(148, 163, 184, 0.16);
          --line-strong: rgba(59, 130, 246, 0.42);
          --text: #f8fafc;
          --muted: #cbd5e1;
          --soft: #94a3b8;
          --dim: #64748b;
          --blue: #2f7df6;
          --blue-2: #60a5fa;
          --cyan: #22d3ee;
          --green: #22c55e;
          --amber: #f59e0b;
          --danger: #fb7185;
          --radius: 24px;
          --radius-lg: 34px;
          --shadow: 0 28px 100px rgba(0, 0, 0, 0.42);
          color-scheme: dark;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--bg);
          color: var(--text);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .truckmind-page {
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 16% 12%, rgba(47, 125, 246, 0.24), transparent 32%),
            radial-gradient(circle at 82% 6%, rgba(34, 211, 238, 0.12), transparent 26%),
            radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.55), transparent 42%),
            linear-gradient(180deg, #050914 0%, #07111f 42%, #050914 100%);
        }

        .truckmind-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
          background-size: 58px 58px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.65), transparent 78%);
          z-index: 0;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input,
        textarea {
          font: inherit;
        }

        .container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .section {
          padding: 96px 0;
          position: relative;
          z-index: 2;
        }

        .section-tight {
          padding: 72px 0;
        }

        .nav-wrap {
          position: fixed;
          inset: 18px 0 auto 0;
          z-index: 50;
          pointer-events: none;
        }

        .nav-shell {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 12px 14px 12px 16px;
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-radius: 999px;
          background: rgba(5, 9, 20, 0.72);
          box-shadow: 0 18px 70px rgba(0,0,0,0.3);
          backdrop-filter: blur(18px);
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 850;
          letter-spacing: -0.04em;
          font-size: 1.08rem;
        }

        .brand-mark {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          background:
            linear-gradient(135deg, rgba(96,165,250,1), rgba(37,99,235,1));
          display: grid;
          place-items: center;
          box-shadow: 0 12px 36px rgba(37,99,235,0.34);
        }

        .brand-mark svg {
          width: 21px;
          height: 21px;
          fill: white;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 26px;
          color: var(--soft);
          font-size: 0.9rem;
        }

        .nav-links a {
          transition: color 180ms ease;
        }

        .nav-links a:hover {
          color: var(--text);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn {
          border: 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 999px;
          padding: 13px 19px;
          font-weight: 760;
          line-height: 1;
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
          white-space: nowrap;
        }

        .btn svg {
          width: 17px;
          height: 17px;
          fill: currentColor;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          box-shadow: 0 18px 46px rgba(37, 99, 235, 0.34);
        }

        .btn-primary:hover {
          box-shadow: 0 24px 62px rgba(37, 99, 235, 0.46);
        }

        .btn-secondary {
          border: 1px solid rgba(148, 163, 184, 0.22);
          color: var(--text);
          background: rgba(255,255,255,0.06);
        }

        .btn-secondary:hover {
          border-color: rgba(96, 165, 250, 0.55);
          background: rgba(96, 165, 250, 0.1);
        }

        .btn-small {
          padding: 10px 14px;
          font-size: 0.86rem;
        }

        .hero {
          position: relative;
          min-height: 100vh;
          padding: 148px 0 80px;
          display: flex;
          align-items: center;
        }

        .hero-glow {
          position: absolute;
          width: 680px;
          height: 680px;
          right: -240px;
          top: 30px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(47,125,246,0.28), rgba(34,211,238,0.08) 42%, transparent 68%);
          filter: blur(12px);
          z-index: 1;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(420px, 1.08fr);
          gap: 58px;
          align-items: center;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border: 1px solid rgba(96, 165, 250, 0.26);
          background: rgba(37, 99, 235, 0.1);
          color: #bfdbfe;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 760;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .eyebrow-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--green);
          box-shadow: 0 0 0 7px rgba(34, 197, 94, 0.14);
        }

        h1,
        h2,
        h3,
        p {
          margin: 0;
        }

        h1 {
          margin-top: 24px;
          font-size: clamp(3rem, 6.5vw, 6.35rem);
          line-height: 0.93;
          letter-spacing: -0.078em;
          max-width: 780px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff 12%, #bfdbfe 44%, #60a5fa 72%, #22d3ee 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-lead {
          max-width: 650px;
          margin-top: 25px;
          color: var(--muted);
          font-size: clamp(1.05rem, 1.45vw, 1.28rem);
          line-height: 1.78;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 34px;
        }

        .hero-proof {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 38px;
          max-width: 660px;
        }

        .proof-card {
          padding: 16px;
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 18px;
          background: rgba(255,255,255,0.045);
        }

        .proof-card strong {
          display: block;
          font-size: 1.38rem;
          letter-spacing: -0.04em;
        }

        .proof-card span {
          display: block;
          margin-top: 3px;
          color: var(--soft);
          font-size: 0.83rem;
          line-height: 1.35;
        }

        .hero-visual {
          position: relative;
          min-height: 610px;
          border-radius: var(--radius-lg);
        }

        .hero-image-shell {
          position: absolute;
          inset: 0;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid rgba(96, 165, 250, 0.28);
          background: #061020;
          box-shadow: var(--shadow);
        }

        .hero-image-shell::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(5,9,20,0.3), transparent 44%),
            linear-gradient(180deg, transparent 55%, rgba(5,9,20,0.78));
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.04);
        }

        .floating-card {
          position: absolute;
          z-index: 3;
          width: min(350px, 72%);
          border-radius: 22px;
          padding: 18px;
          background: rgba(7, 17, 31, 0.78);
          border: 1px solid rgba(148, 163, 184, 0.22);
          box-shadow: 0 26px 72px rgba(0,0,0,0.42);
          backdrop-filter: blur(18px);
        }

        .floating-card.top {
          top: 42px;
          left: -24px;
        }

        .floating-card.bottom {
          right: -20px;
          bottom: 42px;
        }

        .floating-label {
          color: var(--soft);
          font-size: 0.78rem;
          margin-bottom: 10px;
        }

        .floating-title {
          font-size: 1rem;
          font-weight: 820;
          letter-spacing: -0.025em;
        }

        .score-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 13px;
          margin-top: 14px;
          color: var(--muted);
          font-size: 0.82rem;
        }

        .score-bar {
          flex: 1;
          height: 7px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(148,163,184,0.18);
        }

        .score-bar span {
          display: block;
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #22c55e, #60a5fa);
        }

        .mini-list {
          display: grid;
          gap: 9px;
          margin-top: 14px;
        }

        .mini-list div {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: var(--soft);
          font-size: 0.82rem;
        }

        .mini-list strong {
          color: var(--text);
        }

        .section-header {
          max-width: 760px;
          margin-bottom: 42px;
        }

        .section-header.center {
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }

        .section-kicker {
          color: var(--blue-2);
          font-size: 0.8rem;
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          margin-bottom: 16px;
        }

        h2 {
          font-size: clamp(2.1rem, 4vw, 4rem);
          line-height: 1.02;
          letter-spacing: -0.058em;
        }

        .section-copy {
          margin-top: 17px;
          color: var(--muted);
          font-size: 1.05rem;
          line-height: 1.75;
        }

        .logos-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .logo-tile {
          border: 1px solid rgba(148, 163, 184, 0.14);
          border-radius: 18px;
          padding: 18px;
          background: rgba(255,255,255,0.04);
          color: var(--soft);
          text-align: center;
          font-weight: 760;
        }

        .grid-4 {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .card {
          border: 1px solid rgba(148, 163, 184, 0.15);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025));
          border-radius: var(--radius);
          padding: 24px;
          box-shadow: 0 16px 70px rgba(0,0,0,0.18);
        }

        .card:hover {
          border-color: rgba(96, 165, 250, 0.4);
        }

        .feature-check {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--muted);
          font-size: 0.95rem;
          min-height: 28px;
        }

        .feature-check svg,
        .feature-list-item svg {
          width: 19px;
          height: 19px;
          min-width: 19px;
          fill: var(--green);
          border-radius: 999px;
          background: rgba(34, 197, 94, 0.11);
        }

        .audience-card {
          min-height: 188px;
        }

        .icon-box {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          background: rgba(47,125,246,0.13);
          border: 1px solid rgba(96,165,250,0.26);
          margin-bottom: 18px;
        }

        .icon-box svg {
          width: 24px;
          height: 24px;
          fill: #93c5fd;
        }

        .card h3 {
          font-size: 1.08rem;
          letter-spacing: -0.025em;
        }

        .card p {
          margin-top: 10px;
          color: var(--soft);
          line-height: 1.65;
          font-size: 0.94rem;
        }

        .split-section {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
          gap: 48px;
          align-items: center;
        }

        .glass-panel {
          border: 1px solid rgba(96,165,250,0.24);
          background:
            radial-gradient(circle at 15% 15%, rgba(59,130,246,0.24), transparent 32%),
            linear-gradient(180deg, rgba(15, 23, 42, 0.84), rgba(7, 17, 31, 0.86));
          border-radius: var(--radius-lg);
          padding: 26px;
          box-shadow: var(--shadow);
        }

        .search-demo {
          border-radius: 23px;
          overflow: hidden;
          background: rgba(5, 9, 20, 0.78);
          border: 1px solid rgba(148, 163, 184, 0.15);
        }

        .search-demo-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px;
          border-bottom: 1px solid rgba(148,163,184,0.13);
        }

        .search-demo-header svg {
          width: 18px;
          height: 18px;
          fill: var(--soft);
        }

        .fake-input {
          flex: 1;
          color: var(--dim);
          font-size: 0.9rem;
        }

        .table-row {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr 0.7fr 0.7fr;
          gap: 14px;
          padding: 15px 16px;
          border-bottom: 1px solid rgba(148,163,184,0.1);
          color: var(--muted);
          font-size: 0.88rem;
        }

        .table-row.header {
          color: var(--dim);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.7rem;
          font-weight: 850;
        }

        .status {
          color: #86efac;
        }

        .pill-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 30px;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(148, 163, 184, 0.16);
          background: rgba(255,255,255,0.045);
          border-radius: 999px;
          padding: 10px 13px;
          color: var(--muted);
          font-size: 0.9rem;
        }

        .pill::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--blue-2);
          box-shadow: 0 0 0 5px rgba(96,165,250,0.12);
        }

        .difference-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 40px;
          align-items: start;
        }

        .feature-list {
          display: grid;
          gap: 14px;
        }

        .feature-list-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          color: var(--muted);
          line-height: 1.55;
        }

        .feature-list-item strong {
          color: var(--text);
          display: block;
          margin-bottom: 2px;
        }

        .fleet-section {
          position: relative;
          overflow: hidden;
          border-block: 1px solid rgba(148,163,184,0.13);
          background: rgba(3,7,18,0.46);
        }

        .fleet-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .fleet-image {
          width: 100%;
          height: 120%;
          object-fit: cover;
          opacity: 0.32;
          filter: saturate(1.1) contrast(1.05);
        }

        .fleet-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, #050914 0%, rgba(5,9,20,0.82) 38%, rgba(5,9,20,0.42) 100%),
            linear-gradient(180deg, #050914 0%, transparent 18%, #050914 100%);
        }

        .safety-card {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 28px;
          align-items: center;
        }

        .score-circle {
          width: 176px;
          height: 176px;
          border-radius: 999px;
          margin: 0 auto;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle at center, #0b1728 0 56%, transparent 57%),
            conic-gradient(#22c55e 0 78%, rgba(148,163,184,0.18) 78% 100%);
          box-shadow: inset 0 0 42px rgba(34,197,94,0.18), 0 26px 80px rgba(0,0,0,0.3);
        }

        .score-circle strong {
          font-size: 3rem;
          letter-spacing: -0.08em;
        }

        .score-circle span {
          display: block;
          color: #86efac;
          font-size: 0.82rem;
          text-align: center;
          margin-top: -8px;
        }

        .safety-list-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .use-case-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }

        .use-case {
          padding: 10px 13px;
          border-radius: 999px;
          color: #dbeafe;
          background: rgba(37, 99, 235, 0.14);
          border: 1px solid rgba(96,165,250,0.24);
          font-size: 0.88rem;
          font-weight: 720;
        }

        .roi-card {
          position: relative;
          overflow: hidden;
          text-align: center;
          border-radius: 38px;
          padding: 58px;
          border: 1px solid rgba(96, 165, 250, 0.31);
          background:
            radial-gradient(circle at 50% -20%, rgba(37, 99, 235, 0.38), transparent 45%),
            linear-gradient(180deg, rgba(15,23,42,0.9), rgba(7,17,31,0.78));
          box-shadow: var(--shadow);
        }

        .roi-card h2 {
          max-width: 850px;
          margin: 0 auto;
        }

        .roi-card p {
          max-width: 780px;
          margin: 18px auto 0;
          color: var(--muted);
          line-height: 1.75;
          font-size: 1.06rem;
        }

        .roi-list {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 11px;
          margin-top: 30px;
        }

        .pricing-card {
          padding: 30px;
          min-height: 100%;
        }

        .pricing-card.featured {
          border-color: rgba(96,165,250,0.5);
          background:
            radial-gradient(circle at 25% 0%, rgba(37,99,235,0.22), transparent 38%),
            linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025));
        }

        .plan-top {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .badge {
          display: inline-flex;
          border-radius: 999px;
          padding: 8px 11px;
          color: #dbeafe;
          background: rgba(37,99,235,0.14);
          border: 1px solid rgba(96,165,250,0.24);
          font-size: 0.75rem;
          font-weight: 820;
          white-space: nowrap;
        }

        .price {
          margin-top: 16px;
          font-size: clamp(2.1rem, 3vw, 3.3rem);
          font-weight: 900;
          letter-spacing: -0.07em;
        }

        .plan-features {
          display: grid;
          gap: 11px;
          margin: 26px 0;
        }

        .faq-item {
          padding: 24px;
        }

        .faq-item h3 {
          font-size: 1rem;
        }

        .faq-item p {
          color: var(--soft);
          line-height: 1.7;
        }

        .cta-final {
          text-align: center;
          padding: 88px 0 104px;
        }

        .cta-final h2 {
          max-width: 900px;
          margin: 0 auto;
        }

        .cta-final p {
          max-width: 650px;
          margin: 18px auto 0;
          color: var(--muted);
          line-height: 1.75;
        }

        .footer {
          border-top: 1px solid rgba(148,163,184,0.13);
          padding: 30px 0;
          color: var(--dim);
          font-size: 0.9rem;
        }

        .footer .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        @media (max-width: 1080px) {
          .hero-grid,
          .split-section,
          .difference-grid,
          .safety-card {
            grid-template-columns: 1fr;
          }

          .hero-visual {
            min-height: 520px;
          }

          .grid-4 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .grid-3 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .nav-links {
            display: none;
          }
        }

        @media (max-width: 720px) {
          .container,
          .nav-shell {
            width: min(100% - 24px, 1180px);
          }

          .nav-actions .btn-secondary {
            display: none;
          }

          .hero {
            padding-top: 128px;
          }

          .hero-proof,
          .logos-row,
          .grid-4,
          .grid-3,
          .grid-2,
          .safety-list-grid {
            grid-template-columns: 1fr;
          }

          .hero-visual {
            min-height: 420px;
          }

          .floating-card {
            width: calc(100% - 32px);
            left: 16px !important;
            right: 16px !important;
          }

          .floating-card.top {
            top: 18px;
          }

          .floating-card.bottom {
            bottom: 18px;
          }

          .table-row {
            grid-template-columns: 1.2fr 0.8fr;
          }

          .table-row span:nth-child(3),
          .table-row span:nth-child(4) {
            display: none;
          }

          .roi-card {
            padding: 34px 20px;
            border-radius: 26px;
          }

          .section {
            padding: 70px 0;
          }

          h1 {
            font-size: clamp(2.75rem, 16vw, 4.8rem);
          }

          .hero-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>

      <header className="nav-wrap">
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="TruckMind home">
            <span className="brand-mark">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 19 12.2 4H20l-8.1 15H4Zm9.2 0 3.1-5.7H20L16.9 19h-3.7Z" />
              </svg>
            </span>
            TruckMind
          </a>

          <div className="nav-links">
            <a href="#prospects">Prospects</a>
            <a href="#filters">Search</a>
            <a href="#safety">Safety Reports</a>
            <a href="#pricing">Pricing</a>
          </div>

          <div className="nav-actions">
            <a className="btn btn-secondary btn-small" href="#demo">
              Book Demo
            </a>
            <a className="btn btn-primary btn-small" href="#trial">
              Start Free Trial
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-glow" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Trucking Growth Intelligence Platform
              </div>

              <h1>
                Get Verified Trucking Prospects,{" "}
                <span className="gradient-text">Safety Intelligence</span> & Compliance Data.
              </h1>

              <p className="hero-lead">
                TruckMind helps companies selling into the trucking industry identify, connect with, and convert more trucking companies using verified carrier contacts, FMCSA intelligence, compliance data, built-in CRM access, and on-demand carrier safety reports.
              </p>

              <div className="hero-actions" id="trial">
                <a className="btn btn-primary" href="#demo">
                  Start Your 7-Day Free Trial <ArrowIcon />
                </a>
                <a className="btn btn-secondary" href="#demo">
                  Book Demo
                </a>
              </div>

              <div className="hero-proof" aria-label="TruckMind value highlights">
                <div className="proof-card">
                  <strong>USA</strong>
                  <span>Verified trucking companies across the country</span>
                </div>
                <div className="proof-card">
                  <strong>MC + DOT</strong>
                  <span>Carrier identifiers for smarter qualification</span>
                </div>
                <div className="proof-card">
                  <strong>CRM</strong>
                  <span>Built-in pipeline access for outreach teams</span>
                </div>
              </div>
            </div>

            <div className="hero-visual" aria-label="TruckMind digital freight intelligence visual">
              <div className="hero-image-shell">
                <img
                  className="hero-image"
                  src={IMAGE_PATHS.hero}
                  alt="Futuristic truck with digital United States carrier intelligence network"
                  loading="eager"
                />
              </div>

              <div className="floating-card top">
                <div className="floating-label">Carrier Intelligence Snapshot</div>
                <div className="floating-title">Verified Prospect + Safety Context</div>
                <div className="mini-list">
                  <div>
                    <span>MC / DOT</span>
                    <strong>Verified</strong>
                  </div>
                  <div>
                    <span>Operating Status</span>
                    <strong className="status">Active</strong>
                  </div>
                  <div>
                    <span>Fleet Visibility</span>
                    <strong>Available</strong>
                  </div>
                </div>
              </div>

              <div className="floating-card bottom">
                <div className="floating-label">Risk Intelligence</div>
                <div className="floating-title">Safety Report Readiness</div>
                <div className="score-row">
                  <span>Compliance Signal</span>
                  <div className="score-bar">
                    <span style={{ width: "82%" }} />
                  </div>
                  <strong>82%</strong>
                </div>
                <div className="score-row">
                  <span>Data Confidence</span>
                  <div className="score-bar">
                    <span style={{ width: "91%" }} />
                  </div>
                  <strong>91%</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-tight">
          <div className="container">
            <div className="section-header center reveal">
              <div className="section-kicker">Trusted By Businesses Serving The Trucking Industry</div>
              <h2>Built for teams that need better trucking prospects, not outdated lead lists.</h2>
              <p className="section-copy">
                TruckMind gives sales, underwriting, compliance, and growth teams the intelligence they need to find the right carriers and take action faster.
              </p>
            </div>

            <div className="logos-row stagger-scope" aria-label="Supported business categories">
              {["Insurance", "Freight", "Compliance", "Technology"].map((item) => (
                <div className="logo-tile stagger-item" key={item}>
                  {item} Teams
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="prospects">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-kicker">Access Verified Trucking Companies Across The USA</div>
              <h2>Carrier contacts, decision-makers, and intelligence from one platform.</h2>
              <p className="section-copy">
                Access verified trucking company contacts, owner details, phone numbers, email addresses, MC and DOT data, fleet information, location data, advanced search filters, built-in CRM access, and unlimited searches.
              </p>
            </div>

            <div className="grid-4 stagger-scope">
              {subscriptionFeatures.map((feature) => (
                <div className="card feature-check stagger-item" key={feature}>
                  <CheckIcon />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-tight">
          <div className="container">
            <div className="section-header center reveal">
              <div className="section-kicker">Perfect For</div>
              <h2>Purpose-built for companies selling into trucking.</h2>
              <p className="section-copy">
                Whether your company sells insurance, permits, compliance support, factoring, dispatch, fuel cards, or transportation technology, TruckMind helps you find and qualify the right trucking companies.
              </p>
            </div>

            <div className="grid-4 stagger-scope">
              {audiences.map((audience, index) => (
                <article className="card audience-card stagger-item" key={audience.title}>
                  <div className="icon-box">
                    {index % 3 === 0 ? <ShieldIcon /> : index % 3 === 1 ? <SignalIcon /> : <SearchIcon />}
                  </div>
                  <h3>{audience.title}</h3>
                  <p>{audience.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="filters">
          <div className="container split-section">
            <div className="reveal">
              <div className="section-kicker">Find The Right Prospects In Seconds</div>
              <h2>Build targeted trucking prospect lists in minutes.</h2>
              <p className="section-copy">
                Search and filter trucking companies by state, fleet size, authority age, MC number, DOT number, operating status, location, and carrier type instead of spending hours searching multiple sources.
              </p>

              <div className="pill-wrap">
                {searchFilters.map((filter) => (
                  <span className="pill" key={filter}>
                    {filter}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel reveal">
              <div className="search-demo" aria-label="TruckMind prospect search interface preview">
                <div className="search-demo-header">
                  <SearchIcon />
                  <div className="fake-input">Search carriers by company, MC, DOT, state, or location...</div>
                  <a className="btn btn-primary btn-small" href="#demo">
                    Search
                  </a>
                </div>

                <div className="table-row header">
                  <span>Carrier</span>
                  <span>Fleet</span>
                  <span>State</span>
                  <span>Status</span>
                </div>
                {[
                  ["Apex Freight Group", "42 Trucks", "TX", "Active"],
                  ["Blue Ridge Carriers", "18 Trucks", "NC", "Active"],
                  ["Iron Eagle Transport", "63 Trucks", "OH", "Review"],
                  ["Coastal Haul Partners", "27 Trucks", "FL", "Active"],
                ].map((row) => (
                  <div className="table-row" key={row[0]}>
                    {row.map((cell, index) => (
                      <span className={index === 3 ? "status" : ""} key={cell}>
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section fleet-section" id="difference">
          <div className="fleet-bg" aria-hidden="true">
            <img className="fleet-image" src={IMAGE_PATHS.fleet} alt="" loading="lazy" />
          </div>

          <div className="container difference-grid">
            <div className="reveal">
              <div className="section-kicker">Why TruckMind Is Different</div>
              <h2>More than contact data. Intelligence before the first call.</h2>
              <p className="section-copy">
                Most trucking lead providers only give you contact information. TruckMind helps you understand who you are contacting before you make the first call, so your team can focus on better opportunities and improve conversion rates.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#pricing">
                  Compare Plans <ArrowIcon />
                </a>
                <a className="btn btn-secondary" href="#safety">
                  View Safety Reports
                </a>
              </div>
            </div>

            <div className="feature-list stagger-scope">
              {differenceItems.map((item) => (
                <div className="card feature-list-item stagger-item" key={item.title}>
                  <CheckIcon />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="safety">
          <div className="container">
            <div className="section-header center reveal">
              <div className="section-kicker">Need More Than Leads?</div>
              <h2>Upgrade with detailed carrier safety reports.</h2>
              <p className="section-copy">
                For insurance agencies, brokers, compliance consultants, permit companies, and underwriting teams, understanding carrier risk is just as important as finding carrier contacts.
              </p>
            </div>

            <div className="glass-panel safety-card reveal">
              <div>
                <div className="score-circle">
                  <div>
                    <strong>85</strong>
                    <span>Safety Score</span>
                  </div>
                </div>
                <p style={{ textAlign: "center", color: "#94a3b8", marginTop: 18, lineHeight: 1.6 }}>
                  On-demand intelligence for carrier vetting, compliance reviews, risk assessments, underwriting, and broker due diligence.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.45rem", letterSpacing: "-0.04em", marginBottom: 18 }}>
                  Detailed Safety Reports Include
                </h3>
                <div className="safety-list-grid stagger-scope">
                  {safetyReportFeatures.map((feature) => (
                    <div className="feature-check stagger-item" key={feature}>
                      <CheckIcon />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="use-case-wrap">
                  {safetyUseCases.map((item) => (
                    <span className="use-case" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-tight">
          <div className="container">
            <div className="section-header center reveal">
              <div className="section-kicker">One Platform. Multiple Growth Opportunities.</div>
              <h2>Find leads, gain intelligence, and grow faster.</h2>
            </div>

            <div className="grid-4 stagger-scope">
              {growthOpportunities.map((item, index) => (
                <article className="card stagger-item" key={item.title}>
                  <div className="icon-box">
                    {index % 2 === 0 ? <SignalIcon /> : <ShieldIcon />}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="roi-card reveal">
              <div className="section-kicker">The TruckMind ROI Case</div>
              <h2>One new trucking client can pay for TruckMind many times over.</h2>
              <p>
                A single trucking customer can generate thousands of dollars in revenue through insurance, permits, compliance services, dispatch support, factoring, software solutions, and operational services. TruckMind helps you find those opportunities faster.
              </p>

              <div className="roi-list">
                {roiBullets.map((item) => (
                  <span className="pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="container">
            <div className="section-header center reveal">
              <div className="section-kicker">Choose The Plan That Fits Your Growth Goals</div>
              <h2>Simple plans for trucking growth, prospecting, and intelligence.</h2>
            </div>

            <div className="grid-2 stagger-scope">
              {plans.map((plan, index) => (
                <article className={`card pricing-card stagger-item ${index === 1 ? "featured" : ""}`} key={plan.name}>
                  <div className="plan-top">
                    <div>
                      <h3>{plan.name}</h3>
                      <div className="price">{plan.price}</div>
                    </div>
                    {plan.badge && <span className="badge">{plan.badge}</span>}
                  </div>

                  <p>{plan.description}</p>

                  <div className="plan-features">
                    {plan.features.map((feature) => (
                      <div className="feature-check" key={feature}>
                        <CheckIcon />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a className={`btn ${index === 1 ? "btn-primary" : "btn-secondary"}`} href="#demo">
                    {plan.cta} <ArrowIcon />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-tight" id="faq">
          <div className="container">
            <div className="section-header center reveal">
              <div className="section-kicker">FAQ</div>
              <h2>Questions sales and compliance teams usually ask.</h2>
            </div>

            <div className="grid-2 stagger-scope">
              {faqs.map((faq) => (
                <article className="card faq-item stagger-item" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-final" id="demo">
          <div className="container reveal">
            <div className="section-kicker">Ready To Grow Your Trucking Pipeline?</div>
            <h2>Find leads. Gain intelligence. Grow faster.</h2>
            <p>
              Stop buying outdated lead lists. Start building relationships with verified trucking companies using TruckMind.
            </p>
            <div className="hero-actions" style={{ justifyContent: "center" }}>
              <a className="btn btn-primary" href="mailto:sales@truckmind.com?subject=TruckMind%20Demo%20Request">
                Start Your Free Trial Today <ArrowIcon />
              </a>
              <a className="btn btn-secondary" href="mailto:sales@truckmind.com?subject=TruckMind%20Personalized%20Demo">
                Schedule A Personalized Demo
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <span>© {new Date().getFullYear()} TruckMind. Trucking Growth Intelligence Platform.</span>
          <span>Verified Prospects · Safety Intelligence · Compliance Data</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
