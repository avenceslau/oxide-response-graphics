import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CombinatorialMagnetron} from './CombinatorialMagnetron';
import {ConventionalOxides} from './ConventionalOxides';
import {HighThroughputScreening} from './HighThroughputScreening';
import {SelectiveResponse} from './SelectiveResponse';
import {FONT_FAMILY, INK} from '../theme';

const PANEL_SIZE = 565;

const PANELS = [
  {
    title: <>CONVENTIONAL OXIDES</>,
    x: 5,
    top: 45,
    content: <ConventionalOxides showTitle={false} />,
  },
  {
    title: <>COMBINATORIAL MAGNETRON</>,
    x: 615,
    top: 45,
    content: <CombinatorialMagnetron showTitle={false} staticMode />,
  },
  {
    title: (
      <>
        HIGH-THROUGHPUT
        <br />
        SCREENING
      </>
    ),
    x: 1225,
    top: 70,
    content: <HighThroughputScreening showTitle={false} staticMode />,
  },
  {
    title: <>SELECTIVE RESPONSE</>,
    x: 1835,
    top: 45,
    content: <SelectiveResponse showTitle={false} />,
  },
] as const;

export const OxideWorkflow: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        fontFamily: FONT_FAMILY,
      }}
    >
      {PANELS.map(({title, x, top, content}, index) => (
        <React.Fragment key={x}>
          <div
            style={{
              position: 'absolute',
              left: x,
              top,
              width: PANEL_SIZE,
              height: PANEL_SIZE,
            }}
          >
            {content}
          </div>
          <div
            style={{
              position: 'absolute',
              left: x,
              top: 24,
              width: PANEL_SIZE,
              color: INK,
              fontSize: 29,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: 0.6,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </div>
          {index < PANELS.length - 1 ? (
            <div
              style={{
                position: 'absolute',
                left: x + PANEL_SIZE + 4,
                top: 337,
                width: 36,
                height: 7,
                borderRadius: 4,
                backgroundColor: INK,
              }}
            />
          ) : null}
        </React.Fragment>
      ))}
    </AbsoluteFill>
  );
};
