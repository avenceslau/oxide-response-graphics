export const SERIES_COLORS = {
  red: '#d1493f',
  blue: '#377eb8',
  green: '#32966f',
  purple: '#7b4fa3',
} as const;

export const SERIES = [
  {name: 'Acetone', color: SERIES_COLORS.red, light: '#edaaa4'},
  {name: 'Ethanol', color: SERIES_COLORS.blue, light: '#9bc8e8'},
  {name: 'Toluene', color: SERIES_COLORS.green, light: '#a8d7bd'},
  {name: 'Formaldehyde', color: SERIES_COLORS.purple, light: '#c1a8d3'},
] as const;

export const INK = '#17232d';
export const FONT_FAMILY = 'Calibri, Arial, sans-serif';
