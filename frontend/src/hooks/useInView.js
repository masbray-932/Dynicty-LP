import { useEffect, useRef, useState } from "react";

// Native IntersectionObserver hook — replaces framer-motion entrance triggers.
export function useInViewOnce({ threshold = 0.12, rootMargin = "0px 0px -80px 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

// Reveal wrapper: adds a base opacity/translate class and a "visible" class when in view.
export function useRevealClass(delayMs = 0) {
  const [ref, inView] = useInViewOnce();
  const style = { transitionDelay: delayMs ? `${delayMs}ms` : undefined };
  return {
    ref,
    style,
    className: inView ? "dyn-reveal dyn-reveal-in" : "dyn-reveal",
  };
}
