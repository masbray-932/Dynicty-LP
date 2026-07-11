import React from "react";

// A dark, premium-looking mock dashboard built purely with SVG + CSS.
// Used inside the hero section to communicate the product without heavy images.
const DashboardMockup = () => {
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl border border-white/10 bg-[hsl(var(--dyn-bg-2))]/70 backdrop-blur-xl overflow-hidden shadow-[0_1px_0_rgba(255,255,255,0.06),0_40px_120px_rgba(0,0,0,0.65)]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-9 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">dynicty.dashboard</div>
        <div className="h-4 w-4 rounded-full bg-white/10" />
      </div>

      <div className="grid grid-cols-12 gap-3 p-3 h-[calc(100%-2.25rem)]">
        {/* Sidebar */}
        <div className="col-span-3 rounded-lg bg-white/[0.03] border border-white/5 p-3 flex flex-col gap-2">
          <div className="h-6 w-24 rounded bg-white/10" />
          <div className="mt-2 space-y-1.5">
            {["Dashboard", "Orders", "Products", "Customers", "Analytics", "Settings"].map((label, i) => (
              <div
                key={label}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] ${
                  i === 0 ? "bg-white/10 text-white" : "text-white/60"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-blue-400" : "bg-white/25"}`} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="col-span-9 flex flex-col gap-3">
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Revenue", val: "Rp 42.8jt", chg: "+12.4%", grad: "from-blue-500/30 to-blue-500/0" },
              { label: "Orders", val: "1,284", chg: "+8.1%", grad: "from-purple-500/30 to-purple-500/0" },
              { label: "Conversion", val: "3.24%", chg: "+2.1%", grad: "from-indigo-500/30 to-indigo-500/0" },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-lg border border-white/10 bg-gradient-to-br ${s.grad} p-3`}
              >
                <div className="text-[10px] text-white/50 uppercase tracking-widest">{s.label}</div>
                <div className="mt-1 font-semibold text-white text-sm">{s.val}</div>
                <div className="text-[10px] text-emerald-300 mt-0.5">{s.chg} vs bulan lalu</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-widest text-white/50">Sales Performance</div>
              <div className="flex items-center gap-1.5">
                {["7D", "30D", "90D"].map((t, i) => (
                  <span
                    key={t}
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      i === 1 ? "bg-white/10 text-white" : "text-white/40"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <svg viewBox="0 0 400 120" className="w-full mt-2" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="chart-stroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <path
                d="M0 90 C 40 60, 60 85, 90 70 S 140 30, 180 55 S 240 70, 280 40 S 340 20, 400 30 L 400 120 L 0 120 Z"
                fill="url(#chart-fill)"
              />
              <path
                d="M0 90 C 40 60, 60 85, 90 70 S 140 30, 180 55 S 240 70, 280 40 S 340 20, 400 30"
                fill="none"
                stroke="url(#chart-stroke)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            {/* Bars mini row */}
            <div className="mt-2 grid grid-cols-12 gap-1 items-end h-10">
              {[35, 55, 40, 70, 60, 80, 50, 90, 65, 75, 82, 95].map((h, i) => (
                <div
                  key={i}
                  className="rounded-sm dyn-brand-gradient-bg opacity-70"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
