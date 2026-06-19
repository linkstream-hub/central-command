// React Theme — extracted from https://aptmaintenanceinc.com
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
    neutral600: string;
    neutral700: string;
    neutral800: string;
    neutral900: string;
 *   };
 *   fonts: {
    body: string;
 *   };
 *   fontSizes: {
    '24': string;
    '27': string;
    '30': string;
    '36': string;
    '45': string;
    '52': string;
    '63': string;
    '32.4': string;
    '31.5': string;
    '23.994': string;
    '23.94': string;
    '21.6': string;
 *   };
 *   space: {
    '2': string;
    '18': string;
    '30': string;
    '36': string;
    '40': string;
    '43': string;
    '50': string;
    '54': string;
    '63': string;
    '67': string;
    '72': string;
    '80': string;
    '100': string;
    '110': string;
    '120': string;
    '128': string;
 *   };
 *   radii: {
    xs: string;
    md: string;
    full: string;
 *   };
 *   shadows: {
    sm: string;
    md: string;
    xl: string;
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
    "primary": "#1c3b7d",
    "secondary": "#408bd1",
    "accent": "#223068",
    "background": "#ffffff",
    "foreground": "#000000",
    "neutral50": "#404040",
    "neutral100": "#000000",
    "neutral200": "#ffffff",
    "neutral300": "#999999",
    "neutral400": "#ebebeb",
    "neutral500": "#c5c8be",
    "neutral600": "#d1d4cc",
    "neutral700": "#9ea7a7",
    "neutral800": "#b4c1ba",
    "neutral900": "#333333"
  },
  "fonts": {
    "body": "'Times New Roman', sans-serif"
  },
  "fontSizes": {
    "24": "24px",
    "27": "27px",
    "30": "30px",
    "36": "36px",
    "45": "45px",
    "52": "52px",
    "63": "63px",
    "32.4": "32.4px",
    "31.5": "31.5px",
    "23.994": "23.994px",
    "23.94": "23.94px",
    "21.6": "21.6px"
  },
  "space": {
    "2": "2px",
    "18": "18px",
    "30": "30px",
    "36": "36px",
    "40": "40px",
    "43": "43px",
    "50": "50px",
    "54": "54px",
    "63": "63px",
    "67": "67px",
    "72": "72px",
    "80": "80px",
    "100": "100px",
    "110": "110px",
    "120": "120px",
    "128": "128px"
  },
  "radii": {
    "xs": "2px",
    "md": "10px",
    "full": "100px"
  },
  "shadows": {
    "sm": "rgb(128, 128, 128) 0px 0px 5px 0px",
    "md": "rgb(27, 54, 98) 0px 3px 8px 0px",
    "xl": "rgba(0, 0, 0, 0.15) 0px 14px 95px 0px"
  },
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
      "main": "#1c3b7d",
      "light": "hsl(221, 63%, 45%)",
      "dark": "hsl(221, 63%, 15%)"
    },
    "secondary": {
      "main": "#408bd1",
      "light": "hsl(209, 61%, 69%)",
      "dark": "hsl(209, 61%, 39%)"
    },
    "background": {
      "default": "#ffffff",
      "paper": "#233d7d"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#404040"
    }
  },
  "typography": {
    "fontFamily": "'Times New Roman', sans-serif",
    "h1": {
      "fontSize": "32.4px",
      "fontWeight": "700",
      "lineHeight": "48.6px"
    },
    "h2": {
      "fontSize": "31.5px",
      "fontWeight": "500",
      "lineHeight": "37.8px"
    }
  },
  "shape": {
    "borderRadius": 10
  },
  "shadows": [
    "rgb(128, 128, 128) 0px 0px 5px 0px",
    "rgb(27, 54, 98) 0px 3px 8px 0px",
    "rgba(0, 0, 0, 0.184) 0px 0px 50px 20px",
    "rgba(0, 0, 0, 0.12) 0px 22px 41px 0px",
    "rgba(0, 0, 0, 0.15) 0px 14px 95px 0px"
  ]
};

export default theme;
