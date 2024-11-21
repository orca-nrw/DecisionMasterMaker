const plugin = require('tailwindcss/plugin');

module.exports = {
	content: [
		'./app/views/**/*.html.erb',
		'./app/helpers/**/*.rb',
		'./app/javascript/**/*.js',
		'./app/javascript/**/*.jsx',
		'./app/javascript/**/*.ts',
		'./app/javascript/**/*.tsx'
	],
	darkMode: 'class',
	theme: {
		colors: {
			black: '#000000',
			blue: {
				10: '#e8f1fa',
				25: '#c7ddf2',
				50: '#8ebae5',
				75: '#407fb7',
				100: '#00549f'
			},
			bordeaux: {
				10: '#f5e8e5',
				25: '#E5C5C0',
				50: '#CD8B87',
				75: '#B65256',
				100: '#A11035'
			},
			gray: {
				10: '#eceded',
				25: '#cfd1d2',
				50: '#9c9e9f',
				75: '#646567',
				90: '#202020',
				100: '#000000'
			},
			green: {
				10: '#f2f7ec',
				25: '#ddebce',
				50: '#b8d698',
				75: '#8dc060',
				100: '#57AB27'
			},
			indigo: {
				10: '#F2F0F7',
				25: '#DEDAEB',
				50: '#BCB5D7',
				75: '#9B91C1',
				100: '#7A6FAC'
			},
			magenta: {
				10: '#fdeef0',
				25: '#f9d2da',
				50: '#f19eb1',
				75: '#e96088',
				100: '#e30066'
			},
			maygreen: {
				10: '#f9faed',
				25: '#f0f3d0',
				50: '#e0e69a',
				75: '#d0d95c',
				100: '#bdcd00'
			},
			orange: {
				10: '#fff7ea',
				25: '#feeac9',
				50: '#fdd48f',
				75: '#fabe50',
				100: '#f6a800'
			},
			petrol: {
				10: '#e6ecec',
				25: '#bfd0d1',
				50: '#7da4a7',
				75: '#2d7f83',
				100: '#006165'
			},
			pink: { // same as magenta, for compatibility purposes
				10: '#fdeef0',
				25: '#f9d2da',
				50: '#f19eb1',
				75: '#e96088',
				100: '#e30066'
			},
			purple: {
				10: '#EDE5EA',
				25: '#D2C0CD',
				50: '#A8859E',
				75: '#834E75',
				100: '#612158'
			},
			red: {
				10: '#faebe3',
				25: '#f3cdbb',
				50: '#e69679',
				75: '#d85c41',
				100: '#cc071e'
			},
			teal: {
				10: '#ebf6f6',
				25: '#cae7e7',
				50: '#89cccf',
				75: '#00b1b7',
				100: '#0098a1'
			},
			white: '#ffffff',
			yellow: {
				10: '#fffdee',
				25: '#fffad1',
				50: '#fff59b',
				75: '#fff055',
				100: '#ffed00'
			},
			// app colors
			primary: '#002B44',
			secondary: '#a90d00',
			accent: '',
			neutral: '#000000',
			'base-100': '#FFFFFF',
			'base-200': '#F5F5F5',
			info: '#00549f',
			success: '#57AB27',
			warning: '#f6a800',
			error: '#cc071e'
		},
		extend: {
			animation: {
				begone: 'begone 1s ease-in',
				tailswoop: 'tailswoop .25s ease-in'
			},
			keyframes: {
				begone: {
					'0%': {
						'opacity': 1
					},
					'75%': {
						'opacity': 1
					},
					'100%': {
						'opacity': 0
					}
				},
				tailswoop: {
					'0%': {
						height: 0,
						'padding-top': 0,
						'padding-bottom': 0
					},
					'100%': {
						height: '2.25rem',
						'padding-top': '.5rem',
						'padding-bottom': '.5rem'
					}
				}
			}
		}
	},
	variants: {
		extend: {
			visibility: ["group-hover"],
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@headlessui/tailwindcss'),
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.scrollbar-hide': {
					/* IE and Edge */
					'-ms-overflow-style': 'none',

					/* Firefox */
					'scrollbar-width': 'none',

					/* Safari and Chrome */
					'&::-webkit-scrollbar': {
						display: 'none'
					}
				}
			}
			)
		})
	]
}
