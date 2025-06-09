"use client";

import { useRef, useState } from "react";
import styles from "./AnimatedCompass.module.css";

const compassPoints = [
  {
    label: "Faith",
    description:
      "I believe in divine order.Guided by: spirituality, purpose, destiny, trust in the unseen. Morality through: alignment with a higher good, sacredness, loyalty.",
    direction: "E",
  },
  {
    label: "Order",
    description:
      "I seek clarity, structure, and logical control. Guided by: rational planning, coherence, and mental discipline. Morality through: consistency, objectivity, and predictability.",
    direction: "SE",
  },
  {
    label: "Pleasure",
    description:
      "I seek enjoyment, beauty, and sensory fulfillment. Guided by: desire, vitality, and appreciation of life’s pleasures. Morality through: joy, aesthetic value, and personal well-being.",
    direction: "S",
  },
  {
    label: "Flow",
    description:
      "I live in harmony with the natural flow of life. Guided by: spontaneity, receptiveness, presence, and intuition. Morality through: non-coercion, inner balance, and alignment with nature.",
    direction: "SW",
  },
  {
    label: "Rationality",
    description:
      "I question everything until it earns my belief. Guided by: reason, honesty, evidence, intellectual humility. Morality through: truth-seeking, clarity, accountability.",
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
    label: "Ambition",
    description:
      "I strive to grow, achieve, and leave a mark on the world. Guided by: drive, purpose, excellence, and vision. Morality through: achievement, self-realization, and contribution.",
    direction: "NE",
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
        <svg
          viewBox="0 0 440 440"
          width="440"
          height="440"
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
                flood-color="#000000"
                flood-opacity="0.5"
              />
            </filter>
          </defs>

          <circle
            cx="220"
            cy="220"
            r="140"
            stroke="#b8aa8f"
            strokeWidth="4"
            fill="#f8f6f2"
            filter="url(#needleShadow)"
          />
          {/* Compass ring with ticks */}
          <g>
            {/* Major ticks (N, E, S, W) */}
            {[0, 90, 180, 270].map((angle) => {
              const x1 = 220 + 130 * Math.cos((angle * Math.PI) / 180);
              const y1 = 220 + 130 * Math.sin((angle * Math.PI) / 180);
              const x2 = 220 + 140 * Math.cos((angle * Math.PI) / 180);
              const y2 = 220 + 140 * Math.sin((angle * Math.PI) / 180);
              return (
                <line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#3e3a33"
                  strokeWidth="3"
                />
              );
            })}
            {/* Minor ticks (every 30deg) */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = i * 30;
              const x1 = 220 + 125 * Math.cos((angle * Math.PI) / 180);
              const y1 = 220 + 125 * Math.sin((angle * Math.PI) / 180);
              const x2 = 220 + 140 * Math.cos((angle * Math.PI) / 180);
              const y2 = 220 + 140 * Math.sin((angle * Math.PI) / 180);
              return (
                <line
                  key={angle + "minor"}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#b8aa8f"
                  strokeWidth="1.5"
                />
              );
            })}
          </g>
          {/* Cardinal direction labels (already present in compassPoints) */}

          {compassPoints.map((point) => {
            // Map direction to angle
            const directionAngles: Record<string, number> = {
              N: 0,
              NE: 45,
              E: 90,
              SE: 135,
              S: 180,
              SW: 225,
              W: 270,
              NW: 315,
            };
            const angle =
              directionAngles[
                point.direction as keyof typeof directionAngles
              ] ?? 0;
            const radius = 140;
            let labelRadius = 180;
            if (point.direction === "S") labelRadius = 185;
            const x = 220 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 220 + radius * Math.sin((angle * Math.PI) / 180);
            const labelX =
              220 + labelRadius * Math.cos((angle * Math.PI) / 180);
            const labelY =
              220 + labelRadius * Math.sin((angle * Math.PI) / 180);

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
                  x={labelX}
                  y={labelY}
                  className={styles.label}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {point.label}
                </text>
              </g>
            );
          })}

          <g
            transform={`rotate(${rotation ?? 0}, 220, 220)`}
            className={styles.arrow}
            filter="url(#needleShadow)"
          >
            {/* North (red) needle */}
            <polygon points="220,120 226,220 214,220" fill="#d32f2f" />
            {/* South (gray/white) needle */}
            <polygon points="220,320 226,220 214,220" fill="#b8aa8f" />
            {/* Center circle */}
            <circle
              cx="220"
              cy="220"
              r="7"
              fill="#fff"
              stroke="#3e3a33"
              strokeWidth="2"
            />
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
