"use client";

import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  /** Position in a staggered group; each step adds 60ms. */
  index?: number;
  className?: string;
};

/** Fade + 12px rise when scrolled into view, once. Opacity-only under reduced motion. */
export function Reveal({ children, index = 0, className }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.5, ease: easeOut, delay: index * 0.06 }}
    >
      {children}
    </motion.div>
  );
}
