import React, { useEffect, useMemo, useState } from "react";
import { ExternalLink, ImageOff, MessageCircle, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TEMPLATES } from "@/constants/testIds";
import { TEMPLATES_LIST } from "@/constants/plans";
import { useRevealClass } from "@/hooks/useInView";
import useContact from "@/hooks/useContact";
import CtaLink from "@/components/landing/CtaLink";
import {
  fetchPublicTemplates,
  mergeTemplatesWithRoadmap,
} from "@/services/templateShowcaseApi";

const accentMap = {
  amber:    "from-amber-500/40 to-orange-500/25",
  pink:     "from-pink-500/40 to-purple-500/25",
  rose:     "from-rose-500/40 to-fuchsia-500/25",
  red:      "from-red-500/40 to-orange-600/25",
  emerald:  "from-emerald-500/40 to-teal-500/25",
  sky:      "from-sky-500/40 to-indigo-500/25",
  lime:     "from-lime-500/40 to-emerald-600/25",
  violet:   "from-violet-500/40 to-indigo-600/25",
};

const StorefrontIllustration = ({ accent }) => (
  <div className={`absolute inset-0 bg-gradient-to-br ${accentMap[accent] || accentMap.sky}`}>
    <svg viewBox="0 0 400 240" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect x="40" y="60" width="320" height="150" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" />
      <rect x="56" y="78" width="80" height="10" rx="3" fill="rgba(255,255,255,0.7)" />
      <rect x="148" y="78" width="40" height="10" rx="3" fill="rgba(255,255,255,0.28)" />
      <rect x="196" y="78" width="40" height="10" rx="3" fill="rgba(255,255,255,0.28)" />
      <rect x="244" y="78" width="40" height="10" rx="3" fill="rgba(255,255,255,0.28)" />
      <rect x="304" y="74" width="40" height="18" rx="6" fill="rgba(255,255,255,0.9)" />
      <rect x="56" y="104" width="180" height="90" rx="8" fill="rgba(255,255,255,0.18)" />
      <rect x="246" y="104" width="46" height="42" rx="6" fill="rgba(255,255,255,0.32)" />
      <rect x="298" y="104" width="46" height="42" rx="6" fill="rgba(255,255,255,0.22)" />
      <rect x="246" y="152" width="46" height="42" rx="6" fill="rgba(255,255,255,0.22)" />
      <rect x="298" y="152" width="46" height="42" rx="6" fill="rgba(255,255,255,0.32)" />
    </svg>
  </div>
);

