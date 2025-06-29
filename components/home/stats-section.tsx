"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false); // New state to track animation
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Set once: true to trigger only once

  useEffect(() => {
    if (isInView && !hasAnimated) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setHasAnimated(true); // Mark animation as completed
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function StatsSection() {
  const stats = [
    { number: 93, label: "of graduates are satisfied with GATE Experience", suffix: "%" },
    { number: 50, label: "trusted Industry Partner for Internship Placement", suffix: "+" },
    { number: 97, label: "of graduated students Employability", suffix: "%" },
    { number: 2000, label: "graduated and industry professionals", suffix: "+" },
  ];
  const centerStat = { number: 1000, label: "Short term Food Safety certificates", suffix: "+" };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
                <AnimatedCounter end={stat.number} />
                {stat.suffix}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
              <AnimatedCounter end={centerStat.number} />
              {centerStat.suffix}
            </div>
            <div className="text-gray-600 font-medium">{centerStat.label}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}