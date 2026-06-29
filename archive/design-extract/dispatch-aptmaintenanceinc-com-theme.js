// React Theme — extracted from https://dispatch.aptmaintenanceinc.com
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    neutral50: string;
    neutral100: string;
 *   };
 *   fonts: {

 *   };
 *   fontSizes: {
    '14': string;
    '16': string;
    '18': string;
    '24': string;
 *   };
 *   space: {
    '2': string;
    '24': string;
    '32': string;
 *   };
 *   radii: {
    lg: string;
 *   };
 *   shadows: {

 *   };
 *   states: {
 *     hover: { opacity: number };
 *     focus: { opacity: number };
 *     active: { opacity: number };
 *     disabled: { opacity: number };
 *   };
 * }
 */

export const theme = {
  "colors": {
    "primary": "#0d0f14",
    "secondary": "#1e293b",
    "background": "#0d0f14",
    "foreground": "#ffffff",
    "neutral50": "#ffffff",
    "neutral100": "#64748b"
  },
  "fonts": {},
  "fontSizes": {
    "14": "14px",
    "16": "16px",
    "18": "18px",
    "24": "24px"
  },
  "space": {
    "2": "2px",
    "24": "24px",
    "32": "32px"
  },
  "radii": {
    "lg": "16px"
  },
  "shadows": {},
  "states": {
    "hover": {
      "opacity": 0.08
    },
    "focus": {
      "opacity": 0.12
    },
    "active": {
      "opacity": 0.16
    },
    "disabled": {
      "opacity": 0.38
    }
  }
};

// MUI v5 theme
export const muiTheme = {
  "palette": {
    "primary": {
      "main": "#0d0f14",
      "light": "hsl(223, 21%, 21%)",
      "dark": "hsl(223, 21%, 10%)"
    },
    "secondary": {
      "main": "#1e293b",
      "light": "hsl(217, 33%, 32%)",
      "dark": "hsl(217, 33%, 10%)"
    },
    "background": {
      "default": "#0d0f14",
      "paper": "#0a0f18"
    },
    "text": {
      "primary": "#ffffff",
      "secondary": "#64748b"
    }
  },
  "typography": {
    "h2": {
      "fontSize": "24px",
      "fontWeight": "700",
      "lineHeight": "32px"
    },
    "body1": {
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24px"
    },
    "body2": {
      "fontSize": "14px",
      "fontWeight": "400",
      "lineHeight": "20px"
    }
  },
  "shape": {
    "borderRadius": 12
  },
  "shadows": []
};

export default theme;
