"use client";

import { useRef, useState } from "react";
import styles from "./AnimatedCompass.module.css";

const compassPoints = [
  {
    label: "Faith",
    description:
      "I believe in divine order.Guided by: spirituality, purpose, destiny, trust in the unseen. Morality through: alignment with a higher good, sacredness, loyalty.",
    direction: "N",
  },
  {
    label: "Order",
    description: "Clarity, logic & control",
    direction: "NE",
  },
  {
    label: "Flow",
    description: "Goodness emerges naturally",
    direction: "W",
  },
  {
    label: "Wholeness",
    description: "Personal truth and alignment",
    direction: "SE",
  },
  {
    label: "Rationality",
    description:
      "I question everything until it earns my belief. Guided by: reason, honesty, evidence, intellectual humility. Morality through: truth-seeking, clarity, accountability.",
    direction: "S",
  },
  {
    label: "Depth",
    description: "Nuance, emotion, and narrative",
    direction: "SW",
  },
  {
    label: "Duty",
    description:
      "Doing the right thing matters more than how I feel. Guided by: obligation, fairness, virtue, conscience. Morality through: consistency, sacrifice, service.",
    direction: "E",
  },
  {
    label: "Emotion",
    description: "Authenticity and feeling",
    direction: "NW",
  },
];

export default function AnimatedCompass() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [rotation, setRotation] = useState<number | null>(null);
  const [isTooHigh, setIsTooHigh] = useState(false);

  const svgRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.svgContainer} ref={svgRef}>
        <svg viewBox="0 0 300 300" className={styles.svg}>
          {compassPoints.map((point, i) => {
            const angle = (i * 360) / compassPoints.length;
            const radius = 100;
            const x = 150 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 150 + radius * Math.sin((angle * Math.PI) / 180);

            return (
              <g key={point.label}>
                <circle
                  cx={x}
                  cy={y}
                  r="10"
                  className={styles.point}
                  onMouseEnter={(e) => {
                    const pointRect = e.currentTarget.getBoundingClientRect();
                    const containerRect =
                      svgRef.current?.getBoundingClientRect();

                    if (containerRect) {
                      const centerX = containerRect.width / 2;
                      const centerY = containerRect.height / 2;
                      const targetX =
                        pointRect.left -
                        containerRect.left +
                        pointRect.width / 2;
                      const targetY =
                        pointRect.top -
                        containerRect.top +
                        pointRect.height / 2;

                      const dx = targetX - centerX;
                      const dy = targetY - centerY;
                      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90; // +90 to point "up"

                      setRotation(angle);

                      const estimatedTooltipHeight = 100; // estimate or measure
                      const isClipped =
                        pointRect.top - estimatedTooltipHeight <
                        containerRect.top;
                      setIsTooHigh(isClipped);

                      setTooltipPos({
                        x: targetX,
                        y: targetY + (isTooHigh ? 20 : -20), // place below if too high
                      });

                      setTooltipPos({ x: targetX, y: targetY });
                      setHovered(point.label);
                    }
                  }}
                  onMouseLeave={() => {
                    setHovered(null);
                    // or assign to user defaults
                  }}
                />
                <text
                  x={x}
                  y={y - 12}
                  className={styles.label}
                  textAnchor="middle"
                >
                  {point.label}
                </text>
              </g>
            );
          })}
          <circle cx="150" cy="150" r="3" className={styles.centerDot} />

          <g
            className={styles.arrow}
            transform={`rotate(${rotation ?? 0}, 150, 150)`} // rotate around center
          >
            {/* Shaft */}
            <line
              x1="150"
              y1="150"
              x2="150"
              y2="100" // shorter than before
              stroke="#3e3a33"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Arrowhead */}
            <polygon points="146,100 154,100 150,90" fill="#3e3a33" />
          </g>
        </svg>

        {hovered && (
          <div
            className={styles.tooltip}
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
              transform: `translate(-50%, ${isTooHigh ? "0" : "-75%"})`,
            }}
          >
            <div className={styles.tooltipTitle}>{hovered}</div>
            <div className={styles.tooltipDesc}>
              {compassPoints.find((p) => p.label === hovered)?.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
