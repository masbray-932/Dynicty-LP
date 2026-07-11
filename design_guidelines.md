{
  "brand": {
    "name": "DYNICTY",
    "tagline": "BUILD • GROW • EMPOWER",
    "attributes": [
      "premium",
      "modern",
      "clean",
      "elegant",
      "fast-loading",
      "dark-first",
      "light-ready",
      "glassmorphism-ringan",
      "conversion-focused"
    ]
  },
  "design_tokens": {
    "color_palette": {
      "notes": [
        "Dark navy base must feel inky (not pure black) to keep premium depth.",
        "Blue→Purple gradient is allowed but must follow GRADIENT RESTRICTION RULE (use only as hero/CTA background accents; never on text-heavy areas).",
        "Use sparkle highlights as tiny accents (1–2px dots, small star SVGs) not as repeated patterns.",
        "All colors below include HEX + HSL for Tailwind/CSS variables."
      ],
      "base": {
        "bg_0": { "hex": "#05060F", "hsl": "234 50% 4%", "usage": "body background (deepest)" },
        "bg_1": { "hex": "#0A0B1F", "hsl": "236 49% 8%", "usage": "section background" },
        "bg_2": { "hex": "#0F1233", "hsl": "234 54% 13%", "usage": "elevated panels behind glass" },
        "surface_glass": { "hex": "rgba(255,255,255,0.06)", "hsl": "0 0% 100% / 0.06", "usage": "glass cards/nav" },
        "surface_glass_strong": { "hex": "rgba(255,255,255,0.10)", "hsl": "0 0% 100% / 0.10", "usage": "glass hover/active" },
        "border_subtle": { "hex": "rgba(255,255,255,0.10)", "hsl": "0 0% 100% / 0.10", "usage": "hairline borders" },
        "border_strong": { "hex": "rgba(255,255,255,0.16)", "hsl": "0 0% 100% / 0.16", "usage": "focus/selected borders" }
      },
      "text": {
        "text_primary": { "hex": "#F5F7FF", "hsl": "230 100% 98%", "usage": "main text on dark" },
        "text_secondary": { "hex": "rgba(245,247,255,0.72)", "hsl": "230 100% 98% / 0.72", "usage": "supporting copy" },
        "text_muted": { "hex": "rgba(245,247,255,0.56)", "hsl": "230 100% 98% / 0.56", "usage": "captions, helper" },
        "text_inverted": { "hex": "#0A0B1F", "hsl": "236 49% 8%", "usage": "text on light surfaces (light mode)" }
      },
      "brand": {
        "brand_blue": { "hex": "#3B82F6", "hsl": "217 91% 60%", "usage": "primary accent, links, focus ring" },
        "brand_blue_soft": { "hex": "rgba(59,130,246,0.18)", "hsl": "217 91% 60% / 0.18", "usage": "glow wash behind icons" },
        "brand_purple": { "hex": "#8B5CF6", "hsl": "258 90% 66%", "usage": "secondary accent" },
        "brand_purple_soft": { "hex": "rgba(139,92,246,0.18)", "hsl": "258 90% 66% / 0.18", "usage": "glow wash" },
        "sparkle": { "hex": "#EAF0FF", "hsl": "220 100% 96%", "usage": "sparkle mark + tiny highlights" }
      },
      "state": {
        "success": { "hex": "#22C55E", "hsl": "142 71% 45%", "usage": "success badges" },
        "warning": { "hex": "#F59E0B", "hsl": "38 92% 50%", "usage": "warnings" },
        "danger": { "hex": "#EF4444", "hsl": "0 84% 60%", "usage": "errors" },
        "info": { "hex": "#60A5FA", "hsl": "214 95% 68%", "usage": "info" }
      },
      "gradients": {
        "primary_gradient": {
          "stops": [
            { "hex": "#3B82F6", "pos": "0%" },
            { "hex": "#6D5EF7", "pos": "55%" },
            { "hex": "#8B5CF6", "pos": "100%" }
          ],
          "css": "linear-gradient(90deg, #3B82F6 0%, #6D5EF7 55%, #8B5CF6 100%)",
          "usage": "hero accent wash (max 20% viewport), final CTA background, small decorative strokes"
        },
        "hero_ink_wash": {
          "stops": [
            { "hex": "rgba(59,130,246,0.22)", "pos": "0%" },
            { "hex": "rgba(139,92,246,0.18)", "pos": "55%" },
            { "hex": "rgba(5,6,15,0)", "pos": "100%" }
          ],
          "css": "radial-gradient(900px 420px at 20% 10%, rgba(59,130,246,0.22) 0%, rgba(139,92,246,0.18) 55%, rgba(5,6,15,0) 100%)",
          "usage": "hero background glow behind headline (decorative only)"
        }
      },
      "light_mode_ready": {
        "bg": { "hex": "#FFFFFF", "hsl": "0 0% 100%" },
        "surface": { "hex": "#F6F7FB", "hsl": "230 33% 97%" },
        "text": { "hex": "#0B1020", "hsl": "224 49% 8%" },
        "border": { "hex": "rgba(11,16,32,0.10)", "hsl": "224 49% 8% / 0.10" }
      }
    },
    "typography": {
      "google_fonts": {
        "heading": {
          "family": "Space Grotesk",
          "weights": [500, 600, 700],
          "fallback": "ui-sans-serif, system-ui"
        },
        "body": {
          "family": "Figtree",
          "weights": [400, 500, 600],
          "fallback": "ui-sans-serif, system-ui"
        },
        "mono": {
          "family": "IBM Plex Mono",
          "weights": [400, 500],
          "fallback": "ui-monospace, SFMono-Regular"
        }
      },
      "scale_tailwind": {
        "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
        "h2": "text-2xl sm:text-3xl font-semibold tracking-tight",
        "h3": "text-xl sm:text-2xl font-semibold",
        "eyebrow": "text-xs sm:text-sm uppercase tracking-[0.18em] text-white/60",
        "body": "text-sm sm:text-base leading-relaxed text-white/72",
        "small": "text-xs leading-relaxed text-white/56"
      },
      "copy_tone": [
        "Bahasa Indonesia, ringkas, benefit-first",
        "Hindari jargon teknis tanpa penjelasan",
        "Gunakan angka konkret (mis. 10 menit, 14 hari) hanya jika benar"
      ]
    },
    "spacing_rhythm": {
      "system": "8pt",
      "tokens_px": [0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128],
      "section_padding": {
        "mobile": "py-16",
        "desktop": "py-24"
      },
      "container": {
        "max_width": "max-w-6xl",
        "padding": "px-4 sm:px-6 lg:px-8"
      },
      "grid": {
        "desktop": "12-col grid with 24px gap",
        "mobile": "single column, 16px gap"
      }
    },
    "radius_shadow": {
      "radius": {
        "sm": "rounded-lg",
        "md": "rounded-xl",
        "lg": "rounded-2xl"
      },
      "shadow": {
        "glass": "shadow-[0_1px_0_rgba(255,255,255,0.06),0_24px_80px_rgba(0,0,0,0.55)]",
        "lift": "shadow-[0_1px_0_rgba(255,255,255,0.08),0_28px_90px_rgba(0,0,0,0.60)]"
      },
      "glass_recipe": {
        "base_classes": "bg-white/[0.06] border border-white/10 backdrop-blur-xl",
        "hover_classes": "hover:bg-white/[0.09] hover:border-white/15",
        "active_classes": "active:bg-white/[0.10]"
      }
    }
  },
  "layout": {
    "global": {
      "background": [
        "Body uses bg_0 (#05060F).",
        "Sections alternate bg_0 and bg_1 for depth.",
        "Add subtle noise overlay via pseudo-element on body (opacity 0.04–0.06)."
      ],
      "header_height": "h-16",
      "anchor_offset": "scroll-mt-24 for sections (sticky nav offset)",
      "content_width": "Use max-w-6xl for most sections; max-w-7xl only for hero mockup cluster."
    },
    "section_order": [
      "Navbar (sticky)",
      "Hero",
      "Trusted + Counters",
      "Kenapa Dynicty (10 features)",
      "Template Showcase (9 categories)",
      "Cara Kerja (4 steps)",
      "Feature Showcase (device cluster)",
      "Pricing (3 tiers + comparison)",
      "FAQ",
      "Final CTA",
      "Footer"
    ]
  },
  "component_blueprints": {
    "component_path": {
      "shadcn_primary": [
        "/app/frontend/src/components/ui/button.jsx",
        "/app/frontend/src/components/ui/card.jsx",
        "/app/frontend/src/components/ui/badge.jsx",
        "/app/frontend/src/components/ui/accordion.jsx",
        "/app/frontend/src/components/ui/dialog.jsx",
        "/app/frontend/src/components/ui/sheet.jsx",
        "/app/frontend/src/components/ui/input.jsx",
        "/app/frontend/src/components/ui/label.jsx",
        "/app/frontend/src/components/ui/separator.jsx",
        "/app/frontend/src/components/ui/tabs.jsx",
        "/app/frontend/src/components/ui/table.jsx",
        "/app/frontend/src/components/ui/sonner.jsx"
      ],
      "optional": [
        "Flowbite: pricing comparison table patterns (implement with shadcn Table)",
        "21st.dev: bento grids + feature cards inspiration (implement with shadcn Card)"
      ]
    },
    "navbar": {
      "structure": [
        "Left: DTY monogram + DYNICTY wordmark",
        "Center (desktop): anchor links (Fitur, Template, Cara Kerja, Harga, FAQ)",
        "Right: secondary CTA (Masuk) + primary CTA (Coba Gratis)",
        "Mobile: hamburger opens shadcn Sheet with same anchors + CTA"
      ],
      "classes": {
        "wrapper": "sticky top-0 z-50 border-b border-white/10 bg-[#05060F]/60 backdrop-blur-xl",
        "inner": "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8",
        "link": "text-sm text-white/70 hover:text-white transition-colors",
        "active_link": "text-white"
      },
      "data_testids": {
        "nav": "site-navbar",
        "mobile_menu_button": "navbar-mobile-menu-button",
        "primary_cta": "navbar-try-free-button"
      }
    },
    "hero": {
      "layout": "Two-column on lg: left copy, right dashboard mockup. On mobile: copy then mockup.",
      "copy_blocks": [
        "Eyebrow: 'WHITE LABEL E‑COMMERCE SAAS'",
        "H1: 'Bangun website e‑commerce modern untuk brand Anda — tanpa ribet teknis.'",
        "Sub: 'Multi-tenant, white label, template & subscription engine untuk UMKM, agency, dan reseller.'",
        "Tagline row: BUILD • GROW • EMPOWER",
        "CTAs: Primary 'Coba Gratis' + Secondary 'Lihat Demo' (scroll to showcase)"
      ],
      "mockup": {
        "approach": [
          "Use pure CSS/Tailwind mock dashboard (no heavy images) for performance.",
          "Add 2–3 floating stat cards (Revenue, Orders, Conversion) with subtle parallax (framer-motion).",
          "Use AspectRatio + Card for the main dashboard frame.",
          "Keep gradients as glow behind mockup only (radial wash)."
        ],
        "classes": {
          "hero_bg": "relative overflow-hidden bg-[#05060F]",
          "glow": "pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[920px] -translate-x-1/2 opacity-80",
          "mock_frame": "relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06),0_40px_120px_rgba(0,0,0,0.65)]"
        }
      },
      "data_testids": {
        "primary_cta": "hero-try-free-button",
        "secondary_cta": "hero-see-demo-button"
      }
    },
    "trusted_counters": {
      "content": [
        "Row of logos (monochrome, white/60)",
        "3 counters with animated count-up: 'Template siap pakai', 'Waktu go-live', 'Tenant aktif' (use realistic placeholders)"
      ],
      "interaction": "Counters animate once when in-view (prefers-reduced-motion respected).",
      "data_testids": {
        "counter_templates": "trusted-counter-templates",
        "counter_golive": "trusted-counter-go-live",
        "counter_tenants": "trusted-counter-tenants"
      }
    },
    "features_grid": {
      "title": "Kenapa Dynicty",
      "grid": "2 cols mobile, 3 cols md, 4 cols lg (10 cards; last row can be 2 cards centered)",
      "card_pattern": [
        "Icon (lucide) in 40px glass circle",
        "Title",
        "1–2 lines description",
        "Optional 'Pelajari' link"
      ],
      "features_list": [
        "Multi Tenant",
        "White Label",
        "Feature Package",
        "Subscription Engine",
        "Template Engine",
        "Template Designer",
        "Deployment Engine",
        "Provisioning Engine",
        "Branding Engine",
        "Domain Binding"
      ],
      "data_testids": {
        "section": "features-section",
        "card": "feature-card"
      }
    },
    "template_showcase": {
      "layout": "Bento grid: 2 cols mobile, 3 cols md, 4 cols lg. Each card has thumbnail area + category label.",
      "categories": [
        "Sinar Telur",
        "Fashion",
        "Beauty",
        "F&B",
        "Electronics",
        "Home Living",
        "Automotive",
        "Sports",
        "Vape"
      ],
      "thumbnail_strategy": [
        "Avoid external stock dependency: generate lightweight SVG thumbnails (abstract storefront) per category.",
        "Optional: later replace with real screenshots from template engine."
      ],
      "data_testids": {
        "section": "template-showcase-section",
        "category_card": "template-category-card"
      }
    },
    "cara_kerja": {
      "visual": "4-step horizontal timeline on desktop; stacked steps on mobile. Use numbered badges + connecting line.",
      "steps": [
        "Pilih template",
        "Atur brand (logo, warna, domain)",
        "Aktifkan fitur & paket",
        "Deploy & mulai jualan"
      ],
      "data_testids": {
        "section": "how-it-works-section"
      }
    },
    "feature_showcase_devices": {
      "layout": "Device cluster: desktop (dominant) + tablet + phone overlapping. Use CSS frames (no images).",
      "interaction": "On hover (desktop), slight tilt + glow; on scroll, subtle y-parallax.",
      "data_testids": {
        "section": "device-showcase-section"
      }
    },
    "pricing": {
      "structure": [
        "3 plan cards with 'Growth' as Popular",
        "Below: comparison table (shadcn Table) for key features",
        "CTA buttons open 'Coba Gratis' modal or contact"
      ],
      "plans": {
        "starter": {
          "price": "Rp 199rb/bln",
          "for": "UMKM mulai jualan",
          "cta": "Coba Gratis"
        },
        "growth": {
          "price": "Rp 499rb/bln",
          "for": "Brand yang ingin scale",
          "cta": "Mulai Growth",
          "badge": "Paling Populer"
        },
        "enterprise": {
          "price": "Custom",
          "for": "Agency / reseller / enterprise",
          "cta": "Hubungi Sales"
        }
      },
      "data_testids": {
        "section": "pricing-section",
        "plan_card": "pricing-plan-card",
        "popular_badge": "pricing-popular-badge",
        "plan_cta": "pricing-plan-cta-button"
      }
    },
    "faq": {
      "component": "shadcn Accordion",
      "questions": [
        "Apakah Dynicty bisa full white label (tanpa branding Dynicty)?",
        "Berapa lama sampai website siap dipakai?",
        "Apakah bisa pakai domain sendiri?",
        "Apakah ada template designer (drag & drop)?",
        "Bagaimana sistem subscription & paket fitur bekerja?",
        "Apakah bisa multi akun untuk tim?",
        "Apakah ada dukungan onboarding untuk agency/reseller?"
      ],
      "data_testids": {
        "section": "faq-section",
        "item": "faq-item"
      }
    },
    "final_cta": {
      "style": "Full-bleed section with primary_gradient background but keep content in max-w-6xl; add sparkle SVGs as tiny accents.",
      "cta": "Coba Gratis",
      "supporting": "Tanpa kartu kredit • Setup cepat • Siap white label",
      "data_testids": {
        "primary_cta": "final-cta-try-free-button"
      }
    },
    "footer": {
      "columns": [
        "Company",
        "Product",
        "Resources",
        "Legal",
        "Social"
      ],
      "newsletter": {
        "fields": ["email"],
        "cta": "Langganan",
        "note": "Tanpa spam. Unsubscribe kapan saja."
      },
      "data_testids": {
        "newsletter_input": "footer-newsletter-email-input",
        "newsletter_submit": "footer-newsletter-submit-button"
      }
    },
    "modal_coba_gratis": {
      "component": "shadcn Dialog",
      "fields": [
        { "name": "nama", "type": "text" },
        { "name": "email", "type": "email" },
        { "name": "bisnis", "type": "text" },
        { "name": "telepon", "type": "tel" }
      ],
      "validation": "Client-side required + basic email/phone pattern; show inline errors.",
      "submit": "Show sonner toast success + close modal (until backend wired).",
      "data_testids": {
        "open_button": "try-free-open-modal-button",
        "dialog": "try-free-modal",
        "submit": "try-free-form-submit-button"
      }
    }
  },
  "motion": {
    "library": "framer-motion (already installed)",
    "principles": [
      "Restraint: motion should guide attention, not entertain.",
      "Use opacity + translateY only; avoid heavy rotations.",
      "Respect prefers-reduced-motion: disable parallax and reduce durations."
    ],
    "patterns": {
      "section_reveal": {
        "when": "on scroll into view",
        "motion": "opacity 0→1, y 12→0",
        "timing": "duration 0.5, ease [0.22,1,0.36,1]",
        "stagger": "0.06 between children"
      },
      "button": {
        "hover": "translateY(-1px) + subtle glow",
        "tap": "scale(0.98)",
        "transition": "transition-colors duration-200"
      },
      "floating_cards": {
        "motion": "slow y oscillation (±8px) with different delays",
        "note": "Disable if reduced motion"
      }
    }
  },
  "iconography": {
    "library": "lucide-react",
    "treatment": [
      "Icons are single-color (text-white/80) placed on glass circle.",
      "Add gradient as OUTER glow only (via pseudo-element or blurred div), not on the icon stroke.",
      "Keep icon size 18–20px in cards; 22–24px in hero highlights."
    ],
    "recommended_icons": {
      "multi_tenant": "Layers",
      "white_label": "Sparkles",
      "subscription": "CreditCard",
      "templates": "LayoutTemplate",
      "designer": "PenTool",
      "deployment": "Rocket",
      "provisioning": "Wand2",
      "branding": "Palette",
      "domain": "Globe",
      "config": "SlidersHorizontal"
    }
  },
  "section_wireframes": {
    "notes": "Wireframe-level guidance for implementation (mobile-first).",
    "sections": {
      "hero": {
        "mobile": [
          "Top: eyebrow + H1 + sub + tagline",
          "CTA row stacked (primary full width, secondary ghost)",
          "Below: dashboard mockup (aspect ratio ~16/10) + 2 floating stat cards"
        ],
        "desktop": [
          "Left 6 cols: copy",
          "Right 6 cols: mockup cluster",
          "Keep headline max width ~18–22ch"
        ]
      },
      "trusted": {
        "mobile": ["Logo row as horizontal scroll", "Counters in 1 column cards"],
        "desktop": ["Logos centered", "Counters 3-up"]
      },
      "features": {
        "mobile": ["2-up cards", "short descriptions"],
        "desktop": ["4-up grid", "hover lift"]
      },
      "templates": {
        "mobile": ["2-up category cards", "thumbnail top, label bottom"],
        "desktop": ["bento grid with 1–2 featured larger cards (optional)"]
      },
      "how_it_works": {
        "mobile": ["stacked steps with left number badge"],
        "desktop": ["timeline with connecting line"]
      },
      "pricing": {
        "mobile": ["plan cards stacked", "popular plan second"],
        "desktop": ["3 columns", "comparison table below"]
      },
      "faq": {
        "mobile": ["accordion full width"],
        "desktop": ["accordion centered max-w-3xl"]
      },
      "footer": {
        "mobile": ["newsletter first", "links as accordions optional"],
        "desktop": ["5 columns grid", "newsletter in first column"]
      }
    }
  },
  "accessibility_performance": {
    "a11y": [
      "All interactive elements must have visible focus ring (use ring brand_blue with 2px).",
      "Dialog: aria-labelledby + aria-describedby; trap focus (shadcn handles).",
      "Accordion: ensure keyboard navigation works (shadcn handles).",
      "Color contrast: body text must be at least white/72 on bg_0; avoid white/50 for paragraphs.",
      "Respect prefers-reduced-motion: disable floating/parallax and reduce durations."
    ],
    "performance": [
      "Avoid heavy hero images; build dashboard mockup with CSS.",
      "Lazy-load below-the-fold sections (Template Showcase, Device cluster) using React lazy + suspense or intersection observer.",
      "Use SVG for sparkles/noise; keep filters minimal.",
      "Prevent CLS: reserve heights for mockups and cards using AspectRatio and fixed min-heights."
    ],
    "seo": [
      "Add OG/Twitter meta, JSON-LD Organization + WebSite schema.",
      "Create /privacy, /terms minimal pages with same header/footer.",
      "Add /blog placeholder with Coming Soon and email capture."
    ]
  },
  "do_dont": {
    "do": [
      "Use dark navy backgrounds with subtle elevation steps (bg_0 → bg_1 → bg_2).",
      "Use glassmorphism lightly: nav + key cards only.",
      "Keep gradients as background accents only (hero glow, final CTA).",
      "Use generous spacing and short Indonesian copy blocks.",
      "Add data-testid to every CTA, input, accordion item, pricing card, and key metric."
    ],
    "dont": [
      "Do not apply gradients to text-heavy sections (pricing table, FAQ answers).",
      "Do not use multiple gradient layers in the same viewport.",
      "Do not center-align all text; keep left-aligned reading flow.",
      "Do not use universal transition (transition: all).",
      "Do not use emoji icons; use lucide-react only."
    ]
  },
  "image_urls": {
    "note": "Image selector tool unavailable in this environment; implement mockups via CSS/SVG first. Replace later with real product screenshots.",
    "categories": [
      {
        "category": "hero_dashboard_mockup",
        "description": "Use CSS-built dashboard mockup (preferred). If later using images, use WebP screenshots exported from product.",
        "urls": []
      },
      {
        "category": "template_thumbnails",
        "description": "Use lightweight SVG thumbnails per category (abstract storefront).",
        "urls": []
      },
      {
        "category": "sparkle_assets",
        "description": "Inline SVG sparkle marks (tiny).",
        "urls": []
      }
    ]
  },
  "instructions_to_main_agent": {
    "implementation_notes": [
      "Update /app/frontend/src/index.css tokens: set :root and .dark to DYNICTY palette; default to dark by adding class 'dark' on html/body in entry.",
      "Remove any centered layout defaults from App.css; do not use .App { text-align:center }.",
      "Build landing as one-page sections with ids for smooth scroll; use scroll-mt-24.",
      "Use shadcn Sheet for mobile nav, Dialog for Coba Gratis modal, Accordion for FAQ, Table for pricing comparison.",
      "All interactive elements and key info must include data-testid (kebab-case).",
      "Use framer-motion for section reveals + floating cards; gate with prefers-reduced-motion.",
      "Keep gradients under 20% viewport: hero glow + final CTA only."
    ],
    "js_file_note": "Project uses .jsx components; keep examples and imports in .jsx (not .tsx)."
  }
}

<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>
