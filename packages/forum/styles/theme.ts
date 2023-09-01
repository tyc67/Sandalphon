const mediaSize = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
}

const breakpoint = {
  xs: `@media (min-width: ${mediaSize.xs}px)`,
  sm: `@media (min-width: ${mediaSize.sm}px)`,
  md: `@media (min-width: ${mediaSize.md}px)`,
  lg: `@media (min-width: ${mediaSize.lg}px)`,
  xl: `@media (min-width: ${mediaSize.xl}px)`,
  xxl: `@media (min-width: ${mediaSize.xxl}px)`,
}

const color = {
  candidates: {
    'lai-ching-te': {
      background: 'rgba(237, 255, 223, 1)',
      transition: 'rgba(175, 212, 146, 1)',
      text: 'rgba(111, 143, 70, 1)',
    },
    'hou-yu-ih': {
      background: 'rgba(229, 235, 255, 1)',
      transition: 'rgba(146, 165, 212, 1)',
      text: 'rgba(90, 111, 184, 1)',
    },
    'ko-wen-je': {
      background: 'rgba(229, 253, 255, 1)',
      transition: 'rgba(146, 209, 212, 1)',
      text: 'rgba(63, 140, 136, 1)',
    },
  },
  images: 'rgba(0, 0, 0, 0.1)',
  background: {
    gray: 'rgba(239, 239, 239, 1)',
    darkGray: 'rgba(208, 208, 208, 1)',
  },
  border: 'rgba(0, 0, 0, 0.1)',
  text: {
    hint: 'rgba(0, 0, 0, 0.3)',
    secondary: 'rgba(0, 0, 0, 0.5)',
    important: 'rgba(0, 0, 0, 0.87)',
  },
}

const font = {
  h1: { size: '32px', lineHeight: 1.5, weight: '500' },
  h2: { size: '24px', lineHeight: 1.5, weight: '500' },
  h3: { size: '20px', lineHeight: 1.5, weight: '500' },
  h4: { size: '18px', lineHeight: 1.8, weight: '400' },
  h5: { size: '16px', lineHeight: 1.5, weight: '400' },
  h6: { size: '14px', lineHeight: 1.2, weight: '400' },
  body: { size: '16px', lineHeight: 1.8, weight: '400' },
  body2: { size: '14px', lineHeight: 1.5, weight: '400' },
  tiny: { size: '12px', lineHeight: 2.0, weight: '400' },
  tiny2: { size: '12px', lineHeight: 1.5, weight: '400' },
}
const theme = {
  breakpoint: breakpoint,
}

export default theme
export { breakpoint, color, font }
