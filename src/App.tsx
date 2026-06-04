import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

type Benefit = {
  title: string;
  description: string;
  icon: IconName;
};

type Plan = {
  name: string;
  price: string;
  cadence?: string;
  description: string;
  highlight?: boolean;
  badge?: string;
  inherits: string;
  features: string[];
  bestFor: string;
  cta: string;
};

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

/* -------------------------------------------------------------------------- */
/*  Asset paths (served from /public)                                          */
/* -------------------------------------------------------------------------- */

const IMAGES = {
  hero: "/futuristic-truck.png",
};

/* External register/login page + contact details */
const ACCOUNTS_URL = "https://truckmind.com/accounts";
const CONTACT = {
  email: "sales@truckmind.com",
  phone: "+1 (555) 555-0100", // TODO: replace with the real phone number
};

/* Lets any CTA open the "Book a Demo" contact modal (provided at the root) */
const DemoModalContext = createContext<() => void>(() => {});

/* -------------------------------------------------------------------------- */
/*  Content (sourced from provided business data)                             */
/* -------------------------------------------------------------------------- */

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Why Us", href: "#why" },
  { label: "Safety Reports", href: "#safety" },
  { label: "Pricing", href: "#pricing" },
];

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

const keyBenefits: Benefit[] = [
  {
    title: "Verified Contact Data",
    description:
      "Company names, owners, verified phone numbers, emails, and MC & DOT numbers — accurate and ready to use.",
    icon: "badge",
  },
  {
    title: "Carrier Intelligence",
    description:
      "Understand authority, fleet size, and operating status before you ever make the first call.",
    icon: "radar",
  },
  {
    title: "FMCSA Safety Reports",
    description:
      "On-demand safety ratings, CSA scores, and risk indicators for confident carrier vetting.",
    icon: "shield",
  },
  {
    title: "Built-In CRM",
    description:
      "Track outreach, organize prospects, and manage your pipeline without leaving the platform.",
    icon: "crm",
  },
  {
    title: "Advanced Filters",
    description:
      "Target by state, fleet size, authority age, carrier type, and operating status in seconds.",
    icon: "filter",
  },
  {
    title: "Unlimited Searches",
    description:
      "Build as many targeted prospect lists as you need — no caps, no per-lead fees.",
    icon: "infinity",
  },
];

