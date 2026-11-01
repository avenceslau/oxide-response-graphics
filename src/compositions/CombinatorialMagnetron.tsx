import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {FONT_FAMILY, SERIES} from '../theme';

const SOURCE_X = [175, 418, 662, 905];
const FILM_X = [155, 350, 545, 740];
const SOURCE_Y = 225;
const FILM_Y = 825;

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;

type SourceProps = {
  x: number;
  color: string;
  progress: number;
};

const MagnetronSource: React.FC<SourceProps> = ({x, color, progress}) => {
  const scale = 0.86 + progress * 0.14;

  return (
    <g
      opacity={progress}
      transform={`translate(${x} ${SOURCE_Y}) scale(${scale}) translate(${-x} ${-SOURCE_Y})`}
    >
      <path
        d={`M ${x - 72} ${SOURCE_Y}
            L ${x + 72} ${SOURCE_Y}
            L ${x + 62} ${SOURCE_Y + 34}
            L ${x - 62} ${SOURCE_Y + 34} Z`}
        fill={color}
        stroke="#17232d"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </g>
  );
};

type BeamProps = {
  sourceX: number;
  targetX: number;
  index: number;
  progress: number;
  frame: number;
};

const DepositionBeam: React.FC<BeamProps> = ({
  sourceX,
  targetX,
  index,
  progress,
  frame,
}) => {
  const top = SOURCE_Y + 35;
  const bottom = FILM_Y;
  const pulse = 0.94 + Math.sin(frame * 0.11 + index) * 0.06;

  return (
    <g opacity={progress * pulse}>
      <path
        d={`M ${sourceX - 8} ${top}
            L ${sourceX + 8} ${top}
            L ${targetX + 91} ${bottom}
            L ${targetX - 91} ${bottom} Z`}
        fill={`url(#beam-${index})`}
      />
    </g>
  );
};

type CompositionProps = {
  showTitle?: boolean;
  staticMode?: boolean;
};

export const CombinatorialMagnetron: React.FC<CompositionProps> = ({
  showTitle = true,
  staticMode = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleProgress = staticMode
    ? 1
    : spring({
        frame,
        fps,
        config: {damping: 18, stiffness: 110},
      });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        fontFamily: FONT_FAMILY,
      }}
    >
      <svg viewBox="0 0 1080 1080" width="100%" height="100%">
        <defs>
          {SERIES.map(({color}, index) => (
            <linearGradient
              key={color}
              id={`beam-${index}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={color} stopOpacity="0.88" />
              <stop offset="72%" stopColor={color} stopOpacity="0.38" />
              <stop offset="100%" stopColor={color} stopOpacity="0.14" />
            </linearGradient>
          ))}
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="7" floodOpacity="0.16" />
          </filter>
        </defs>

        {showTitle ? (
          <text
            x="540"
            y="92"
            textAnchor="middle"
            fill="#17232d"
            fontSize="55"
            fontWeight="800"
            letterSpacing="1.5"
            opacity={titleProgress}
            transform={`translate(0 ${interpolate(titleProgress, [0, 1], [-18, 0])})`}
          >
            COMBINATORIAL MAGNETRON
          </text>
        ) : null}

        {SERIES.map(({color}, index) => {
          const delay = 12 + index * 10;
          const beamProgress = staticMode
            ? 0.78
            : interpolate(
                frame,
                [delay + 9, delay + 30],
                [0, 0.78],
                clamp,
              );

          return (
            <DepositionBeam
              key={color}
              sourceX={SOURCE_X[index]}
              targetX={FILM_X[index] + 97.5}
              index={index}
              progress={beamProgress}
              frame={frame}
            />
          );
        })}

        <g filter="url(#soft-shadow)">
          <path
            d="M 92 805 L 988 805 L 948 930 L 52 930 Z"
            fill="#7692a6"
            stroke="#17232d"
            strokeWidth="4"
          />
          {SERIES.map(({color}, index) => {
            const delay = 38 + index * 10;
            const filmProgress = staticMode
              ? 1
              : interpolate(frame, [delay, delay + 24], [0, 1], clamp);

            return (
              <rect
                key={color}
                x={FILM_X[index]}
                y={FILM_Y}
                width={195 * filmProgress}
                height="48"
                fill={color}
                opacity="0.95"
              />
            );
          })}
        </g>

        {SERIES.map(({color}, index) => {
          const delay = index * 9;
          const sourceProgress = staticMode
            ? 1
            : spring({
                frame: frame - delay,
                fps,
                config: {damping: 16, stiffness: 125},
              });

          return (
            <MagnetronSource
              key={color}
              x={SOURCE_X[index]}
              color={color}
              progress={sourceProgress}
            />
          );
        })}

        <text
          x="540"
          y="1000"
          textAnchor="middle"
          fill="#17232d"
          fontSize="51"
          fontWeight="500"
        >
          High-Entropy Oxide Film
        </text>
      </svg>
    </AbsoluteFill>
  );
};
