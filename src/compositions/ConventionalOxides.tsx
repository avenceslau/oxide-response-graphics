import React from 'react';
import {AbsoluteFill} from 'remotion';
import {FONT_FAMILY, INK, SERIES} from '../theme';

type Props = {
  showTitle?: boolean;
};

const pathFor = (amplitude: number) => {
  const points = Array.from({length: 241}, (_, index) => {
    const time = index / 240;
    const response = amplitude * Math.exp(-0.5 * ((time - 0.38) / 0.23) ** 2);
    return [130 + time * 810, 900 - response * 670];
  });

  return points
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`)
    .join(' ');
};

const VALUES = [0.34, 0.49, 0.64, 0.8];

export const ConventionalOxides: React.FC<Props> = ({showTitle = true}) => {
  return (
    <AbsoluteFill style={{backgroundColor: '#ffffff'}}>
      <svg viewBox="0 0 1080 1080" width="100%" height="100%">
        {showTitle ? (
          <text
            x="540"
            y="92"
            textAnchor="middle"
            fill={INK}
            fontFamily={FONT_FAMILY}
            fontSize="55"
            fontWeight="800"
          >
            CONVENTIONAL OXIDES
          </text>
        ) : null}

        <path d="M 130 175 L 130 900 L 950 900" fill="none" stroke={INK} strokeWidth="5" />

        {SERIES.map(({name, color}, index) => (
          <g key={name}>
            <path
              d={pathFor(VALUES[index])}
              fill="none"
              stroke={color}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="245"
              y1={205 + index * 48}
              x2="320"
              y2={205 + index * 48}
              stroke={color}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <text
              x="340"
              y={218 + index * 48}
              fill={INK}
              fontFamily={FONT_FAMILY}
              fontSize="39"
            >
              {name}
            </text>
          </g>
        ))}

        <text
          x="945"
          y="1005"
          textAnchor="end"
          fill={INK}
          fontFamily={FONT_FAMILY}
          fontSize="52"
        >
          Time
        </text>
        <text
          x="52"
          y="540"
          textAnchor="middle"
          fill={INK}
          fontFamily={FONT_FAMILY}
          fontSize="52"
          transform="rotate(-90 52 540)"
        >
          Response
        </text>
      </svg>
    </AbsoluteFill>
  );
};
