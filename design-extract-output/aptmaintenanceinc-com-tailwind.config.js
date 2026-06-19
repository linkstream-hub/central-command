/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(221, 63%, 97%)',
            '100': 'hsl(221, 63%, 94%)',
            '200': 'hsl(221, 63%, 86%)',
            '300': 'hsl(221, 63%, 76%)',
            '400': 'hsl(221, 63%, 64%)',
            '500': 'hsl(221, 63%, 50%)',
            '600': 'hsl(221, 63%, 40%)',
            '700': 'hsl(221, 63%, 32%)',
            '800': 'hsl(221, 63%, 24%)',
            '900': 'hsl(221, 63%, 16%)',
            '950': 'hsl(221, 63%, 10%)',
            DEFAULT: '#1c3b7d'
        },
        secondary: {
            '50': 'hsl(209, 61%, 97%)',
            '100': 'hsl(209, 61%, 94%)',
            '200': 'hsl(209, 61%, 86%)',
            '300': 'hsl(209, 61%, 76%)',
            '400': 'hsl(209, 61%, 64%)',
            '500': 'hsl(209, 61%, 50%)',
            '600': 'hsl(209, 61%, 40%)',
            '700': 'hsl(209, 61%, 32%)',
            '800': 'hsl(209, 61%, 24%)',
            '900': 'hsl(209, 61%, 16%)',
            '950': 'hsl(209, 61%, 10%)',
            DEFAULT: '#408bd1'
        },
        accent: {
            '50': 'hsl(228, 51%, 97%)',
            '100': 'hsl(228, 51%, 94%)',
            '200': 'hsl(228, 51%, 86%)',
            '300': 'hsl(228, 51%, 76%)',
            '400': 'hsl(228, 51%, 64%)',
            '500': 'hsl(228, 51%, 50%)',
            '600': 'hsl(228, 51%, 40%)',
            '700': 'hsl(228, 51%, 32%)',
            '800': 'hsl(228, 51%, 24%)',
            '900': 'hsl(228, 51%, 16%)',
            '950': 'hsl(228, 51%, 10%)',
            DEFAULT: '#223068'
        },
        'neutral-50': '#404040',
        'neutral-100': '#000000',
        'neutral-200': '#ffffff',
        'neutral-300': '#999999',
        'neutral-400': '#ebebeb',
        'neutral-500': '#c5c8be',
        'neutral-600': '#d1d4cc',
        'neutral-700': '#9ea7a7',
        'neutral-800': '#b4c1ba',
        'neutral-900': '#333333',
        background: '#ffffff',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'Raleway',
            'sans-serif'
        ],
        body: [
            'Times New Roman',
            'sans-serif'
        ]
    },
    fontSize: {
        '15': [
            '15px',
            {
                lineHeight: '22.5px'
            }
        ],
        '18': [
            '18px',
            {
                lineHeight: '20.7px'
            }
        ],
        '24': [
            '24px',
            {
                lineHeight: '24px'
            }
        ],
        '27': [
            '27px',
            {
                lineHeight: '40.5px'
            }
        ],
        '30': [
            '30px',
            {
                lineHeight: '45px'
            }
        ],
        '36': [
            '36px',
            {
                lineHeight: '54px'
            }
        ],
        '45': [
            '45px',
            {
                lineHeight: '54px'
            }
        ],
        '52': [
            '52px',
            {
                lineHeight: '78px'
            }
        ],
        '63': [
            '63px',
            {
                lineHeight: '75.6px'
            }
        ],
        '32.4': [
            '32.4px',
            {
                lineHeight: '48.6px'
            }
        ],
        '31.5': [
            '31.5px',
            {
                lineHeight: '37.8px'
            }
        ],
        '23.994': [
            '23.994px',
            {
                lineHeight: '35.991px'
            }
        ],
        '23.94': [
            '23.94px',
            {
                lineHeight: '35.91px'
            }
        ],
        '21.6': [
            '21.6px',
            {
                lineHeight: '32.4px'
            }
        ]
    },
    spacing: {
        '1': '2px',
        '9': '18px',
        '15': '30px',
        '18': '36px',
        '20': '40px',
        '25': '50px',
        '27': '54px',
        '36': '72px',
        '40': '80px',
        '50': '100px',
        '55': '110px',
        '60': '120px',
        '64': '128px',
        '72': '144px',
        '43px': '43px',
        '63px': '63px',
        '67px': '67px'
    },
    borderRadius: {
        xs: '2px',
        md: '10px',
        full: '100px'
    },
    boxShadow: {
        sm: 'rgb(128, 128, 128) 0px 0px 5px 0px',
        md: 'rgb(27, 54, 98) 0px 3px 8px 0px',
        xl: 'rgba(0, 0, 0, 0.15) 0px 14px 95px 0px'
    },
    screens: {
        sm: '600px',
        md: '825px',
        '875px': '875px',
        '900px': '900px',
        lg: '1075px',
        '1100px': '1100px',
        '1140px': '1140px',
        '1150px': '1150px',
        '1200px': '1200px',
        xl: '1300px',
        '1400px': '1400px',
        '2xl': '1600px',
        '1700px': '1700px',
        '1780px': '1780px'
    },
    transitionDuration: {
        '100': '0.1s',
        '200': '0.2s',
        '300': '0.3s',
        '500': '0.5s'
    },
    transitionTimingFunction: {
        default: 'ease'
    },
    container: {
        center: true,
        padding: '20px'
    },
    maxWidth: {
        container: '1520px'
    }
},
  },
};
