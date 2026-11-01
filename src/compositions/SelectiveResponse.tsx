import React from 'react';
import {AbsoluteFill} from 'remotion';
import {FONT_FAMILY, INK, SERIES} from '../theme';

type Props = {
  showTitle?: boolean;
};

const pathFor = (center: number) => {
  const points = Array.from({length: 241}, (_, index) => {
    const time = index / 240;
    const response = Math.exp(-0.5 * ((time - center) / 0.055) ** 2);
    return [130 + time * 810, 900 - response * 625];
  }).filter(([, y]) => y < 899.9);

  return points
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`)
    .join(' ');
};

const CENTERS = [0.16, 0.37, 0.58, 0.79];

export const SelectiveResponse: React.FC<Props> = ({showTitle = true}) => {
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
            SELECTIVE RESPONSE
          </text>
        ) : null}

        <path d="M 130 175 L 130 900 L 950 900" fill="none" stroke={INK} strokeWidth="5" />

        {SERIES.map(({name, color}, index) => (
          <path
            key={name}
            d={pathFor(CENTERS[index])}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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
