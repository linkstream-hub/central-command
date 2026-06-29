/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(223, 21%, 97%)',
            '100': 'hsl(223, 21%, 94%)',
            '200': 'hsl(223, 21%, 86%)',
            '300': 'hsl(223, 21%, 76%)',
            '400': 'hsl(223, 21%, 64%)',
            '500': 'hsl(223, 21%, 50%)',
            '600': 'hsl(223, 21%, 40%)',
            '700': 'hsl(223, 21%, 32%)',
            '800': 'hsl(223, 21%, 24%)',
            '900': 'hsl(223, 21%, 16%)',
            '950': 'hsl(223, 21%, 10%)',
            DEFAULT: '#0d0f14'
        },
        secondary: {
            '50': 'hsl(217, 33%, 97%)',
            '100': 'hsl(217, 33%, 94%)',
            '200': 'hsl(217, 33%, 86%)',
            '300': 'hsl(217, 33%, 76%)',
            '400': 'hsl(217, 33%, 64%)',
            '500': 'hsl(217, 33%, 50%)',
            '600': 'hsl(217, 33%, 40%)',
            '700': 'hsl(217, 33%, 32%)',
            '800': 'hsl(217, 33%, 24%)',
            '900': 'hsl(217, 33%, 16%)',
            '950': 'hsl(217, 33%, 10%)',
            DEFAULT: '#1e293b'
        },
        'neutral-50': '#ffffff',
        'neutral-100': '#64748b',
        background: '#0d0f14',
        foreground: '#ffffff'
    },
    fontSize: {
        '14': [
            '14px',
            {
                lineHeight: '20px'
            }
        ],
        '16': [
            '16px',
            {
                lineHeight: '24px'
            }
        ],
        '18': [
            '18px',
            {
                lineHeight: '28px'
            }
        ],
        '24': [
            '24px',
            {
                lineHeight: '32px'
            }
        ]
    },
    spacing: {
        '1': '2px',
        '12': '24px',
        '16': '32px'
    },
    borderRadius: {
        lg: '16px'
    },
    transitionDuration: {
        '150': '0.15s',
        '300': '0.3s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '448px'
    }
},
  },
};
