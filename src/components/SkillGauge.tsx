import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';

interface SkillGaugeProps {
  value: number;
  label: string;
  maxValue?: number;
}

export const SkillGauge = ({ value, label, maxValue = 100 }: SkillGaugeProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const needleRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const needle = d3.select(needleRef.current);
    
    // Set up the gauge arc
    const width = 200;
    const height = 200;
    const radius = 80;
    const centerX = width / 2;
    const centerY = height / 2;

    svg.selectAll("*").remove();

    // Background arc
    const arc = d3.arc()
      .innerRadius(radius - 10)
      .outerRadius(radius)
      .startAngle(-Math.PI * 0.75)
      .endAngle(Math.PI * 0.75);

    svg.append("path")
      .attr("d", arc as any)
      .attr("transform", `translate(${centerX}, ${centerY})`)
      .attr("fill", "hsla(var(--glass-border), 0.3)")
      .attr("class", "backdrop-blur-sm");

    // Value arc
    const valueAngle = -Math.PI * 0.75 + (value / maxValue) * (Math.PI * 1.5);
    const valueArc = d3.arc()
      .innerRadius(radius - 10)
      .outerRadius(radius)
      .startAngle(-Math.PI * 0.75)
      .endAngle(valueAngle);

    svg.append("path")
      .attr("d", valueArc as any)
      .attr("transform", `translate(${centerX}, ${centerY})`)
      .attr("fill", "url(#gaugeGradient)")
      .attr("filter", "drop-shadow(0 0 10px hsla(var(--primary), 0.5))");

    // Gradient definition
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", "gaugeGradient")
      .attr("gradientUnits", "userSpaceOnUse");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "hsl(var(--primary))");

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "hsl(var(--secondary))");

    // Needle
    const needleAngle = -Math.PI * 0.75 + (value / maxValue) * (Math.PI * 1.5);
    const needleX = centerX + Math.cos(needleAngle) * (radius - 5);
    const needleY = centerY + Math.sin(needleAngle) * (radius - 5);

    svg.append("line")
      .attr("x1", centerX)
      .attr("y1", centerY)
      .attr("x2", needleX)
      .attr("y2", needleY)
      .attr("stroke", "hsl(var(--foreground))")
      .attr("stroke-width", 2)
      .attr("class", "drop-shadow-lg");

    // Center circle
    svg.append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", 6)
      .attr("fill", "hsl(var(--primary))")
      .attr("filter", "drop-shadow(0 0 8px hsla(var(--primary), 0.8))");

  }, [value, maxValue]);

  return (
    <motion.div 
      className="flex flex-col items-center space-y-4"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        duration: 1.2, 
        type: "spring",
        stiffness: 100 
      }}
    >
      <div className="relative skill-gauge floating">
        <svg
          ref={svgRef}
          width="200"
          height="200"
          className="filter drop-shadow-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center mt-8">
            <div className="text-3xl font-poppins font-black text-glow">
              {value}%
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Demand Index
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-poppins font-bold text-center">
        {label}
      </h3>
    </motion.div>
  );
};