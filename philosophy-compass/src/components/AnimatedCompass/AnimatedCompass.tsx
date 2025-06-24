"use client";

import { useRef, useState } from "react";
import styles from "./AnimatedCompass.module.css";

const compassPoints = [
  {
    label: "Faith",
    description:
      "I believe in divine order. Guided by: spirituality, purpose, destiny, trust in the unseen. Morality through: alignment with a higher good, sacredness, loyalty.",
    direction: "ENE",
  },
  {
    label: "Tradition",
    description:
      "I inherit and uphold systems of meaning shaped over time. Guided by: heritage, continuity, cultural memory, and collective wisdom. Morality through: stewardship, respect for legacy, and social cohesion.",
    direction: "E",
  },
  {
    label: "Order",
    description:
      "I seek clarity, structure, and logical control. Guided by: rational planning, coherence, and mental discipline. Morality through: consistency, objectivity, and predictability.",
    direction: "ESE",
  },
  {
    label: "Pleasure",
    description:
      "I seek enjoyment, beauty, and sensory fulfillment. Guided by: desire, vitality, and appreciation of life’s pleasures. Morality through: joy, aesthetic value, and personal well-being.",
    direction: "SE",
  },
  {
    label: "Love",
    description:
      "I open myself to connection, compassion, and care. Guided by: empathy, vulnerability, and mutual devotion. Morality through: relationship, generosity, and emotional presence.",
    direction: "SSE",
  },
  {
    label: "Flow",
    description:
      "I live in harmony with the natural flow of life. Guided by: spontaneity, receptiveness, presence, and intuition. Morality through: non-coercion, inner balance, and alignment with nature.",
    direction: "S",
  },
  {
    label: "Rationality",
    description:
      "I question everything until it earns my belief. Guided by: reason, honesty, evidence, intellectual humility. Morality through: truth-seeking, clarity, accountability.",
    direction: "SW",
  },
  {
    label: "Wisdom",
    description:
      "I synthesize knowledge, experience, and discernment to guide life. Guided by: reflection, balance, maturity, and understanding. Morality through: prudence, integration of head and heart, long-term perspective.",
    direction: "W",
  },
  {
    label: "Depth",
    description:
      "I value emotional nuance, complexity, and story. Guided by: empathy, introspection, and cultural context. Morality through: emotional truth, compassion, and lived experience.",
    direction: "NW",
  },
  {
    label: "Duty",
    description:
      "Doing the right thing matters more than how I feel. Guided by: obligation, fairness, virtue, conscience. Morality through: consistency, sacrifice, service.",
    direction: "N",
  },
  {
    label: "Honor",
    description:
      "I hold myself to a noble standard in both duty and aspiration. Guided by: integrity, reputation, self-respect, and responsibility. Morality through: principled ambition, ethical striving, and earned dignity.",
    direction: "NNE",
  },
  {
    label: "Ambition",
    description:
      "I strive to grow, achieve, and leave a mark on the world. Guided by: drive, purpose, excellence, and vision. Morality through: achievement, self-realization, and contribution.",
    direction: "NE",
  },
];


export default function AnimatedCompass() {
  const [rotation, setRotation] = useState<number | null>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.svgContainer} ref={svgRef}>
        <svg
          viewBox="0 0 440 440"
          className={styles.svg}
        >
          <defs>
            <filter
              id="needleShadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="0"
                dy="1.5"
                stdDeviation="1.5"
                floodColor="#000000"
                floodOpacity="0.5"
              />
            </filter>
          </defs>

          {/* Main compass circle */}
          <circle
            cx="220"
            cy="220"
            r="200"
            stroke="#b8aa8f"
            strokeWidth="4"
            fill="#f8f6f2"
            filter="url(#needleShadow)"
          />
          
          {/* Compass ring with ticks */}
          <g>
            {/* Major ticks (N, E, S, W) */}
            {[0, 90, 180, 270].map((angle) => {
              const x1 = 220 + 185 * Math.cos((angle * Math.PI) / 180);
              const y1 = 220 + 185 * Math.sin((angle * Math.PI) / 180);
              const x2 = 220 + 200 * Math.cos((angle * Math.PI) / 180);
              const y2 = 220 + 200 * Math.sin((angle * Math.PI) / 180);
              return (
                <line
                  key={angle}
                  x1={x1.toFixed(5)}
                  y1={y1.toFixed(5)}
                  x2={x2.toFixed(5)}
                  y2={y2.toFixed(5)}
                  stroke="#3e3a33"
                  strokeWidth="4"
                />
              );
            })}
            {/* Minor ticks (every 30deg) */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = i * 30;
              const x1 = 220 + 180 * Math.cos((angle * Math.PI) / 180);
              const y1 = 220 + 180 * Math.sin((angle * Math.PI) / 180);
              const x2 = 220 + 200 * Math.cos((angle * Math.PI) / 180);
              const y2 = 220 + 200 * Math.sin((angle * Math.PI) / 180);
              return (
                <line
                  key={angle + "minor"}
                  x1={x1.toFixed(5)}
                  y1={y1.toFixed(5)}
                  x2={x2.toFixed(5)}
                  y2={y2.toFixed(5)}
                  stroke="#b8aa8f"
                  strokeWidth="2"
                />
              );
            })}          </g>

          {/* Philosophy labels inside the compass */}
          {compassPoints.map((point) => {
            // Map direction to angle
            const directionAngles: Record<string, number> = {
              N: 0,
              NNE: 30,
              NE: 60,
              ENE: 90,
              E: 120,
              ESE: 150,
              SE: 180,
              SSE: 210,
              S: 240,
              SW: 270,
              W: 300,
              NW: 330,
            };            const angle =
              directionAngles[
                point.direction as keyof typeof directionAngles
              ] ?? 0;
            
            // Place labels inside the compass at different radii for better spacing
            // Faith and Rationality get special positioning closer to edge
            const labelRadius = (point.label === "Faith" || point.label === "Rationality") ? 160 : 140;
            const labelX = 220 + labelRadius * Math.cos((angle * Math.PI) / 180);
            const labelY = 220 + labelRadius * Math.sin((angle * Math.PI) / 180);

            // Create clickable areas
            const clickRadius = 200;
            const clickX = 220 + clickRadius * Math.cos((angle * Math.PI) / 180);
            const clickY = 220 + clickRadius * Math.sin((angle * Math.PI) / 180);

            return (
              <g key={point.label}>
                {/* Clickable area */}
                <circle
                  cx={clickX.toFixed(5)}
                  cy={clickY.toFixed(5)}
                  r="15"
                  className={styles.point}
                  onClick={() => {
                    const dx = clickX - 220;
                    const dy = clickY - 220;
                    const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
                    setRotation(targetAngle);
                  }}
                />
                {/* Label text inside compass */}
                <text
                  x={labelX.toFixed(5)}
                  y={labelY.toFixed(5)}
                  className={styles.label}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {point.label}
                </text>
              </g>
            );
          })}{/* Compass needle */}
          <g
            transform={`rotate(${rotation ?? 0}, 220, 220)`}
            className={styles.arrow}
            filter="url(#needleShadow)"
          >
            {/* North (red) needle */}
            <polygon points="220,160 225,220 215,220" fill="#d32f2f" />
            {/* South (gray/white) needle */}
            <polygon points="220,280 225,220 215,220" fill="#b8aa8f" />
            {/* Center circle */}
            <circle
              cx="220"
              cy="220"
              r="8"
              fill="#fff"
              stroke="#3e3a33"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
