import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {SERIES_COLORS} from '../theme';

const GRID = [
  [0, 0, 0, 1, 1, 1],
  [0, 0, 1, 1, 1, 2],
  [0, 0, 1, 1, 2, 2],
  [0, 1, 1, 2, 2, 3],
  [1, 1, 2, 2, 3, 3],
  [1, 2, 2, 3, 3, 3],
] as const;

const PALETTE = [
  SERIES_COLORS.blue,
  SERIES_COLORS.green,
  SERIES_COLORS.purple,
  SERIES_COLORS.red,
] as const;
const CELL_SIZE = 92;
const GAP = 5;
const GRID_X = 185;
const GRID_Y = 315;

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;

type Props = {
  showTitle?: boolean;
  staticMode?: boolean;
};

export const HighThroughputScreening: React.FC<Props> = ({
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
  const axesProgress = staticMode
    ? 1
    : interpolate(frame, [8, 28], [0, 1], clamp);
  const legendProgress = staticMode
    ? 1
    : spring({
        frame: frame - 58,
        fps,
        config: {damping: 17, stiffness: 110},
      });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        fontFamily: 'Inter, Arial, Helvetica, sans-serif',
      }}
    >
      <svg viewBox="0 0 1080 1080" width="100%" height="100%">
        <defs>
          <filter id="grid-shadow" x="-15%" y="-15%" width="130%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="7" floodOpacity="0.14" />
          </filter>
        </defs>

        {showTitle ? (
          <g
            opacity={titleProgress}
            transform={`translate(0 ${interpolate(titleProgress, [0, 1], [-20, 0])})`}
          >
            <text
              x="540"
              y="95"
              textAnchor="middle"
              fill="#17232d"
              fontSize="59"
              fontWeight="800"
              letterSpacing="1.5"
            >
              HIGH-THROUGHPUT
            </text>
            <text
              x="540"
              y="164"
              textAnchor="middle"
              fill="#17232d"
              fontSize="59"
              fontWeight="800"
              letterSpacing="1.5"
            >
              SCREENING
            </text>
          </g>
        ) : null}

        <g filter="url(#grid-shadow)">
          <rect
            x={GRID_X - 7}
            y={GRID_Y - 7}
            width={6 * CELL_SIZE + 5 * GAP + 14}
            height={6 * CELL_SIZE + 5 * GAP + 14}
            rx="3"
            fill="#f4f6f7"
            opacity={axesProgress}
          />
          {GRID.flatMap((row, rowIndex) =>
            row.map((value, columnIndex) => {
              const delay = 18 + (rowIndex + columnIndex) * 4;
              const progress = staticMode
                ? 1
                : spring({
                    frame: frame - delay,
                    fps,
                    config: {damping: 18, stiffness: 145},
                  });
              const x = GRID_X + columnIndex * (CELL_SIZE + GAP);
              const y = GRID_Y + rowIndex * (CELL_SIZE + GAP);

              return (
                <rect
                  key={`${rowIndex}-${columnIndex}`}
                  x={x + (CELL_SIZE * (1 - progress)) / 2}
                  y={y + (CELL_SIZE * (1 - progress)) / 2}
                  width={CELL_SIZE * progress}
                  height={CELL_SIZE * progress}
                  rx="2"
                  fill={PALETTE[value]}
                />
              );
            }),
          )}
        </g>

        <g opacity={axesProgress} fill="#17232d">
          <text
            x="487"
            y="957"
            textAnchor="middle"
            fontSize="54"
            fontWeight="500"
          >
            Operating temperature
          </text>
          <text
            x="94"
            y="598"
            textAnchor="middle"
            fontSize="54"
            fontWeight="500"
            transform="rotate(-90 94 598)"
          >
            Composition
          </text>
        </g>

        <g
          opacity={legendProgress}
          transform={`translate(${interpolate(legendProgress, [0, 1], [22, 0])} 0)`}
        >
          <g filter="url(#grid-shadow)">
            {[...PALETTE].reverse().map((color, index) => (
              <rect
                key={color}
                x="825"
                y={GRID_Y + index * ((6 * CELL_SIZE + 5 * GAP) / 4)}
                width="55"
                height={(6 * CELL_SIZE + 5 * GAP) / 4}
                fill={color}
              />
            ))}
          </g>
          <text x="905" y="356" fill="#17232d" fontSize="49" fontWeight="500">
            High
          </text>
          <text x="905" y="868" fill="#17232d" fontSize="49" fontWeight="500">
            Low
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
