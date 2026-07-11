import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { fetchStats } from "@/lib/api";
import { TRUSTED } from "@/constants/testIds";
import { Globe, Users, Rocket, LayoutGrid } from "lucide-react";

const formatNumber = (n) => new Intl.NumberFormat("id-ID").format(n);

const CountUp = ({ end = 0, duration = 1200, prefix = "", suffix = "" }) => {
  const [value, setValue] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }
    const start = performance.now();
    let raf;
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {formatNumber(value)}
      {suffix}
    </span>
  );
};

const partners = ["Sinar Telur", "Amara.co", "NusaMart", "Kopi Kita", "Rimba Batik", "UrbanFit"];

const Trusted = () => {
  const [stats, setStats] = useState({
    websites_created: 1240,
    active_tenants: 380,
    deployments: 5620,
    customers: 980,
  });

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch(() => {});
  }, []);

  const items = [
    { label: "Website Dibuat", value: stats.websites_created, icon: Globe, testId: TRUSTED.counterWebsites, suffix: "+" },
    { label: "Tenant Aktif", value: stats.active_tenants, icon: LayoutGrid, testId: TRUSTED.counterTenants, suffix: "+" },
    { label: "Deployment Sukses", value: stats.deployments, icon: Rocket, testId: TRUSTED.counterDeployments, suffix: "+" },
    { label: "Pelanggan Puas", value: stats.customers, icon: Users, testId: TRUSTED.counterCustomers, suffix: "+" },
  ];

  return (
    <section
      data-testid={TRUSTED.section}
      className="relative bg-[hsl(var(--dyn-bg-0))] border-y border-white/5"
    >
      <div className="dyn-container py-12 lg:py-16">
        <div className="text-center">
          <div className="dyn-eyebrow">Dipercaya Bisnis Modern Indonesia</div>
        </div>

        {/* Logo strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {partners.map((p) => (
            <div
              key={p}
              className="text-center text-white/40 font-semibold tracking-wider text-sm hover:text-white/70 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {p.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Counters */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="dyn-glass dyn-glass-hover rounded-xl p-4 lg:p-5 transition-colors"
              >
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Icon className="h-4 w-4" />
                  {it.label}
                </div>
                <div
                  data-testid={it.testId}
                  className="mt-2 text-2xl lg:text-3xl font-semibold text-white"
                >
                  <CountUp end={it.value} suffix={it.suffix} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trusted;
