import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SkillCardProps {
  skill: string;
  demand: number;
  growth: number;
  trendData: number[];
  delay?: number;
}

export const SkillCard = ({ skill, demand, growth, trendData, delay = 0 }: SkillCardProps) => {
  const sparklineRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(sparklineRef.current);
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = 120 - margin.left - margin.right;
    const height = 40 - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    const x = d3.scaleLinear()
      .domain([0, trendData.length - 1])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(trendData) as [number, number])
      .range([height, 0]);

    const line = d3.line<number>()
      .x((d, i) => x(i))
      .y(d => y(d))
      .curve(d3.curveCardinal);

    // Create gradient
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", `sparkline-gradient-${skill.replace(/\s+/g, '')}`)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", width).attr("y2", 0);

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "hsl(var(--secondary))")
      .attr("stop-opacity", 0.8);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "hsl(var(--accent))")
      .attr("stop-opacity", 0.8);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw line
    g.append("path")
      .datum(trendData)
      .attr("fill", "none")
      .attr("stroke", `url(#sparkline-gradient-${skill.replace(/\s+/g, '')})`)
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add glow effect
    g.append("path")
      .datum(trendData)
      .attr("fill", "none")
      .attr("stroke", `url(#sparkline-gradient-${skill.replace(/\s+/g, '')})`)
      .attr("stroke-width", 1)
      .attr("filter", "blur(2px)")
      .attr("opacity", 0.7)
      .attr("d", line);

  }, [trendData, skill]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-cosmic opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-poppins font-bold text-foreground">
            {skill}
          </h3>
          <div className="flex items-center space-x-1">
            <span className={`text-sm font-semibold ${growth >= 0 ? 'text-secondary' : 'text-destructive'}`}>
              {growth >= 0 ? '↗' : '↘'} {Math.abs(growth)}%
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Demand Level</span>
            <span className="text-sm font-semibold text-primary">{demand}%</span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${demand}%` }}
              transition={{ duration: 1, delay: delay + 0.3 }}
              className="h-full bg-gradient-primary rounded-full relative"
            >
              <div className="absolute inset-0 bg-gradient-primary animate-pulse-glow" />
            </motion.div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Trend (6M)
            </span>
          </div>
          <svg
            ref={sparklineRef}
            width="120"
            height="40"
            className="filter drop-shadow-sm"
          />
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl border-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};