const audiences = [
  "Insurance Agencies",
  "Permit Companies",
  "Freight Brokers",
  "Compliance Consultants",
  "Factoring Companies",
  "Dispatch Providers",
  "Fuel Card Companies",
  "Transportation Technology Providers",
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

const beyondContactData = [
  "Authority Verification",
  "Carrier Profiles",
  "Fleet Visibility",
  "Operational Status",
  "Compliance Indicators",
  "Growth Intelligence",
];

const safetyReportIncludes = [
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

const safetyIdealFor = [
  "Insurance Underwriting",
  "Carrier Vetting",
  "Compliance Reviews",
  "Risk Assessments",
  "Broker Due Diligence",
];

const growthOpportunities: Benefit[] = [
  {
    title: "Generate More Leads",
    description: "Build a larger trucking prospect pipeline from verified, USA-wide carrier data.",
    icon: "leads",
  },
  {
    title: "Prioritize Better Prospects",
    description: "Focus your team on the companies most likely to buy.",
    icon: "target",
  },
  {
    title: "Access Carrier Intelligence",
    description: "Understand exactly who you're contacting before any outreach.",
    icon: "radar",
  },
  {
    title: "Safety Reports On Demand",
    description: "Pull deeper insights whenever additional due diligence is required.",
    icon: "shield",
  },
];

const valueBenefits = [
  "Reach More Trucking Companies",
  "Connect With Decision-Makers",
  "Improve Sales Productivity",
  "Build A Predictable Pipeline",
  "Increase Revenue Opportunities",
];

const stats: Stat[] = [
  { value: 50, suffix: "", label: "U.S. States Covered" },
  { value: 8, suffix: "+", label: "Industries Served" },
  { value: 10, suffix: "+", label: "Data Points Per Carrier" },
  { value: 100, suffix: "%", label: "Verified Contact Records" },
];

const plans: Plan[] = [
  {
    name: "Starter Plan",
    price: "$99",
    cadence: "/month",
    description:
      "Perfect for individuals and small teams getting started with trucking prospecting.",
    inherits: "Includes",
    features: [
      "Active Trucking Companies",
      "Basic Carrier Profiles",
      "Carrier Search",
      "Phone Numbers & Email Addresses",
      "MC & DOT Information",
      "CRM Pipeline (Table View)",
      "CSV Export — 350 Records/Month",
      "Daily Export Limit of 110 Records",
      "Email Support",
      "7-Day Free Trial",
    ],
    bestFor: "Insurance Agents • Permit Agents • Dispatch Providers",
    cta: "Start Free Trial",
  },
  {
    name: "Growth Plan",
    price: "$199",
    cadence: "/month",
    description:
      "Built for growing businesses that need more prospecting power and better targeting.",
    inherits: "Everything in Starter, plus:",
    features: [
      "Unlimited Lead Searches",
      "Advanced Search Filters",
      "Fleet Information",
      "Authority Verification",
      "Insurance Expiry Tracking",
      "Current Insurance Provider Data",
      "Full Carrier Intelligence Profiles",
      "CRM Pipeline (Kanban + Table View)",
      "CSV Export — 1,000 Records/Month",
      "Daily Export Limit of 300 Records",
      "Priority Support",
      "Multi-User Access (Up to 3 Users)",
      "7-Day Free Trial",
    ],
    bestFor: "Freight Brokers • Factoring Companies • Compliance Consultants",
    cta: "Start Free Trial",
  },
  {
    name: "Professional Plan",
    price: "$499",
    cadence: "/month",
    highlight: true,
    badge: "Most Popular",
    description: "The complete TruckMind Growth Intelligence Platform.",
    inherits: "Everything in Growth, plus:",
    features: [
      "Unlimited Exports",
      "Unlimited Searches",
      "Unlimited Saved Searches",
      "Advanced Carrier Intelligence",
      "Compliance Indicators",
      "Operating Status Monitoring",
      "Growth Intelligence",
      "AI-Powered Prospect Insights",
      "Enhanced CRM Features",
      "Up to 10 Team Members",
      "Dedicated Customer Success Support",
      "Priority Data Updates",
      "API Access (Optional)",
    ],
    bestFor: "Sales Teams • Agencies • Enterprise Prospecting",
    cta: "Book Demo",
  },
  {
    name: "Carrier Intelligence Plan",
    price: "Custom",
    cadence: "pricing",
    description:
      "Built for organizations requiring carrier vetting, safety analysis, underwriting intelligence, and large-scale outreach.",
    inherits: "Everything in Professional, plus:",
    features: [
      "Detailed Carrier Safety Reports",
      "FMCSA Safety Ratings",
      "CSA Score Analysis",
      "Inspection History",
      "Out-of-Service Rates",
      "Fraud & Double Brokering Alerts",
      "Carrier Risk Assessments",
      "AI Underwriting Reports",
      "Bulk Email Campaigns",
      "Dedicated Account Manager",
      "Custom Integrations",
      "Team Training & Onboarding",
      "Custom Data Requirements",
      "White Label Reporting",
    ],
    bestFor: "Insurance Companies • Underwriters • Brokerages • Risk Teams",
    cta: "Get a Quote",
  },
];

type FooterLink = { label: string; href: string; action?: "demo" | "trial" };

const footerLinks: Record<string, FooterLink[]> = {
  Platform: [
    { label: "Verified Leads", href: "#platform" },
    { label: "Carrier Intelligence", href: "#why" },
    { label: "Safety Reports", href: "#safety" },
    { label: "Pricing", href: "#pricing" },
  ],
  Company: [
    { label: "About", href: "#why" },
    { label: "Who It's For", href: "#audiences" },
    { label: "Book a Demo", href: "#cta", action: "demo" },
    { label: "Free Trial", href: "#cta", action: "trial" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Icons                                                                      */
/* -------------------------------------------------------------------------- */

type IconName =
  | "badge"
  | "radar"
  | "shield"
  | "crm"
  | "filter"
  | "infinity"
  | "leads"
  | "target"
  | "check"
  | "truck"
  | "arrow"
  | "mail"
  | "phone"
  | "close";

function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "badge":
      return (
        <svg {...common}>
          <path d="M12 2 4 5v6c0 5 3.5 8 8 11 4.5-3 8-6 8-11V5l-8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "radar":
      return (
        <svg {...common}>
          <path d="M19.07 4.93A10 10 0 1 0 22 12" />
          <path d="M12 12 19 5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 2 4 5v6c0 5 3.5 8 8 11 4.5-3 8-6 8-11V5l-8-3Z" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      );
    case "crm":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 4v16" />
        </svg>
      );
    case "filter":
      return (
        <svg {...common}>
          <path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z" />
        </svg>
      );
    case "infinity":
      return (
        <svg {...common}>
          <path d="M6.5 8C4 8 2 9.8 2 12s2 4 4.5 4 3.5-2 5.5-4 3-4 5.5-4S22 9.8 22 12s-2 4-4.5 4-3.5-2-5.5-4" />
        </svg>
      );
    case "leads":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M19 8v6M22 11h-6" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <path d="M2 6h11v9H2zM13 9h4l3 3v3h-7z" />
          <circle cx="6.5" cy="17.5" r="1.8" />
          <circle cx="17" cy="17.5" r="1.8" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.9 9.8a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6 18 18M18 6 6 18" />
        </svg>
      );
    case "check":
    default:
      return (
        <svg {...common}>
          <path d="m5 12 5 5L20 7" />
        </svg>
      );
  }
}

/* -------------------------------------------------------------------------- */
/*  Reusable UI primitives                                                     */
/* -------------------------------------------------------------------------- */

function CheckItem({ children, animate }: { children: ReactNode; animate?: boolean }) {
  return (
    <li
      data-animate={animate ? "" : undefined}
      className="flex items-center gap-3 text-sm text-slate-300"
    >
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/30">
        <Icon name="check" className="h-3.5 w-3.5" />
      </span>
      <span>{children}</span>
    </li>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span
          data-animate
          className="inline-block rounded-full border border-brand-400/25 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300"
        >
          {eyebrow}
        </span>
      )}
      <h2
        data-animate
        className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[2.6rem]"
      >
        {title}
      </h2>
      {subtitle && (
        <p data-animate className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

type CTAProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  withArrow?: boolean;
  /** "trial" -> opens the accounts page in a new tab; "demo" -> opens the contact modal */
  action?: "demo" | "trial";
  onClick?: () => void;
};

function CTAButton({
  children,
  href = "#cta",
  variant = "primary",
  className = "",
  withArrow,
  action,
  onClick,
}: CTAProps) {
  const openDemo = useContext(DemoModalContext);
  const base =
    "group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950";
  const variants = {
    primary:
      "bg-gradient-to-r from-brand-500 to-brand-400 text-ink-950 shadow-[0_12px_40px_-12px_rgba(14,165,233,0.7)] hover:shadow-[0_18px_50px_-12px_rgba(14,165,233,0.85)] hover:-translate-y-0.5",
    secondary:
      "glass text-white hover:bg-white/10 hover:-translate-y-0.5",
    ghost: "text-slate-300 hover:text-white",
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {withArrow && (
        <Icon
          name="arrow"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );

  // "Book a Demo" style — open the contact modal
  if (action === "demo") {
    return (
      <button
        type="button"
        className={cls}
        onClick={() => {
          onClick?.();
          openDemo();
        }}
      >
        {inner}
      </button>
    );
  }

  // "Start Free Trial" style — go to the register/login page in a new tab
  if (action === "trial") {
    return (
      <a
        href={ACCOUNTS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <a href={href} className={cls} onClick={onClick}>
      {inner}
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*  Book-a-Demo contact modal                                                  */
/* -------------------------------------------------------------------------- */

function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const telHref = `tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a demo"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl glass glow-ring p-7"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          <Icon name="close" className="h-5 w-5" />
        </button>

        <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
          Book a Demo
        </span>
        <h3 className="mt-4 text-2xl font-bold text-white">Talk to our team</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Reach out and we&apos;ll walk you through TruckMind and get you set up.
        </p>

        <div className="mt-6 space-y-3">
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-900/50 px-4 py-3 transition-colors hover:border-brand-400/30 hover:bg-white/5"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/25">
              <Icon name="mail" className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-wide text-slate-500">Email</span>
              <span className="block truncate text-sm font-semibold text-white">
                {CONTACT.email}
              </span>
            </span>
          </a>
          <a
            href={telHref}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-900/50 px-4 py-3 transition-colors hover:border-brand-400/30 hover:bg-white/5"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/15 text-accent-400 ring-1 ring-accent-400/25">
              <Icon name="phone" className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-wide text-slate-500">Phone</span>
              <span className="block truncate text-sm font-semibold text-white">
                {CONTACT.phone}
              </span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Animated counter                                                           */
/* -------------------------------------------------------------------------- */

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        el.textContent = Math.round(obj.n).toString() + suffix;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* -------------------------------------------------------------------------- */
/*  Decorative background                                                      */
/* -------------------------------------------------------------------------- */

function GridGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-[-10%] h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[140px]" />
      <div className="absolute right-[-5%] top-1/3 h-[360px] w-[360px] rounded-full bg-accent-500/10 blur-[150px]" />
      <div className="absolute bottom-0 left-[-5%] h-[320px] w-[320px] rounded-full bg-brand-600/10 blur-[140px]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                     */
/* -------------------------------------------------------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="flex w-full items-center justify-between px-5 py-4 sm:px-8 lg:px-12"
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center" aria-label="TruckMind home">
          <img
            src="/logo.png"
            alt="TruckMind"
            className="h-9 w-auto"
            style={{ filter: "invert(1) hue-rotate(180deg) saturate(1.45) brightness(1.05)" }}
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <CTAButton action="demo" variant="ghost" className="px-4 py-2">
            Book Demo
          </CTAButton>
          <CTAButton action="trial" className="px-5 py-2.5">
            Start Free Trial
          </CTAButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg glass text-white md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink-950/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <CTAButton action="trial" className="mt-3 w-full" onClick={() => setOpen(false)}>
              Start Free Trial
            </CTAButton>
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Full-bleed background image */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img
          src={IMAGES.hero}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full scale-105 object-cover object-center blur-[3px]"
        />
        {/* Lighter overlays: keep the truck visible while text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/55 via-ink-950/35 to-ink-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(5,7,13,0.55),transparent_75%)]" />
        <div className="absolute left-1/2 top-1/3 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-4xl px-5 pt-32 pb-24 text-center sm:px-8 sm:pt-36">
        <span
          data-hero
          className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
          Trucking Growth Intelligence Platform
        </span>

        <h1
          data-hero
          className="mx-auto mt-7 max-w-5xl text-[clamp(1.9rem,5vw,3.1875rem)] font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]"
        >
          Get Verified Trucking Prospects,
          <br />
          <span className="text-gradient">Safety Intelligence</span> &amp;
          <br />
          Compliance Data
        </h1>

        <p
          data-hero
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300"
        >
          Access verified trucking company contacts, decision-makers, and carrier intelligence from
          a single platform — built for teams that sell into the trucking industry and want to grow
          faster.
        </p>

        <div
          data-hero
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <CTAButton action="trial" withArrow>
            Start Your 7-Day Free Trial
          </CTAButton>
          <CTAButton href="#pricing" variant="secondary">
            Compare Pricing
          </CTAButton>
        </div>

        <div
          data-hero
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400"
        >
          <span className="flex items-center gap-2">
            <Icon name="check" className="h-4 w-4 text-brand-400" /> Verified USA-wide data
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#platform"
        aria-label="Scroll to platform section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <span className="grid h-10 w-6 place-items-start rounded-full border border-white/25 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
        </span>
      </a>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section: Platform / Included In Subscription                               */
/* -------------------------------------------------------------------------- */

function PlatformSection() {
  return (
    <section id="platform" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="USA-Wide Coverage"
          title={
            <>
              Access Verified Trucking Companies{" "}
              <span className="text-gradient">Across the USA</span>
            </>
          }
          subtitle="Built for insurance agencies, permit companies, freight brokers, compliance consultants, factoring companies, dispatch providers, fuel card companies, and transportation technology providers looking to grow faster."
        />

        <div className="mx-auto mt-14 max-w-5xl rounded-3xl glass p-8 sm:p-10">
          <h3 className="text-center text-xl font-semibold text-white">
            Included in Your Subscription
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-400">
            Everything your team needs to identify, reach, and convert trucking companies.
          </p>
          <ul className="mx-auto mt-8 grid max-w-3xl gap-x-8 gap-y-4 sm:grid-cols-2">
            {subscriptionFeatures.map((item) => (
              <CheckItem key={item} animate>
                {item}
              </CheckItem>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section: Key Benefits                                                      */
/* -------------------------------------------------------------------------- */

function BenefitsSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="One Platform"
          title={
            <>
              Everything You Need to <span className="text-gradient">Grow Faster</span>
            </>
          }
          subtitle="TruckMind helps companies selling into the trucking industry identify, connect with, and convert more trucking companies."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {keyBenefits.map((b) => (
            <article
              key={b.title}
              data-animate
              className="group relative overflow-hidden rounded-2xl glass p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-400/30"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/25 transition-transform duration-300 group-hover:scale-110">
                <Icon name={b.icon} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{b.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section: Audiences (Perfect For)                                           */
/* -------------------------------------------------------------------------- */

function AudienceSection() {
  return (
    <section id="audiences" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Trusted By Businesses Serving Trucking"
          title={
            <>
              Perfect For Teams That <span className="text-gradient">Sell Into Trucking</span>
            </>
          }
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div
              key={a}
              data-animate
              className="flex items-center gap-3 rounded-xl glass px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/30"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-500/15 text-accent-400 ring-1 ring-accent-400/25">
                <Icon name="check" className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-slate-200">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section: Find Prospects In Seconds (search filters)                        */
/* -------------------------------------------------------------------------- */

function SearchSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Lightning-Fast Search"
              title={
                <>
                  Find the Right Prospects <span className="text-gradient">in Seconds</span>
                </>
              }
              subtitle="Build targeted prospect lists in minutes instead of spending hours searching multiple sources. Search and filter trucking companies by:"
            />
            <ul className="mt-8 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {searchFilters.map((f) => (
                <CheckItem key={f} animate>
                  {f}
                </CheckItem>
              ))}
            </ul>
          </div>

          {/* Mock search UI */}
          <div data-animate className="rounded-3xl glass p-6 sm:p-8 glow-ring">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3">
              <Icon name="filter" className="h-5 w-5 text-brand-300" />
              <span className="text-sm text-slate-400">Search carriers…</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {searchFilters.map((f, i) => (
                <span
                  key={f}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
                    i % 3 === 0
                      ? "bg-brand-500/20 text-brand-200 ring-1 ring-brand-400/30"
                      : "bg-white/5 text-slate-300 ring-1 ring-white/10"
                  }`}
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {["Midwest Logistics LLC", "Apex Freight Carriers", "Summit Haul Transport"].map(
                (name, i) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-ink-900/40 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500/15 text-brand-300">
                        <Icon name="truck" className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{name}</p>
                        <p className="text-xs text-slate-500">
                          MC #{(1024 + i * 317).toString()} · {6 + i * 4} trucks
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                      Active
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section: Why TruckMind Is Different                                        */
/* -------------------------------------------------------------------------- */

function WhySection() {
  return (
    <section id="why" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why TruckMind Is Different"
          title={
            <>
              Know Who You're Contacting{" "}
              <span className="text-gradient">Before the First Call</span>
            </>
          }
          subtitle="Most trucking lead providers only give you contact information. TruckMind helps you understand the carrier — so your team focuses on better opportunities and improves conversion rates."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beyondContactData.map((item) => (
            <article
              key={item}
              data-animate
              className="group flex items-center gap-4 rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-400/30"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/25 transition-transform duration-300 group-hover:scale-110">
                <Icon name="check" className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold text-white">{item}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section: Safety Reports                                                    */
/* -------------------------------------------------------------------------- */

function SafetySection() {
  return (
    <section id="safety" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Need More Than Leads?"
          title={
            <>
              Upgrade With Detailed{" "}
              <span className="text-gradient">Carrier Safety Reports</span>
            </>
          }
          subtitle="For insurance agencies, brokers, compliance consultants, permit companies, and underwriting teams, understanding carrier risk is just as important as finding carrier contacts."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div data-animate className="rounded-3xl glass p-8 sm:p-10">
            <h3 className="text-xl font-semibold text-white">Detailed Safety Reports Include</h3>
            <ul className="mt-6 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {safetyReportIncludes.map((item) => (
                <CheckItem key={item} animate>
                  {item}
                </CheckItem>
              ))}
            </ul>
          </div>

          <div
            data-animate
            className="rounded-3xl border border-accent-400/20 bg-gradient-to-br from-accent-500/10 to-transparent p-8 sm:p-10"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-500/15 text-accent-400 ring-1 ring-accent-400/25">
              <Icon name="shield" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-white">Ideal For</h3>
            <ul className="mt-5 space-y-3.5">
              {safetyIdealFor.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section: Growth Opportunities                                              */
/* -------------------------------------------------------------------------- */

function GrowthSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Solutions"
          title={
            <>
              One Platform.{" "}
              <span className="text-gradient">Multiple Growth Opportunities.</span>
            </>
          }
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {growthOpportunities.map((g, i) => (
            <article
              key={g.title}
              data-animate
              className="group relative overflow-hidden rounded-2xl glass p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-400/30"
            >
              <span className="text-5xl font-bold text-white/5">{`0${i + 1}`}</span>
              <span className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/25 transition-transform duration-300 group-hover:scale-110">
                <Icon name={g.icon} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{g.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section: Stats / ROI                                                       */
/* -------------------------------------------------------------------------- */

function StatsSection() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-10 sm:p-14">
          <div
            aria-hidden
            className="absolute right-[-10%] top-[-30%] h-72 w-72 rounded-full bg-brand-500/20 blur-[120px]"
          />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Real ROI"
                title={
                  <>
                    One New Client Can Pay for TruckMind{" "}
                    <span className="text-gradient">Many Times Over</span>
                  </>
                }
                subtitle="A single trucking customer can generate thousands of dollars through insurance, permits, compliance, dispatch, factoring, and software — TruckMind helps you find those opportunities faster."
              />
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {valueBenefits.map((v) => (
                  <CheckItem key={v} animate>
                    {v}
                  </CheckItem>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  data-animate
                  className="rounded-2xl glass p-6 text-center"
                >
                  <p className="text-4xl font-extrabold text-white sm:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section: Pricing                                                           */
/* -------------------------------------------------------------------------- */

function PricingSection() {
  // Default selection = the "Most Popular" plan, else the first.
  const defaultIndex = Math.max(
    0,
    plans.findIndex((p) => p.highlight),
  );
  const [selected, setSelected] = useState(defaultIndex);

  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <GridGlow />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Choose the Plan That Fits Your{" "}
              <span className="text-gradient">Growth Goals</span>
            </>
          }
          subtitle="Start with a 7-day free trial. Upgrade anytime as your pipeline grows."
        />

        <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => {
            const isSelected = selected === i;
            return (
              <article
                key={plan.name}
                data-animate
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Select ${plan.name}`}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(i);
                  }
                }}
                className={`relative flex cursor-pointer flex-col rounded-3xl p-6 outline-none transition-all duration-300 sm:p-7 ${
                  isSelected
                    ? "-translate-y-1 border-2 border-brand-400 bg-gradient-to-b from-brand-500/15 to-transparent glow-ring"
                    : plan.highlight
                      ? "border border-brand-400/40 bg-gradient-to-b from-brand-500/10 to-transparent hover:-translate-y-1"
                      : "glass hover:-translate-y-1 hover:border-brand-400/30"
                }`}
              >
                {/* Badge / selected marker */}
                {plan.badge && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 px-4 py-1 text-xs font-semibold text-ink-950">
                    {plan.badge}
                  </span>
                )}
                {isSelected && (
                  <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-brand-400 px-3 py-1 text-xs font-semibold text-ink-950">
                    <Icon name="check" className="h-3.5 w-3.5" />
                    Selected
                  </span>
                )}

                <h3 className="text-base font-semibold text-white">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.cadence && <span className="text-sm text-slate-400">{plan.cadence}</span>}
                </div>
                <p className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-slate-400">
                  {plan.description}
                </p>

                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-brand-300">
                  {plan.inherits}
                </p>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Best For
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{plan.bestFor}</p>
                </div>

                <CTAButton
                  action={plan.cta.toLowerCase().includes("trial") ? "trial" : "demo"}
                  variant={isSelected || plan.highlight ? "primary" : "secondary"}
                  className="mt-6 w-full"
                  withArrow
                >
                  {plan.cta}
                </CTAButton>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section: Final CTA                                                         */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section id="cta" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 px-7 py-16 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="absolute left-1/2 top-[-40%] h-96 w-96 -translate-x-1/2 rounded-full bg-brand-500/25 blur-[130px]"
          />
          <div className="relative mx-auto max-w-3xl">
            <h2
              data-animate
              className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
            >
              Ready to Grow Your <span className="text-gradient">Trucking Pipeline?</span>
            </h2>
            <p data-animate className="mt-5 text-lg font-medium text-brand-200">
              Find Leads. Gain Intelligence. Grow Faster.
            </p>
            <p data-animate className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
              Stop buying outdated lead lists. Start building relationships with verified trucking
              companies using TruckMind.
            </p>
            <div data-animate className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CTAButton action="trial" withArrow>
                Start Your Free Trial Today
              </CTAButton>
              <CTAButton action="demo" variant="secondary">
                Schedule a Personalized Demo
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

function Footer() {
  const openDemo = useContext(DemoModalContext);
  const linkClass =
    "text-sm text-slate-400 transition-colors hover:text-white";
  return (
    <footer className="relative border-t border-white/10 bg-ink-950 py-14">
      <div className="w-full px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#top" className="flex items-center" aria-label="TruckMind home">
              <img
                src="/logo.png"
                alt="TruckMind"
                className="h-10 w-auto"
                style={{ filter: "invert(1) hue-rotate(180deg) saturate(1.45) brightness(1.05)" }}
              />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              The Trucking Growth Intelligence Platform — verified prospects, safety intelligence,
              and compliance data in one place.
            </p>
            <div className="mt-5 flex gap-3 text-sm text-slate-400">
              17908 Murphy Pkwy, Lathrop, CA 95330
              {/* {socials.map((s) => (
                <a
                  key={s}
                  href="#cta"
                  aria-label={s}
                  className="grid h-9 w-9 place-items-center rounded-lg glass text-slate-300 transition-colors hover:text-white"
                >
                  <span className="text-xs font-semibold">{s[0]}</span>
                </a>
              ))} */}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-white">{heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.action === "demo" ? (
                      <button type="button" onClick={openDemo} className={`${linkClass} cursor-pointer`}>
                        {link.label}
                      </button>
                    ) : link.action === "trial" ? (
                      <a
                        href={ACCOUNTS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="mailto:sales@truckmind.com" className="transition-colors hover:text-white">
                  sales@truckmind.com
                </a>
              </li>
              <li>United States</li>
            </ul>
            <CTAButton action="trial" className="mt-5 px-5 py-2.5 text-xs">
              Start Free Trial
            </CTAButton>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {2026} TruckMind. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#cta" className="transition-colors hover:text-slate-300">
              Privacy Policy
            </a>
            <a href="#cta" className="transition-colors hover:text-slate-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Root: animations + composition                                            */
/* -------------------------------------------------------------------------- */

export default function TruckMindLandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero entrance timeline
      gsap.from("[data-hero]", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.1,
      });

      // Reveal-on-scroll with stagger batching
      ScrollTrigger.batch("[data-animate]", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 32, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.09,
              overwrite: true,
            },
          ),
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <DemoModalContext.Provider value={() => setDemoOpen(true)}>
      <div ref={rootRef} className="min-h-screen bg-ink-950 text-slate-200">
        <Navbar />
        <main>
          <Hero />
          <PlatformSection />
          <BenefitsSection />
          <AudienceSection />
          <SearchSection />
          <WhySection />
          <SafetySection />
          <GrowthSection />
          <StatsSection />
          <PricingSection />
          <FinalCTA />
        </main>
        <Footer />
      </div>
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </DemoModalContext.Provider>
  );
}