const TemplateThumbnail = ({ template }) => {
  const [hasImageError, setHasImageError] = useState(false);
  const showImage = template.thumbnailUrl && !hasImageError;

  return (
    <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.025]">
      {showImage ? (
        <img
          src={template.thumbnailUrl}
          alt={`Preview template ${template.name}`}
          loading="lazy"
          decoding="async"
          onError={() => setHasImageError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <StorefrontIllustration accent={template.accent} />
          {template.source === "api" && (
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <ImageOff className="h-7 w-7 text-white/35" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

const TemplateCard = ({ template, delay, whatsappHref }) => {
  const r = useRevealClass(delay);
  const available = template.status === "available";
  const hasDemo = available && Boolean(template.demoUrl);
  const description = available
    ? template.shortDescription || "Template toko online siap disesuaikan untuk bisnis Anda."
    : "Kategori ini sedang kami siapkan untuk pilihan template berikutnya.";

  return (
    <article
      ref={r.ref}
      style={r.style}
      data-testid={TEMPLATES.card}
      className={`${r.className} dyn-template-card group overflow-hidden`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[hsl(var(--dyn-bg-0))]">
        <TemplateThumbnail template={template} />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--dyn-bg-1))] via-transparent to-transparent" />
        <span className="absolute top-3 left-3 rounded-full bg-black/40 backdrop-blur border border-white/15 text-[10px] uppercase tracking-widest px-2 py-1 text-white/85">
          {template.category}
        </span>
        {template.featured ? (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-violet-400/15 border border-violet-300/30 text-[10px] uppercase tracking-widest px-2 py-1 text-violet-50 backdrop-blur-md">
            <Sparkles className="h-3 w-3" />
            Template Unggulan
          </span>
        ) : !available ? (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-yellow-400/15 border border-yellow-300/25 text-[10px] uppercase tracking-widest px-2 py-1 text-yellow-100">
            <Clock className="h-3 w-3" />
            Segera Hadir
          </span>
        ) : null}
      </div>
      <div className="flex min-h-[172px] flex-col px-5 py-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-white text-[17px] leading-snug line-clamp-2">
            {template.name}
          </h3>
          <p className="mt-2 text-sm leading-5 text-white/55 line-clamp-2">{description}</p>
        </div>
        <div className="mt-auto pt-4">
          {hasDemo ? (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-10 w-full rounded-lg bg-white/5 border-white/15 text-white hover:bg-white/10 hover:text-white"
            >
              <a
                href={template.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={TEMPLATES.preview}
                aria-label={`Lihat demo ${template.name}`}
              >
                Lihat Demo
                <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
              </a>
            </Button>
          ) : available ? (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-10 w-full rounded-lg bg-white/5 border-white/15 text-white hover:bg-white/10 hover:text-white"
            >
              <CtaLink
                to={whatsappHref}
                testId={TEMPLATES.preview}
                ariaLabel={`Tanyakan template ${template.name}`}
              >
                Tanyakan Template
                <MessageCircle className="h-3.5 w-3.5 ml-1.5" />
              </CtaLink>
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              disabled
              aria-disabled="true"
              data-testid={TEMPLATES.preview}
              className="h-10 w-full rounded-lg border-white/10 bg-white/[0.02] text-white/35 cursor-not-allowed"
            >
              Segera Hadir
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

const TemplateSkeleton = ({ index }) => (
  <article
    className="dyn-template-card overflow-hidden"
    aria-hidden="true"
    data-testid="template-skeleton"
  >
    <div className="aspect-[16/10] dyn-template-skeleton" />
    <div className="min-h-[172px] px-5 py-4">
      <div className="h-5 w-2/3 rounded dyn-template-skeleton" />
      <div className="mt-3 h-3.5 w-full rounded dyn-template-skeleton" />
      <div className="mt-2 h-3.5 w-4/5 rounded dyn-template-skeleton" />
      <div className="mt-7 h-10 w-full rounded-lg dyn-template-skeleton" />
    </div>
    <span className="sr-only">Memuat template {index + 1}</span>
  </article>
);

const TemplateShowcase = () => {
  const { ctaHref } = useContact();
  const [apiTemplates, setApiTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    fetchPublicTemplates({ signal: controller.signal })
      .then((templates) => {
        if (!active) return;
        setApiTemplates(templates);
        setFailed(false);
      })
      .catch((error) => {
        if (!active || error?.name === "AbortError") return;
        setFailed(true);
        if (process.env.NODE_ENV === "development") {
          console.warn("Template showcase menggunakan data fallback.", error);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const templates = useMemo(() => {
    if (failed) return TEMPLATES_LIST;
    return mergeTemplatesWithRoadmap(apiTemplates, TEMPLATES_LIST);
  }, [apiTemplates, failed]);

  return (
    <section
      id="template"
      data-testid={TEMPLATES.section}
      className="relative bg-[hsl(var(--dyn-bg-1))] dyn-section dyn-section-divider"
    >
      <div className="dyn-container">
        <div className="max-w-2xl">
          <div className="dyn-eyebrow">Template</div>
          <h2 className="mt-3 text-[32px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05] text-white">
            Temukan tampilan toko yang <span className="dyn-brand-gradient-text">sesuai dengan bisnis Anda.</span>
          </h2>
          <p className="mt-4 text-white/70 text-base max-w-xl">
            Jelajahi template Dynicty yang sudah siap didemokan, atau lihat kategori baru yang sedang kami siapkan.
          </p>
        </div>

        <div
          className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
          aria-busy={loading}
          aria-live="polite"
        >
          {loading
            ? Array.from({ length: 6 }, (_, index) => (
                <TemplateSkeleton key={index} index={index} />
              ))
            : templates.map((template, index) => (
                <TemplateCard
                  key={`${template.source || "roadmap"}-${template.slug || template.name}`}
                  template={template}
                  delay={(index % 3) * 60}
                  whatsappHref={ctaHref({
                    paket: `Template ${template.name}`,
                    source: "template-showcase",
                  })}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
